import React from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  const navbarLinks = [
    { text: "Home", link: "#home" },
    { text: "Browse Pets", link: "#browse" },
    { text: "Blog", link: "#blog" },
    { text: "Donate", link: "#donate" },
    { text: "Resources", link: "#resources" },
  ];

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1e202c]/95 backdrop-blur-lg shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            onClick={() => handleNavigate("/")}
            className="text-3xl font-bold bg-linear-to-r from-white to-[#bfc0d1] bg-clip-text text-transparent cursor-pointer"
          >
            Pamels
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navbarLinks.map((item) => (
              <button
                key={item.link}
                onClick={() => handleNavigate(item.link)}
                className="hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {item.text}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleNavigate("/login")}
              className="px-6 py-2 border-2 border-white/40 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigate("/signup")}
              className="px-6 py-2 bg-white text-slate-900 rounded-full hover:shadow-lg hover:shadow-white/30 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden text-[#bfc0d1]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navbarLinks.map((item) => (
              <button
                key={item.link}
                onClick={() => handleNavigate(item.link)}
                className="block text-left hover:text-white transition-colors duration-300"
              >
                {item.text}
              </button>
            ))}

            <div className="flex flex-col space-y-3 pt-4">
              <button
                onClick={() => handleNavigate("/login")}
                className="px-6 py-2 border-2 border-white/40 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigate("/signup")}
                className="px-6 py-2 bg-white text-slate-900 rounded-full hover:shadow-lg transition-all duration-300"
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
