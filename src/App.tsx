import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SEOProvider } from "./components/SEO";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";

const TokenCalculatorPage = lazy(() =>
  import("./pages/TokenCalculatorPage").then((m) => ({ default: m.TokenCalculatorPage }))
);
const Privacy = lazy(() =>
  import("./pages/Privacy").then((m) => ({ default: m.Privacy }))
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

function App() {
  return (
    <SEOProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-white">
          <Header />
          <div className="flex-1">
            <Suspense fallback={<div className="flex-1 min-h-[60vh]" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/token-kalkylator" element={<TokenCalculatorPage />} />
                <Route path="/integritet" element={<Privacy />} />
                <Route path="/vad-kostar-chatgpt" element={<VadKostarChatGPT />} />
                <Route path="/claude-pris" element={<ClaudePris />} />
                <Route path="/gpt-4-pris" element={<Gpt4Pris />} />
                <Route path="/vad-kostar-ai" element={<VadKostarAi />} />
                <Route path="/billigaste-ai" element={<BilligasteAi />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
        <Analytics />
      </BrowserRouter>
    </SEOProvider>
  );
}

export default App;
