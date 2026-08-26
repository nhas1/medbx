"use client";

import { useLanguage } from "../context/LanguageContext";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";
import { LuPhone, LuMail, LuMapPin, LuArrowUpRight } from "react-icons/lu";

export default function ContactFooter() {
  const { t, locale } = useLanguage();

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.sectors, href: "#sectors" },
    { label: t.nav.schedule, href: "#schedule" },
    { label: t.nav.sponsors, href: "#sponsors" },
    { label: t.contactFooter.faqLink, href: "#faq" },
  ];

  return (
    <footer
      id="contact"
      className="sticky bottom-0 z-0 bg-[#001026] text-white w-full overflow-hidden pt-16 pb-8 min-h-[220px] flex flex-col justify-between"
      aria-label="Contact and Footer"
    >
      {/* Top Main Footer Section */}
      <div className="max-w-[1340px] mx-auto px-6 sm:px-8 md:px-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 lg:gap-12 pb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white">
              <span>MEDBX</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t.contactFooter.brandDesc}
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-semibold mb-1">
              {locale === "ar" ? "استكشف" : "Discover"}
            </p>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200 w-fit inline-flex items-center gap-1 group"
                >
                  <span>{link.label}</span>
                  <LuArrowUpRight className="text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 rtl:rotate-90" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details & Legals Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-semibold mb-1">
              {locale === "ar" ? "التواصل" : "Contact"}
            </p>

            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <a
                href="tel:+966501234567"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <LuPhone className="text-xs text-[var(--color-secondary-fixed)]" />
                <span>+966 50 123 4567</span>
              </a>
              <a
                href="mailto:info@nhas1.com"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <LuMail className="text-xs text-[var(--color-secondary-fixed)]" />
                <span>info@nhas1.com</span>
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                <LuMapPin className="text-xs text-[var(--color-secondary-fixed)]" />
                <span>{t.contactFooter.locationValue}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-3 pt-3 border-t border-white/10 text-xs text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                {t.contactFooter.privacyPolicy}
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                {t.contactFooter.termsOfService}
              </a>
            </div>
          </div>

          {/* Social Media Column */}
          <div className="sm:col-span-2 md:col-span-2 flex flex-col gap-4">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 font-semibold">
              {t.contactFooter.followUsTitle}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { label: "Instagram", Icon: FaInstagram, href: "#" },
                { label: "LinkedIn", Icon: FaLinkedinIn, href: "#" },
                { label: "YouTube", Icon: FaYoutube, href: "#" },
                { label: "Facebook", Icon: FaFacebookF, href: "#" },
                { label: "X", Icon: FaXTwitter, href: "#" },
              ].map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/80 hover:text-white hover:bg-[var(--color-secondary)] hover:border-[var(--color-secondary)] transition-all duration-300 cursor-pointer"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Copyright Bottom Bar */}
      <div className="max-w-[1340px] mx-auto px-6 sm:px-8 md:px-12 w-full flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
        <p>© 2027 {locale === "ar" ? "منتدى ميدبكس. جميع الحقوق محفوظة." : "MedBX Forum. All Rights Reserved."}</p>
        <p>{locale === "ar" ? "المنظمون: نهاس القابضة | RIEP" : "Organizers: Nhas Holding | RIEP"}</p>
      </div>
    </footer>
  );
}
