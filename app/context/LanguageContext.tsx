"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en, Dictionary } from "../dictionaries/en";
import { ar } from "../dictionaries/ar";

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";

interface LanguageContextType {
  locale: Locale;
  dir: Direction;
  t: Dictionary;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Load saved preference if available
  useEffect(() => {
    const savedLocale = localStorage.getItem("medbx_locale") as Locale | null;
    if (savedLocale === "en" || savedLocale === "ar") {
      setLocaleState(savedLocale);
    }
  }, []);

  const dir: Direction = locale === "ar" ? "rtl" : "ltr";
  const t: Dictionary = locale === "ar" ? ar : en;

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("medbx_locale", newLocale);
  };

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    setLocale(nextLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <LanguageContext.Provider value={{ locale, dir, t, toggleLocale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
