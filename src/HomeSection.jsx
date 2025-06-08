import React, { useEffect } from "react";

const HomeSection = ({ onJoinClick }) => {
  // Add structured data for the homepage
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "BRUDF - Begum Rokeya University Debate Forum",
      description:
        "Join BRUDF for intellectual growth, critical thinking, and leadership development through debate and public speaking.",
      url: "https://brudf.org",
      mainEntity: {
        "@type": "Organization",
        name: "BRUDF",
        description: "Premier university debate forum in Bangladesh",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-100 overflow-hidden pt-16 lg:pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-4 lg:left-10 w-48 h-48 lg:w-72 lg:h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-4 lg:right-10 w-48 h-48 lg:w-72 lg:h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-1/2 w-48 h-48 lg:w-72 lg:h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Logo with modern styling */}
        <div className="mb-6 lg:mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-2xl opacity-20 scale-110"></div>
          <img
            src="/logo brudf.png"
            alt="BRUDF Logo"
            className="relative mx-auto w-32 sm:w-40 md:w-48 lg:w-56 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Main heading with gradient text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4 lg:mb-6 leading-tight">
          Begum Rokeya University
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-1 lg:mt-2">
            Debate Forum
          </span>
          <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-indigo-500 mt-1 lg:mt-2">
            (BRUDF)
          </span>
        </h1>

        {/* Subtitle with better typography */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-light mb-6 lg:mb-8 leading-relaxed px-4">
          Fostering{" "}
          <span className="font-semibold text-orange-600">
            critical thinking
          </span>
          ,<span className="font-semibold text-red-600"> eloquence</span>, and
          <span className="font-semibold text-orange-600">
            {" "}
            leadership
          </span>{" "}
          through the art of debate
        </p>

        {/* About Section */}
        <div className="max-w-4xl mx-auto mb-8 lg:mb-10 px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-white/20">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-600 mb-4 lg:mb-6">
              About BRUDF
            </h2>

            <div className="text-sm sm:text-base lg:text-lg text-gray-700 space-y-4 text-left">
              <p className="leading-relaxed">
                <span className="font-semibold text-indigo-600">
                  Founded on August 25, 2016
                </span>
                , the Begum Rokeya University Debate Forum (BRUDF) has emerged
                as a vibrant space for intellectual exploration with{" "}
                <span className="font-semibold">41 members</span> including a
                Chief Moderator and four Moderators. And We are the{" "}
                <b>Only Central debate Club </b> of Begum Rokeya University,
                Rangpur.
              </p>

              <p className="leading-relaxed">
                We practice diverse debate formats including{" "}
                <span className="font-semibold text-purple-600">
                  Asian Parliamentary, British Parliamentary, Classic, and Panel
                  Debates
                </span>
                . Beyond refining rhetoric, BRUDF is committed to social
                initiatives, blending dialogue with positive impact.
              </p>

              <p className="leading-relaxed">
                With{" "}
                <span className="font-semibold text-teal-600">
                  sessions held twice a week
                </span>{" "}
                covering both Bangla and English debates, we foster linguistic
                and intellectual growth while extending coaching to school and
                college debaters.
              </p>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center px-4">
          <button
            onClick={onJoinClick}
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
          >
            <span className="relative z-10">Apply for Membership</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <a
            href="#events"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold text-indigo-600 bg-white border-2 border-indigo-300 rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-50 transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
          >
            Explore Events
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 lg:w-6 lg:h-10 border-2 border-indigo-400 rounded-full flex justify-center">
          <div className="w-1 h-2 lg:h-3 bg-indigo-400 rounded-full mt-1 lg:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
