"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function ContactFooter() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactItems = [
    {
      icon: "call",
      title: "+966 50 123 4567",
      sub: t.contactFooter.generalInquiries,
    },
    {
      icon: "mail",
      title: "info@nhas1.com",
      sub: t.contactFooter.emailSupport,
    },
    {
      icon: "location_on",
      title: t.contactFooter.locationValue,
      sub: t.contactFooter.headquarters,
    },
  ];

  return (
    <footer
      id="contact"
      className="bg-[var(--color-primary)] text-[var(--color-on-primary)] w-full rounded-t-[3rem] mt-8 relative overflow-hidden"
      aria-label="Contact and Footer"
    >
      {/* Decorative wave background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full object-cover" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
          <path
            d="M0,128L48,160C96,192,192,256,288,277.3C384,299,480,277,576,234.7C672,192,768,128,864,117.3C960,107,1056,149,1152,170.7C1248,192,1344,192,1392,192L1440,192L1440,400L0,400Z"
            fill="#006971"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-8 md:px-10 pt-16 pb-12">
        {/* Contact section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16 border-b border-[var(--color-on-primary-fixed-variant)]/20 mb-12">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">{t.contactFooter.getInTouch}</h2>
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 bg-[var(--color-primary-container)] rounded-2xl">
                <span className="material-symbols-outlined text-[var(--color-secondary-fixed)] text-5xl">
                  check_circle
                </span>
                <p className="text-xl font-semibold">{t.contactFooter.messageSentTitle}</p>
                <p className="text-[var(--color-on-primary-fixed-variant)] text-sm">
                  {t.contactFooter.messageSentDesc}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-xs font-semibold mb-1.5 text-[var(--color-on-primary-fixed-variant)] uppercase tracking-wider"
                    >
                      {t.contactFooter.firstNameLabel}
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={formState.firstName}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, firstName: e.target.value }))
                      }
                      className="w-full bg-[var(--color-primary-container)] border border-[var(--color-on-primary-fixed-variant)]/30 rounded-lg px-4 py-2.5 text-white placeholder-[var(--color-on-primary-fixed-variant)] focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                      placeholder={t.contactFooter.firstNamePlaceholder}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-xs font-semibold mb-1.5 text-[var(--color-on-primary-fixed-variant)] uppercase tracking-wider"
                    >
                      {t.contactFooter.lastNameLabel}
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={formState.lastName}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, lastName: e.target.value }))
                      }
                      className="w-full bg-[var(--color-primary-container)] border border-[var(--color-on-primary-fixed-variant)]/30 rounded-lg px-4 py-2.5 text-white placeholder-[var(--color-on-primary-fixed-variant)] focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                      placeholder={t.contactFooter.lastNamePlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold mb-1.5 text-[var(--color-on-primary-fixed-variant)] uppercase tracking-wider"
                  >
                    {t.contactFooter.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    className="w-full bg-[var(--color-primary-container)] border border-[var(--color-on-primary-fixed-variant)]/30 rounded-lg px-4 py-2.5 text-white placeholder-[var(--color-on-primary-fixed-variant)] focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                    placeholder={t.contactFooter.emailPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold mb-1.5 text-[var(--color-on-primary-fixed-variant)] uppercase tracking-wider"
                  >
                    {t.contactFooter.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className="w-full bg-[var(--color-primary-container)] border border-[var(--color-on-primary-fixed-variant)]/30 rounded-lg px-4 py-2.5 text-white placeholder-[var(--color-on-primary-fixed-variant)] focus:outline-none focus:border-[var(--color-secondary)] transition-colors resize-none"
                    placeholder={t.contactFooter.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  id="contact-send"
                  className="w-full sm:w-auto bg-[var(--color-secondary)] text-[var(--color-on-secondary)] px-10 py-3.5 rounded-lg font-bold hover:bg-[var(--color-secondary)]/90 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  {t.contactFooter.sendMessageBtn}
                </button>
              </form>
            )}
          </div>

          {/* Contact details */}
          <div className="flex flex-col justify-center gap-8">
            <h3 className="text-2xl font-semibold text-[var(--color-secondary-fixed)]">
              {t.contactFooter.organizerTitle}
            </h3>
            {contactItems.map((c) => (
              <div key={c.icon} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--color-secondary)]/20 rounded-full flex items-center justify-center text-[var(--color-secondary-fixed)] flex-shrink-0">
                  <span className="material-symbols-outlined">{c.icon}</span>
                </div>
                <div>
                  <p className="font-bold text-base">{c.title}</p>
                  <p className="text-sm text-[var(--color-on-primary-fixed-variant)]">
                    {c.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1 flex flex-col gap-3">
            <div className="flex items-center gap-2 font-bold text-xl text-[var(--color-secondary-fixed)]">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                medical_services
              </span>
              MEDBX
            </div>
            <p className="text-sm text-[var(--color-on-primary-fixed-variant)] leading-relaxed max-w-xs">
              {t.contactFooter.brandDesc}
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-primary-fixed-variant)] mb-1">
              {t.contactFooter.quickLinksTitle}
            </p>
            <a
              href="#contact"
              className="text-sm text-[var(--color-on-primary-fixed-variant)] hover:text-[var(--color-secondary-fixed)] transition-colors opacity-80 hover:opacity-100"
            >
              {t.contactFooter.contactUs}
            </a>
            <a
              href="#"
              className="text-sm text-[var(--color-on-primary-fixed-variant)] hover:text-[var(--color-secondary-fixed)] transition-colors opacity-80 hover:opacity-100"
            >
              {t.contactFooter.privacyPolicy}
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-primary-fixed-variant)] mb-1">
              {t.contactFooter.legalTitle}
            </p>
            <a
              href="#"
              className="text-sm text-[var(--color-on-primary-fixed-variant)] hover:text-[var(--color-secondary-fixed)] transition-colors opacity-80 hover:opacity-100"
            >
              {t.contactFooter.termsOfService}
            </a>
            <a
              href="#"
              className="text-sm text-[var(--color-on-primary-fixed-variant)] hover:text-[var(--color-secondary-fixed)] transition-colors opacity-80 hover:opacity-100"
            >
              {t.contactFooter.faqLink}
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-primary-fixed-variant)] mb-1">
              {t.contactFooter.followUsTitle}
            </p>
            <div className="flex gap-3">
              {["public", "mail", "photo_camera"].map((icon) => (
                <button
                  key={icon}
                  aria-label={icon}
                  className="w-9 h-9 rounded-full bg-[var(--color-primary-container)] flex items-center justify-center text-[var(--color-on-primary-fixed-variant)] hover:text-[var(--color-secondary-fixed)] hover:bg-[var(--color-secondary)]/20 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">
                    {icon}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-on-primary-fixed-variant)]/20 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[var(--color-on-primary-fixed-variant)] opacity-70">
            {t.contactFooter.copyright}
          </p>
          <p className="text-xs text-[var(--color-on-primary-fixed-variant)] opacity-50">
            {t.contactFooter.poweredBy}
          </p>
        </div>
      </div>
    </footer>
  );
}
