"use client";

import { motion } from "framer-motion";
import { Users, Store, Award } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import BrandMarquee from "@/components/BrandMarquee";
import GalleryCarousel from "@/components/GalleryCarousel";
import AwardsMarquee from "@/components/AwardsMarquee";
import { img } from "@/lib/img";

const STATS_ICONS = [Users, Store, Award] as const;

export default function Home() {
  const { t } = useLanguage();
  const stats = [t.home.stats.item1, t.home.stats.item2, t.home.stats.item3];
  const { company } = t.about;

  return (
    <main>
      {/* ────────────────────────────────────────
          Section 1 — Banner
      ──────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(220px, 36vw, 480px)" }}>
        <Image
          src={img("/images/bg.jpg")}
          alt={t.home.hero.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center pt-16 md:pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-6 text-center font-serif text-3xl font-bold tracking-widest text-white md:text-4xl lg:text-5xl"
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
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center font-serif text-2xl font-bold leading-snug tracking-tight text-[var(--color-title)] md:text-3xl lg:text-4xl"
          >
            {company.subtitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
            className="mt-8 text-sm leading-loose tracking-wide text-[var(--color-body)] md:mt-10 md:text-base md:leading-loose md:text-justify"
          >
            {company.body}
          </motion.p>
        </div>
      </section>

      {/* ────────────────────────────────────────
          Section 3 — Stats Cards
      ──────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
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
                  <span className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-title)]">
                    {item.number}
                  </span>
                  <span className="mt-4 text-sm md:text-lg tracking-widest text-[var(--color-body)]">
                    {item.desc}
                  </span>
                </motion.div>
              );
            })}
          </div>
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
