"use client";

import { useLanguage } from "../context/LanguageContext";
import { LuActivity, LuArrowRight } from "react-icons/lu";

export default function SponsorsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="sponsors"
      className="bg-white py-20 md:py-28 border-t border-gray-100"
      aria-label="Sponsorship Opportunities"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 md:px-10">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <div className="w-12 h-1 bg-[var(--color-secondary)] rounded-full mb-5 mx-auto" />
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--color-primary)] mb-4 tracking-tight">
            {t.sponsors.title}
          </h2>
          <p className="text-[var(--color-on-surface-variant)] text-lg max-w-2xl mx-auto">
            {t.sponsors.subtitle}
          </p>
        </div>

        {/* Editorial Cards Stack */}
        <div className="flex flex-col gap-16 md:gap-20">
          {t.sponsors.tiers.map((tier) => (
            <article
              key={tier.id}
              className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch pb-16 border-b border-gray-200/80 last:border-b-0 last:pb-0"
            >
              {/* Left Dark Card Box (Fixed Square Aspect Ratio) */}
              <div className="w-full md:w-[380px] lg:w-[420px] aspect-square rounded-[1.5rem] bg-[#092932] relative overflow-hidden flex-shrink-0 flex items-center justify-center p-8 shadow-sm">
                {/* Top shaded vertical stripes matching reference graphic */}
                <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-white/10 to-transparent pointer-events-none flex justify-between px-6 opacity-35">
                  <div className="w-10 h-full bg-white/20 rounded-b-md" />
                  <div className="w-14 h-4/5 bg-white/15 rounded-b-md" />
                  <div className="w-8 h-full bg-white/25 rounded-b-md" />
                  <div className="w-12 h-2/3 bg-white/10 rounded-b-md" />
                </div>

                {/* Center Brand / Tier Logo Box */}
                <div className="relative z-10 w-full max-w-[280px] border border-white/25 bg-black/15 px-2 py-5 rounded text-center flex items-center justify-center">
                  <span className="text-white font-medium text-base sm:text-lg tracking-wider uppercase truncate">
                    MedBX | {tier.name}
                  </span>
                </div>

                {/* Price Badge at Bottom */}
                <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 text-lg text-white font-mono tracking-wider bg-white/10 px-3 py-1.5 rounded border border-white/10">
                  {tier.price} {tier.currency}
                </div>
              </div>

              {/* Right Content Panel */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  {/* Category Tag */}
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-gray-500 mb-4 block font-semibold">
                    {tier.tag}
                  </span>

                  {/* Main Headline */}
                  <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-normal leading-[1.25] text-gray-900 mb-3 tracking-tight">
                    {tier.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {tier.description}
                  </p>

                  {/* Perks Checklist */}
                  <ul className="grid grid-cols-1 gap-2 mb-6 text-xs text-gray-700">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-secondary)] font-bold text-sm leading-none mt-0.5">•</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Link */}
                  <button
                    id={`sponsor-${tier.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer group mb-6"
                  >
                    {t.sponsors.inquireNow}
                    <LuArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </button>
                </div>

                {/* Bottom Stats Row with Vertical Dividers */}
                <div className="grid grid-cols-3 pt-6 border-t border-gray-200/70">
                  {tier.stats.map((stat, idx) => (
                    <div
                      key={`stat-${idx}`}
                      className={[
                        "flex flex-col gap-1.5",
                        idx === 0
                          ? "pe-4 sm:pe-6"
                          : "ps-4 sm:ps-6 border-s border-gray-200 pe-4 sm:pe-6",
                      ].join(" ")}
                    >
                      <span className="text-3xl sm:text-4xl font-normal text-gray-900 tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-xs text-gray-500 leading-relaxed font-normal max-w-[160px]">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
