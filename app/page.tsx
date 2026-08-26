import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

// Keep Above-The-Fold (Navbar + HeroSection) static & instant for minimum FCP & LCP.
// Code-split Below-The-Fold components via Next.js dynamic imports so their JS chunks don't block initial paint.
const PartnersScroller = dynamic(() => import("./components/PartnersScroller"));
const AboutSection = dynamic(() => import("./components/AboutSection"));
const SectorsSection = dynamic(() => import("./components/SectorsSection"));
const ScheduleSection = dynamic(() => import("./components/ScheduleSection"));
const SponsorsSection = dynamic(() => import("./components/SponsorsSection"));
const FaqSection = dynamic(() => import("./components/FaqSection"));
const ContactFooter = dynamic(() => import("./components/ContactFooter"));

export default function Home() {
  return (
    <>
      {/* Above-The-Fold Critical UI */}
      <Navbar />
      <main>
        <HeroSection />

        {/* Dot pattern overlay across entire page */}
        <div
          className="fixed inset-0 bg-pattern-dots opacity-[0.15] pointer-events-none z-[-1]"
          aria-hidden="true"
        />

        {/* Below-The-Fold Lazy Chunks */}
        <PartnersScroller />
        <AboutSection />
        <SectorsSection />
        {/* <ScheduleSection />
        <SponsorsSection />
        <FaqSection /> */}
      </main>

      <ContactFooter />
    </>
  );
}
