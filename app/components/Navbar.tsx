"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { HiLanguage, HiBars3, HiXMark, HiChevronDown } from "react-icons/hi2";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { t, toggleLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileValueOpen, setMobileValueOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  const navLinks = [
    { label: t.nav.sectors, href: "#sectors" },
    {
      label: t.nav.value,
      href: "/value",
      hasDropdown: true,
      dropdownItems: [
        { label: t.nav.whyAttend, href: "/value" },
        { label: t.nav.sponsorshipPlans, href: "/sponsors" },
      ],
    },
    { label: t.nav.news, href: "/news" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    setDropdownOpen(false);

    if (href === "/" || href === "#") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      return;
    }

    if (href === "/sponsors" || href === "/news" || href === "/value") {
      if (pathname === href) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push(href);
      }
      return;
    }

    if (href.startsWith("#")) {
      if (pathname === "/") {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/${href}`);
      }
    }
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          scrolled || pathname !== "/"
            ? "bg-[var(--color-surface)]/95 backdrop-blur-md shadow-clinical border-b border-[var(--color-outline-variant)]/30"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-[1440px] mx-auto px-8 md:px-10 h-20 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
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
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive =
                link.href === pathname ||
                (link.hasDropdown &&
                  (pathname === "/value" || pathname === "/sponsors"));

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative py-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={[
                        "relative pb-0.5 transition-opacity duration-200 hover:opacity-70 flex items-center gap-1.5 cursor-pointer",
                        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current",
                        "after:transition-all after:duration-300 hover:after:w-full",
                        isActive
                          ? "text-[var(--color-secondary)] font-semibold after:w-full"
                          : scrolled || pathname !== "/"
                            ? "text-[var(--color-on-surface-variant)]"
                            : "text-white",
                      ].join(" ")}
                    >
                      <span>{link.label}</span>
                      <HiChevronDown
                        className={`text-xs transition-transform duration-200 ${dropdownOpen
                          ? "rotate-180 text-[var(--color-secondary)]"
                          : "opacity-80"
                          }`}
                      />
                    </a>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <m.div
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[210px] rounded-2xl bg-[#001026]/70 backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-1.5 z-50 overflow-hidden text-center"
                        >
                          {link.dropdownItems?.map((item) => (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={(e) => handleNavClick(e, item.href)}
                              className="block px-4 py-2.5 text-xs md:text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-200 whitespace-nowrap"
                            >
                              {item.label}
                            </a>
                          ))}
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={[
                    "relative pb-0.5 transition-opacity duration-200 hover:opacity-70",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current",
                    "after:transition-all after:duration-300 hover:after:w-full",
                    isActive
                      ? "text-[var(--color-secondary)] font-semibold after:w-full"
                      : scrolled || pathname !== "/"
                        ? "text-[var(--color-on-surface-variant)]"
                        : "text-white",
                  ].join(" ")}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLocale}
              id="nav-lang-toggle"
              className={[
                "flex items-center gap-1.5 text-xs font-semibold border px-3.5 py-2 rounded-md transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.97] border-[var(--color-primary)]/50 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5",
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
              className="md:hidden bg-[var(--color-surface)]/98 backdrop-blur-md border-t border-[var(--color-outline-variant)]/20 px-6 py-4 flex flex-col gap-3 overflow-hidden"
            >
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.href}
                      className="border-b border-[var(--color-outline-variant)]/20 pb-2"
                    >
                      <button
                        type="button"
                        onClick={() => setMobileValueOpen((o) => !o)}
                        className="w-full flex items-center justify-between py-2 text-[var(--color-on-surface-variant)] font-semibold text-base"
                      >
                        <span>{link.label}</span>
                        <HiChevronDown
                          className={`text-lg transition-transform duration-200 ${mobileValueOpen
                            ? "rotate-180 text-[var(--color-secondary)]"
                            : ""
                            }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileValueOpen && (
                          <m.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex flex-col gap-2 pt-1 pb-1 px-2 overflow-hidden"
                          >
                            {link.dropdownItems?.map((item) => (
                              <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="block text-sm font-medium text-[var(--color-primary)] py-2.5 px-4 rounded-lg bg-[var(--color-surface-container-low)] hover:bg-[var(--color-secondary)]/10 transition-colors text-center"
                              >
                                {item.label}
                              </a>
                            ))}
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[var(--color-on-surface-variant)] font-medium py-2 border-b border-[var(--color-outline-variant)]/20 last:border-0"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                );
              })}
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </LazyMotion>
  );
}
