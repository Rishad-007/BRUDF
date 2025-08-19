import React, { useState } from "react";
import Navbar from "./Navbar";
import HomeSection from "./HomeSection";
import ExecutiveMembersSection from "./ExecutiveMembersSection";
import ModeratorsSection from "./ModeratorsSection";
import NoticeBoardSection from "./NoticeBoardSection";
import PhotoGallerySection from "./PhotoGallerySection";
import VideoSection from "./VideoSection";
import PreviousEventsSection from "./PreviousEventsSection";
import CertificateValidation from "./CertificateValidation";
import SocialLinksSection from "./SocialLinksSection";
import MembershipForm from "./MembershipForm";
import AdminPanel from "./AdminPanel";
import RegistrationBanner from "./RegistrationBanner";
import FloatingRegistrationButton from "./FloatingRegistrationButton";

function App() {
  const [isMembershipFormOpen, setIsMembershipFormOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isRegistrationBannerOpen, setIsRegistrationBannerOpen] =
    useState(false);

  const openMembershipForm = () => setIsMembershipFormOpen(true);
  const closeMembershipForm = () => setIsMembershipFormOpen(false);

  const openAdminPanel = () => setIsAdminPanelOpen(true);
  const closeAdminPanel = () => setIsAdminPanelOpen(false);

  const openRegistrationBanner = () => {
    console.log("Opening registration banner manually");
    setIsRegistrationBannerOpen(true);
  };

  const closeRegistrationBanner = () => {
    console.log("Closing registration banner");
    setIsRegistrationBannerOpen(false);
  };

  // Function to reset banner state for testing
  const resetBannerState = () => {
    localStorage.removeItem("brudf-visited");
    localStorage.removeItem("brudf-banner-dismissed");
    console.log("Banner state reset - reload page to see banner");
  };

  // Show registration banner on first visit
  React.useEffect(() => {
    const hasVisited = localStorage.getItem("brudf-visited");
    const bannerDismissed = localStorage.getItem("brudf-banner-dismissed");

    console.log("Banner check:", { hasVisited, bannerDismissed }); // Debug log

    // For testing: Force show banner (comment this out in production)
    // localStorage.removeItem("brudf-visited");
    // localStorage.removeItem("brudf-banner-dismissed");

    // Always show banner for new users or users who haven't permanently dismissed it
    if (!bannerDismissed) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        console.log("Showing registration banner"); // Debug log
        setIsRegistrationBannerOpen(true);
        if (!hasVisited) {
          localStorage.setItem("brudf-visited", "true");
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Admin panel shortcut: Ctrl+Shift+A or Cmd+Shift+A
  // Banner test shortcut: Ctrl+Shift+B or Cmd+Shift+B
  // Banner reset shortcut: Ctrl+Shift+R or Cmd+Shift+R
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "A") {
        e.preventDefault();
        openAdminPanel();
      }
      // Test shortcut for banner
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "B") {
        e.preventDefault();
        console.log("Manual banner trigger");
        setIsRegistrationBannerOpen(true);
      }
      // Reset banner state shortcut
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "R") {
        e.preventDefault();
        resetBannerState();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Expose functions globally for debugging
    window.debugBRUDF = {
      openBanner: openRegistrationBanner,
      closeBanner: closeRegistrationBanner,
      resetBanner: resetBannerState,
      checkBannerState: () => {
        console.log("Banner state:", {
          hasVisited: localStorage.getItem("brudf-visited"),
          bannerDismissed: localStorage.getItem("brudf-banner-dismissed"),
          isOpen: isRegistrationBannerOpen,
        });
      },
    };

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="App">
      <Navbar
        onJoinClick={openMembershipForm}
        onBannerClick={openRegistrationBanner}
      />
      <div id="home">
        <HomeSection
          onJoinClick={openMembershipForm}
          onBannerClick={openRegistrationBanner}
        />
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
      <div id="certificate-validation">
        <CertificateValidation />
      </div>
      <div id="contact">
        <SocialLinksSection onAdminClick={openAdminPanel} />
      </div>

      <MembershipForm
        isOpen={isMembershipFormOpen}
        onClose={closeMembershipForm}
      />

      <AdminPanel isOpen={isAdminPanelOpen} onClose={closeAdminPanel} />

      <RegistrationBanner
        isOpen={isRegistrationBannerOpen}
        onClose={closeRegistrationBanner}
        onRegisterClick={openMembershipForm}
      />

      <FloatingRegistrationButton onClick={openRegistrationBanner} />
    </div>
  );
}

export default App;
