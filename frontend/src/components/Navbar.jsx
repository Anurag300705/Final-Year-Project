import { Link, NavLink, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const handleAssessmentClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("assessment");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#080D1A]/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
            <Brain size={23} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">
              Signal<span className="text-teal-400">.</span>
            </h1>
            <p className="text-[10px] tracking-widest text-slate-400">
              DIGITAL WELLNESS
            </p>
          </div>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-5 sm:gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm transition ${
                isActive
                  ? "font-semibold text-teal-300"
                  : "text-slate-300 hover:text-teal-300"
              }`
            }
          >
            Home
          </NavLink>

          <Link
            to="/#assessment"
            onClick={handleAssessmentClick}
            className="text-sm text-slate-300 transition hover:text-teal-300"
          >
            Assessment
          </Link>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm transition ${
                isActive
                  ? "font-semibold text-teal-300"
                  : "text-slate-300 hover:text-teal-300"
              }`
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
