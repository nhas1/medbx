"use client";

import { useLanguage } from "../context/LanguageContext";

const partners = [
  "NHAS HOLDING",
  "RIEP",
  "MINISTRY OF HEALTH",
  "SAUDI FDA",
  "KFSHRC",
  "ARAMCO MED",
  "SEHA",
  "NAHDI",
];

export default function PartnersScroller() {
  const { t } = useLanguage();
  const items = [...partners, ...partners];

  return (
    <section className="py-10 bg-[var(--color-surface-container-low)] border-y border-[var(--color-outline-variant)]/20 overflow-hidden">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-6 px-4">
        {t.partners.title}
      </p>
      <div className="overflow-hidden w-full">
        <div className="scroller-track">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className={[
                "text-xl font-bold whitespace-nowrap select-none px-6",
                i % 2 === 0
                  ? "text-[var(--color-primary)] opacity-50"
                  : "text-[var(--color-secondary)] opacity-50",
              ].join(" ")}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
