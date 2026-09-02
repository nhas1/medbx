"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const customEase = [0.23, 1, 0.32, 1] as const;

/* ── Framer variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: customEase },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09 },
  },
};

const cardPop = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: customEase },
  },
};



/* ── Decorative SVG components ──────────────────────── */

/** Pulse-line pattern — the signature connective element */
function PulseLine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 80"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,40 L360,40 L400,10 L420,70 L440,20 L460,60 L480,40 L1440,40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Hexagonal grid pattern for medical / biotech feel */
function HexPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="200"
      height="200"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="hex-pattern"
          width="56"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(0.5)"
        >
          <path
            d="M28,0 L56,16.67 L56,50 L28,66.67 L0,50 L0,16.67 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path
            d="M28,33.33 L56,50 L56,83.33 L28,100 L0,83.33 L0,50 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-pattern)" />
    </svg>
  );
}

/** Circular concentric rings for the company section */
function ConcentricRings({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
    >
      {[60, 100, 140, 180, 220].map((r) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 6"
        />
      ))}
    </svg>
  );
}

export default function ValueSection() {
  const { t } = useLanguage();

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        id="value-visitors"
        className="relative py-10 md:py-15 bg-white border-t border-[var(--color-outline-variant)]/20 overflow-hidden"
        aria-label={t.value.visitorsTitle}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="mb-10 md:mb-10 max-w-3xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight leading-[1.15] mb-5">
              {t.value.visitorsTitle}
            </h2>

            <p className="text-[var(--color-on-surface-variant)] text-base md:text-lg leading-relaxed">
              {t.value.visitorsDesc}
            </p>
          </m.div>

          {/* Minimalist Top-Bordered Grid — Matching Reference Image */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            {t.value.visitorBenefits.map((benefit, idx) => (
              <m.div
                key={`vb-${idx}`}
                variants={cardPop}
                className="flex flex-col border-t-2 border-[var(--color-secondary)] pt-5 group"
              >
                <h3 className="font-bold text-xl md:text-2xl text-[var(--color-primary)] mb-3 tracking-tight leading-snug group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                  {benefit.title}
                </h3>
                <p className="text-[var(--color-on-surface-variant)] text-sm md:text-base leading-relaxed">
                  {benefit.desc}
                </p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — VALUE FOR EXHIBITORS
       ═══════════════════════════════════════════════════════ */}
      <section
        id="value-exhibitors"
        className="relative py-12 md:py-16 bg-[var(--color-surface)] border-t border-[var(--color-outline-variant)]/20 overflow-hidden"
        aria-label={t.value.exhibitorsTitle}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="mb-10 md:mb-12 max-w-4xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight leading-[1.15] mb-5">
              {t.value.exhibitorsTitle}
            </h2>

            <p className="text-[var(--color-on-surface-variant)] text-base md:text-lg leading-relaxed">
              {t.value.exhibitorsDesc}
            </p>
          </m.div>

          <div className="space-y-12">
            {t.value.exhibitorPillars.map((pillar, pillarIdx) => (
              <m.div
                key={`ep-${pillarIdx}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[var(--color-outline-variant)]/20 shadow-sm"
              >
                <h3 className="text-xl md:text-2xl font-bold text-[var(--color-primary)] mb-6 pb-4 border-b border-[var(--color-outline-variant)]/20 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[var(--color-secondary)] inline-block" />
                  {pillar.title}
                </h3>

                <m.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  className={`grid grid-cols-1 sm:grid-cols-2 ${pillar.benefits.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
                    } gap-x-8 gap-y-8`}
                >
                  {pillar.benefits.map((benefit, idx) => (
                    <m.div
                      key={`epb-${pillarIdx}-${idx}`}
                      variants={cardPop}
                      className="flex flex-col border-t-2 border-[var(--color-secondary)] pt-5 group"
                    >
                      <h4 className="font-bold text-xl md:text-2xl text-[var(--color-primary)] mb-3 tracking-tight leading-snug group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                        {benefit.title}
                      </h4>
                      <p className="text-[var(--color-on-surface-variant)] text-sm md:text-base leading-relaxed">
                        {benefit.desc}
                      </p>
                    </m.div>
                  ))}
                </m.div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — VALUE FOR COMPANIES
          Light surface + minimalist top-bordered grid (inspired by reference layout)
       ═══════════════════════════════════════════════════════ */}
      <section
        id="value-companies"
        className="relative py-10 md:py-15 bg-white border-t border-[var(--color-outline-variant)]/20 overflow-hidden"
        aria-label={t.value.companiesTitle}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="mb-10 md:mb-10 max-w-3xl"
          >

            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight leading-[1.15] mb-5">
              {t.value.companiesTitle}
            </h2>

            <p className="text-[var(--color-on-surface-variant)] text-base md:text-lg leading-relaxed">
              {t.value.companiesDesc}
            </p>
          </m.div>

          {/* Minimalist Top-Bordered Grid — Matching Reference Image */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            {t.value.companyBenefits.map((benefit, idx) => (
              <m.div
                key={`cb-${idx}`}
                variants={cardPop}
                className="flex flex-col border-t-2 border-[var(--color-primary)] pt-5 group"
              >
                <h3 className="font-bold text-xl md:text-2xl text-[var(--color-primary)] mb-3 tracking-tight leading-snug group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                  {benefit.title}
                </h3>
                <p className="text-[var(--color-on-surface-variant)] text-sm md:text-base leading-relaxed">
                  {benefit.desc}
                </p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — FORUM SERVICES & FACILITIES
          Dark surface + tall cards (title top, desc bottom, no icons)
          Inspired by the reference layout
       ═══════════════════════════════════════════════════════ */}
      <section
        id="value-services"
        className="relative py-20 md:py-24 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0b2545 0%, #001026 50%, #00292f 100%)" }}
        aria-label={t.value.servicesTitle}
      >

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          {/* Header — centered like the reference */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="text-center mb-16 md:mb-20"
          >

            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.15] max-w-3xl mx-auto">
              {t.value.servicesTitle}
            </h2>
          </m.div>

          {/* Services cards — horizontal row, tall aspect, title top / desc bottom */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {t.value.services.map((service, idx) => (
              <m.div
                key={`sv-${idx}`}
                variants={cardPop}
                whileHover={{
                  y: -5,
                  scale: 1.015,
                }}
                transition={{ duration: 0.3, ease: customEase }}
                className="relative rounded-2xl min-h-[280px] sm:min-h-[320px] p-6 flex flex-col justify-between cursor-default group overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                }}
              >
                {/* Hover shimmer */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,105,113,0.10) 0%, transparent 60%)",
                  }}
                />

                {/* Border — subtle, brightens on hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/[0.07] group-hover:border-white/[0.14] transition-colors duration-300 pointer-events-none" />

                {/* Title — top */}
                <h3 className="relative z-10 text-white font-bold text-lg md:text-xl leading-snug tracking-tight">
                  {service.title}
                </h3>

                {/* Description — bottom */}
                <p className="relative z-10 text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  {service.desc}
                </p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
