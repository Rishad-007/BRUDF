import React, { useState, useEffect } from "react";

const RegistrationBanner = ({ isOpen, onClose, onRegisterClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Show the banner with a slight delay for smooth animation
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("brudf-banner-dismissed", "true");
    }
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const handleRegister = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      onRegisterClick();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-2 sm:p-4 overflow-y-auto">
      <div
        className={`relative max-w-2xl w-full max-h-[95vh] my-auto transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 z-10 group"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Banner content */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with logo/image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800/20 to-transparent"></div>
            <div className="relative flex items-center justify-center p-4 sm:p-8 bg-white/10">
              <img
                src="/logo brudf.png"
                alt="BRUDF Logo"
                className="w-16 h-16 sm:w-24 sm:h-24 object-contain filter drop-shadow-lg"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="p-4 sm:p-8 text-white">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                🎓 Master the Art of Debate! 🎓
              </h2>
              <p className="text-blue-100 text-sm sm:text-lg leading-relaxed">
                Join the{" "}
                <span className="font-semibold text-yellow-300">
                  Begum Rokeya University Debate Forum (BRUDF)
                </span>{" "}
                and transform your communication skills through debate, public
                speaking, and creative thinking!
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 backdrop-blur-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-yellow-300">
                What You'll Master at BRUDF:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span>Advanced Debate Techniques</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span>Public Speaking Excellence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span>Leadership Training</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span>Creative & Critical Thinking</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-4 border-t border-white/20">
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed mb-3">
                  <span className="font-semibold text-yellow-300">
                    🏆 Practice Multiple Formats:
                  </span>
                  Asian Parliamentary, British Parliamentary, Classic & Panel
                  Debates
                </p>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                  <span className="font-semibold text-yellow-300">
                    📅 Weekly Sessions:
                  </span>
                  Twice a week covering both Bangla & English debates to enhance
                  your eloquence
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleRegister}
                className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-3 sm:mb-4 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">Register Now</span>
                </span>
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-3">
                <input
                  type="checkbox"
                  id="dontShowAgain"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 text-yellow-400 bg-white/20 border-white/30 rounded focus:ring-yellow-400 focus:ring-2"
                />
                <label
                  htmlFor="dontShowAgain"
                  className="text-blue-200 text-xs sm:text-sm cursor-pointer"
                >
                  Don't show this banner again
                </label>
              </div>

              <p className="text-blue-200 text-xs sm:text-sm">
                Join 41+ passionate debaters and unlock your potential in
                argumentation and leadership!
              </p>
            </div>
          </div>

          {/* Decorative elements - hidden on small screens */}
          <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="hidden sm:block absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationBanner;
