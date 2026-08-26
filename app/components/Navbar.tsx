"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { HiLanguage, HiBars3, HiXMark } from "react-icons/hi2";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { t, toggleLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.sectors, href: "#sectors" },
    { label: t.nav.schedule, href: "#schedule" },
    { label: t.nav.sponsors, href: "#sponsors" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-[var(--color-surface)]/95 backdrop-blur-md shadow-clinical border-b border-[var(--color-outline-variant)]/30"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-[1440px] mx-auto px-8 md:px-10 h-20 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="flex items-center gap-2 font-bold text-xl tracking-tight group"
            aria-label={t.nav.logoAlt}
          >
            <Image
              src="/logo.webp"
              priority
              alt="Logo"
              width={120}
              height={47}
              className="object-contain w-[120px] h-auto"
              sizes="120px"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={[
                  "relative pb-0.5 transition-opacity duration-200 hover:opacity-70",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current",
                  "after:transition-all after:duration-300 hover:after:w-full",
                  scrolled
                    ? "text-[var(--color-on-surface-variant)]"
                    : "text-white",
                ].join(" ")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLocale}
              id="nav-lang-toggle"
              className={[
                "flex items-center gap-1.5 text-xs font-semibold border px-3.5 py-2 rounded-md transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.97]",
                scrolled
                  ? "border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
                  : "border-white/30 text-white hover:bg-white/10",
              ].join(" ")}
              title="Switch Language"
            >
              <HiLanguage className="text-base" />
              <span>{t.nav.langToggle}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              className={[
                "md:hidden p-2 rounded-md transition-colors",
                scrolled ? "text-[var(--color-primary)]" : "text-white",
              ].join(" ")}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={t.nav.toggleMenu}
            >
              {menuOpen ? (
                <HiXMark className="text-2xl" />
              ) : (
                <HiBars3 className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden bg-[var(--color-surface)]/98 backdrop-blur-md border-t border-[var(--color-outline-variant)]/20 px-6 py-4 flex flex-col gap-4 overflow-hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[var(--color-on-surface-variant)] font-medium py-2 border-b border-[var(--color-outline-variant)]/20 last:border-0"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </LazyMotion>
  );
}
