"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const customEase = [0.23, 1, 0.32, 1] as const;

export default function ScheduleSection() {
  const { t, dir } = useLanguage();

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        id="schedule"
        className="py-24 max-w-[1280px] mx-auto px-8 md:px-10 overflow-hidden"
        aria-label="Event Schedule"
      >
        {/* Heading */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: customEase }}
          className="text-center mb-16"
        >
          <div className="w-14 h-1 bg-[var(--color-secondary)] rounded-full mb-5 mx-auto" />
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--color-primary)] mb-4 tracking-tight">
            {t.schedule.title}
          </h2>
          <p className="text-[var(--color-on-surface-variant)] text-lg max-w-xl mx-auto">
            {t.schedule.subtitle}
          </p>
        </m.div>

        {/* Timeline — force LTR layout so visual structure is identical in both languages */}
        <div className="relative max-w-3xl mx-auto" dir="ltr">
          {/* Vertical line with smooth grow-down animation */}
          <m.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: customEase }}
            style={{ originY: 0 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-outline-variant)]/50 md:-translate-x-px"
            aria-hidden="true"
          />

          {/* Timeline Events */}
          <div className="flex flex-col gap-8 md:gap-4">
            {t.schedule.events.map((ev, i) => {
              const isLeft = i % 2 === 0;
              // Left cards slide in from left to right (x: -50 -> 0)
              // Right cards slide in from right to left (x: 50 -> 0)
              const initialX = isLeft ? -50 : 50;

              return (
                <m.div
                  key={`event-${i}`}
                  initial={{ opacity: 0, x: initialX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: customEase,
                  }}
                  className={[
                    "relative flex items-start md:items-center gap-6 md:gap-0 pl-16 md:pl-0",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse",
                  ].join(" ")}
                >
                  {/* Dot */}
                  <div
                    className={[
                      "absolute left-4 md:left-1/2 w-5 h-5 rounded-full border-4 border-[var(--color-surface)] shadow-md md:-translate-x-1/2 top-1 md:top-auto flex-shrink-0 transition-transform duration-300 hover:scale-125",
                      ev.status === "confirmed"
                        ? "bg-[var(--color-secondary)]"
                        : "bg-[var(--color-outline-variant)]",
                    ].join(" ")}
                    aria-hidden="true"
                  />

                  {/* Content side — text direction follows the page language */}
                  <div
                    dir={dir}
                    className={[
                      "md:w-5/12 flex flex-col",
                      dir === "ltr"
                        ? "md:text-left md:pl-10"
                        : "md:text-right md:pr-10",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "inline-block text-xs font-bold px-2.5 py-1 rounded mb-2 w-fit",
                        isLeft ? "md:self-end" : "md:self-start",
                        ev.status === "confirmed"
                          ? "bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]"
                          : "bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)]",
                      ].join(" ")}
                    >
                      {ev.status === "confirmed" ? ev.day : t.schedule.comingSoon}
                    </span>
                    <h3 className="font-bold text-lg text-[var(--color-primary)]">
                      {ev.title}
                    </h3>
                    <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed mt-1">
                      {ev.desc}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
