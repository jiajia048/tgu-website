"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { img } from "@/lib/img";

/** Award certificate images, in display order (matches t.awards.items). */
const AWARD_IMAGES = [
  "/images/awards/0-202409.png",
  "/images/awards/1-2026beijingshoudu.jpg",
  "/images/awards/2-Shanghai.jpg",
  "/images/awards/3-shoudu2025.jpg",
  "/images/awards/4-2025beijingshoudu.jpg",
  "/images/awards/5--2025guizhou.jpg",
  "/images/awards/6-Daxing2024.jpg",
];

/** Repeat until at least `min` items so one copy spans the viewport. */
function fillUntil<T>(arr: T[], min: number): T[] {
  if (arr.length === 0) return arr;
  const out: T[] = [];
  while (out.length < min) out.push(...arr);
  return out;
}

export default function AwardsMarquee() {
  const { t } = useLanguage();
  const [paused, setPaused] = useState(false);

  const items = fillUntil(
    AWARD_IMAGES.map((image, i) => ({ image, i })),
    9
  );
  const doubled = [...items, ...items];

  return (
    <section className="overflow-hidden bg-white py-20 md:py-28">
      <style>{`
        @keyframes tgu-awards-right {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h2 className="text-center font-serif text-2xl font-bold leading-snug tracking-tight text-[var(--color-title)] md:text-3xl lg:text-4xl">
          {t.awards.bannerTitle}
        </h2>
      </div>

      <div
        className="relative mt-12 overflow-hidden md:mt-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex w-max gap-8 md:gap-12"
          style={{
            animation: "tgu-awards-right 70s linear infinite",
            animationPlayState: paused ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {doubled.map(({ image, i }, idx) => (
            <div
              key={idx}
              className="w-52 shrink-0 sm:w-60 md:w-64"
              aria-hidden={idx >= items.length}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                <Image
                  src={img(image)}
                  alt={t.awards.items[i].title}
                  fill
                  sizes="(max-width: 640px) 208px, 256px"
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-center text-xs leading-snug tracking-wide text-[var(--color-body)] line-clamp-2 md:text-sm">
                {t.awards.items[i].title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
