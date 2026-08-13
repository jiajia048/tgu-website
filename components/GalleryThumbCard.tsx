"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { img } from "@/lib/img";
import type { GalleryBrand } from "@/data/gallery";

/**
 * Collapsed gallery thumbnail — store photo + brand info + "read more".
 * Shared by the Gallery page (opens in place) and the home carousel
 * (navigates to the Gallery page). Fills its parent (h-full).
 */
export default function GalleryThumbCard({
  brand,
  onReadMore,
}: {
  brand: GalleryBrand;
  onReadMore: () => void;
}) {
  const { t, locale } = useLanguage();
  const info = t.gallery.brands[brand.id];
  const sep = locale === "zh" ? "、" : " · ";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5"
    >
      <div className="relative h-[52%] w-full overflow-hidden">
        <Image
          src={img(brand.storeImage)}
          alt={info.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-6 pt-5 pb-6">
        <h3 className="font-serif text-lg font-bold leading-snug tracking-tight text-[var(--color-title)] md:text-xl">
          {info.name}
        </h3>

        <p className="text-xs leading-relaxed text-[var(--color-body)] line-clamp-1">
          {info.slogan}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {info.tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] tracking-wide text-[var(--color-body)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-3 border-t border-gray-100 pt-3 text-xs leading-relaxed text-[var(--color-body)]/70">
          <span className="font-medium text-[var(--color-theme)]">
            {t.gallery.layoutLabel}：
          </span>
          {info.locations.join(sep)}
        </p>

        <button
          type="button"
          onClick={onReadMore}
          className="group/more mt-auto inline-flex w-fit cursor-pointer items-center gap-1.5 text-sm font-medium text-[var(--color-theme)] transition-opacity duration-200 hover:opacity-75"
        >
          {t.gallery.readMore}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover/more:translate-x-1"
            strokeWidth={2}
          />
        </button>
      </div>
    </motion.div>
  );
}
