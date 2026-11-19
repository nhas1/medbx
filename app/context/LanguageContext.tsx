"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { en as homeEn, HomeDictionary } from "../dictionaries/home/en";
import { ar as homeAr } from "../dictionaries/home/ar";
import { en as sponsorsEn, SponsorsDictionary } from "../dictionaries/sponsors/en";
import { ar as sponsorsAr } from "../dictionaries/sponsors/ar";
import { en as newsEn, NewsDictionary } from "../dictionaries/news/en";
import { ar as newsAr } from "../dictionaries/news/ar";
import { en as valueEn, ValueDictionary } from "../dictionaries/value/en";
import { ar as valueAr } from "../dictionaries/value/ar";
import { en as registerEn, RegisterDictionary } from "../dictionaries/register/en";
import { ar as registerAr } from "../dictionaries/register/ar";

export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";
export type Dictionary = HomeDictionary &
  SponsorsDictionary &
  NewsDictionary &
  ValueDictionary &
  RegisterDictionary;

const en: Dictionary = {
  ...homeEn,
  ...sponsorsEn,
  ...newsEn,
  ...valueEn,
  ...registerEn,
};

const ar: Dictionary = {
  ...homeAr,
  ...sponsorsAr,
  ...newsAr,
  ...valueAr,
  ...registerAr,
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
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>("ar");

  useEffect(() => {
    if (localStorage.getItem("medbx_locale") === "en") {
      localStorage.removeItem("medbx_locale");
    }
    const savedLocale = sessionStorage.getItem("medbx_locale") as Locale | null;
    if (savedLocale === "en" || savedLocale === "ar") {
      // Persisted client preference is intentionally restored after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(savedLocale);
    }
  }, []);

  const dir: Direction = locale === "ar" ? "rtl" : "ltr";
  const t: Dictionary = locale === "ar" ? ar : en;

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    sessionStorage.setItem("medbx_locale", newLocale);
    document.cookie = `medbx_locale=${newLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
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
