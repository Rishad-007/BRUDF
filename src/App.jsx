import React, { useState } from "react";
import Navbar from "./Navbar";
import HomeSection from "./HomeSection";
import ExecutiveMembersSection from "./ExecutiveMembersSection";
import ModeratorsSection from "./ModeratorsSection";
import NoticeBoardSection from "./NoticeBoardSection";
import PhotoGallerySection from "./PhotoGallerySection";
import VideoSection from "./VideoSection";
import PreviousEventsSection from "./PreviousEventsSection";
import SocialLinksSection from "./SocialLinksSection";
import MembershipForm from "./MembershipForm";
import AdminPanel from "./AdminPanel";

function App() {
  const [isMembershipFormOpen, setIsMembershipFormOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const openMembershipForm = () => setIsMembershipFormOpen(true);
  const closeMembershipForm = () => setIsMembershipFormOpen(false);

  const openAdminPanel = () => setIsAdminPanelOpen(true);
  const closeAdminPanel = () => setIsAdminPanelOpen(false);

  // Admin panel shortcut: Ctrl+Shift+A or Cmd+Shift+A
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "A") {
        e.preventDefault();
        openAdminPanel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="App">
      <Navbar onJoinClick={openMembershipForm} />
      <div id="home">
        <HomeSection onJoinClick={openMembershipForm} />
      </div>
      <div id="executive">
        <ExecutiveMembersSection />
      </div>
      <div id="moderators">
        <ModeratorsSection />
      </div>
      <div id="notice-board">
        <NoticeBoardSection />
      </div>
      <div id="gallery">
        <PhotoGallerySection />
      </div>
      <div id="videos">
        <VideoSection />
      </div>
      <div id="events">
        <PreviousEventsSection />
      </div>
      <div id="contact">
        <SocialLinksSection onAdminClick={openAdminPanel} />
      </div>

      <MembershipForm
        isOpen={isMembershipFormOpen}
        onClose={closeMembershipForm}
      />

      <AdminPanel isOpen={isAdminPanelOpen} onClose={closeAdminPanel} />
    </div>
  );
}

export default App;
