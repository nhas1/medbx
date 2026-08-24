"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const customEase = [0.23, 1, 0.32, 1] as const;

const pillarIcons = ["lightbulb", "forum", "trending_up", "work", "science"];

const fadeInVariants = {
  hidden: { opacity: 0, transform: "translateY(24px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.5, ease: customEase },
  },
};

const pillarContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const pillarCardVariants = {
  hidden: { opacity: 0, transform: "translateY(24px) scale(0.97)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    transition: { duration: 0.45, ease: customEase },
  },
};

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-[#e8e8e8] text-[#191c1d]"
      aria-label="About MedBX"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Left Column: Big Headline & Tags */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInVariants}
            className="lg:col-span-6 flex flex-col justify-between py-2"
          >
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-medium tracking-tight text-[#111827] leading-[1.15]">
                {t.about.headline}
              </h2>
            </div>

            {/* Bottom Pill Tags */}
            <div className="flex flex-wrap gap-2.5 mt-10 lg:mt-16">
              {t.about.tags.map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, transform: "translateY(12px)" }}
                  whileInView={{ opacity: 1, transform: "translateY(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08, ease: customEase }}
                  className="bg-white/90 border border-gray-200/80 text-gray-800 text-xs font-semibold px-3.5 py-1.5 rounded-md shadow-xs"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Paragraph Content & Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInVariants}
            className="lg:col-span-6 lg:border-s lg:border-gray-300/80 lg:ps-12 flex flex-col justify-between gap-8 py-2"
          >
            <div className="flex flex-col gap-6">
              <p className="text-xl md:text-2xl text-gray-800 font-normal leading-snug tracking-tight">
                {t.about.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-300/60">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {t.about.visionTitle}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t.about.visionDesc}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {t.about.missionTitle}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t.about.missionDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Vision 2030 Quote Block */}
            <div className="pt-6 border-t border-gray-300/60">
              <blockquote className="text-sm md:text-base italic text-gray-700 leading-relaxed">
                &ldquo;{t.about.quote}&rdquo;
              </blockquote>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-2">
                — {t.about.quoteAuthor}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Why MedBX pillars */}
      <div id="why-medbx" className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInVariants}
          className="text-center mb-12 mt-24"
        >
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--color-primary)] mb-4 tracking-tight">
            {t.about.whyTitle}
          </h2>
          <p className="text-[var(--color-on-surface-variant)] text-lg max-w-2xl mx-auto">
            {t.about.whySubtitle}
          </p>
        </motion.div>

        <motion.div
          variants={pillarContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          {t.about.pillars.map((p, idx) => (
            <motion.div
              key={p.title}
              variants={pillarCardVariants}
              whileHover={{
                transform: "translateY(-6px)",
                boxShadow: "0px 8px 30px rgba(11, 37, 69, 0.12)",
              }}
              transition={{ duration: 0.25, ease: customEase }}
              className="bg-[var(--color-surface-container-lowest)] rounded-2xl p-6 shadow-clinical border border-[var(--color-outline-variant)]/20 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-[var(--color-primary)]/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-[var(--color-secondary)]/10 transition-colors">
                <span className="material-symbols-outlined text-3xl text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                  {pillarIcons[idx] || "star"}
                </span>
              </div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-2">
                {p.title}
              </h3>
              <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
