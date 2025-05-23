"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import enMessages from "@/lang/en.json";
import deMessages from "@/lang/de.json";
import droidMessages from "@/lang/driod.json";

const messages = {
  en: enMessages,
  de: deMessages,
  droid: droidMessages,
};

type Locale = "en" | "de" | "droid";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (
    key: string,
    options?: { fallback?: string; params?: Record<string, string | number> }
  ) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Try to get saved locale from localStorage
    const savedLocale = localStorage.getItem("locale") as Locale | null;

    if (savedLocale && ["en", "de"].includes(savedLocale)) {
      setLocale(savedLocale);
    } else {
      // Check browser language
      const browserLang = navigator.language.split("-")[0];
      setLocale(browserLang === "de" ? "de" : "en");
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("locale", locale);
      document.documentElement.lang = locale;
    }
  }, [locale, isClient]);

  const t = (
    key: string,
    options?: { fallback?: string; params?: Record<string, string | number> }
  ) => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = messages[locale];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    if (value === undefined) {
      return options?.fallback || key;
    }

    if (options?.params && typeof value === "string") {
      return Object.entries(options.params).reduce(
        (str, [paramKey, paramValue]) =>
          str.replace(`{${paramKey}}`, String(paramValue)),
        value
      );
    }

    return value;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
