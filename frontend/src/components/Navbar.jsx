
import { Link, NavLink } from "react-router-dom";
import { Activity, Brain } from "lucide-react";

export default function Navbar() {
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
        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
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

          <a
            href="/#assessment"
            className="text-sm text-slate-300 transition hover:text-teal-300"
          >
            Assessment
          </a>

          <a
            href="/#about"
            className="text-sm text-slate-300 transition hover:text-teal-300"
          >
            About
          </a>
        </div>

        {/* CTA */}
        <a
          href="/#assessment"
          className="flex items-center gap-2 rounded-xl bg-teal-400 px-4 py-2.5 text-sm font-semibold text-[#080D1A] transition hover:bg-teal-300"
        >
          <Activity size={17} />
          <span className="hidden sm:inline">Check Wellness</span>
          <span className="sm:hidden">Start</span>
        </a>
      </div>
    </nav>
  );
}
