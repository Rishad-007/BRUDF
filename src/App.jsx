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

function App() {
  const [isMembershipFormOpen, setIsMembershipFormOpen] = useState(false);

  const openMembershipForm = () => setIsMembershipFormOpen(true);
  const closeMembershipForm = () => setIsMembershipFormOpen(false);

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
        <SocialLinksSection />
      </div>

      <MembershipForm
        isOpen={isMembershipFormOpen}
        onClose={closeMembershipForm}
      />
    </div>
  );
}

export default App;
