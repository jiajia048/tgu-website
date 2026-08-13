"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Variants,
} from "framer-motion";
import {
  Clock,
  Coffee,
  Handshake,
  Megaphone,
  Soup,
  Users,
  Utensils,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { img } from "@/lib/img";
import {
  BRANDS,
  MAIN_ORDER,
  SUBS_BY_MAIN,
  type MainCat,
  type SubKey,
} from "@/data/brands";

/* ════════════════════════════════════════
    Icons
════════════════════════════════════════ */

const MAIN_ICONS: Record<MainCat, LucideIcon> = {
  chinese: Utensils,
  asian: Soup,
  cafe_bakery_desserts: Coffee,
  western: UtensilsCrossed,
};

// Win-win column icons: travellers → brands → airports
const WINWIN_ICONS = [Users, Megaphone, Handshake] as const;

/* ════════════════════════════════════════
    Motion variants
════════════════════════════════════════ */

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const STAGGER_PARENT: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const FADE_VAR: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const CARD_VAR: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

/* ════════════════════════════════════════
    Shared section heading
════════════════════════════════════════ */

function SectionHeading({
  title,
  subtitle,
  body,
}: {
  title: string;
  subtitle?: string;
  body?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={STAGGER_PARENT}
      className="text-center"
    >
      <motion.h2
        variants={FADE_UP}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="font-serif text-2xl font-bold leading-snug tracking-tight text-[var(--color-title)] md:text-3xl lg:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          variants={FADE_UP}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-4 text-base font-medium tracking-wide text-[var(--color-theme)] md:mt-5 md:text-lg"
        >
          {subtitle}
        </motion.p>
      ) : null}
      {body ? (
        <motion.p
          variants={FADE_UP}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-3xl text-sm leading-loose tracking-wide text-[var(--color-body)] md:mt-8 md:text-base md:leading-loose"
        >
          {body}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

/* ════════════════════════════════════════
    Page
════════════════════════════════════════ */

export default function BusinessPage() {
  const { t } = useLanguage();
  const { overview, brands, airports } = t.business;

  const [mainActive, setMainActive] = useState<MainCat>("chinese");
  const [subActive, setSubActive] = useState<SubKey | "all">("all");

  function handleMainChange(m: MainCat) {
    if (m === mainActive) return;
    setMainActive(m);
    setSubActive("all");
  }

  const filtered = useMemo(
    () =>
      BRANDS.filter(
        (b) =>
          b.mainCategory === mainActive &&
          (subActive === "all" || b.subCategory === subActive)
      ),
    [mainActive, subActive]
  );

  return (
    <main className="bg-[var(--color-background)]">

      {/* ════════════════════════════════════════
          Banner — full-width image hero
      ════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(220px, 36vw, 480px)" }}>
        <Image
          src={img("/images/business/bg.jpg")}
          alt="途捷餐饮 公司业务"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 md:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="font-serif text-3xl font-bold tracking-widest text-white md:text-4xl lg:text-5xl"
          >
            {overview.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
            className="mt-3 max-w-xl px-6 text-center text-sm tracking-wide text-white/80 md:mt-4 md:text-base lg:text-lg"
          >
            {overview.bannerDesc}
          </motion.p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          Section 01 — Overview: three-way win bar only
      ════════════════════════════════════════ */}
      <section
        id="overview"
        className="scroll-mt-20 bg-white pt-16 pb-20 md:scroll-mt-28 md:pt-24 md:pb-32"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-8">

          {/* Descriptive body paragraph */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={FADE_UP}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-sm leading-loose tracking-wide text-[var(--color-body)] md:text-base md:leading-loose"
          >
            {overview.body}
          </motion.p>

          {/* Three-way win-win bar: icon → coloured title → desc */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={STAGGER_PARENT}
            className="mt-14 grid grid-cols-1 divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5 md:mt-20 md:grid-cols-3 md:divide-x md:divide-y-0"
          >
            {overview.winwin.map((col, i) => {
              const Icon = WINWIN_ICONS[i];
              return (
                <motion.div
                  key={i}
                  variants={FADE_UP}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="flex flex-col items-center px-7 py-8 text-center md:px-8 md:py-10"
                >
                  <Icon
                    className="h-9 w-9 text-[var(--color-highlight)] md:h-10 md:w-10"
                    strokeWidth={1.5}
                  />
                  <p className="mt-4 font-serif text-base font-semibold tracking-widest text-[var(--color-theme)] md:text-lg">
                    {col.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed tracking-wide text-[var(--color-body)] md:text-base">
                    {col.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          Section 02 — Partner brands (existing matrix, untouched logic)
      ════════════════════════════════════════ */}
      <section
        id="brands"
        className="scroll-mt-20 bg-[var(--color-surface)] py-20 md:scroll-mt-28 md:py-32"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <SectionHeading title={brands.title} subtitle={brands.subtitle} />

          {/* ── Main tabs ── */}
          <motion.div
            variants={FADE_VAR}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 flex flex-wrap items-center justify-center gap-2 md:mt-16 md:gap-3"
          >
            {MAIN_ORDER.map((m) => {
              const Icon = MAIN_ICONS[m];
              const isActive = mainActive === m;
              return (
                <button
                  key={m}
                  onClick={() => handleMainChange(m)}
                  aria-pressed={isActive}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full
                    text-sm md:text-base font-medium tracking-wide
                    transition-all duration-300 ease-out
                    ${isActive
                      ? "bg-[var(--color-theme)] text-white shadow-md shadow-[var(--color-theme)]/20"
                      : "bg-white text-[var(--color-body)] hover:bg-[var(--color-theme)]/10 hover:text-[var(--color-theme)]"}
                  `}
                >
                  <Icon className="w-4 h-4" strokeWidth={2} />
                  <span>{t.business.portfolio.filter.main[m]}</span>
                </button>
              );
            })}
          </motion.div>

          {/* ── Sub tags ── */}
          <div className="mt-6 flex justify-center min-h-[44px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={mainActive}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="flex flex-wrap items-center justify-center gap-2"
              >
                {(["all", ...SUBS_BY_MAIN[mainActive]] as const).map((s) => {
                  const isActive = subActive === s;
                  const label =
                    s === "all"
                      ? t.business.portfolio.filter.all
                      : t.business.portfolio.filter.sub[s as SubKey];
                  return (
                    <button
                      key={s}
                      onClick={() => setSubActive(s)}
                      aria-pressed={isActive}
                      className={`
                        px-3.5 py-1.5 rounded-full
                        text-xs md:text-sm font-medium tracking-wide
                        transition-all duration-300 ease-out
                        ${isActive
                          ? "bg-[var(--color-theme)] text-white"
                          : "bg-white text-[var(--color-body)] hover:bg-[var(--color-theme)]/10 hover:text-[var(--color-theme)]"}
                      `}
                    >
                      {label}
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Logo grid ── */}
          <LayoutGroup>
            <motion.ul
              layout
              className="mt-10 md:mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((brand) => (
                  <motion.li
                    key={brand.id}
                    layout
                    variants={CARD_VAR}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ scale: 1.05 }}
                    className="
                      group relative aspect-[3/2] overflow-hidden rounded-xl
                      bg-white
                      shadow-sm transition-shadow duration-300
                      hover:shadow-lg
                    "
                  >
                    <div className="absolute inset-3">
                      <Image
                        src={img(brand.logoPath)}
                        alt={brand.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                        className="object-contain"
                      />
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>
        </div>
      </section>

      {/* ════════════════════════════════════════
          Section 03 — Signature airports (white bg, 2×2 cards)
      ════════════════════════════════════════ */}
      <section
        id="airports"
        className="scroll-mt-20 bg-white py-20 md:scroll-mt-28 md:py-32"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <SectionHeading
            title={airports.title}
            subtitle={airports.subtitle}
            body={airports.body}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={STAGGER_PARENT}
            className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-8"
          >
            {airports.items.map((ap) => (
              <motion.article
                key={ap.code}
                variants={FADE_UP}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 320, damping: 22 } }}
                style={{ originX: 0.5, originY: 0.5 }}
                className="group overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Photo: 16:9 crop, identical ratio across all cards */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={img(ap.image)}
                    alt={ap.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium tracking-wider text-[var(--color-theme)] uppercase backdrop-blur-sm">
                    {airports.badge}
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-serif text-xl font-bold text-[var(--color-title)] md:text-2xl">
                      {ap.name}
                    </h3>
                    <span className="text-base font-bold tracking-wider text-[var(--color-theme)] md:text-lg">
                      {ap.code}
                    </span>
                  </div>
                  {ap.subname ? (
                    <p className="mt-1.5 text-sm text-[var(--color-body)]/50">{ap.subname}</p>
                  ) : null}

                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-body)] md:text-base">
                    {ap.desc}
                  </p>

                  <div className="mt-6 grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 border-t border-gray-100 pt-5">
                    {[
                      { label: airports.labels.terminal, value: ap.terminal },
                      { label: airports.labels.brand, value: ap.brand },
                    ].map((d, idx) => (
                      <div key={idx}>
                        <p className="text-[11px] tracking-wider text-[var(--color-body)]/40 uppercase">
                          {d.label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-[var(--color-title)]">
                          {d.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Pipeline — airports in preparation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={STAGGER_PARENT}
            className="mt-8 rounded-2xl border border-dashed border-[var(--color-theme)]/30 bg-[var(--color-surface)] p-6 md:mt-10 md:p-8"
          >
            <motion.div
              variants={FADE_UP}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
            >
              <div className="md:max-w-sm">
                <div className="flex items-center gap-2.5">
                  <Clock
                    className="h-4 w-4 text-[var(--color-theme)]"
                    strokeWidth={1.8}
                  />
                  <span className="text-[11px] font-medium tracking-wider text-[var(--color-theme)] uppercase">
                    {airports.comingSoon.label}
                  </span>
                </div>
                <p className="mt-3 font-serif text-lg font-bold tracking-tight text-[var(--color-title)] md:text-xl">
                  {airports.comingSoon.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]/70">
                  {airports.comingSoon.note}
                </p>
              </div>

              <ul className="flex flex-wrap gap-3 md:flex-1 md:justify-end">
                {airports.comingSoon.items.map((ap) => (
                  <li
                    key={ap.code}
                    className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 ring-1 ring-black/5"
                  >
                    <span className="text-sm font-bold tracking-wider text-[var(--color-theme)]">
                      {ap.code}
                    </span>
                    <span className="text-sm text-[var(--color-title)]">
                      {ap.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
