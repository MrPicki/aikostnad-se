import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SEOProvider } from "./components/SEO";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { DotBackground } from "./components/DotBackground";
import { Home } from "./pages/Home";
import { TokenCalculatorPage } from "./pages/TokenCalculatorPage";
import { Privacy } from "./pages/Privacy";

function App() {
  return (
    <SEOProvider>
      <BrowserRouter>
        <DotBackground />
        <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden" style={{ zIndex: 1 }}>
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/token-kalkylator" element={<TokenCalculatorPage />} />
              <Route path="/integritet" element={<Privacy />} />
            </Routes>
          </div>
          <Footer />
          <CookieBanner />
        </div>
        <Analytics />
      </BrowserRouter>
    </SEOProvider>
  );
}

export default App;
