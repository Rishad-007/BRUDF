import React, { useState, useEffect } from "react";

const BannerDebug = ({ isRegistrationBannerOpen, openRegistrationBanner }) => {
  const [debugInfo, setDebugInfo] = useState({});
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const updateDebugInfo = () => {
      setDebugInfo({
        hasVisited: localStorage.getItem("brudf-visited"),
        bannerDismissed: localStorage.getItem("brudf-banner-dismissed"),
        isRegistrationBannerOpen,
        timestamp: new Date().toLocaleTimeString(),
      });
    };

    updateDebugInfo();
    const interval = setInterval(updateDebugInfo, 1000);
    return () => clearInterval(interval);
  }, [isRegistrationBannerOpen]);

  if (!showDebug) {
    return (
      <div
        className="fixed top-4 left-4 z-[10000] bg-red-500 text-white px-3 py-1 rounded cursor-pointer text-sm"
        onClick={() => setShowDebug(true)}
      >
        Debug
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-4 z-[10000] bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Banner Debug</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div>
          <strong>Visited:</strong> {debugInfo.hasVisited || "null"}
        </div>
        <div>
          <strong>Dismissed:</strong> {debugInfo.bannerDismissed || "null"}
        </div>
        <div>
          <strong>Banner Open:</strong>{" "}
          {debugInfo.isRegistrationBannerOpen ? "Yes" : "No"}
        </div>
        <div>
          <strong>Time:</strong> {debugInfo.timestamp}
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <button
          onClick={openRegistrationBanner}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
        >
          Force Open Banner
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("brudf-visited");
            localStorage.removeItem("brudf-banner-dismissed");
            window.location.reload();
          }}
          className="block w-full bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2 rounded"
        >
          Reset & Reload
        </button>
      </div>
    </div>
  );
};

export default BannerDebug;
