import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PartnersScroller from "./components/PartnersScroller";
import AboutSection from "./components/AboutSection";
import SectorsSection from "./components/SectorsSection";
import ScheduleSection from "./components/ScheduleSection";
import SponsorsSection from "./components/SponsorsSection";
import FaqSection from "./components/FaqSection";
import ContactFooter from "./components/ContactFooter";

export default function Home() {
  return (
    <>
      {/* Dot pattern overlay across entire page */}
      <Navbar />
      <main>
        <HeroSection />

        <div
          className="fixed inset-0 bg-pattern-dots opacity-[0.15] pointer-events-none z-[-1]"
          aria-hidden="true"
        />

        <PartnersScroller />
        <AboutSection />
        {/* <SectorsSection /> */}
        {/* <ScheduleSection /> */}
        {/* <SponsorsSection /> */}
        {/* <FaqSection /> */}
      </main>

      {/* <ContactFooter /> */}
    </>
  );
}
