import React, { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const Navbar = ({
  isScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  currentSlideIndex = 0,
}) => {
  const navbarLinks = [
    { text: "Home", link: "#home" },
    { text: "Browse Pets", link: "#browse" },
    { text: "Blog", link: "#blog" },
    { text: "Donate", link: "#donate" },
    { text: "Resources", link: "#resources" },
  ];

  // Color themes matching your hero slides
  const colorThemes = [
    { accent: "#ffb07c", glow: "rgba(255, 176, 124, 0.3)" }, // Dog - Orange
    { accent: "#a067ff", glow: "rgba(160, 103, 255, 0.3)" }, // Cat - Purple
    { accent: "#89d6ff", glow: "rgba(137, 214, 255, 0.3)" }, // Otter - Blue
    { accent: "#ff86a0", glow: "rgba(255, 134, 160, 0.3)" }, // Panda - Pink
    { accent: "#7cffb2", glow: "rgba(124, 255, 178, 0.3)" }, // Rabbit - Green
  ];

  const currentTheme = colorThemes[currentSlideIndex % colorThemes.length];
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleNavigate = (path) => {
    setMobileMenuOpen(false);
    console.log("Navigate to:", path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl shadow-2xl border-b border-white/5"
          : "bg-transparent"
      }`}
      style={{
        boxShadow: isScrolled
          ? `0 10px 40px ${currentTheme.glow}, 0 0 100px rgba(0,0,0,0.5)`
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div
              className="relative p-2 rounded-xl transition-all duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.accent}20, ${currentTheme.accent}40)`,
                boxShadow: `0 0 20px ${currentTheme.glow}`,
              }}
            >
              <Sparkles
                size={24}
                className="transition-all duration-300"
                style={{ color: currentTheme.accent }}
              />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                style={{ background: currentTheme.accent }}
              />
            </div>
            <span
              className="text-2xl sm:text-3xl font-bold tracking-tight transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.accent}, white)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 20px " + currentTheme.glow + ")",
              }}
            >
              WhisperTails
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navbarLinks.map((item, index) => (
              <button
                key={item.link}
                onClick={() => handleNavigate(item.link)}
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-2 text-[#bfc0d1] hover:text-white transition-all duration-300 font-medium"
              >
                <span className="relative z-10">{item.text}</span>
                {hoveredLink === index && (
                  <div
                    className="absolute inset-0 rounded-lg transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.accent}15, ${currentTheme.accent}25)`,
                      boxShadow: `0 0 20px ${currentTheme.glow}`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavigate("/login")}
              className="relative px-6 py-2.5 rounded-full font-medium text-white transition-all duration-300 overflow-hidden group"
              style={{
                border: `2px solid ${currentTheme.accent}40`,
              }}
            >
              <span className="relative z-10">Login</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.accent}20, ${currentTheme.accent}30)`,
                }}
              />
            </button>
            <button
              onClick={() => handleNavigate("/signup")}
              className="relative px-6 py-2.5 rounded-full font-medium text-slate-900 transition-all duration-300 overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.accent}, white)`,
                boxShadow: `0 4px 20px ${currentTheme.glow}`,
              }}
            >
              <span className="relative z-10 font-semibold">Sign Up</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#bfc0d1] hover:text-white transition-colors duration-300 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: mobileMenuOpen
                ? `linear-gradient(135deg, ${currentTheme.accent}20, ${currentTheme.accent}30)`
                : "transparent",
            }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden mt-4 pb-4 space-y-2 rounded-2xl p-4 animate-in slide-in-from-top duration-300"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.accent}10, rgba(30, 32, 44, 0.95))`,
              backdropFilter: "blur(20px)",
              border: `1px solid ${currentTheme.accent}20`,
              boxShadow: `0 10px 40px ${currentTheme.glow}`,
            }}
          >
            {navbarLinks.map((item) => (
              <button
                key={item.link}
                onClick={() => handleNavigate(item.link)}
                className="block w-full text-left px-4 py-3 text-[#bfc0d1] hover:text-white transition-all duration-300 rounded-lg font-medium"
                style={{
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${currentTheme.accent}15, ${currentTheme.accent}25)`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${currentTheme.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {item.text}
              </button>
            ))}
            <div
              className="flex flex-col gap-3 pt-4 border-t"
              style={{ borderColor: `${currentTheme.accent}20` }}
            >
              <button
                onClick={() => handleNavigate("/login")}
                className="px-6 py-3 rounded-full font-medium text-white transition-all duration-300"
                style={{
                  border: `2px solid ${currentTheme.accent}40`,
                  background: `linear-gradient(135deg, ${currentTheme.accent}10, transparent)`,
                }}
              >
                Login
              </button>
              <button
                onClick={() => handleNavigate("/signup")}
                className="px-6 py-3 rounded-full font-semibold text-slate-900 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.accent}, white)`,
                  boxShadow: `0 4px 20px ${currentTheme.glow}`,
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
