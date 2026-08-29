"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { LuPlus, LuX, LuCalendar } from "react-icons/lu";
import { useLanguage } from "../context/LanguageContext";
import PageHeader from "./PageHeader";

const customEase = [0.23, 1, 0.32, 1] as const;

export default function NewsPage() {
  const { t, dir } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalItem, setActiveModalItem] = useState<any | null>(null);

  const categories = [
    { key: "all", label: t.news.categories.all },
    { key: "exhibitionNews", label: t.news.categories.exhibitionNews },
    { key: "announcements", label: t.news.categories.announcements },
    { key: "registrationUpdates", label: t.news.categories.registrationUpdates },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? t.news.items
      : t.news.items.filter((item) => item.categoryKey === selectedCategory);

  return (
    <LazyMotion features={domAnimation} strict>
      <PageHeader
        title={t.news.title}
        subtitle={t.news.subtitle}
        imageSrc="/health.jpg"
      />

      <section
        id="news"
        className="bg-[var(--color-surface)] py-12 md:py-16 relative overflow-hidden"
        aria-label={t.news.title}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

          {/* Filter Pills Header — Light Theme */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: customEase }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-12"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={[
                    "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none tracking-wide",
                    isActive
                      ? "bg-[var(--color-primary)] text-white shadow-md scale-[1.02]"
                      : "bg-white text-[var(--color-on-surface-variant)] border border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              );
            })}
          </m.div>

          {/* Active Category Title Header */}
          <div className="mb-8 border-b border-gray-200/80 pb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] tracking-tight">
              {categories.find((c) => c.key === selectedCategory)?.label}
            </h3>
          </div>

          {/* News Items Stack */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <m.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: customEase }}
                  onClick={() => setActiveModalItem(item)}
                  className="bg-white hover:bg-gray-50/80 border border-gray-200/80 hover:border-[var(--color-primary)]/40 rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-250 shadow-clinical hover:shadow-clinical-lg group flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left Column (Main Info) */}
                  <div className="flex-1 max-w-4xl">
                    <h4 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] leading-snug tracking-tight group-hover:text-[var(--color-secondary)] transition-colors duration-200 uppercase">
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-gray-500">
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Right Column (Read More + CTA) */}
                  <div className="flex-shrink-0 flex items-center md:justify-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors duration-200">
                      {t.news.readMore}
                      <span className="w-8 h-8 rounded-full border border-gray-300 group-hover:border-[var(--color-secondary)] group-hover:bg-[var(--color-secondary)]/10 flex items-center justify-center transition-all duration-200">
                        <LuPlus className="text-base group-hover:rotate-90 transition-transform duration-300 text-[var(--color-primary)] group-hover:text-[var(--color-secondary)]" />
                      </span>
                    </span>
                  </div>
                </m.article>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Details Modal Popup */}
        <AnimatePresence>
          {activeModalItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop Overlay */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setActiveModalItem(null)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              />

              {/* Modal Dialog Card */}
              <m.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.3, ease: customEase }}
                className="relative z-10 bg-white border border-gray-200/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-gray-900 shadow-2xl overflow-hidden my-auto"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border border-[var(--color-secondary)]/20 inline-block mb-3">
                      {activeModalItem.categoryLabel}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold leading-snug tracking-tight text-[var(--color-primary)]">
                      {activeModalItem.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer flex-shrink-0"
                    aria-label={t.news.closeModal}
                  >
                    <LuX className="text-xl" />
                  </button>
                </div>

                {/* Metadata row */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500 pb-4 border-b border-gray-100 mb-6 font-medium">
                  <LuCalendar className="text-sm text-[var(--color-secondary)]" />
                  <span>{activeModalItem.date}</span>
                </div>

                {/* Summary / Lead */}
                <div className="bg-[var(--color-surface-container-low)] border-s-4 border-[var(--color-secondary)] p-4 rounded-r-xl mb-6">
                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                    {activeModalItem.summary}
                  </p>
                </div>

                {/* Main Detailed Content Body */}
                <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
                  <p>{activeModalItem.content}</p>
                </div>

                {/* Modal Footer */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">
                    MEDBX FORUM 2027
                  </span>

                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-container)] text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                  >
                    {t.news.closeModal}
                  </button>
                </div>
              </m.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  );
}
