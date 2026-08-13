"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Coffee,
  Soup,
  Utensils,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { img } from "@/lib/img";
import {
  BRANDS,
  MAIN_ORDER,
  type Brand,
  type MainCat,
} from "@/data/brands";

/** Per-spec icon mapping for the marquee tab row. */
const MAIN_ICONS: Record<MainCat, LucideIcon> = {
  chinese: Soup,
  asian: Utensils,
  cafe_bakery_desserts: Coffee,
  western: UtensilsCrossed,
};

/**
 * Repeat `arr` until it has at least `min` items — needed to make a single
 * copy of the track wide enough to cover the viewport before we duplicate it
 * for the seamless translateX(-50%) loop.
 */
function fillUntil<T>(arr: T[], min: number): T[] {
  if (arr.length === 0) return arr;
  const out: T[] = [];
  while (out.length < min) out.push(...arr);
  return out;
}

export default function BrandMarquee() {
  const { t } = useLanguage();
  const [active, setActive] = useState<MainCat>("chinese");

  const { row1, row2 } = useMemo(() => {
    const all = BRANDS.filter((b) => b.mainCategory === active);
    const half = Math.ceil(all.length / 2);
    const a = all.slice(0, half);
    const b = all.slice(half);
    // If a split is empty (tiny category) fall back to the other half.
    const r1 = fillUntil(a.length ? a : b, 10);
    const r2 = fillUntil(b.length ? b : a, 10);
    return { row1: r1, row2: r2 };
  }, [active]);

  return (
    <section className="bg-white py-20 md:py-32 overflow-hidden">
      <MarqueeKeyframes />
      {/* Title */}
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-theme)] font-serif">
          {t.home.marquee.title}
        </h2>

        {/* Tabs — underline-animated text buttons */}
        <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:gap-x-8">
          {MAIN_ORDER.map((m) => {
            const Icon = MAIN_ICONS[m];
            const isActive = active === m;
            return (
              <button
                key={m}
                onClick={() => setActive(m)}
                aria-pressed={isActive}
                className={`
                  group relative inline-flex items-center gap-2 pb-2
                  text-sm md:text-base font-medium tracking-wide
                  transition-colors duration-300
                  ${isActive
                    ? "text-[var(--color-theme)]"
                    : "text-[var(--color-body)] hover:text-[var(--color-theme)]"}
                `}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                <span>{t.business.portfolio.filter.main[m]}</span>
                <span
                  className={`
                    pointer-events-none absolute left-0 right-0 bottom-0 h-[2px]
                    bg-[var(--color-theme)] origin-left
                    transition-transform duration-300 ease-out
                    ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"}
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Two marquee tracks */}
      <div className="mt-14 md:mt-16 space-y-5 md:space-y-6">
        <MarqueeRow
          key={`r1-${active}`}
          items={row1}
          direction="left"
          duration="60s"
        />
        <MarqueeRow
          key={`r2-${active}`}
          items={row2}
          direction="left"
          duration="60s"
        />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
    Single marquee row
    Animation is driven by inline styles (not CSS classes) so it survives
    any class-purging or CSS-ordering quirks in Tailwind v4 / Lightning CSS.
    The @keyframes themselves are injected via the local <style> tag below.
════════════════════════════════════════ */

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Brand[];
  direction: "left" | "right";
  duration: string;
}) {
  const doubled = [...items, ...items];
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex gap-4 md:gap-6 w-max"
        style={{
          animation: `tgu-marquee-${direction} ${duration} linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {doubled.map((brand, i) => (
          <div
            key={`${brand.id}-${i}`}
            className="
              relative shrink-0 overflow-hidden
              w-40 sm:w-48 md:w-56
              aspect-[3/2]
              rounded-xl bg-white
            "
            aria-hidden={i >= items.length}
          >
            <div className="absolute inset-5">
              <Image
                src={img(brand.logoPath)}
                alt={brand.name}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                className="object-contain [clip-path:inset(2px_round_4px)]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
    Keyframes (scoped to this component, guaranteed present in the DOM)
════════════════════════════════════════ */

function MarqueeKeyframes() {
  return (
    <style>{`
      @keyframes tgu-marquee-left {
        from { transform: translate3d(0, 0, 0); }
        to   { transform: translate3d(-50%, 0, 0); }
      }
      @keyframes tgu-marquee-right {
        from { transform: translate3d(-50%, 0, 0); }
        to   { transform: translate3d(0, 0, 0); }
      }
    `}</style>
  );
}
