"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, type Locale } from "@/contexts/LanguageContext";

const NAV_KEYS = [
  { key: "about" as const, href: "/about" },
  { key: "business" as const, href: "/business" },
  { key: "gallery" as const, href: "/gallery" },
  { key: "awards" as const, href: "/awards" },
  { key: "news" as const, href: "/news" },
  { key: "contact" as const, href: "/contact" },
  { key: "careers" as const, href: "/careers" },
];

// Nav items that expand into an in-page anchor sub-menu on hover (desktop) / tap (mobile)
const SUBMENU_KEYS = ["about", "business"] as const;
type SubmenuKey = (typeof SUBMENU_KEYS)[number];

const LOCALES: { value: Locale; label: string }[] = [
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
];

const NAV_TRANSITION = {
  duration: 0.55,
  ease: [0.25, 0.46, 0.45, 0.94],
} as const;

type ScrollState = { scrolled: boolean; dir: "up" | "down" };

const AT_TOP: ScrollState = { scrolled: false, dir: "up" };

/**
 * Window scroll as an external store, so the bar can reflect a restored scroll
 * position on mount without a render-then-correct pass.
 */
const scrollStore = (() => {
  const listeners = new Set<() => void>();
  let state: ScrollState = AT_TOP;
  let lastY = 0;

  function read() {
    const y = window.scrollY;
    // 5px dead zone, avoids jitter from micro-scrolls
    if (Math.abs(y - lastY) < 5) return;
    const dir = y > lastY ? "down" : "up";
    lastY = y;
    const scrolled = y > 24;
    if (scrolled === state.scrolled && dir === state.dir) return;
    state = { scrolled, dir };
    listeners.forEach((l) => l());
  }

  return {
    subscribe(listener: () => void) {
      if (listeners.size === 0) {
        lastY = window.scrollY;
        state = window.scrollY > 24 ? { scrolled: true, dir: "up" } : AT_TOP;
      }
      listeners.add(listener);
      window.addEventListener("scroll", read, { passive: true });
      return () => {
        listeners.delete(listener);
        window.removeEventListener("scroll", read);
      };
    },
    getSnapshot: () => state,
    getServerSnapshot: () => AT_TOP,
  };
})();

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();

  // Returns true when this nav item should be highlighted as current page.
  const isActive = useCallback(
    (href: string) => href !== "/" && pathname.startsWith(href),
    [pathname]
  );

  // Clicking a top-level link while already on that page scrolls back to the top.
  const handleTopLinkClick = useCallback(
    (href: string) => (e: React.MouseEvent) => {
      if (href === pathname) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pathname]
  );
  const { scrolled, dir: scrollDir } = useSyncExternalStore(
    scrollStore.subscribe,
    scrollStore.getSnapshot,
    scrollStore.getServerSnapshot
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<SubmenuKey | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState<SubmenuKey | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const menuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSubmenu = useCallback((key: SubmenuKey) => {
    if (menuTimer.current) clearTimeout(menuTimer.current);
    setOpenMenu(key);
  }, []);

  const closeSubmenu = useCallback(() => {
    if (menuTimer.current) clearTimeout(menuTimer.current);
    // small delay so moving cursor from trigger into the panel doesn't dismiss it
    menuTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }, []);

  // in-page anchor sub-links per nav key (labels resolved from current locale)
  const SUBLINKS: Record<SubmenuKey, { hash: string; label: string }[]> = {
    about: [
      { hash: "company", label: t.about.company.title },
      { hash: "leadership", label: t.about.leadership.title },
      { hash: "investor", label: t.about.investor.title },
    ],
    business: [
      { hash: "overview", label: t.business.overview.title },
      { hash: "brands", label: t.business.brands.navLabel },
      { hash: "airports", label: t.business.airports.title },
    ],
  };

  // `overflow: hidden` alone does not stop rubber-band scrolling in iOS Safari,
  // so the body is pinned at its current offset and restored on close.
  useEffect(() => {
    if (!mobileOpen) return;
    const { body } = document;
    const offsetY = window.scrollY;
    body.style.position = "fixed";
    body.style.top = `-${offsetY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      window.scrollTo(0, offsetY);
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onPointerOutside(e: Event) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerOutside);
    document.addEventListener("touchstart", onPointerOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointerOutside);
      document.removeEventListener("touchstart", onPointerOutside);
    };
  }, []);

  function handleLocaleChange(loc: Locale) {
    setLocale(loc);
    setLangOpen(false);
  }

  // narrow when user is scrolling down and is not at the very top
  const isNarrow = scrollDir === "down" && scrolled;

  return (
    <>
      {/*
        Outer: full-width fixed placeholder (invisible, pointer-events-none).
        Inner: the visible frosted bar that animates its horizontal margins.
      */}
      <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <motion.div
          animate={{
            paddingTop: isNarrow ? "0rem" : "0rem",
            paddingBottom: isNarrow ? "0rem" : "0rem",
          }}
          transition={NAV_TRANSITION}
          className={`
            pointer-events-auto
            backdrop-blur-xl bg-white/55
            border-b border-white/30
            transition-shadow duration-500
            ${scrolled ? "shadow-lg shadow-black/[0.06]" : "shadow-sm shadow-black/[0.03]"}
          `}
        >
          {/*
            3-col grid: [logo] [nav-center] [right-controls]
            Logo pinned left, nav truly centered, globe pinned right.
          */}
          <div className="mx-auto max-w-7xl px-safe grid grid-cols-[1fr_auto_1fr] items-stretch h-16 md:h-24">

            {/* Col 1 — Logo (left) — full-height, no padding */}
            <Link
              href="/"
              onClick={handleTopLinkClick("/")}
              className="flex items-center justify-start h-full overflow-visible py-2 md:py-0"
              aria-label={t.nav.home}
            >
              <Image
                src="/logos/tgu-logo-full.svg"
                alt="TGU Logo"
                width={255}
                height={105}
                priority
                className="h-[2.55rem] w-auto object-contain object-left md:h-[5.95rem] origin-left"
              />
            </Link>

            {/* Col 2 — Desktop nav links (center) */}
            <ul className="hidden md:flex items-center gap-0.5">
              {NAV_KEYS.map(({ key, href }) => {
                const subKey = (SUBMENU_KEYS as readonly string[]).includes(key)
                  ? (key as SubmenuKey)
                  : null;

                if (subKey) {
                  const isOpen = openMenu === subKey;
                  return (
                    <li
                      key={key}
                      className="relative"
                      onMouseEnter={() => openSubmenu(subKey)}
                      onMouseLeave={closeSubmenu}
                    >
                      <Link
                        href={href}
                        onClick={handleTopLinkClick(href)}
                        className={`
                          flex items-center gap-1 px-4 py-2 text-base font-medium rounded-md
                          transition-colors duration-200
                          hover:text-[#7d0e0e] hover:bg-[#7d0e0e]/5
                          ${isActive(href)
                            ? "text-[#7d0e0e] font-semibold"
                            : "text-gray-700"}
                        `}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                      >
                        {t.nav[key]}
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </Link>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.16 }}
                            className="
                              absolute left-1/2 -translate-x-1/2 top-full mt-2 w-44 py-1.5
                              rounded-xl border border-white/40
                              bg-white/85 backdrop-blur-xl
                              shadow-lg shadow-black/5
                              overflow-hidden
                            "
                          >
                            {SUBLINKS[subKey].map(({ hash, label }) => (
                              <li key={hash}>
                                <Link
                                  href={`${href}#${hash}`}
                                  onClick={() => setOpenMenu(null)}
                                  className="
                                    block px-4 py-2.5 text-sm text-gray-700
                                    transition-colors duration-150
                                    hover:text-[#7d0e0e] hover:bg-[#7d0e0e]/8
                                  "
                                >
                                  {label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <li key={key}>
                    <Link
                      href={href}
                      onClick={handleTopLinkClick(href)}
                      className={`
                        px-4 py-2 text-base font-medium rounded-md
                        transition-colors duration-200
                        hover:text-[#7d0e0e] hover:bg-[#7d0e0e]/5
                        ${isActive(href)
                          ? "text-[#7d0e0e] font-semibold"
                          : "text-gray-700"}
                      `}
                    >
                      {t.nav[key]}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Col 3 — Right: language switcher + mobile menu */}
            <div className="col-start-3 flex items-center gap-2 justify-end">

              {/* Language dropdown */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="
                    flex items-center gap-1.5 px-3 py-2 rounded-md text-base
                    font-medium text-gray-700
                    transition-colors duration-200
                    hover:text-[#7d0e0e] hover:bg-[#7d0e0e]/5
                  "
                  aria-label={t.lang.label}
                  aria-expanded={langOpen}
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {locale === "zh" ? t.lang.zh : t.lang.en}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="
                        absolute right-0 mt-2 w-32 py-1
                        rounded-xl border border-white/40
                        bg-white/80 backdrop-blur-xl
                        shadow-lg shadow-black/5
                        overflow-hidden
                      "
                    >
                      {LOCALES.map(({ value, label }) => (
                        <li key={value}>
                          <button
                            onClick={() => handleLocaleChange(value)}
                            className={`
                              w-full px-4 py-2.5 text-left text-sm
                              transition-colors duration-150
                              ${
                                locale === value
                                  ? "text-[#7d0e0e] font-semibold bg-[#7d0e0e]/8"
                                  : "text-gray-700 hover:bg-gray-50"
                              }
                            `}
                          >
                            {label}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden flex items-center justify-center w-11 h-11 -mr-1 rounded-md text-[#7d0e0e] hover:bg-[#7d0e0e]/5 transition-colors"
                aria-label={t.nav.menu}
              >
                <Menu className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile slide-out panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="
                fixed top-0 right-0 z-50 h-dvh w-3/4 max-w-xs
                border-l border-white/20
                bg-white/80 backdrop-blur-2xl
                md:hidden flex flex-col
              "
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
                <Link
                  href="/"
                  onClick={(e) => {
                    handleTopLinkClick("/")(e);
                    setMobileOpen(false);
                  }}
                  aria-label={t.nav.home}
                >
                  <Image
                    src="/logos/tgu-logo-full.svg"
                    alt="TGU Logo"
                    width={119}
                    height={49}
                    className="h-[1.9125rem] w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-11 h-11 -mr-2 rounded-md text-[#7d0e0e] hover:bg-[#7d0e0e]/5 transition-colors"
                  aria-label={t.nav.closeMenu}
                >
                  <X className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>

              {/* Mobile links */}
              <nav className="flex flex-col items-center gap-1 px-4 mt-6 flex-1 overflow-y-auto">
                {NAV_KEYS.map(({ key, href }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.08, duration: 0.25 }}
                    className="w-full"
                  >
                    {(SUBMENU_KEYS as readonly string[]).includes(key) ? (
                      (() => {
                        const subKey = key as SubmenuKey;
                        const isOpen = mobileSubOpen === subKey;
                        return (
                          <div className="w-full">
                            <div className="flex items-center justify-center">
                              <Link
                                href={href}
                                onClick={(e) => {
                                  handleTopLinkClick(href)(e);
                                  setMobileOpen(false);
                                }}
                                className={`
                                  flex-1 text-center py-3 text-base font-medium
                                  rounded-lg transition-colors duration-200
                                  hover:text-[#7d0e0e] hover:bg-[#7d0e0e]/5
                                  ${isActive(href)
                                    ? "text-[#7d0e0e] font-semibold"
                                    : "text-gray-700"}
                                `}
                              >
                                {t.nav[key]}
                              </Link>
                              <button
                                onClick={() =>
                                  setMobileSubOpen((v) => (v === subKey ? null : subKey))
                                }
                                className="flex items-center justify-center w-11 h-11 shrink-0 rounded-md text-gray-500 hover:text-[#7d0e0e] hover:bg-[#7d0e0e]/5 transition-colors"
                                aria-label={t.nav[key]}
                                aria-expanded={isOpen}
                              >
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                />
                              </button>
                            </div>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  {SUBLINKS[subKey].map(({ hash, label }) => (
                                    <Link
                                      key={hash}
                                      href={`${href}#${hash}`}
                                      onClick={() => {
                                        setMobileSubOpen(null);
                                        setMobileOpen(false);
                                      }}
                                      className="
                                        block w-full text-center py-2.5 text-sm
                                        text-gray-500 rounded-lg
                                        transition-colors duration-200
                                        hover:text-[#7d0e0e] hover:bg-[#7d0e0e]/5
                                      "
                                    >
                                      {label}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })()
                    ) : (
                      <Link
                        href={href}
                        onClick={(e) => {
                          handleTopLinkClick(href)(e);
                          setMobileOpen(false);
                        }}
                        className={`
                          block w-full text-center py-3 text-base font-medium
                          rounded-lg transition-colors duration-200
                          hover:text-[#7d0e0e] hover:bg-[#7d0e0e]/5
                          ${isActive(href)
                            ? "text-[#7d0e0e] font-semibold"
                            : "text-gray-700"}
                        `}
                      >
                        {t.nav[key]}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Mobile language toggle */}
              <div className="px-4 pb-safe pt-4 border-t border-white/20 mt-4">
                <p className="text-xs text-gray-400 text-center mb-3">
                  {t.lang.label}
                </p>
                <div className="flex rounded-lg overflow-hidden border border-gray-200">
                  {LOCALES.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => handleLocaleChange(value)}
                      className={`
                        flex-1 py-3 text-sm font-medium transition-colors duration-200
                        ${
                          locale === value
                            ? "bg-[#7d0e0e] text-white"
                            : "bg-white/60 text-gray-600 hover:bg-[#7d0e0e]/5"
                        }
                      `}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
