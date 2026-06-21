/**
 * SSR entry point for build-time pre-rendering.
 * Used by scripts/prerender-ssr.mjs to generate full static HTML for each route.
 * NOT bundled into the client build — only used via `vite build --ssr`.
 */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { Routes, Route } from 'react-router-dom'

// All pages imported directly (no lazy — SSR requires synchronous module evaluation)
import { Home } from './pages/Home'
import { TokenCalculatorPage } from './pages/TokenCalculatorPage'
import { Privacy } from './pages/Privacy'
import { Villkor } from './pages/Villkor'
import { VadKostarChatGPT } from './pages/VadKostarChatGPT'
import { ClaudePris } from './pages/ClaudePris'
import { Gpt4Pris } from './pages/Gpt4Pris'
import { VadKostarAi } from './pages/VadKostarAi'
import { BilligasteAi } from './pages/BilligasteAi'
import { Kontakt } from './pages/Kontakt'
import { Om } from './pages/Om'
import { ChatGPTvsClaude } from './pages/ChatGPTvsClaude'
import { AiChatbotKostnad } from './pages/AiChatbotKostnad'
import { PromptCaching } from './pages/PromptCaching'
import { GeminiPris } from './pages/GeminiPris'
import { AiForForetag } from './pages/AiForForetag'
import { GratisAi } from './pages/GratisAi'
import { AiKonsultPris } from './pages/AiKonsultPris'
import { MicrosoftCopilotPris } from './pages/MicrosoftCopilotPris'
import { OpenAiApiKostnad } from './pages/OpenAiApiKostnad'
import { ChatGptProVsPlus } from './pages/ChatGptProVsPlus'
import { AiBildPris } from './pages/AiBildPris'
import { PerplexityPris } from './pages/PerplexityPris'
import { AiOrdlista } from './pages/AiOrdlista'
import { Gpt5Pris } from './pages/Gpt5Pris'
import { AiKostnadPerManad } from './pages/AiKostnadPerManad'
import { OpenAiApiPris } from './pages/OpenAiApiPris'
import { AnthropicClaudeApiPris } from './pages/AnthropicClaudeApiPris'
import { AiForSmaforetag } from './pages/AiForSmaforetag'
import { JamforAiModeller } from './pages/JamforAiModeller'
import { AiApiKostnad } from './pages/AiApiKostnad'
import { DeepseekPris } from './pages/DeepseekPris'
import { VadKostarAiPerAr } from './pages/VadKostarAiPerAr'
import { O3Pris } from './pages/O3Pris'
import { Prisandringar } from './pages/Prisandringar'
import { AiForAdvokatbyra } from './pages/AiForAdvokatbyra'
import { AiForRedovisning } from './pages/AiForRedovisning'
import { AiForEhandel } from './pages/AiForEhandel'
import { AiForSjukvard } from './pages/AiForSjukvard'
import { AiForSkola } from './pages/AiForSkola'
import { GrokPris } from './pages/GrokPris'
import { AiVideoPris } from './pages/AiVideoPris'
import { MistralPris } from './pages/MistralPris'
import { Press } from './pages/Press'
import { EmbedPage } from './pages/EmbedPage'
import { AiGdprSverige } from './pages/AiGdprSverige'
import { AiKostnadsoptimering } from './pages/AiKostnadsoptimering'
import { AiForHr } from './pages/AiForHr'

/**
 * Render a route to HTML string.
 * Only renders body content — head/meta is handled by prerender-seo.mjs.
 */
export function render(url: string): string {
  // HelmetProvider context is required for SSR (even though we discard the head output here)
  const helmetContext = {}

  return renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/token-kalkylator" element={<TokenCalculatorPage />} />
          <Route path="/integritet" element={<Privacy />} />
          <Route path="/villkor" element={<Villkor />} />
          <Route path="/vad-kostar-chatgpt" element={<VadKostarChatGPT />} />
          <Route path="/claude-pris" element={<ClaudePris />} />
          <Route path="/gpt-4-pris" element={<Gpt4Pris />} />
          <Route path="/vad-kostar-ai" element={<VadKostarAi />} />
          <Route path="/billigaste-ai" element={<BilligasteAi />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/om" element={<Om />} />
          <Route path="/chatgpt-vs-claude" element={<ChatGPTvsClaude />} />
          <Route path="/ai-chatbot-kostnad" element={<AiChatbotKostnad />} />
          <Route path="/prompt-caching" element={<PromptCaching />} />
          <Route path="/gemini-pris" element={<GeminiPris />} />
          <Route path="/ai-for-foretag" element={<AiForForetag />} />
          <Route path="/gratis-ai" element={<GratisAi />} />
          <Route path="/ai-konsult-pris" element={<AiKonsultPris />} />
          <Route path="/microsoft-copilot-pris" element={<MicrosoftCopilotPris />} />
          <Route path="/openai-api-kostnad" element={<OpenAiApiKostnad />} />
          <Route path="/chatgpt-pro-vs-plus" element={<ChatGptProVsPlus />} />
          <Route path="/ai-bild-pris" element={<AiBildPris />} />
          <Route path="/perplexity-pris" element={<PerplexityPris />} />
          <Route path="/ai-ordlista" element={<AiOrdlista />} />
          <Route path="/gpt-5-pris" element={<Gpt5Pris />} />
          <Route path="/ai-kostnad-per-manad" element={<AiKostnadPerManad />} />
          <Route path="/openai-api-pris" element={<OpenAiApiPris />} />
          <Route path="/anthropic-claude-api-pris" element={<AnthropicClaudeApiPris />} />
          <Route path="/ai-for-smaforetag" element={<AiForSmaforetag />} />
          <Route path="/jamfor-ai-modeller" element={<JamforAiModeller />} />
          <Route path="/ai-api-kostnad" element={<AiApiKostnad />} />
          <Route path="/deepseek-pris" element={<DeepseekPris />} />
          <Route path="/vad-kostar-ai-per-ar" element={<VadKostarAiPerAr />} />
          <Route path="/o3-pris" element={<O3Pris />} />
          <Route path="/prisandringar" element={<Prisandringar />} />
          <Route path="/ai-for-advokatbyra" element={<AiForAdvokatbyra />} />
          <Route path="/ai-for-redovisning" element={<AiForRedovisning />} />
          <Route path="/ai-for-ehandel" element={<AiForEhandel />} />
          <Route path="/ai-for-sjukvard" element={<AiForSjukvard />} />
          <Route path="/ai-for-skola" element={<AiForSkola />} />
          <Route path="/grok-pris" element={<GrokPris />} />
          <Route path="/ai-video-pris" element={<AiVideoPris />} />
          <Route path="/mistral-pris" element={<MistralPris />} />
          <Route path="/press" element={<Press />} />
          <Route path="/embed-info" element={<EmbedPage />} />
          <Route path="/ai-gdpr-sverige" element={<AiGdprSverige />} />
          <Route path="/ai-kostnadsoptimering" element={<AiKostnadsoptimering />} />
          <Route path="/ai-for-hr" element={<AiForHr />} />
          <Route path="*" element={<div />} />
        </Routes>
      </StaticRouter>
    </HelmetProvider>
  )
}
