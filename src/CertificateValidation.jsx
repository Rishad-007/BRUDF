import React, { useState } from "react";

const CertificateValidation = () => {
  const [certificateCode, setCertificateCode] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = async (e) => {
    e.preventDefault();

    if (!certificateCode.trim()) {
      setValidationResult({
        success: false,
        message: "Please enter a certificate code",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/validate-certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ certificateCode: certificateCode.trim() }),
      });

      const data = await response.json();
      setValidationResult(data);
    } catch (error) {
      console.error("Error validating certificate:", error);
      setValidationResult({
        success: false,
        message: "Failed to validate certificate. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCertificateCode("");
    setValidationResult(null);
  };

  return (
    <section
      id="certificate-validation"
      className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Certificate Validation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Verify the authenticity of your BRUDF certificates by entering your
            unique certificate code below.
          </p>
        </div>

        {/* Validation Form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-8 sm:p-12">
            <form onSubmit={handleValidation} className="space-y-6">
              <div>
                <label
                  htmlFor="certificateCode"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Certificate Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="certificateCode"
                    value={certificateCode}
                    onChange={(e) => setCertificateCode(e.target.value)}
                    placeholder="Enter your certificate code (e.g., BRUDF2024001)"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                    disabled={isLoading}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0a2 2 0 00-2 2m2-2a2 2 0 012 2m0 0V9a2 2 0 012-2m-2 2H7a2 2 0 01-2-2"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Validating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Validate Certificate</span>
                    </div>
                  )}
                </button>

                {validationResult && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 focus:ring-4 focus:ring-gray-500/20 transition-all duration-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>

            {/* Validation Result */}
            {validationResult && (
              <div className="mt-8 p-6 rounded-2xl border-2 animate-fadeIn">
                {validationResult.success && validationResult.valid ? (
                  <div className="border-green-200 bg-green-50">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-green-800">
                          ✅ Certificate Verified!
                        </h3>
                        <p className="text-green-700 mt-1">
                          {validationResult.message}
                        </p>
                        <p className="text-sm text-green-600 mt-2">
                          Certificate Code:{" "}
                          <span className="font-mono font-bold">
                            {certificateCode}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-red-200 bg-red-50">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-8 h-8 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-red-800">
                          ❌ Certificate Not Found
                        </h3>
                        <p className="text-red-700 mt-1">
                          {validationResult.message}
                        </p>
                        <p className="text-sm text-red-600 mt-2">
                          Please double-check your certificate code and try
                          again.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-gray-50 px-8 py-6 sm:px-12">
            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  How to find your certificate code:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Look for a unique code printed on your certificate</li>
                  <li>
                    • The code usually starts with "BRUDF" or "CERT" followed by
                    numbers
                  </li>
                  <li>
                    • If you can't find your code, contact us at admin@brudf.org
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateValidation;
