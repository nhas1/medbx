"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en as homeEn, HomeDictionary } from "../dictionaries/home/en";
import { ar as homeAr } from "../dictionaries/home/ar";
import { en as sponsorsEn, SponsorsDictionary } from "../dictionaries/sponsors/en";
import { ar as sponsorsAr } from "../dictionaries/sponsors/ar";
import { en as newsEn, NewsDictionary } from "../dictionaries/news/en";
import { ar as newsAr } from "../dictionaries/news/ar";
import { en as valueEn, ValueDictionary } from "../dictionaries/value/en";
import { ar as valueAr } from "../dictionaries/value/ar";

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";
export type Dictionary = HomeDictionary &
  SponsorsDictionary &
  NewsDictionary &
  ValueDictionary;

const en: Dictionary = {
  ...homeEn,
  ...sponsorsEn,
  ...newsEn,
  ...valueEn,
};

const ar: Dictionary = {
  ...homeAr,
  ...sponsorsAr,
  ...newsAr,
  ...valueAr,
};

interface LanguageContextType {
  locale: Locale;
  dir: Direction;
  t: Dictionary;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  // Ensure default is always Arabic on app open
  useEffect(() => {
    // Remove old saved 'en' from localStorage so opening the app starts in Arabic
    if (localStorage.getItem("medbx_locale") === "en") {
      localStorage.removeItem("medbx_locale");
    }
    const savedLocale = sessionStorage.getItem("medbx_locale") as Locale | null;
    if (savedLocale === "en" || savedLocale === "ar") {
      setLocaleState(savedLocale);
    }
  }, []);

  const dir: Direction = locale === "ar" ? "rtl" : "ltr";
  const t: Dictionary = locale === "ar" ? ar : en;

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    sessionStorage.setItem("medbx_locale", newLocale);
  };

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    setLocale(nextLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.title = locale === "ar" ? "منتدى ميدبكس" : "MedBX Forum";
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
