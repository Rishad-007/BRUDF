import React from "react";

const moderators = [
  {
    name: "Prof. Dr. Tuhin Wadud",
    designation: "Chief Moderator & Professor",
    department: "Department of Bangla, BRUR",
    experience: "15+ years in debate coaching",
    photo: "/mod1.jpg",
    achievements: [
      "National Environment Medel 2024",
      "National Judge Certificate",
    ],
    specialization: "Environmental activist & Public Speaking",
  },
  {
    name: "A. B. M. Nurullah",
    designation: "Moderator & Assistant Professor",
    department: "Department of Sociology, BRUR",
    experience: "12+ years in academic debate",
    photo: "/mod2.jpg",
    achievements: ["International Workshop Facilitator"],
    specialization: "Policy Debate & Argumentation",
  },
  {
    name: "Md Rakibul Islam Bhuiyan",
    designation: "Moderator & lecturer",
    department: "Management Information System",
    experience: "10+ years in critical thinking",
    photo: "/mod3.jpg",
    achievements: ["Excellence in Teaching Award", "Debate Methodology Expert"],
    specialization: "Logical Reasoning & Ethics",
  },
  {
    name: "Niaz Makhdum",
    designation: "Moderator & lecturer",
    department: "Department of Public Administration",
    experience: "8+ years in communication skills",
    photo: "/mod4.jpg",
    achievements: ["Media Literacy Expert", "Communication Skills Trainer"],
    specialization: "Media Debate & Communication",
  },
  {
    name: "Khayrul Islam Polash",
    designation: "Moderator & lecturer",
    department: "Department of bangla",
    experience: "10+ years in critical thinking",
    photo: "/mod5.jpg",
    achievements: ["Excellence in Teaching Award", "Debate Methodology Expert"],
    specialization: "Logical Reasoning & Ethics",
  },
];

const ModeratorsSection = () => (
  <section
    className="py-20 bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50"
    id="moderators"
  >
    <div className="max-w-7xl mx-auto px-6">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Our Honorable Moderators
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet the distinguished faculty members who guide and mentor our debate
          community with their wisdom and expertise
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Moderators grid */}
      <div className="grid md:grid-cols-2 gap-10">
        {moderators.map((moderator, idx) => (
          <div
            key={idx}
            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl p-8 transform hover:-translate-y-3 transition-all duration-500 border border-orange-100 overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400/20 to-emerald-500/20 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
              {/* Header section */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                {/* Photo */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-30 scale-110"></div>
                  <img
                    src={moderator.photo}
                    alt={moderator.name}
                    className="relative w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">★</span>
                  </div>
                </div>

                {/* Basic info */}
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {moderator.name}
                  </h3>

                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full text-sm mb-3">
                    {moderator.designation}
                  </div>

                  <p className="text-gray-600 font-medium">
                    {moderator.department}
                  </p>
                  <p className="text-orange-600 text-sm font-medium">
                    {moderator.experience}
                  </p>
                </div>
              </div>

              {/* Specialization */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Specialization
                </h4>
                <p className="text-gray-600 bg-orange-50 px-4 py-2 rounded-lg border-l-4 border-orange-400">
                  {moderator.specialization}
                </p>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Notable Achievements
                </h4>
                <div className="space-y-2">
                  {moderator.achievements.map((achievement, achievementIdx) => (
                    <div
                      key={achievementIdx}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact button */}
              <div className="pt-4 border-t border-gray-100">
                <button className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold group-hover:translate-x-2 transition-transform duration-300">
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
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact for Guidance
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional info section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Mentorship & Guidance
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our moderators provide comprehensive support to all BRUDF members,
            offering individual mentoring sessions, specialized training
            workshops, and guidance on advanced debate techniques. Their
            combined expertise spans over 45 years of academic and competitive
            debate experience.
          </p>
          <button className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Schedule a Mentoring Session
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default ModeratorsSection;
