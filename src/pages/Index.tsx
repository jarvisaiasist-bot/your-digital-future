import { useState, useRef, useCallback } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import TrendSection from "@/components/landing/TrendSection";
import CasesSection from "@/components/landing/CasesSection";
import PopupForm from "@/components/landing/PopupForm";
import ReviewsSlider from "@/components/landing/ReviewsSlider";
import ForecastSection from "@/components/landing/ForecastSection";
import FinalCTA from "@/components/landing/FinalCTA";
import StickyCTA from "@/components/landing/StickyCTA";

const Index = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const popupShownRef = useRef(false);

  const openPopup = useCallback(() => {
    window.dispatchEvent(new CustomEvent("analytics", { detail: { event: "cta_click" } }));
    setPopupOpen(true);
  }, []);

  const handleCasesInView = useCallback(() => {
    setShowSticky(true);
    if (!popupShownRef.current) {
      popupShownRef.current = true;
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("analytics", { detail: { event: "popup_open" } }));
        setPopupOpen(true);
      }, 1500);
    }
  }, []);

  const scrollToCases = useCallback(() => {
    document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen pb-16 lg:pb-0">
      <Header onCTAClick={openPopup} />
      <Hero onCTAClick={openPopup} onCasesClick={scrollToCases} />
      <TrendSection />
      <CasesSection onInView={handleCasesInView} />
      <ReviewsSlider />
      <ForecastSection />
      <FinalCTA />
      <PopupForm isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
      <StickyCTA visible={showSticky && !popupOpen} onClick={openPopup} />
    </div>
  );
};

export default Index;
