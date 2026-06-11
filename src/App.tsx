import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SEOProvider } from "./components/SEO";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StickyEmailBar } from "./components/StickyEmailBar";
import { CookieBanner } from "./components/CookieBanner";
const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));

const TokenCalculatorPage = lazy(() =>
  import("./pages/TokenCalculatorPage").then((m) => ({ default: m.TokenCalculatorPage }))
);
const Privacy = lazy(() =>
  import("./pages/Privacy").then((m) => ({ default: m.Privacy }))
);
const Villkor = lazy(() =>
  import("./pages/Villkor").then((m) => ({ default: m.Villkor }))
);
const VadKostarChatGPT = lazy(() =>
  import("./pages/VadKostarChatGPT").then((m) => ({ default: m.VadKostarChatGPT }))
);
const ClaudePris = lazy(() =>
  import("./pages/ClaudePris").then((m) => ({ default: m.ClaudePris }))
);
const Gpt4Pris = lazy(() =>
  import("./pages/Gpt4Pris").then((m) => ({ default: m.Gpt4Pris }))
);
const VadKostarAi = lazy(() =>
  import("./pages/VadKostarAi").then((m) => ({ default: m.VadKostarAi }))
);
const BilligasteAi = lazy(() =>
  import("./pages/BilligasteAi").then((m) => ({ default: m.BilligasteAi }))
);
const Kontakt = lazy(() =>
  import("./pages/Kontakt").then((m) => ({ default: m.Kontakt }))
);
const Om = lazy(() =>
  import("./pages/Om").then((m) => ({ default: m.Om }))
);
const ChatGPTvsClaude = lazy(() =>
  import("./pages/ChatGPTvsClaude").then((m) => ({ default: m.ChatGPTvsClaude }))
);
const AiChatbotKostnad = lazy(() =>
  import("./pages/AiChatbotKostnad").then((m) => ({ default: m.AiChatbotKostnad }))
);
const PromptCaching = lazy(() =>
  import("./pages/PromptCaching").then((m) => ({ default: m.PromptCaching }))
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound }))
);
const EmbedCalculator = lazy(() =>
  import("./pages/EmbedCalculator").then((m) => ({ default: m.EmbedCalculator }))
);
const Press = lazy(() =>
  import("./pages/Press").then((m) => ({ default: m.Press }))
);
const GeminiPris = lazy(() =>
  import("./pages/GeminiPris").then((m) => ({ default: m.GeminiPris }))
);
const AiForForetag = lazy(() =>
  import("./pages/AiForForetag").then((m) => ({ default: m.AiForForetag }))
);
const GratisAi = lazy(() =>
  import("./pages/GratisAi").then((m) => ({ default: m.GratisAi }))
);
const AiKonsultPris = lazy(() =>
  import("./pages/AiKonsultPris").then((m) => ({ default: m.AiKonsultPris }))
);
const MicrosoftCopilotPris = lazy(() =>
  import("./pages/MicrosoftCopilotPris").then((m) => ({ default: m.MicrosoftCopilotPris }))
);
const OpenAiApiKostnad = lazy(() =>
  import("./pages/OpenAiApiKostnad").then((m) => ({ default: m.OpenAiApiKostnad }))
);
const ChatGptProVsPlus = lazy(() =>
  import("./pages/ChatGptProVsPlus").then((m) => ({ default: m.ChatGptProVsPlus }))
);
const AiBildPris = lazy(() =>
  import("./pages/AiBildPris").then((m) => ({ default: m.AiBildPris }))
);
const PerplexityPris = lazy(() =>
  import("./pages/PerplexityPris").then((m) => ({ default: m.PerplexityPris }))
);
const AiOrdlista = lazy(() =>
  import("./pages/AiOrdlista").then((m) => ({ default: m.AiOrdlista }))
);
const Gpt5Pris = lazy(() =>
  import("./pages/Gpt5Pris").then((m) => ({ default: m.Gpt5Pris }))
);
const AiKostnadPerManad = lazy(() =>
  import("./pages/AiKostnadPerManad").then((m) => ({ default: m.AiKostnadPerManad }))
);
const OpenAiApiPris = lazy(() =>
  import("./pages/OpenAiApiPris").then((m) => ({ default: m.OpenAiApiPris }))
);
const AnthropicClaudeApiPris = lazy(() =>
  import("./pages/AnthropicClaudeApiPris").then((m) => ({ default: m.AnthropicClaudeApiPris }))
);
const AiForSmaforetag = lazy(() =>
  import("./pages/AiForSmaforetag").then((m) => ({ default: m.AiForSmaforetag }))
);
const JamforAiModeller = lazy(() =>
  import("./pages/JamforAiModeller").then((m) => ({ default: m.JamforAiModeller }))
);
const AiApiKostnad = lazy(() =>
  import("./pages/AiApiKostnad").then((m) => ({ default: m.AiApiKostnad }))
);
const DeepseekPris = lazy(() =>
  import("./pages/DeepseekPris").then((m) => ({ default: m.DeepseekPris }))
);
const VadKostarAiPerAr = lazy(() =>
  import("./pages/VadKostarAiPerAr").then((m) => ({ default: m.VadKostarAiPerAr }))
);
const O3Pris = lazy(() =>
  import("./pages/O3Pris").then((m) => ({ default: m.O3Pris }))
);
const Prisandringar = lazy(() =>
  import("./pages/Prisandringar").then((m) => ({ default: m.Prisandringar }))
);
const EmbedPage = lazy(() =>
  import("./pages/EmbedPage").then((m) => ({ default: m.EmbedPage }))
);
const AiForAdvokatbyra = lazy(() =>
  import("./pages/AiForAdvokatbyra").then((m) => ({ default: m.AiForAdvokatbyra }))
);
const AiForRedovisning = lazy(() =>
  import("./pages/AiForRedovisning").then((m) => ({ default: m.AiForRedovisning }))
);
const AiForEhandel = lazy(() =>
  import("./pages/AiForEhandel").then((m) => ({ default: m.AiForEhandel }))
);
const AiForSjukvard = lazy(() =>
  import("./pages/AiForSjukvard").then((m) => ({ default: m.AiForSjukvard }))
);
const AiForSkola = lazy(() =>
  import("./pages/AiForSkola").then((m) => ({ default: m.AiForSkola }))
);
const GrokPris = lazy(() =>
  import("./pages/GrokPris").then((m) => ({ default: m.GrokPris }))
);
const AiVideoPris = lazy(() =>
  import("./pages/AiVideoPris").then((m) => ({ default: m.AiVideoPris }))
);
const MistralPris = lazy(() =>
  import("./pages/MistralPris").then((m) => ({ default: m.MistralPris }))
);
const Nyheter = lazy(() =>
  import("./pages/Nyheter").then((m) => ({ default: m.Nyheter }))
);
const NyheterArtikel = lazy(() =>
  import("./pages/NyheterArtikel").then((m) => ({ default: m.NyheterArtikel }))
);

// On every route change: reset scroll to top and move keyboard/screen-reader
// focus into the main content region. Without this an SPA leaves focus on the
// (now-unmounted) link and keeps the previous scroll position.
function RouteChangeEffect({ mainRef }: { mainRef: React.RefObject<HTMLDivElement | null> }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus();
  }, [pathname, mainRef]);
  return null;
}

function RouteFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4" role="status" aria-live="polite">
      <div className="w-8 h-8 border-2 border-brand-700 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500">Laddar…</p>
    </div>
  );
}

function Shell() {
  const location = useLocation();
  const isEmbed = location.pathname === "/embed";
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-white">
      <RouteChangeEffect mainRef={mainRef} />
      {!isEmbed && (
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:bg-brand-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        >
          Hoppa till innehåll
        </a>
      )}
      {!isEmbed && <Header />}
      <div id="main" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<RouteFallback />}>
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
            <Route path="/embed" element={<EmbedCalculator />} />
            <Route path="/press" element={<Press />} />
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
            <Route path="/embed-info" element={<EmbedPage />} />
            <Route path="/ai-for-advokatbyra" element={<AiForAdvokatbyra />} />
            <Route path="/ai-for-redovisning" element={<AiForRedovisning />} />
            <Route path="/ai-for-ehandel" element={<AiForEhandel />} />
            <Route path="/ai-for-sjukvard" element={<AiForSjukvard />} />
            <Route path="/ai-for-skola" element={<AiForSkola />} />
            <Route path="/grok-pris" element={<GrokPris />} />
            <Route path="/ai-video-pris" element={<AiVideoPris />} />
            <Route path="/mistral-pris" element={<MistralPris />} />
            <Route path="/nyheter" element={<Nyheter />} />
            <Route path="/nyheter/:date" element={<NyheterArtikel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      {!isEmbed && <Footer />}
      {!isEmbed && <StickyEmailBar />}
      {!isEmbed && <CookieBanner />}
    </div>
  );
}

function App() {
  return (
    <SEOProvider>
      <BrowserRouter>
        <Shell />
        <Analytics />
      </BrowserRouter>
    </SEOProvider>
  );
}

export default App;
