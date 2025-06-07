import React, { useState, useEffect } from "react";

const AdminPanel = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/members?password=${encodeURIComponent(password)}`
      );
      const result = await response.json();

      if (result.success) {
        setIsAuthenticated(true);
        setMembers(result.members);
      } else {
        setError("Invalid password");
      }
    } catch (error) {
      setError("Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/members/${id}?password=${encodeURIComponent(password)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        setMembers(members.filter((member) => member.id !== id));
      } else {
        alert("Failed to delete member");
      }
    } catch (error) {
      alert("Failed to delete member");
    }
  };

  const exportToCSV = () => {
    if (members.length === 0) return;

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Blood Group",
      "Department",
      "Year",
      "Motivation",
      "Experience",
      "Interests",
      "Submitted At",
    ];
    const csvContent = [
      headers.join(","),
      ...members.map((member) =>
        [
          `"${member.name}"`,
          `"${member.email}"`,
          `"${member.phone}"`,
          `"${member.bloodGroup}"`,
          `"${member.department}"`,
          `"${member.year}"`,
          `"${member.motivation?.replace(/"/g, '""')}"`,
          `"${member.experience?.replace(/"/g, '""')}"`,
          `"${member.interests?.join("; ")}"`,
          `"${new Date(member.submittedAt).toLocaleDateString()}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brudf-members-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPassword("");
    setMembers([]);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1a6 6 0 01-11.485 0M12 11V8"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Admin Panel</h2>
                  <p className="text-blue-100">BRUDF Member Management</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            {!isAuthenticated ? (
              <form onSubmit={handleLogin} className="max-w-md mx-auto">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Admin Login
                  </h3>
                  <p className="text-gray-600">
                    Enter admin password to view members
                  </p>
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Admin Password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? "Authenticating..." : "Login"}
                </button>
              </form>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Registered Members ({members.length})
                  </h3>
                  <button
                    onClick={exportToCSV}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
                  >
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Export CSV</span>
                  </button>
                </div>

                {members.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1a6 6 0 01-11.485 0M12 11V8"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      No Members Yet
                    </h4>
                    <p className="text-gray-600">
                      Member registrations will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-800">
                              {member.name}
                            </h4>
                            <p className="text-gray-600">{member.email}</p>
                            <p className="text-sm text-gray-500">
                              Submitted:{" "}
                              {new Date(member.submittedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">
                              Phone:
                            </span>{" "}
                            {member.phone}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              Blood Group:
                            </span>{" "}
                            {member.bloodGroup}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              Department:
                            </span>{" "}
                            {member.department}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              Year:
                            </span>{" "}
                            {member.year}
                          </div>
                        </div>

                        {member.interests && member.interests.length > 0 && (
                          <div className="mt-4">
                            <span className="font-medium text-gray-700 text-sm">
                              Interests:
                            </span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {member.interests.map((interest, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {member.motivation && (
                          <div className="mt-4">
                            <span className="font-medium text-gray-700 text-sm">
                              Motivation:
                            </span>
                            <p className="text-gray-600 text-sm mt-1">
                              {member.motivation}
                            </p>
                          </div>
                        )}

                        {member.experience && (
                          <div className="mt-4">
                            <span className="font-medium text-gray-700 text-sm">
                              Experience:
                            </span>
                            <p className="text-gray-600 text-sm mt-1">
                              {member.experience}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
