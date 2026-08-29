"use client";

import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import { useLanguage } from "../context/LanguageContext";

const customEase = [0.23, 1, 0.32, 1] as const;

export default function ParticipationSection() {
  const { t } = useLanguage();

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        id="participation"
        className="py-20 md:py-18 bg-white border-t border-gray-100 relative overflow-hidden"
        aria-label={t.participation.title}
      >
        <div className="max-w-[1380px] mx-auto px-6 sm:px-8 md:px-10">
          {/* Section Header */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: customEase }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-[var(--color-primary)] mb-4 tracking-tight leading-tight">
              {t.participation.title}
            </h2>
            <p className="text-[var(--color-on-surface-variant)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t.participation.subtitle}
            </p>
          </m.div>

          {/* 4 Cards Grid - Styled like reference graphic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {t.participation.cards.map((card, idx) => (
              <m.div
                key={card.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: customEase }}
                className="flex flex-col group cursor-pointer"
              >
                <Link href={card.href} className="flex flex-col h-full">
                  {/* Top Graphic Card Box (Solid Color Layout) */}
                  <div
                    className={`w-full aspect-[4/5] sm:aspect-[3/4] rounded-[1.75rem] ${card.bgColor || "bg-[#092932]"} relative overflow-hidden flex flex-col justify-between p-6 shadow-md group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1.5`}
                  >
                    {/* Top vertical stripes / graphic bars matching reference */}
                    <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none flex justify-between px-5 opacity-30">
                      <div className={`w-8 h-full ${card.stripeColor} rounded-b-md`} />
                      <div className={`w-12 h-4/5 ${card.stripeColor} rounded-b-md`} />
                      <div className={`w-6 h-full ${card.stripeColor} rounded-b-md`} />
                      <div className={`w-10 h-2/3 ${card.stripeColor} rounded-b-md`} />
                    </div>
                    {/* Center Brand / Title Box */}
                    <div className="relative z-10 w-full text-center my-auto">
                      <h3 className="text-white font-bold text-2xl sm:text-3xl tracking-tight">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  {/* Below Graphic Card Info & Details */}
                  <div className="flex-1 flex flex-col justify-between pt-5 px-1">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
                        {card.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {card.desc}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors duration-200 mt-auto">
                      <span>{t.participation.learnMore}</span>
                      <LuArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </div>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
