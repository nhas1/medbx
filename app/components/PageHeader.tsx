"use client";

import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";

const customEase = [0.23, 1, 0.32, 1] as const;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  badge?: string;
}

export default function PageHeader({
  title,
  subtitle,
  imageSrc = "/bg.webp",
  badge,
}: PageHeaderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <section className="relative py-20 md:py-28 overflow-hidden bg-[var(--color-primary)] text-white mb-10 shadow-clinical h-[50vh] flex">
        {/* Background Image with Dark Mix-Blend Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={imageSrc}
            alt="Page Header Background"
            className="w-full h-full object-cover mix-blend-overlay"
            fill
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/80 via-[var(--color-primary)]/60 to-[var(--color-primary)]/90" />
        </div>

        {/* Centered Content Container — Exactly 50vw width on desktop */}
        <div className="relative z-10 w-[92%] md:w-[50vw] mx-auto text-center flex flex-col items-center justify-center gap-5">
          {badge && (
            <m.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: customEase }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md"
            >
              {badge}
            </m.span>
          )}

          <m.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEase }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight leading-[1.12] drop-shadow-sm"
          >
            {title}
          </m.h1>

          {subtitle && (
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: customEase }}
              className="text-white/80 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl"
            >
              {subtitle}
            </m.p>
          )}
        </div>
      </section>
    </LazyMotion>
  );
}
