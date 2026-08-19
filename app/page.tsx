"use client";

import { motion } from "framer-motion";
import { Users, Store, Award } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import BrandMarquee from "@/components/BrandMarquee";
import GalleryCarousel from "@/components/GalleryCarousel";
import AwardsMarquee from "@/components/AwardsMarquee";
import { img } from "@/lib/img";
import { useTypography } from "@/lib/typography";

const STATS_ICONS = [Users, Store, Award] as const;

export default function Home() {
  const { t, locale } = useLanguage();
  const typo = useTypography();
  const isEn = locale === "en";
  const stats = [t.home.stats.item1, t.home.stats.item2, t.home.stats.item3];
  const { intro } = t.home;

  return (
    <main>
      {/* ────────────────────────────────────────
          Section 1 — Banner
      ──────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: typo.heroHeight }}
      >
        <Image
          src={img("/images/bg.jpg")}
          alt={t.home.hero.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className={`absolute inset-0 ${isEn ? typo.heroOverlay : "bg-black/40"}`}
        />
        <div className="absolute inset-0 flex items-center justify-center pt-16 md:pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`mx-auto px-6 text-center ${typo.heroTitleColor} ${typo.heroTitle} ${typo.measureHeroHeading}`}
          >
            {t.home.hero.title}
          </motion.h1>
        </div>
      </div>

      {/* ────────────────────────────────────────
          Section 2 — Company Introduction
      ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[var(--color-background)]">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          {isEn ? (
            /* Heading left, copy right, one empty column between — the two
               blocks balance each other instead of stranding the right half. */
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-8"
            >
              <div className="lg:col-span-5">
                <p className={`text-[var(--color-theme)] ${typo.kicker}`}>
                  {intro.label}
                </p>
                <h2 className={`mt-4 ${typo.titleColor} ${typo.sectionTitle}`}>
                  {intro.title}
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className={`${typo.bodyColor} ${typo.body}`}>{intro.body}</p>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`${typo.editorialAlign} ${typo.titleColor} ${typo.sectionTitle}`}
              >
                {intro.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
                className={`mt-8 md:mt-10 ${typo.bodyColor} ${typo.bodyBlock}`}
              >
                {intro.body}
              </motion.p>
            </>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────
          Section 3 — Stats Cards
      ──────────────────────────────────────── */}
      <section className={`py-20 md:py-32 ${typo.surfaceBg}`}>
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          {isEn ? (
            /* One composed panel rather than three detached cards. */
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex flex-col divide-y overflow-hidden sm:flex-row sm:divide-x sm:divide-y-0 ${typo.panel} ${typo.panelDivide}`}
            >
              {stats.map((item, i) => {
                const Icon = STATS_ICONS[i];
                return (
                  <div
                    key={i}
                    className="flex flex-1 flex-col items-center px-6 py-10 text-center md:px-8 md:py-14"
                  >
                    <Icon
                      className="h-7 w-7 text-[var(--color-highlight)] md:h-8 md:w-8"
                      strokeWidth={1.5}
                    />
                    <span
                      className={`mt-5 text-[2.5rem] leading-none sm:text-[3rem] md:text-[3.25rem] ${typo.statValueColor} ${typo.statValue}`}
                    >
                      {item.number}
                    </span>
                    <span className={`mt-3 ${typo.bodyColor} ${typo.statLabelLg}`}>
                      {item.desc}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              {stats.map((item, i) => {
                const Icon = STATS_ICONS[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: i * 0.15,
                    }}
                    className="flex flex-col items-center text-center"
                  >
                    <Icon
                      className="w-12 h-12 text-[var(--color-highlight)]"
                      strokeWidth={1.4}
                    />
                    <span
                      className={`mt-6 text-4xl sm:text-5xl md:text-6xl ${typo.statValueColor} ${typo.statValue}`}
                    >
                      {item.number}
                    </span>
                    <span className={`mt-4 ${typo.bodyColor} ${typo.statLabelLg}`}>
                      {item.desc}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────
          Section 4 — Brand Marquee
      ──────────────────────────────────────── */}
      <BrandMarquee />

      {/* ────────────────────────────────────────
          Section 5 — Featured Cases carousel
      ──────────────────────────────────────── */}
      <GalleryCarousel />

      {/* ────────────────────────────────────────
          Section 6 — Awards marquee
      ──────────────────────────────────────── */}
      <AwardsMarquee />
    </main>
  );
}
