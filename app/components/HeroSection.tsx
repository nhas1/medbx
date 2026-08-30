"use client";

import Image from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { LuCalendarDays } from "react-icons/lu";
import { useLanguage } from "../context/LanguageContext";
import CountUp from '../../components/CountUp'
const customEase = [0.23, 1, 0.32, 1] as const;

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        className="relative min-h-screen flex items-end pb-24 pt-32 overflow-hidden bg-[var(--color-primary)]"
        aria-label="Hero"
      >
        {/* Background image — optimized WebP with fetchPriority high for instant LCP */}
        <div className="absolute inset-0 z-0 opacity-50">
          <Image
            src="/bg.webp"
            alt="Medical conference background"
            className="w-full h-full object-cover mix-blend-overlay"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={80}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/50 to-transparent" />
        </div>

        {/* Decorative wave shape at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-0 opacity-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L48,74.7C96,85,192,107,288,106.7C384,107,480,85,576,74.7C672,64,768,64,864,74.7C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,120L0,120Z"
              fill="#006971"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-10 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-16">
            {/* Main copy — visible in HTML immediately for fast FCP/LCP */}
            <div className="flex flex-col gap-6 max-w-2xl">
              <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.1] text-white font-bold tracking-tight">
                {t.hero.headlineStart}{" "}
                <span className="text-gradient-teal">
                  {t.hero.headlineHighlight}
                </span>{" "}
                {t.hero.headlineEnd}
              </h1>

              <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                {t.hero.description}
              </p>

              {/* Location badge */}
              <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
                <LuCalendarDays className="text-base text-[var(--color-secondary-fixed)]" />
                <span>{t.hero.locationBadge}</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mt-2">
                <m.button
                  id="hero-register-visitor"
                  whileHover={{
                    y: -2,
                    boxShadow: "0px 8px 30px rgba(11, 37, 69, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: customEase }}
                  className="bg-white text-[var(--color-primary)] px-8 py-3.5 rounded-md font-semibold hover:bg-white/90 cursor-pointer"
                >
                  {t.hero.registerVisitor}
                </m.button>

                <Link href="/sponsors">
                  <m.button
                    id="hero-sponsor"
                    whileHover={{
                      y: -2,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: customEase }}
                    className="bg-transparent border border-white/40 text-white px-8 py-3.5 rounded-md font-semibold cursor-pointer"
                  >
                    {t.hero.participateSponsor}
                  </m.button>
                </Link>
              </div>
            </div>

            {/* Stats panel */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 w-full lg:w-auto lg:min-w-[260px]">
              {t.hero.stats.map((stat) => (
                <div key={stat.label} className="border-b border-white/20 pb-4 group">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
                    {stat.label}
                  </p>
                  <CountUp
                    from={0}
                    to={stat.value}
                    separator=","
                    direction="up"
                    duration={0.1}
                    className="text-white text-4xl font-light"
                    delay={0}
                  />
                  <span className="text-white text-4xl font-light">{stat.suffix}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
