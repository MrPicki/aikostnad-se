import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  const navLink = (to: string, label: string) => {
    const isActive = location.pathname === to || (to === "/" && location.pathname === "/");
    return (
      <Link
        to={to}
        className={`px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
          isActive
            ? "text-gray-900 border-b-2 border-indigo-700 pb-[2px]"
            : "text-gray-500 hover:text-gray-900"
        }`}
        style={{ transition: "color 150ms cubic-bezier(0.23,1,0.32,1)" }}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className="bg-white sticky top-0 z-50"
      style={{ boxShadow: "0 1px 0 0 rgba(0,0,0,0.07)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-lg tracking-tight">
              Aikostnad<span className="text-indigo-700">.se</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navLink("/", "Kalkylator")}
            {navLink("/token-kalkylator", "Tokenräknare")}
            {navLink("/nyheter", "Nyheter")}
          </nav>
        </div>
      </div>
    </header>
  );
}
