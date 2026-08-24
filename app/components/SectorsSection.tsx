"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useLanguage } from "../context/LanguageContext";

import "swiper/css";
import "swiper/css/navigation";

const sectorImages = [
  "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  "https://images.unsplash.com/photo-1519638842547-a4ba3282353e?w=800&q=80",
];

export default function SectorsSection() {
  const { t, dir } = useLanguage();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isRtl = dir === "rtl";

  return (
    <section
      id="sectors"
      className="bg-[var(--color-surface)] py-20 relative overflow-hidden"
      aria-label="Core Sectors"
    >
      {/* Decorative background SVG */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path
            d="M0,50 Q25,0 50,50 T100,50"
            fill="none"
            stroke="#001026"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-primary)] tracking-tight leading-tight mb-4">
              {t.sectors.title}
            </h2>
            <p className="text-[var(--color-on-surface-variant)] text-base md:text-lg">
              {t.sectors.subtitle}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => (isRtl ? swiperInstance?.slideNext() : swiperInstance?.slidePrev())}
              className="w-11 h-11 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 cursor-pointer"
              aria-label={t.sectors.prevSector}
            >
              <span className="material-symbols-outlined text-xl">
                {isRtl ? "arrow_forward" : "arrow_back"}
              </span>
            </button>
            <button
              onClick={() => (isRtl ? swiperInstance?.slidePrev() : swiperInstance?.slideNext())}
              className="w-11 h-11 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 cursor-pointer"
              aria-label={t.sectors.nextSector}
            >
              <span className="material-symbols-outlined text-xl">
                {isRtl ? "arrow_back" : "arrow_forward"}
              </span>
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          key={dir}
          dir={dir}
          modules={[Autoplay, Navigation]}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12 !pt-6 !px-2 overflow-visible"
        >
          {t.sectors.items.map((sector, index) => {
            const isActive = index === activeIndex;
            const img = sectorImages[index % sectorImages.length];

            return (
              <SwiperSlide key={sector.title} className="h-auto">
                <div
                  className={[
                    "h-full flex flex-col rounded-2xl transition-all duration-300 select-none cursor-pointer",
                    isActive
                      ? "bg-white shadow-xl"
                      : "bg-white/70 shadow-sm opacity-80",
                  ].join(" ")}
                >
                  {/* Image Container */}
                  <div className="p-3">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={img}
                        alt={sector.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Title & Body */}
                  <div className="p-4 pt-1 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3
                          className={[
                            "font-bold transition-colors",
                            isActive
                              ? "text-[var(--color-primary)] text-lg"
                              : "text-gray-700 text-base",
                          ].join(" ")}
                        >
                          {sector.title}
                        </h3>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                          {sector.tag}
                        </span>
                      </div>

                      {/* Expanded Active Info */}
                      {isActive && (
                        <div className="mt-3 pt-3 border-t border-gray-100 animate-slideInDown">
                          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            {t.sectors.moduleOverview}
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed font-normal mb-3">
                            {sector.desc}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
