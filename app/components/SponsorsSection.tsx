"use client";

import { useLanguage } from "../context/LanguageContext";

export default function SponsorsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="sponsors"
      className="bg-[var(--color-surface-container-low)] py-24 border-t border-[var(--color-outline-variant)]/20"
      aria-label="Sponsorship Opportunities"
    >
      <div className="max-w-[1280px] mx-auto px-8 md:px-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="w-14 h-1 bg-[var(--color-secondary)] rounded-full mb-5 mx-auto" />
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--color-primary)] mb-4 tracking-tight">
            {t.sponsors.title}
          </h2>
          <p className="text-[var(--color-on-surface-variant)] text-lg max-w-2xl mx-auto">
            {t.sponsors.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.sponsors.tiers.map((tier) => (
            <div
              key={tier.id}
              className={[
                "rounded-3xl p-8 shadow-clinical flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-clinical-lg relative overflow-hidden",
                tier.featured
                  ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                  : "bg-[var(--color-surface-container-lowest)] text-[var(--color-primary)] border border-[var(--color-outline-variant)]/20",
              ].join(" ")}
            >
              {/* Decorative blob */}
              {tier.featured && (
                <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-32 h-32 bg-[var(--color-secondary)]/20 rounded-bl-full rtl:rounded-bl-none rtl:rounded-br-full -mr-6 rtl:-mr-0 rtl:-ml-6 -mt-6 pointer-events-none" />
              )}

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3
                    className={[
                      "font-bold text-xl mb-2",
                      tier.featured ? "" : "text-[var(--color-primary)]",
                    ].join(" ")}
                  >
                    {tier.name}
                  </h3>
                  <div className="flex items-end gap-1.5 mb-6">
                    <span
                      className={[
                        "text-4xl font-bold",
                        tier.featured
                          ? "text-[var(--color-secondary-fixed)]"
                          : "text-[var(--color-secondary)]",
                      ].join(" ")}
                    >
                      {tier.price}
                    </span>
                    <span
                      className={[
                        "text-sm mb-1 font-medium",
                        tier.featured
                          ? "text-[var(--color-on-primary-fixed-variant)]"
                          : "text-[var(--color-on-surface-variant)]",
                      ].join(" ")}
                    >
                      {tier.currency}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 flex-grow">
                    {tier.perks.map((perk) => (
                      <li
                        key={perk}
                        className={[
                          "flex items-start gap-2 text-sm leading-snug",
                          tier.featured
                            ? "text-[var(--color-on-primary-fixed-variant)]"
                            : "text-[var(--color-on-surface-variant)]",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "material-symbols-outlined text-sm mt-0.5 flex-shrink-0",
                            tier.featured
                              ? "text-[var(--color-secondary-fixed)]"
                              : "text-[var(--color-secondary)]",
                          ].join(" ")}
                        >
                          check_circle
                        </span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  id={`sponsor-${tier.id}`}
                  className={[
                    "w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer mt-auto",
                    tier.featured
                      ? "bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary)]/90"
                      : "bg-[var(--color-surface-variant)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-dim)]",
                  ].join(" ")}
                >
                  {t.sponsors.inquireNow}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
