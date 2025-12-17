import React, { useEffect, useRef, useState } from "react";
import { Menu, PawPrint, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* -------------------- config -------------------- */

const NAV_LINKS = [
  { text: "Home", link: "#home" },
  { text: "Browse Pets", link: "#browse" },
  { text: "Blog", link: "#blog" },
  { text: "Donate", link: "#donate" },
  { text: "Resources", link: "#resources" },
];

const THEMES = [
  {
    accent: "#ffb07c",
    glow: "rgba(255, 176, 124, 0.3)",
    gradient: "linear-gradient(135deg, #ffd3b0, #ff9c63)",
  },
  {
    accent: "#a067ff",
    glow: "rgba(160, 103, 255, 0.3)",
    gradient: "linear-gradient(135deg, #c7a6ff, #a978ff)",
  },
  {
    accent: "#89d6ff",
    glow: "rgba(137, 214, 255, 0.3)",
    gradient: "linear-gradient(135deg, #bfe9ff, #7cc9f0)",
  },
  {
    accent: "#ff86a0",
    glow: "rgba(255, 134, 160, 0.3)",
    gradient: "linear-gradient(135deg, #ffc0cb, #ff7b96)",
  },
  {
    accent: "#7cffb2",
    glow: "rgba(124, 255, 178, 0.3)",
    gradient: "linear-gradient(135deg, #b8ffd8, #6dffb0)",
  },
];

/* -------------------- component -------------------- */

const Navbar = ({
  isScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  currentSlideIndex = 0,
}) => {
  const navigate = useNavigate();

  const [lockedTheme, setLockedTheme] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navbarRef = useRef(null);

  /* -------------------- effects -------------------- */

  useEffect(() => {
    if (!lockedTheme) {
      setCurrentTheme(THEMES[currentSlideIndex % THEMES.length]);
    }
  }, [currentSlideIndex, lockedTheme]);

  useEffect(() => {
    if (isScrolled && !lockedTheme) {
      setLockedTheme(currentTheme);
    }
    if (!isScrolled && lockedTheme) {
      setLockedTheme(null);
    }
  }, [isScrolled, lockedTheme, currentTheme]);

  const theme = lockedTheme || currentTheme;

  /* -------------------- handlers -------------------- */

  const goTo = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  /* -------------------- render -------------------- */

  return (
    <nav
      ref={navbarRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        isScrolled ? "py-3 sm:py-4" : "py-4 sm:py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-700 ${
          isScrolled
            ? "bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
        style={{
          borderRadius: isScrolled ? 9999 : 0,
          boxShadow: isScrolled
            ? `0 10px 60px ${theme.glow}, 0 0 100px rgba(0,0,0,0.8)`
            : "none",
        }}
      >
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div
            onClick={() => goTo("/")}
            className="flex cursor-pointer items-center gap-3"
          >
            <div className="flex items-center gap-1.5">
              {[0, 1].map((i) => (
                <PawPrint
                  key={i}
                  size={22}
                  className={`animate-paw-${i + 1}`}
                  style={{
                    backgroundImage: theme.gradient,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 12px ${theme.glow})`,
                  }}
                />
              ))}
            </div>

            <span
              className="text-3xl sm:text-4xl font-black tracking-tight"
              style={{
                fontFamily: "'Nunito', 'Fredoka', sans-serif",
                backgroundImage: theme.gradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: `drop-shadow(0 0 20px ${theme.glow})`,
              }}
            >
              WT
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAV_LINKS.map((item, index) => (
              <button
                key={item.link}
                onClick={() => goTo(item.link)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-5 py-2.5 text-white/70 hover:text-white transition"
              >
                <span className="relative z-10">{item.text}</span>

                <div
                  className={`absolute inset-0 rounded-lg transition ${
                    hoveredIndex === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.04))",
                    backdropFilter: "blur(8px)",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => goTo("/login")}
              className="rounded-full px-6 py-2.5 font-semibold text-white transition"
              style={{ border: `2px solid ${theme.accent}50` }}
            >
              Login
            </button>

            <button
              onClick={() => goTo("/signup")}
              className="rounded-full px-6 py-2.5 font-bold"
              style={{
                background: theme.gradient,
                boxShadow: `0 4px 24px ${theme.glow}`,
                color: "#0f1419",
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-xl p-2.5 text-white/80"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="mt-3 space-y-2 rounded-3xl p-4 lg:hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}15, rgba(15,20,25,.98))`,
              border: `1px solid ${theme.accent}30`,
            }}
          >
            {NAV_LINKS.map((item) => (
              <button
                key={item.link}
                onClick={() => goTo(item.link)}
                className="block w-full rounded-xl px-4 py-3 text-left text-white/80 hover:text-white transition"
              >
                {item.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* animations */}
      <style>{`
        @keyframes paw-print {
          0%,100% { opacity:.7; transform:scale(.95) }
          50% { opacity:1; transform:scale(1.05) }
        }
        .animate-paw-1 { animation:paw-print 2s ease-in-out infinite }
        .animate-paw-2 { animation:paw-print 2s ease-in-out infinite .3s }
      `}</style>
    </nav>
  );
};

export default Navbar;
