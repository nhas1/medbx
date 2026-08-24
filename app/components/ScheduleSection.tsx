"use client";

import { useLanguage } from "../context/LanguageContext";

export default function ScheduleSection() {
  const { t, dir } = useLanguage();
  const isRtl = dir === "rtl";

  return (
    <section
      id="schedule"
      className="py-24 max-w-[1280px] mx-auto px-8 md:px-10"
      aria-label="Event Schedule"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <div className="w-14 h-1 bg-[var(--color-secondary)] rounded-full mb-5 mx-auto" />
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--color-primary)] mb-4 tracking-tight">
          {t.schedule.title}
        </h2>
        <p className="text-[var(--color-on-surface-variant)] text-lg max-w-xl mx-auto">
          {t.schedule.subtitle}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute left-6 rtl:left-auto rtl:right-6 md:left-1/2 md:rtl:left-1/2 top-0 bottom-0 w-px bg-[var(--color-outline-variant)]/40 md:-translate-x-px"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-8 md:gap-4">
          {t.schedule.events.map((ev, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={ev.title}
                className={[
                  "relative flex items-start md:items-center gap-6 md:gap-0 pl-16 rtl:pl-0 rtl:pr-16 md:pl-0 md:rtl:pr-0",
                  isLeft ? "md:flex-row" : "md:flex-row-reverse",
                ].join(" ")}
              >
                {/* Dot */}
                <div
                  className={[
                    "absolute left-4 rtl:left-auto rtl:right-4 md:left-1/2 md:rtl:left-1/2 w-5 h-5 rounded-full border-4 border-[var(--color-surface)] shadow-md md:-translate-x-1/2 md:rtl:translate-x-1/2 top-1 md:top-auto flex-shrink-0",
                    ev.status === "confirmed"
                      ? "bg-[var(--color-secondary)]"
                      : "bg-[var(--color-outline-variant)]",
                  ].join(" ")}
                  aria-hidden="true"
                />

                {/* Content side */}
                <div
                  className={[
                    "md:w-5/12 flex flex-col",
                    isLeft
                      ? "md:text-right md:rtl:text-left md:pr-10 md:rtl:pr-0 md:rtl:pl-10"
                      : "md:text-left md:rtl:text-right md:pl-10 md:rtl:pl-0 md:rtl:pr-10",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-block text-xs font-bold px-2.5 py-1 rounded mb-2 w-fit",
                      isLeft
                        ? isRtl
                          ? "md:self-start"
                          : "md:self-end"
                        : isRtl
                        ? "md:self-end"
                        : "md:self-start",
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
