/**
 * Full-body SSR pre-rendering for AdSense / crawler compatibility.
 *
 * Reads the SSR bundle built by `vite build --ssr src/entry-server.tsx`,
 * renders each route to a full HTML string, and injects the result into
 * the corresponding dist/{route}/index.html file — replacing the empty
 * `<div id="root"></div>` with pre-rendered content.
 *
 * Google's AdSense crawler (and Bing/Yandex) can then read the full page
 * text without needing to execute JavaScript.
 *
 * React hydrates normally on the client and replaces the SSR output.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const SSR_BUNDLE = path.join(DIST, 'entry-server.js')

// ─── Mock browser globals ─────────────────────────────────────────────────────
// Must be set BEFORE importing the SSR bundle so references to localStorage,
// window etc. inside useState initialisers don't throw at module-evaluation time.
// Node.js 22 has getter-only globalThis.window / navigator / document —
// use Object.defineProperty to override them safely.

const noop = () => {}
const noopAsync = () => Promise.resolve()

function defineGlobal(name, value) {
  try {
    Object.defineProperty(globalThis, name, {
      value,
      writable: true,
      configurable: true,
    })
  } catch {
    // Fallback: direct assignment (older Node, non-strict modules)
    globalThis[name] = value
  }
}

defineGlobal('window', {
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: noop,
  location: { href: '', pathname: '/', search: '', hash: '' },
  history: { pushState: noop, replaceState: noop },
  gtag: noop,
  scrollTo: noop,
  pageYOffset: 0,
  innerWidth: 1280,
  innerHeight: 768,
})

defineGlobal('localStorage', {
  getItem: () => null,
  setItem: noop,
  removeItem: noop,
  clear: noop,
})

defineGlobal('sessionStorage', {
  getItem: () => null,
  setItem: noop,
  removeItem: noop,
  clear: noop,
})

defineGlobal('navigator', {
  clipboard: { writeText: noopAsync },
  userAgent: 'node-ssr',
})

defineGlobal('document', {
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop }),
  createElementNS: () => ({ setAttribute: noop }),
  head: { appendChild: noop },
  body: { appendChild: noop },
  getElementById: () => null,
  addEventListener: noop,
  removeEventListener: noop,
  cookie: '',
})

// fetch() mock — components that call fetch() synchronously during render
// (not in useEffect) get an empty rejected-like response.
defineGlobal('fetch', () => Promise.resolve({
  ok: false,
  json: () => Promise.resolve(null),
  text: () => Promise.resolve(''),
}))
// ─────────────────────────────────────────────────────────────────────────────

// Import routes list (same source of truth as prerender-seo.mjs)
const { ROUTES } = await import('./seo-metadata.mjs')

// Import SSR render function from the Vite SSR bundle
if (!existsSync(SSR_BUNDLE)) {
  console.error('[prerender-ssr] dist/entry-server.js not found.')
  console.error('  Run `vite build --ssr src/entry-server.tsx` first.')
  process.exit(1)
}

const { render } = await import(SSR_BUNDLE)

let ok = 0
let failed = 0

for (const route of ROUTES) {
  const routePath = route.path
  // Determine which dist file to update
  const htmlPath = routePath === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, routePath.replace(/^\//, ''), 'index.html')

  if (!existsSync(htmlPath)) {
    console.warn(`[prerender-ssr] skip — no dist file: ${htmlPath}`)
    continue
  }

  try {
    const appHtml = render(routePath)
    const existingHtml = await readFile(htmlPath, 'utf-8')

    // Replace the root div content (which may already contain Helmet meta from
    // prerender-seo.mjs) with pre-rendered app HTML.
    // Matches: <div id="root"> ... anything (non-greedy) ... </div>
    // The [\s\S]*? handles both the empty case and the case where Helmet has
    // already injected <title>/<meta> tags into the root div.
    const rootDivRe = /<div id="root">[\s\S]*?<\/div>/
    const injected = existingHtml.replace(
      rootDivRe,
      `<div id="root">${appHtml}</div>`
    )

    if (injected === existingHtml) {
      console.warn(`[prerender-ssr] root div not found in: ${htmlPath}`)
      failed++
      continue
    }
    await writeFile(htmlPath, injected, 'utf-8')

    ok++
    process.stdout.write(`[prerender-ssr] ✓ ${routePath}\n`)
  } catch (err) {
    console.error(`[prerender-ssr] ✗ ${routePath}: ${err.message}`)
    failed++
  }
}

console.log(`\n[prerender-ssr] done — ${ok} routes rendered, ${failed} failed`)
if (failed > 0) process.exit(1)
