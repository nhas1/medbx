"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function FaqSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-24 max-w-3xl mx-auto px-8 md:px-10"
      aria-label="Frequently Asked Questions"
    >
      <div className="text-center mb-14">
        <div className="w-14 h-1 bg-[var(--color-secondary)] rounded-full mb-5 mx-auto" />
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--color-primary)] mb-4 tracking-tight">
          {t.faq.title}
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {t.faq.items.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="bg-[var(--color-surface-container-lowest)] rounded-2xl border border-[var(--color-outline-variant)]/20 shadow-clinical overflow-hidden transition-all duration-300"
            >
              <button
                id={`faq-${i}`}
                className="w-full flex justify-between items-center px-6 py-5 text-left rtl:text-right cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-[var(--color-primary)] pr-4 rtl:pr-0 rtl:pl-4">
                  {faq.q}
                </span>
                <span
                  className={[
                    "material-symbols-outlined text-[var(--color-secondary)] flex-shrink-0 transition-transform duration-300",
                    isOpen ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                >
                  expand_more
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-5">
                  <p className="text-[var(--color-on-surface-variant)] leading-relaxed border-t border-[var(--color-outline-variant)]/20 pt-4">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
