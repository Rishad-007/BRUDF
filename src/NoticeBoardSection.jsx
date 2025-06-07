import React, { useState } from "react";

const notices = [
  {
    id: 1,
    title: "Upcoming Intra-Club Debate Championship 2025",
    date: "2025-05-01",
    priority: "high",
    description:
      "Registration is now open for the annual Intra Club Debate Championship. This prestigious event will bring together the best debaters from universities across the country.",
    details:
      "Event Date: June 26-28, 2025 | Venue: BRUR Main Auditorium |Reg Fee: Per Team 150 BDT| Registration Deadline: June 15, 2025",
    type: "Event",
  },
  {
    id: 2,
    title: "Debate Workshop Series",
    date: "2025-06-01",
    priority: "medium",
    description:
      "Join our monthly workshop series focusing on advanced debate techniques and public speaking skills.",
    details:
      "Every Day Till BRUDF Intra 2.0  | Time: 09:00 PM - 10:00 PM | Venue: Discord Room",
    type: "Workshop",
  },
  {
    id: 3,
    title: "New Member Orientation Program",
    date: "2025-01-08",
    priority: "medium",
    description:
      "Welcome session for new BRUDF members. Learn about our history, objectives, and upcoming activities.",
    details:
      "Date: January 25, 2025 | Time: 10:00 AM | Venue: Student Center Hall",
    type: "General",
  },
  {
    id: 4,
    title: "Executive Committee Meeting",
    date: "2025-06-05",
    priority: "low",
    description:
      "Monthly meeting of executive committee members to discuss ongoing projects and future plans.",
    details: "Date: June 10, 2025 | Time: 4:00 PM | Venue: Committee Room",
    type: "Internal",
  },
  {
    id: 5,
    title: "Guest Speaker Session - Popularism",
    date: "2025-06-03",
    priority: "high",
    description:
      "Special session with renowned debater and public speaker Dr. Rahman on the art of persuasion.",
    details: "Date: June 18, 2025 | Time: 3:00 PM | Venue: Main Auditorium",
    type: "Special",
  },
  {
    id: 6,
    title: "BRUDF Annual General Meeting 2025",
    date: "2024-08-20",
    priority: "high",
    description:
      "Annual general meeting to discuss club activities, budget, and future plans. All members are required to attend.",
    details: "Date: June 25, 2024 | Time: 4:00 PM | Venue: Conference Hall B",
    type: "Meeting",
  },
  {
    id: 7,
    title: "Public Speaking Bootcamp",
    date: "2025-06-05",
    priority: "medium",
    description:
      "Intensive 3-day bootcamp focusing on public speaking skills, voice modulation, and stage presence.",
    details:
      "Dates: June 25-27, 2025 | Time: 10:00 AM - 4:00 PM | Registration Fee: 500 BDT",
    type: "Training",
  },
  {
    id: 8,
    title: 'Debate Competition - "Climate Change"',
    date: "2025-06-07",
    priority: "medium",
    description:
      "Open debate competition on climate change and environmental policies. Cash prizes for winners.",
    details:
      "Date: July 5, 2025 | Registration Deadline: June 25, 2025 | Entry Fee: 200 BDT",
    type: "Competition",
  },
  {
    id: 9,
    title: "Library Study Hours Extended",
    date: "2025-06-04",
    priority: "low",
    description:
      "Library study hours have been extended for BRUDF members during exam period.",
    details: "Extended hours: 6:00 AM - 12:00 AM | Valid till: July 31, 2025",
    type: "Announcement",
  },
];

const NoticeBoardSection = () => {
  const [expandedNotice, setExpandedNotice] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ff4757"; // Red pin
      case "medium":
        return "#ffa502"; // Orange pin
      case "low":
        return "#2ed573"; // Green pin
      default:
        return "#747d8c"; // Gray pin
    }
  };

  const getNoticeRotation = (index) => {
    const rotations = [
      "rotate-1",
      "-rotate-1",
      "rotate-2",
      "-rotate-2",
      "rotate-0",
    ];
    return rotations[index % rotations.length];
  };

  return (
    <section
      className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden"
      id="notice-board"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(160, 82, 45, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 70%, rgba(210, 180, 140, 0.1) 0%, transparent 50%)
        `,
      }}
    >
      {/* Cork board texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
          repeating-linear-gradient(
            45deg,
            rgba(139, 69, 19, 0.1) 0px,
            rgba(139, 69, 19, 0.1) 2px,
            transparent 2px,
            transparent 10px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(160, 82, 45, 0.1) 0px,
            rgba(160, 82, 45, 0.1) 2px,
            transparent 2px,
            transparent 10px
          )
        `,
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header with bulletin board style */}
        <div className="text-center mb-16 relative">
          {/* Push pins for header */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex space-x-8">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-red-600 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-700 rounded-full"></div>
              <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-red-300 rounded-full"></div>
            </div>
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg border-2 border-blue-600 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full"></div>
              <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-blue-300 rounded-full"></div>
            </div>
          </div>

          <div className="relative bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-2xl border-4 border-amber-200 transform rotate-1">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4 font-serif">
              📋 NOTICE BOARD 📋
            </h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto font-medium">
              ✨ Official Announcements & Important Updates ✨
            </p>
          </div>
        </div>

        {/* Cork board style notices */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {notices.map((notice, index) => (
            <div
              key={notice.id}
              className={`relative group ${getNoticeRotation(
                index
              )} hover:rotate-0 transition-all duration-500 hover:scale-105 hover:z-10`}
            >
              {/* Push pin */}
              <div
                className="absolute -top-3 left-8 w-6 h-6 rounded-full shadow-lg border-2 z-20"
                style={{
                  backgroundColor: getPriorityColor(notice.priority),
                  borderColor: getPriorityColor(notice.priority),
                }}
              >
                <div
                  className="absolute inset-0 rounded-full opacity-60"
                  style={{
                    background: `linear-gradient(to bottom right, ${getPriorityColor(
                      notice.priority
                    )}cc, ${getPriorityColor(notice.priority)})`,
                  }}
                ></div>
                <div
                  className="absolute top-1 left-1 w-3 h-3 rounded-full opacity-40"
                  style={{ backgroundColor: "white" }}
                ></div>
              </div>

              {/* Notice paper */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 pb-8 rounded-lg shadow-xl border-l-4 border-amber-300 relative overflow-hidden group-hover:shadow-2xl transition-shadow duration-500">
                {/* Paper texture */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 24px,
                      rgba(0,0,0,0.05) 25px,
                      rgba(0,0,0,0.05) 26px
                    )
                  `,
                  }}
                ></div>

                <div className="relative z-10">
                  {/* Notice header with handwritten style */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 leading-tight font-serif group-hover:text-amber-700 transition-colors duration-300">
                        {notice.title}
                      </h3>
                      <div
                        className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md transform -rotate-12"
                        style={{
                          backgroundColor: getPriorityColor(notice.priority),
                        }}
                      >
                        {notice.priority.toUpperCase()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        📅{" "}
                        {new Date(notice.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="px-2 py-1 bg-amber-200 text-amber-800 rounded-full text-xs font-medium">
                        {notice.type}
                      </span>
                    </div>
                  </div>

                  {/* Notice content */}
                  <p className="text-gray-700 leading-relaxed mb-4 font-serif text-base">
                    {notice.description}
                  </p>

                  {/* Expanded details */}
                  {expandedNotice === notice.id && (
                    <div className="mt-4 p-4 bg-amber-100 rounded-lg border-l-4 border-amber-500 relative">
                      <div className="absolute -top-2 -left-2 text-amber-600">
                        📌
                      </div>
                      <p className="text-gray-800 font-medium italic">
                        {notice.details}
                      </p>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() =>
                        setExpandedNotice(
                          expandedNotice === notice.id ? null : notice.id
                        )
                      }
                      className="inline-flex items-center px-4 py-2 bg-amber-200 hover:bg-amber-300 text-amber-800 font-medium rounded-lg transition-all duration-200 text-sm hover:scale-105"
                    >
                      {expandedNotice === notice.id
                        ? "📤 Hide"
                        : "📖 Read More"}
                    </button>

                    {notice.priority === "high" && (
                      <button
                        className="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm"
                        style={{
                          backgroundColor: getPriorityColor(notice.priority),
                        }}
                      >
                        ⚡ Register Now
                      </button>
                    )}
                  </div>
                </div>

                {/* Tape effect on corners */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-gray-200 opacity-60 transform rotate-45 rounded-sm"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 bg-gray-300 opacity-50 transform -rotate-12 rounded-sm"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Archive section with cork board style */}
        <div className="text-center">
          <div className="relative inline-block">
            {/* Push pins for archive button */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-md border border-green-600"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full shadow-md border border-purple-600"></div>
            </div>

            <button className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-xl shadow-xl border-2 border-amber-300 font-bold text-amber-800 hover:bg-amber-50 hover:scale-105 transform transition-all duration-300 text-lg">
              📚 View Notice Archive 📚
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoardSection;
