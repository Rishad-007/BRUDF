import React, { useState, useEffect } from "react";

const executiveMembers = [
  {
    name: "Md. Rishad Nur",
    designation: "President",
    session: "2024-25",
    photo: "/Rishad Nur (1).jpg",
    email: "rishad.nur007@gmail.com",
    quote: "Leading with passion, debating with purpose",
    isTopExecutive: true,
  },
  {
    name: "Imratul Jannat Usha",
    designation: "General Secretary",
    session: "2024-25",
    photo: "/public/usa.jpeg",
    email: "secretary@brudf.edu",
    quote: "Organizing excellence, fostering growth",
    isTopExecutive: true,
  },
  {
    name: "MD. Robayed Hasan",
    designation: "Vice President",
    session: "2024-25",
    photo: "/public/robayed.jpg",
    email: "vp@brudf.edu",
    quote: "Supporting vision, enabling success",
    isTopExecutive: true,
  },
  {
    name: "Md. Masudur Rahaman",
    designation: "Vice President",
    session: "2024-25",
    photo: "/public/masud.jpg",
    email: "treasurer@brudf.edu",
    quote: "Managing resources, building futures",
    isTopExecutive: true,
  },
  {
    name: "Galiba Ibnat",
    designation: "Joint General secretary ",
    session: "2024-25",
    photo: "/public/galiba.jpg",
    email: "joint.secretary@brudf.edu",
    quote: "Coordinating efforts, achieving goals",
    isTopExecutive: false,
  },
  {
    name: "Abul Khayer jayed",
    designation: "Organizing secretary ",
    session: "2024-25",
    photo: "/public/galiba.jpg",
    email: "joint.secretary@brudf.edu",
    quote: "Coordinating efforts, achieving goals",
    isTopExecutive: false,
  },
  {
    name: "Hasan Ali",
    designation: "Public Relations Officer",
    session: "2024-25",
    photo: "/public/hasan.jpg",
    email: "pro@brudf.edu",
    quote: "Connecting communities, spreading awareness",
    isTopExecutive: false,
  },
  // Additional members for demonstration
  {
    name: "Maheda Taiyeba ",
    designation: "Office Secretary",
    session: "2024-25",
    photo: "/public/maheda.jpg",
    email: "organizing@brudf.edu",
    quote: "Bringing events to life with precision",
    isTopExecutive: false,
  },
  {
    name: "Khadimul Sarder",
    designation: "IT Secretary",
    session: "2024-25",
    photo: "/public/khadim.jpg",
    email: "publication@brudf.edu",
    quote: "Crafting stories, sharing achievements",
    isTopExecutive: false,
  },
  {
    name: "Pritam Dev Nath",
    designation: "Publicity Secretary",
    session: "2024-25",
    photo: "/public/pritom.jpg",
    email: "training@brudf.edu",
    quote: "Developing skills, nurturing talent",
    isTopExecutive: false,
  },
  {
    name: "Md.Al amin Sayem",
    designation: "Campus affair secretary",
    session: "2024-25",
    photo: "/public/sayem.jpg",
    email: "events@brudf.edu",
    quote: "Creating memorable experiences",
    isTopExecutive: false,
  },
  {
    name: "MD Mustansir Muyaj ",
    designation: "Human Welfare Secretary",
    session: "2024-25",
    photo: "/public/muaj.jpg",
    email: "media@brudf.edu",
    quote: "Broadcasting excellence to the world",
    isTopExecutive: false,
  },
  {
    name: "Mst.Sadia Tahsin",
    designation: "Treasure",
    session: "2024-25",
    photo: "/public/sadia.jpg",
    email: "research@brudf.edu",
    quote: "Exploring ideas, discovering solutions",
    isTopExecutive: false,
  },
  {
    name: "Ismail Hossen",
    designation: "Assistant IT Secretary",
    session: "2024-25",
    photo: "/public/ismail.jpg",
    email: "workshop@brudf.edu",
    quote: "Sharing knowledge, building confidence",
    isTopExecutive: false,
  },
  {
    name: "Most Morium Akhter",
    designation: "Cultural secretary",
    session: "2024-25",
    photo: "/public/morium.jpg",
    email: "social@brudf.edu",
    quote: "Connecting digitally, engaging globally",
    isTopExecutive: false,
  },
  {
    name: "Jarin Tasnim Suchi",
    designation: "Assistant IT Secretary",
    session: "2024-25",
    photo: "/public/suchi.jpg",
    email: "tech@brudf.edu",
    quote: "Innovating solutions for modern debates",
    isTopExecutive: false,
  },
  {
    name: "MD.Juwel Haque",
    designation: "Debate Research Secretary ",
    session: "2024-25",
    photo: "/public/juwel.jpg",
    email: "alumni@brudf.edu",
    quote: "Bridging generations of debaters",
    isTopExecutive: false,
  },
  {
    name: "Asif Mahmud",
    designation: "Campus affiars secretary",
    session: "2024-25",
    photo: "/public/asif.jpg",
    email: "finance@brudf.edu",
    quote: "Supporting financial transparency",
    isTopExecutive: false,
  },
  {
    name: "Shamima Akter",
    designation: "Women Affairs Secretary",
    session: "2024-25",
    photo: "/public/shimu.jpg",
    email: "protocol@brudf.edu",
    quote: "Ensuring smooth operations",
    isTopExecutive: false,
  },
  {
    name: "Md. Rihan Khan Sumon ",
    designation: "Assistant Debate Research Secretary",
    session: "2024-25",
    photo: "/public/rihan.jpg",
    email: "documentation@brudf.edu",
    quote: "Preserving memories, recording history",
    isTopExecutive: false,
  },
  {
    name: "Sree Vopen Chandro Paul",
    designation: "Assistant Publicity Secretary",
    session: "2024-25",
    photo: "/public/vopen.jpg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "Md. Mahfuzur Rahman Siam",
    designation: "Cultural Secretary",
    session: "2024-25",
    photo: "/public/siam.jpg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "Kayeem Uddin",
    designation: "Assistant Publicity Secretary",
    session: "2024-25",
    photo: "/public/kayem.jpeg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "Minnatul  Khatun",
    designation: "Women Affairs Secretary ",
    session: "2024-25",
    photo: "/public/minnatul.jpeg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "Shuva karmokar",
    designation: "Assistant Debate Research Secretary",
    session: "2024-25",
    photo: "/public/karmokar.jpg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "Md. Ahsan Habib Rocky",
    designation: "Members of English Wing ",
    session: "2024-25",
    photo: "/public/Ahsan.jpg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "Md. Shakib Hossen",
    designation: "Assistant workshop and reading circle secretary",
    session: "2024-25",
    photo: "/public/shakib.jpg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "Mst. Tamanna Khatun",
    designation: "Assistant IT secretary",
    session: "2024-25",
    photo: "/public/tamanna.jpg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "Akash Chandra",
    designation: "Assistant workshop and reading circle secretary ",
    session: "2024-25",
    photo: "/public/akash.jpg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "Ahona Talukder",
    designation: "Assistant Tressurer",
    session: "2024-25",
    photo: "/public/ahona.jpg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "Tamim Iqbal",
    designation: "Assistant Publicity Secretary",
    session: "2024-25",
    photo: "/public/tamim.jpg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "Shifanur Rahman",
    designation: "Assistant Publicity secretary",
    session: "2024-25",
    photo: "/public/shifan.jpg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
  {
    name: "MD. Jonaid Hossain",
    designation: "Assistant Publicity Secretary",
    session: "2024-25",
    photo: "/public/jonaid.jpg",
    email: "outreach@brudf.edu",
    quote: "Expanding our community reach",
    isTopExecutive: false,
  },
];

const ExecutiveMembersSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const topExecutives = executiveMembers.filter(
    (member) => member.isTopExecutive
  );
  const otherMembers = executiveMembers.filter(
    (member) => !member.isTopExecutive
  );

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalSlides = Math.ceil(otherMembers.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Executive Members
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Meet our dedicated leadership team driving BRUDF towards excellence
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Top executives */}
        <div className="mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-8 lg:mb-12">
            Leadership
          </h3>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {topExecutives.map((member, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl p-6 lg:p-8 transform hover:-translate-y-3 transition-all duration-500 border border-orange-100"
              >
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 text-center">
                  {/* Photo with enhanced styling */}
                  <div className="relative mb-4 lg:mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-blue-500 rounded-full blur-2xl opacity-20 scale-110"></div>
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover mx-auto border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs lg:text-sm font-bold">
                        ★
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {member.name}
                  </h3>

                  <div className="inline-block px-3 lg:px-4 py-1 lg:py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full text-xs lg:text-sm mb-3 lg:mb-4">
                    {member.designation}
                  </div>

                  <div className="space-y-1 lg:space-y-2 text-xs lg:text-sm text-gray-500">
                    <p>Session: {member.session}</p>
                    <p className="break-all">{member.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other executive members carousel */}
        <div className="relative">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-8 lg:mb-12">
            Executive Committee
          </h3>
          <div className="relative max-w-6xl mx-auto">
            {/* Previous button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 -translate-x-4"
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 translate-x-4"
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Carousel content */}
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div
                      className={`grid gap-6 lg:gap-8 px-4 ${
                        itemsPerPage === 1
                          ? "grid-cols-1"
                          : itemsPerPage === 2
                          ? "grid-cols-2"
                          : "grid-cols-3"
                      }`}
                    >
                      {otherMembers
                        .slice(
                          slideIndex * itemsPerPage,
                          (slideIndex + 1) * itemsPerPage
                        )
                        .map((member, idx) => (
                          <div
                            key={idx}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-4 lg:p-6 text-center border border-orange-100 transform hover:-translate-y-2 transition-all duration-300"
                          >
                            <div className="relative mb-3 lg:mb-4">
                              <img
                                src={member.photo}
                                alt={member.name}
                                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover mx-auto border-3 border-slate-200 group-hover:border-slate-400 transition-colors duration-300"
                              />
                            </div>

                            <h4 className="text-base lg:text-lg font-bold text-gray-800 mb-2 group-hover:text-slate-600 transition-colors duration-300">
                              {member.name}
                            </h4>

                            <div className="inline-block px-2 lg:px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full text-xs lg:text-sm">
                              {member.designation}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index
                      ? "bg-gradient-to-r from-orange-500 to-red-600 scale-110"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveMembersSection;
