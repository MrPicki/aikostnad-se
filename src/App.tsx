import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SEOProvider } from "./components/SEO";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CookieBanner } from "./components/CookieBanner";
import { Home } from "./pages/Home";
import { TokenCalculatorPage } from "./pages/TokenCalculatorPage";
import { Privacy } from "./pages/Privacy";

function App() {
  return (
    <SEOProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50 w-full overflow-x-hidden">
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
      </BrowserRouter>
    </SEOProvider>
  );
}

export default App;
