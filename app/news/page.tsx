"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { img } from "@/lib/img";

type NewsKey = "n20260113" | "n20200114";

type NewsItem = {
  key: NewsKey;
  /** ISO date, used for sorting */
  date: string;
  cover: string;
  href: string;
};

/**
 * Raw news data.
 * Add new entries here — they'll be sorted by date desc automatically.
 */
const NEWS_DATA: NewsItem[] = [
  {
    key: "n20260113",
    date: "2026-01-13",
    cover: "/images/news/20260113.jpg",
    href: "https://mp.weixin.qq.com/s/Hn11TyJc4bdo7vtzk4ggHQ",
  },
  {
    key: "n20200114",
    date: "2020-01-14",
    cover: "/images/news/20200114.jpg",
    href: "https://mp.weixin.qq.com/s/YtatL3n7hWjoK1ZhcqQmBg",
  },
];

/** Sort news by date, newest first. */
function sortByDateDesc(items: NewsItem[]): NewsItem[] {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

const GRID_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function NewsPage() {
  const { t } = useLanguage();
  const sorted = sortByDateDesc(NEWS_DATA);

  return (
    <main className="bg-[var(--color-background)]">
      {/* ── Banner ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(220px, 36vw, 480px)" }}>
        <Image
          src={img("/images/news/bg.jpg")}
          alt={t.news.hero.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center pt-16 md:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="font-serif text-3xl font-bold tracking-widest text-white md:text-4xl lg:text-5xl"
          >
            {t.news.hero.title}
          </motion.p>
        </div>
      </div>

      {/* ── News Grid ── */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32">
        <motion.div
          variants={GRID_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-6xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {sorted.map((item) => {
            const data = t.news.items[item.key];
            return (
              <motion.a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={CARD_VARIANTS}
                className="
                  group flex flex-col overflow-hidden rounded-2xl
                  bg-[var(--color-surface)]
                  shadow-sm hover:shadow-md
                  transition-shadow duration-300
                "
              >
                {/* Cover */}
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <Image
                    src={img(item.cover)}
                    alt={data.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-xs tracking-wider uppercase text-[var(--color-body)]/80">
                    {data.dateLabel}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-[var(--color-title)] line-clamp-2">
                    {data.title}
                  </h3>

                  <div className="mt-auto pt-6">
                    <span
                      className="
                        inline-flex items-center gap-1.5 text-sm font-medium
                        text-[var(--color-body)]
                        transition-colors duration-200
                        group-hover:text-[var(--color-theme)]
                      "
                    >
                      <span>{t.news.readMore}</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={2}
                      />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </section>
    </main>
  );
}
