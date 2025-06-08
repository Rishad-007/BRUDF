import React, { useState, useEffect } from "react";

const Navbar = ({ onJoinClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Update active section based on scroll position
      const sections = [
        "home",
        "executive",
        "moderators",
        "notice-board",
        "gallery",
        "videos",
        "events",
        "certificate-validation",
        "contact",
      ];
      const sectionElements = sections.map((id) => document.getElementById(id));

      const currentSection = sectionElements.find((element) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home", icon: "🏠" },
    { name: "Executive", href: "#executive", id: "executive", icon: "👥" },
    { name: "Moderators", href: "#moderators", id: "moderators", icon: "🎯" },
    {
      name: "Notice Board",
      href: "#notice-board",
      id: "notice-board",
      icon: "📋",
    },
    { name: "Gallery", href: "#gallery", id: "gallery", icon: "📸" },
    { name: "Videos", href: "#videos", id: "videos", icon: "🎥" },
    { name: "Events", href: "#events", id: "events", icon: "🎪" },
    {
      name: "Certificate",
      href: "#certificate-validation",
      id: "certificate-validation",
      icon: "🏆",
    },
    { name: "Contact", href: "#contact", id: "contact", icon: "📧" },
  ];

  const handleNavClick = (href) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200"
          : "bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-700/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <img
                src="/logo brudf.png"
                alt="BRUDF"
                className={`h-12 w-auto rounded-xl transition-all duration-300 ${
                  isScrolled
                    ? "shadow-lg group-hover:shadow-xl"
                    : "shadow-2xl group-hover:shadow-3xl"
                } group-hover:scale-110 transform`}
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            </div>
            <div className="hidden md:block">
              <h1
                className={`text-xl font-bold ${
                  isScrolled ? "text-gray-800" : "text-white drop-shadow-lg"
                } transition-colors duration-300`}
              >
                BRUDF
              </h1>
              <p
                className={`text-sm ${
                  isScrolled ? "text-gray-600" : "text-white/90"
                } transition-colors duration-300`}
              >
                যুক্তি সততা মুক্তি
              </p>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-0.5">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`group relative px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
                  activeSection === link.id
                    ? isScrolled
                      ? "text-amber-600 bg-amber-50"
                      : "text-yellow-300 bg-white/20"
                    : isScrolled
                    ? "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                    : "text-white hover:text-yellow-300 hover:bg-white/10"
                }`}
              >
                <span className="flex items-center space-x-1.5">
                  <span className="text-xs">{link.icon}</span>
                  <span>{link.name}</span>
                </span>
                {activeSection === link.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                )}
              </a>
            ))}
          </div>

          {/* Enhanced CTA Button - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onJoinClick}
              className="group relative px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Join BRUDF</span>
              </span>
            </button>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`group p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                isScrolled
                  ? "text-gray-700 hover:bg-amber-50 bg-white shadow-lg"
                  : "text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm"
              }`}
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation with Fixed Positioning */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 top-20 z-40 bg-black/50 backdrop-blur-sm">
            {/* Mobile Menu Panel - 70% width from right side */}
            <div
              className="absolute right-0 top-0 bg-white shadow-2xl w-[70%] flex flex-col"
              style={{ height: "85vh", minHeight: "600px" }}
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <img
                    src="/logo brudf.png"
                    alt="BRUDF"
                    className="h-8 w-auto rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">BRUDF</h3>
                    <p className="text-xs text-gray-600">যুক্তি সততা মুক্তি</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Scrollable Navigation Content - Simplified */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Navigation Links */}
                <div className="space-y-2 mb-6">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`flex items-center space-x-4 px-4 py-3 rounded-xl font-medium transition-colors ${
                        activeSection === link.id
                          ? "text-amber-700 bg-amber-50 border-l-4 border-amber-500"
                          : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                      }`}
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span className="font-semibold">{link.name}</span>
                    </a>
                  ))}
                </div>

                {/* Mobile CTA Section */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      onJoinClick();
                      setIsOpen(false);
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Join BRUDF Today</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
