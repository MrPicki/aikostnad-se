# Säkerhetsanalys — Aikostnad.se

**Datum:** 2026-05-19  
**Scope:** React 19 + TypeScript + Vite-app, Vercel Edge Functions, Supabase-backend, Anthropic API  
**Branch:** `claude/interesting-lovelace-c021af`

---

## Sammanfattning

| Prioritet | Antal |
|-----------|-------|
| 🔴 Kritisk | 1 |
| 🟠 Hög | 4 |
| 🟡 Medium | 5 |
| 🟢 Låg | 3 |

---

## 1. Exponerade API-nycklar och secrets

### 🟠 HÖG — Supabase anon-nyckel hårdkodad som fallback i källkod

**Fil:** `src/lib/supabase.ts` rad 6–10

```ts
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ??
  "https://avdmyaufyhfxdlmzfjiu.supabase.co";          // hårdkodad
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";          // hårdkodad
```

Anon-nyckeln och projektets URL är inbakade i JavaScript-bundles som serveras till alla besökare. Anon-nyckeln är avsedd att vara publik i Supabase-arkitekturen, men den finns nu permanent i git-historiken och har en osäker fallback om env saknas.

**Åtgärd:**
1. Rotera anon-nyckeln i Supabase-dashboarden (den finns i git-historiken)
2. Ta bort hårdkodade fallback-värden — kasta ett explicit fel om env saknas:
```ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) throw new Error("Supabase env missing");
```
3. Säkerställ att `VITE_SUPABASE_URL` och `VITE_SUPABASE_ANON_KEY` är satta i Vercel-projektets environment settings

---

### 🟢 BRA — ANTHROPIC_API_KEY och SUPABASE_SERVICE_ROLE_KEY exponeras inte i klientkod

`api/chat.ts`, `api/analyze-prompt.ts`, `api/estimate-cost.ts` använder `process.env.ANTHROPIC_API_KEY` — server-side Edge Function-kod. `api/send-guide.ts` använder `process.env.SUPABASE_SERVICE_ROLE_KEY` korrekt server-only.

---

### 🟡 MEDIUM — `src/data/guides/anthropic.ts` refererar process.env.ANTHROPIC_API_KEY i exempelkod

**Fil:** `src/data/guides/anthropic.ts` rad 48–49

Koden är ett *kodexempel* i en `code`-sträng och körs inte i browsern. Men verifiera att `@anthropic-ai/sdk` inte importeras utanför exempelsträngen på ett sätt som gör att Vite drar in SDK:t i klientbundlen.

**Åtgärd:** Bekräfta att importen är del av `code`-templaten (plain sträng), inte en verklig modulimport.

---

### 🟢 BRA — Git-historiken innehåller inga läckta secrets

`.gitignore` inkluderar korrekt `.env` och `.env.local`. Sökning i git-loggen returnerade inga träffar för API-nycklar (förutom anon-nyckelns hårdkodade fallback i `supabase.ts`).

---

## 2. Öppna API-endpoints

### 🔴 KRITISK — `/api/chat` saknar autentisering, rate limiting OCH input-validering

**Fil:** `api/chat.ts`

**a) Wildcard CORS — vem som helst kan anropa endpointen**
```ts
"Access-Control-Allow-Origin": "*"   // rad 33 och 128
```
I kontrast till `/api/analyze-prompt` och `/api/estimate-cost` som har explicit origin-whitelist, har `/api/chat` ingen CORS-restriktion alls.

**b) Ingen rate limiting — obegränsade Anthropic API-anrop**
Ingen server-side rate limiting existerar. Varje POST triggar ett Anthropic API-anrop. En bot kan skicka tusentals requests per minut och driva upp kostnader.  
`max_tokens: 1024` per anrop mot `claude-haiku-4-5-20251001` (~$0.004/1K tokens) = **$245/timme** vid aggressiv attack.

**c) Ingen validering av meddelandeinnehåll**
```ts
const { messages } = (await req.json()) as { messages: Array<{ role: "user" | "assistant"; content: string }> }
```
`role` och `content` valideras inte. Angripare kan skicka godtyckligt lång `content` (inga längdbegränsningar).

**Åtgärd (prioriterad):**
1. **Omedelbart:** Byt `"*"` till origin-whitelist (kopiera `resolveCorsOrigin()` från `analyze-prompt.ts`)
2. **Omedelbart:** Lägg till `content.length`-begränsning per meddelande (max 2000 tecken)
3. **Kort sikt:** Implementera server-side rate limiting via Upstash Redis + `@upstash/ratelimit`
4. **Kort sikt:** Validera `role` — filtrera bort allt utom `"user"` och `"assistant"`

---

### 🟠 HÖG — `/api/send-guide` kan missbrukas för e-postspam

**Fil:** `api/send-guide.ts`

Endpointen har CORS-whitelist (bra) men saknar rate limiting. Kan missbrukas för:
- E-postbombing av valfri adress via Resend
- Fylla `leads`-tabellen med skräpdata

**Åtgärd:**
1. Rate limiting per IP (t.ex. 3 req/IP/timme)
2. `ON CONFLICT (email) DO NOTHING` i Supabase-inserten (kräver unique constraint på `email`)
3. Överväg Cloudflare Turnstile (gratis, GDPR-vänligt) som invisible captcha

---

### 🟡 MEDIUM — Vercel Preview URL-regex i CORS är för bred

**Fil:** `api/analyze-prompt.ts` rad ~81, `api/estimate-cost.ts` rad ~144

```ts
if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return origin;
```

Matchar **alla** Vercel-subdomäner. En angripare kan deploya ett eget Vercel-projekt och ha full CORS-access till Anthropic API-anropen.

**Åtgärd:**
```ts
/^https:\/\/aikostnad-se-[a-z0-9-]+\.vercel\.app$/i.test(origin)
```

---

### 🟢 BRA — `/api/analyze-prompt` och `/api/estimate-cost` har origin-whitelist

Båda implementerar `resolveCorsOrigin()` med explicit whitelist och 403 för otillåtna origins. Prompt trunceras (600/800 tecken). Output-värden clampar/valideras. Bra mönster.

---

### 🟢 BRA — `/api/exchange-rate` är safe

Read-only proxy till frankfurter.app, inga secrets, `*`-CORS är OK för denna endpoint.

---

## 3. Klientside-säkerhet (XSS)

### 🟢 BRA — Inga XSS-risker hittade

Grep-sökning i `src/**/*.{tsx,ts}` returnerade inga träffar för `dangerouslySetInnerHTML`, `eval()`, `innerHTML` eller `document.write`. React renderar all användarstyrd data via JSX vilket automatiskt escapar HTML.

### 🟢 BRA — HTML-mailgenerering i `send-guide.ts` använder korrekt escaping

`escapeHtml()` och `escapeAttr()` escapar `&`, `<`, `>`, `"`, `'` i all data som skrivs in i HTML-mail. Korrekt implementerat.

---

## 4. Dependency-sårbarheter

### 🟢 BRA — Inga kända sårbarheter

```
npm audit: 0 vulnerabilities (276 packages, 2026-05-19)
```

Håll koll på `@anthropic-ai/sdk ^0.96.0` och `react-router-dom ^7.15.1` — uppdateras frekvent.

---

## 5. Supabase-säkerhet

### 🟠 HÖG — `leads`-tabellen kan skräppostas direkt via anon-nyckeln

**Fil:** `src/lib/supabase.ts` rad 17–41

`submitLead()` skriver direkt till Supabase REST API med anon-nyckeln. Eftersom anon-nyckeln är publik i browsern (se avsnitt 1) kan vem som helst POST:a direkt till:
```
POST https://avdmyaufyhfxdlmzfjiu.supabase.co/rest/v1/leads
apikey: <anon-key>
```

**Obs:** `submitLead()` verkar vara dead code — funktionen importeras inte av någon komponent. Men tabellen är fortfarande direkt åtkomlig.

**Åtgärd:**
1. Aktivera RLS på `leads`-tabellen och blockera direkta anon-inserts:
```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No direct inserts" ON leads FOR INSERT TO anon WITH CHECK (false);
```
2. Ta bort `submitLead()` och klientside-Supabase-koden om all lead-skrivning sker via `/api/send-guide`
3. Rotera anon-nyckeln (se avsnitt 1)

---

### 🟢 BRA — `SUPABASE_SERVICE_ROLE_KEY` exponeras aldrig i klientkod

Används endast i `api/send-guide.ts` via `process.env`. Korrekt.

---

## 6. Rate Limiting

### 🟠 HÖG — Ingen server-side rate limiting existerar i projektet

Alla tre endpoints som triggar betalda API-anrop saknar rate limiting:

| Endpoint | Kostnad per anrop | Risk |
|----------|-------------------|------|
| `/api/chat` | ~$0.004/1K tokens | Kritisk — wildcard CORS + inga begränsningar |
| `/api/analyze-prompt` | ~$0.001/anrop | Medel — CORS-skyddad |
| `/api/estimate-cost` | ~$0.002/anrop | Medel — CORS-skyddad |
| `/api/send-guide` | Resend-kvot | Hög — kan e-postbomba |

**Åtgärd — Upstash Redis rate limiting (gratis tier, Vercel Edge-kompatibelt):**

```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
});

const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
const { success } = await ratelimit.limit(ip);
if (!success) return new Response(JSON.stringify({ error: "För många försök" }), { status: 429 });
```

---

## 7. CORS och Security Headers

### 🟠 HÖG — Kritiska HTTP Security Headers saknas

**Fil:** `vercel.json`

Nuvarande `vercel.json` sätter bara `Cache-Control` för `/api/*`. Följande saknas för alla sidor:

| Header | Risk om saknas |
|--------|----------------|
| `X-Frame-Options: DENY` | Clickjacking |
| `X-Content-Type-Options: nosniff` | MIME-sniffing |
| `Strict-Transport-Security` | Downgrade-attacker |
| `Referrer-Policy` | Info-läckage till tredjeparter |
| `Permissions-Policy` | Obegränsad browser-feature-access |
| `Content-Security-Policy` | XSS (komplexare, börja med Report-Only) |

**Åtgärd — lägg till i `vercel.json`:**
```json
{
  "source": "/(.*)",
  "headers": [
    { "key": "X-Frame-Options", "value": "DENY" },
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
    { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
    { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
  ]
}
```

---

### 🟡 MEDIUM — `Cache-Control: public` på alla API-endpoints är felkonfigurerat

**Fil:** `vercel.json`

```json
{
  "source": "/api/(.*)",
  "headers": [
    { "key": "Cache-Control", "value": "public, s-maxage=86400, stale-while-revalidate=3600" }
  ]
}
```

`public, s-maxage=86400` cachelagrar svar från alla API-endpoints i 24h på Vercels edge. POST-endpoints (chat, send-guide) ska inte cachas.

**Åtgärd:** Ta bort `/api/(.*)`-regeln eller begränsa den till enbart `/api/exchange-rate`.

---

## 8. Felhantering och info-läckage

### 🟡 MEDIUM — `api/chat.ts` loggar Anthropic API-feltext

**Fil:** `api/chat.ts` rad 74–75

```ts
console.error("Anthropic API error:", anthropicRes.status, errText);
```

`errText` kan innehålla request-detaljer i Vercel-loggar (synliga för alla med projektaccess).

**Åtgärd:** `console.error("Anthropic API error:", anthropicRes.status)` — logga bara statuskoden.

---

### 🟢 BRA — Felmeddelanden till klienten läcker inga interna detaljer

Alla endpoints returnerar generella felmeddelanden: `"Analys misslyckades"`, `"AI-anrop misslyckades"`, `"Serverfel"`. Stack traces och API-nyckelreferenser exponeras inte i HTTP-responses.

---

### 🟡 MEDIUM — `api/send-guide.ts` loggar e-postadress i klartext (GDPR)

**Fil:** `api/send-guide.ts` rad ~319

```ts
console.warn("RESEND_API_KEY missing — email not sent for", email);
```

E-postadressen (PII) loggas i Vercel-loggen utan explicit GDPR-ändamål.

**Åtgärd:** `console.warn("RESEND_API_KEY missing — email not sent")` — utelämna adressen.

---

## 9. Prompt Injection

### 🟡 MEDIUM — `/api/chat` saknar skydd mot prompt injection

**Fil:** `api/chat.ts`

Klienten skickar `messages`-arrayen direkt till Anthropic API utan validering av `role` eller `content`. Kan kringgå systemprompten och generera fler tokens (= högre kostnad).

**Åtgärd:**
1. Filtrera messages: enbart `role: "user"` och `role: "assistant"` accepteras
2. Begränsa `content` per meddelande till max 2000 tecken
3. Lägg till defensiv formulering i systemprompten om roleplay-/ignoring-försök

---

## Prioriterad åtgärdslista

| Prioritet | Åtgärd | Fil | Estimat |
|-----------|--------|-----|---------|
| 🔴 Kritisk | Rate limit + CORS-whitelist på `/api/chat` | `api/chat.ts` | 2–4h |
| 🟠 Hög | Aktivera RLS på `leads`-tabellen | Supabase dashboard | 30 min |
| 🟠 Hög | Rotera Supabase anon-nyckel (exponerad i git) | Supabase dashboard | 15 min |
| 🟠 Hög | Ta bort hårdkodade Supabase-credentials | `src/lib/supabase.ts` | 15 min |
| 🟠 Hög | Rate limit `/api/send-guide` | `api/send-guide.ts` | 2–3h |
| 🟠 Hög | Lägg till security headers (X-Frame, HSTS, nosniff) | `vercel.json` | 30 min |
| 🟡 Medium | Begränsa Vercel preview-CORS-regex | `api/analyze-prompt.ts`, `api/estimate-cost.ts` | 15 min |
| 🟡 Medium | Ta bort `/api/(.*)`-cache-regel | `vercel.json` | 10 min |
| 🟡 Medium | Validera message content-längd och role | `api/chat.ts` | 30 min |
| 🟡 Medium | Ta bort PII (email) ur Vercel-logg | `api/send-guide.ts` | 5 min |
| 🟢 Låg | Verifiera att anthropic.ts guide-import inte bundlas | `src/data/guides/anthropic.ts` | 15 min |

---

## Det som fungerar bra

- `ANTHROPIC_API_KEY` och `SUPABASE_SERVICE_ROLE_KEY` är korrekt server-side only
- `/api/analyze-prompt` och `/api/estimate-cost` har fungerande origin-whitelist
- Prompt-input trunceras (600/800 tecken) och output-värden clampar/valideras
- Ingen `dangerouslySetInnerHTML`, `eval()` eller `innerHTML` i hela klientkoden
- HTML-mailgenerering i `send-guide.ts` använder korrekt HTML-escaping
- Felmeddelanden till klienten är generella och läcker inga interna detaljer
- Git-historiken innehåller inga läckta secrets (förutom anon-nyckeln som fallback)
- `npm audit`: 0 sårbarheter
- `.gitignore` exkluderar korrekt `.env`-filer

---

*Rapporten baseras på statisk kodanalys och git-historikgranskning. Dynamisk testning (penetrationstest) och Supabase RLS-policy-verifiering rekommenderas som nästa steg.*
