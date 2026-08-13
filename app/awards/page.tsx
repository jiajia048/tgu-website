"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { img } from "@/lib/img";

/**
 * Award certificate images, in display order (filename prefix 0- … 6-).
 * Each index maps to t.awards.items[i].
 */
const AWARD_IMAGES = [
  "/images/awards/0-202409.png",
  "/images/awards/1-2026beijingshoudu.jpg",
  "/images/awards/2-Shanghai.jpg",
  "/images/awards/3-shoudu2025.jpg",
  "/images/awards/4-2025beijingshoudu.jpg",
  "/images/awards/5--2025guizhou.jpg",
  "/images/awards/6-Daxing2024.jpg",
];

const GRID_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function AwardsPage() {
  const { t } = useLanguage();
  const { bannerTitle, bannerDesc, items } = t.awards;

  return (
    <main className="bg-[var(--color-background)]">
      {/* ════════════════════════════════════════
          Banner — full-width image hero
      ════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(220px, 36vw, 480px)" }}>
        <Image
          src={img("/images/awards/bg.jpg")}
          alt={bannerTitle}
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
            {bannerTitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
            className="mt-3 max-w-2xl px-6 text-center text-sm leading-relaxed tracking-wide text-white/80 md:mt-4 md:text-base"
          >
            {bannerDesc}
          </motion.p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          Awards grid — uniform cards
      ════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <motion.div
          variants={GRID_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:gap-8 md:px-8 lg:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={CARD_VARIANTS}
              whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 320, damping: 22 } }}
              className="
                group flex h-full flex-col overflow-hidden rounded-2xl
                bg-[var(--color-surface)] p-5 md:p-6
                shadow-sm ring-1 ring-black/5 hover:shadow-xl
              "
            >
              {/* Certificate — fixed 4:3 frame, identical across all cards */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white">
                <Image
                  src={img(AWARD_IMAGES[i])}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Title */}
              <h3 className="mt-5 flex min-h-[3rem] items-start text-center text-sm font-bold leading-snug text-[var(--color-title)] md:text-base">
                <span className="mx-auto">{item.title}</span>
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
