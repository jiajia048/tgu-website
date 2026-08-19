"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTypography } from "@/lib/typography";
import { GALLERY_DATA } from "@/data/gallery";
import GalleryThumbCard from "./GalleryThumbCard";

/**
 * Home-page brand gallery carousel: three cards on large screens,
 * two on tablet, one on mobile. "Read more" goes to /gallery?open=.
 */
export default function GalleryCarousel() {
  const { t } = useLanguage();
  const typo = useTypography();
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;

    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = card.offsetWidth + gap;
    if (step <= 0) return;

    const visible = Math.max(1, Math.round((el.clientWidth + gap) / step));
    const maxIndex = Math.max(0, GALLERY_DATA.length - visible);
    const current = Math.round(el.scrollLeft / step);
    const next = Math.min(maxIndex, Math.max(0, current + dir));

    el.scrollTo({ left: next * step, behavior: "smooth" });
  }

  return (
    <section className={`py-20 md:py-28 ${typo.surfaceBg}`}>
      <div className="mx-auto max-w-[90rem] px-4 md:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`mx-auto text-center ${typo.titleColor} ${typo.sectionTitle} ${typo.measureHeading}`}
        >
          {t.home.cases.title}
        </motion.h2>

        <div className="relative mt-12 md:mt-16">
          {/* Arrows */}
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous"
            className="absolute top-1/2 -left-1 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--color-theme)] shadow-lg ring-1 ring-black/5 transition-colors hover:bg-[var(--color-theme)] hover:text-white md:-left-3 lg:-left-4"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next"
            className="absolute top-1/2 -right-1 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--color-theme)] shadow-lg ring-1 ring-black/5 transition-colors hover:bg-[var(--color-theme)] hover:text-white md:-right-3 lg:-right-4"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 md:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {GALLERY_DATA.map((brand) => (
              <div
                key={brand.id}
                data-card
                className="h-[480px] w-full shrink-0 snap-start snap-always md:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)]"
              >
                <GalleryThumbCard
                  brand={brand}
                  onReadMore={() => router.push(`/gallery?open=${brand.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
