"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { GALLERY_DATA } from "@/data/gallery";
import GalleryThumbCard from "./GalleryThumbCard";

/**
 * Home-page case carousel: shows two gallery cards at a time with
 * left/right arrows. "Read more" navigates to the Gallery page and
 * auto-expands the matching card via the `?open=` query param.
 */
export default function GalleryCarousel() {
  const { t } = useLanguage();
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 32; // matches md:gap-8
    const amount = ((card?.clientWidth ?? el.clientWidth / 2) + gap) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="bg-[var(--color-surface)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center font-serif text-2xl font-bold leading-snug tracking-tight text-[var(--color-title)] md:text-3xl lg:text-4xl"
        >
          {t.home.cases.title}
        </motion.h2>

        <div className="relative mt-12 md:mt-16">
          {/* Arrows */}
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous"
            className="absolute top-1/2 -left-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--color-theme)] shadow-lg ring-1 ring-black/5 transition-colors hover:bg-[var(--color-theme)] hover:text-white md:-left-5"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next"
            className="absolute top-1/2 -right-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--color-theme)] shadow-lg ring-1 ring-black/5 transition-colors hover:bg-[var(--color-theme)] hover:text-white md:-right-5"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-2 md:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {GALLERY_DATA.map((brand) => (
              <div
                key={brand.id}
                data-card
                className="h-[480px] shrink-0 snap-start basis-full md:basis-[calc(50%-1rem)]"
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
