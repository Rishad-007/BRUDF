import React, { useState, useEffect } from "react";

const FloatingRegistrationButton = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the floating button after the user has scrolled a bit
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 group bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-bounce"
      title="View Registration Information"
    >
      <div className="relative">
        <svg
          className="w-6 h-6"
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

        {/* Notification dot */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full"></div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          New Member Registration Open!
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </button>
  );
};

export default FloatingRegistrationButton;
