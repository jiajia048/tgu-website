"use client";

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";
import zh from "@/messages/zh.json";
import en from "@/messages/en.json";

export type Locale = "zh" | "en";

type Messages = typeof zh;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const messages: Record<Locale, Messages> = { zh, en };

const STORAGE_KEY = "tgu_locale";

/**
 * localStorage as an external store. Server and first hydration render always
 * resolve to "zh"; React re-renders with the stored value straight afterwards,
 * which keeps the prerendered markup and the hydrated tree in agreement.
 */
const localeStore = (() => {
  const listeners = new Set<() => void>();
  let cached: Locale | null = null;

  function notify() {
    listeners.forEach((l) => l());
  }

  function onStorage(e: StorageEvent) {
    if (e.key !== STORAGE_KEY) return;
    cached = null;
    notify();
  }

  return {
    subscribe(listener: () => void) {
      if (listeners.size === 0) window.addEventListener("storage", onStorage);
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0)
          window.removeEventListener("storage", onStorage);
      };
    },
    getSnapshot(): Locale {
      if (cached === null) {
        cached = localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "zh";
      }
      return cached;
    },
    getServerSnapshot(): Locale {
      return "zh";
    },
    write(next: Locale) {
      cached = next;
      localStorage.setItem(STORAGE_KEY, next);
      notify();
    },
  };
})();

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    localeStore.subscribe,
    localeStore.getSnapshot,
    localeStore.getServerSnapshot
  );

  // Mobile browsers pick CJK vs Latin font fallbacks and line-breaking rules
  // from this attribute, so it has to follow the active locale.
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => localeStore.write(next), []);

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t: messages[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
