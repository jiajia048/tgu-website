"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTypography } from "@/lib/typography";

const LEFT_NAV = [
  { key: "home" as const, href: "/" },
  { key: "about" as const, href: "/about" },
  { key: "business" as const, href: "/business" },
  { key: "gallery" as const, href: "/gallery" },
];

const RIGHT_NAV = [
  { key: "awards" as const, href: "/awards" },
  { key: "news" as const, href: "/news" },
  { key: "contact" as const, href: "/contact" },
  { key: "careers" as const, href: "/careers" },
];

export default function Footer() {
  const { t } = useLanguage();
  const typo = useTypography();

  return (
    <footer className={`mt-auto ${typo.inkBg}`}>
      {/* ── Upper: Nav + Logo ── */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-6">
          {/* Left nav */}
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-5 md:gap-x-6 gap-y-2 order-2 md:order-1">
            {LEFT_NAV.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className={`text-sm text-[var(--color-text-inverse)]/70 transition-colors duration-200 hover:text-[var(--color-highlight)] ${typo.uiLabel}`}
                >
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center logo */}
          <Link
            href="/"
            className="flex justify-center order-1 md:order-2"
            aria-label="TGU"
          >
            <Image
              src="/logos/tgu-logo.svg"
              alt="TGU Logo"
              width={160}
              height={56}
              className="h-10 md:h-12 w-auto object-contain brightness-0 invert opacity-90"
            />
          </Link>

          {/* Right nav */}
          <ul className="flex flex-wrap justify-center md:justify-end gap-x-5 md:gap-x-6 gap-y-2 order-3">
            {RIGHT_NAV.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className={`text-sm text-[var(--color-text-inverse)]/70 transition-colors duration-200 hover:text-[var(--color-highlight)] ${typo.uiLabel}`}
                >
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="border-t border-[var(--color-text-inverse)]/10" />
      </div>

      {/* ── Lower: Copyright + Contact ── */}
      <div
        className="mx-auto max-w-7xl px-6 md:px-8 pt-6 pb-6"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-[var(--color-text-inverse)]/50 ${typo.caption}`}
        >
          {/* Left — copyright & legal */}
          <p className="text-center md:text-left flex flex-wrap justify-center md:justify-start items-center gap-x-2 gap-y-1">
            <span>{t.footer.copyright}</span>
            <span className="hidden md:inline">|</span>
            <span className="hover:text-[var(--color-highlight)] transition-colors duration-200 cursor-pointer">
              {t.footer.privacy}
            </span>
            <span>|</span>
            <span className="hover:text-[var(--color-highlight)] transition-colors duration-200 cursor-pointer">
              {t.footer.terms}
            </span>
            <span>|</span>
            <span>{t.footer.icp}</span>
          </p>

          {/* Right — contact */}
          <a
            href="mailto:hanxl@tgu-asia.com"
            className="flex items-center gap-1.5 transition-colors duration-200 hover:text-[var(--color-highlight)]"
          >
            <Mail className="w-3.5 h-3.5 text-[var(--color-highlight)]" strokeWidth={1.6} />
            <span>{t.footer.contact}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
