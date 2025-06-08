import React, { useState } from "react";

const videoContent = [
  {
    id: 1,
    title: "Final debate of RUDO Regionals 2024",
    type: "youtube",
    embedId: "Ybqdfcue6SM",
    thumbnail: "/gallery/RegionalRunnersUpaward.jpg",
    description:
      "Watch the thrilling final debate from RUDF Regionals 2024 championship BRUDF vs RUETDC",
    views: "12.3K",
    duration: "45:30",
    featured: true,
  },
  {
    id: 2,
    title: "Sneak Peak of BRUDF Intra 1.0 2024",
    type: "youtube",
    embedId: "x-lFfyzojcc",
    thumbnail: "/gallery/debatetournament.jpg",
    description:
      "Get an exclusive behind-the-scenes look at BRUDF Intra tournament",
    views: "8.7K",
    duration: "15:25",
    featured: true,
  },
  {
    id: 3,
    title: "History of BRUDF",
    type: "facebook",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/brudf.2016/videos/896408617551024/",
    videoId: "896408617551024",
    thumbnail: "/gallery/committee.jpg",
    description: "Discover the rich history and evolution of BRUDF debate club",
    views: "15.2K",
    duration: "22:10",
    featured: true,
  },
  {
    id: 4,
    title: "Philosophy Debate Session: How to do it",
    type: "facebook",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/brudf.2016/videos/335798434144752/",
    videoId: "335798434144752",
    thumbnail: "/gallery/session.jpeg",
    description: "Learn the art of philosophical debating with expert guidance",
    views: "9.8K",
    duration: "35:45",
  },
  {
    id: 5,
    title: "BRUDF IV 2.0 Final Debate",
    type: "facebook",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/brudf.2016/videos/947874683977444/",
    videoId: "947874683977444",
    thumbnail: "/gallery/eventday2.jpg",
    description:
      "Experience the vibrant moments and achievements of our debate community",
    views: "7.5K",
    duration: "18:30",
  },
  {
    id: 6,
    title: "BRUDF Inter College Debate Championship 2024 Result",
    type: "facebook",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/brudf.2016/videos/1043342973666028/",
    videoId: "1043342973666028",
    thumbnail: "/gallery/sessionweekly.jpg",
    description:
      "Join our comprehensive training sessions for debate excellence",
    views: "11.4K",
    duration: "28:15",
  },
];

const VideoSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredVideos =
    filter === "all"
      ? videoContent
      : filter === "featured"
      ? videoContent.filter((video) => video.featured)
      : videoContent.filter((video) => video.type === filter);

  const renderVideoEmbed = (video) => {
    if (video.type === "youtube") {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-2xl"
        ></iframe>
      );
    } else {
      return (
        <iframe
          src={video.embedUrl}
          title={video.title}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-2xl"
        ></iframe>
      );
    }
  };

  return (
    <section
      className="py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative overflow-hidden"
      id="videos"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-violet-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-gradient-to-br from-purple-200 to-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-6">
            Video Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dive into our collection of debate championships, training sessions,
            and community moments that showcase the excellence and spirit of
            BRUDF
          </p>
          <div className="flex items-center justify-center mt-8 space-x-4">
            <div className="w-24 h-1 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"></div>
          </div>
        </div>

        {/* Enhanced Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "featured", "youtube", "facebook"].map((filterType) => {
            const count =
              filterType === "all"
                ? videoContent.length
                : filterType === "featured"
                ? videoContent.filter((v) => v.featured).length
                : videoContent.filter((v) => v.type === filterType).length;

            return (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`group px-6 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 relative ${
                  filter === filterType
                    ? "bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600 text-white shadow-2xl"
                    : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 border border-violet-200 shadow-lg"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">
                    {filterType === "all"
                      ? "🎬"
                      : filterType === "featured"
                      ? "⭐"
                      : filterType === "youtube"
                      ? "📺"
                      : "📘"}
                  </span>
                  <span>
                    {filterType === "all"
                      ? "All Videos"
                      : filterType === "featured"
                      ? "Featured"
                      : filterType.charAt(0).toUpperCase() +
                        filterType.slice(1)}
                  </span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                      filter === filterType
                        ? "bg-white/20 text-white"
                        : "bg-violet-100 text-violet-700"
                    }`}
                  >
                    {count}
                  </span>
                </div>
                {filter === filterType && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Enhanced Video grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, idx) => (
            <div
              key={video.id}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-3xl overflow-hidden transform hover:-translate-y-3 hover:rotate-1 transition-all duration-700 border border-gray-100 relative"
              style={{
                animationDelay: `${idx * 100}ms`,
                animation: `fadeInUp 0.8s ease-out forwards`,
              }}
            >
              {/* Featured Badge */}
              {video.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>Featured</span>
                  </div>
                </div>
              )}

              {/* Video thumbnail/player */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {activeVideo === video.id ? (
                  renderVideoEmbed(video)
                ) : (
                  <>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = "/gallery/eventday2.jpg"; // Fallback image
                      }}
                    />

                    {/* Enhanced Play button overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <button
                        onClick={() => setActiveVideo(video.id)}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl group-hover:animate-pulse"
                      >
                        <svg
                          className="w-8 h-8 text-violet-600 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>

                    {/* Enhanced Video info overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-black/80 text-white text-sm rounded-full backdrop-blur-sm font-medium">
                          {video.duration}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-black/80 text-white text-xs rounded-full backdrop-blur-sm">
                            {video.views} views
                          </span>
                          <span
                            className={`px-3 py-1 text-white text-xs rounded-full font-medium ${
                              video.type === "youtube"
                                ? "bg-red-600"
                                : "bg-blue-600"
                            }`}
                          >
                            {video.type === "youtube" ? "YouTube" : "Facebook"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Video details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  {video.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {video.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {video.views} views
                    </span>
                  </div>

                  <button className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Watch Full Video
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Media Showcase */}
        <div className="mt-16 bg-gradient-to-r from-violet-100 via-purple-50 to-fuchsia-100 rounded-3xl p-8 border border-violet-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Featured Community Moments
              </h3>
              <p className="text-gray-600 mb-6">
                Discover the vibrant moments that define our debate community.
                From intense discussions to celebration victories, every moment
                tells our story.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                  <span className="text-gray-700">Championship Victories</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Workshop Sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                  <span className="text-gray-700">Community Building</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-500 rounded-2xl blur-xl opacity-30 scale-110"></div>
              <img
                src="/win.jpg"
                alt="BRUDF Community Moments"
                className="relative w-full h-64 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-lg font-semibold">Our Debate Champions</h4>
                <p className="text-sm opacity-90">
                  Celebrating excellence in debate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured video section */}
        <div className="mt-16 bg-gradient-to-r from-violet-50 to-purple-50 rounded-3xl p-8 border border-violet-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Subscribe to Our Channels
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Stay updated with our latest debates, workshops, and community
              events by subscribing to our YouTube channel and following our
              Facebook page.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.youtube.com/@BRUDF"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe on YouTube
              </a>

              <a
                href="https://www.facebook.com/brudf.2016"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Follow on Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
