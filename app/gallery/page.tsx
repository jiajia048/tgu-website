"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { img } from "@/lib/img";
import { GALLERY_DATA, type BrandId, type GalleryBrand } from "@/data/gallery";
import GalleryThumbCard from "@/components/GalleryThumbCard";

const GRID_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

/* ════════════════════════════════════════
    Page
════════════════════════════════════════ */

/**
 * The `?open=<id>` hand-off from the home carousel, read as an external store.
 * `useSearchParams` would pull this whole page out of the prerender, and a
 * plain lazy initialiser cannot see `window` while the HTML is generated.
 */
const openParamStore = {
  subscribe: () => () => {},
  getSnapshot: () => new URLSearchParams(window.location.search).get("open"),
  getServerSnapshot: (): string | null => null,
};

export default function GalleryPage() {
  const { t } = useLanguage();

  const requested = useSyncExternalStore(
    openParamStore.subscribe,
    openParamStore.getSnapshot,
    openParamStore.getServerSnapshot
  );
  // `undefined` means the visitor has not touched a card yet, so the URL wins
  const [override, setOverride] = useState<BrandId | null | undefined>(
    undefined
  );

  const openId =
    override !== undefined
      ? override
      : requested && GALLERY_DATA.some((b) => b.id === requested)
        ? (requested as BrandId)
        : null;
  const setOpenId = setOverride;

  return (
    <main className="bg-[var(--color-background)]">
      {/* ── Banner ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(220px, 36vw, 480px)" }}>
        <Image
          src={img("/images/gallery/bg.jpg")}
          alt={t.gallery.hero.title}
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
            {t.gallery.hero.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
            className="mt-3 max-w-2xl px-6 text-center text-sm leading-relaxed tracking-wide text-white/80 md:mt-4 md:text-base"
          >
            {t.gallery.hero.desc}
          </motion.p>
        </div>
      </div>

      {/* ── Brand cards (2 per row, click-to-expand) ── */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32">
        <AnimatePresence>
          {openId && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setOpenId(null)}
              className="fixed inset-0 z-40 bg-black/55"
            />
          )}
        </AnimatePresence>

        <motion.div
          variants={GRID_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 md:gap-8 md:px-8"
        >
          {GALLERY_DATA.map((brand, i) => (
            <GalleryCard
              key={brand.id}
              brand={brand}
              index={i}
              open={openId === brand.id}
              onOpen={() => setOpenId(brand.id)}
              onClose={() => setOpenId(null)}
            />
          ))}
        </motion.div>
      </section>
    </main>
  );
}

/* ════════════════════════════════════════
    Card — thumbnail in grid; expands sideways on "read more"
════════════════════════════════════════ */

function GalleryCard({
  brand,
  index,
  open,
  onOpen,
  onClose,
}: {
  brand: GalleryBrand;
  index: number;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const info = t.gallery.brands[brand.id];
  const isLeft = index % 2 === 0; // left column expands right; right column expands left

  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Carousel autoplay (paused when hovering the dots)
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSlide(0);
        setPaused(false);
      }, 400);
      return () => clearTimeout(t);
    }
    if (paused) return;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % brand.menuImages.length);
    }, 4500);
    return () => clearInterval(id);
  }, [open, paused, brand.menuImages.length]);

  // Center the card in the viewport whenever it expands
  useEffect(() => {
    if (open) {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [open]);

  return (
    <motion.div
      ref={cardRef}
      variants={CARD_VARIANTS}
      className={`relative h-[480px] ${open ? "z-50" : "z-0"}`}
    >
      {/* Collapsed thumbnail */}
      <div className="absolute inset-0">
        <GalleryThumbCard brand={brand} onReadMore={onOpen} />
      </div>

      {/* Expanded overlay — scales out sideways over the neighbour */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="expanded"
            onMouseLeave={onClose}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: isLeft ? "left center" : "right center" }}
            className={`absolute top-1/2 z-10 grid h-[520px] w-full -translate-y-1/2 grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:grid-cols-[2fr_3fr] md:w-[calc(200%+2rem)] ${
              isLeft ? "left-0" : "right-0"
            }`}
          >
            {/* Touch devices get no mouseleave, so they need an explicit dismiss */}
            <button
              type="button"
              onClick={onClose}
              aria-label={t.nav.closeMenu}
              className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm md:hidden"
            >
              <X className="h-5 w-5" strokeWidth={2.2} />
            </button>

            {/* Carousel — menu images */}
            <div className="relative h-48 w-full overflow-hidden sm:h-full">
              {brand.menuImages.map((src, i) => (
                <motion.div
                  key={src}
                  initial={false}
                  animate={{ opacity: slide === i ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={img(src)}
                    alt={`${info.name} menu ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="scale-[1.15] object-cover"
                  />
                </motion.div>
              ))}
              <div
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 rounded-full bg-black/15 px-2.5 py-1.5 backdrop-blur-sm ${
                  brand.menuImages.length > 1 ? "flex" : "hidden"
                }`}
              >
                {brand.menuImages.map((_, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setSlide(i)}
                    onClick={() => setSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`relative h-2 w-2 rounded-full transition-all duration-300 before:absolute before:-inset-1.5 before:content-[''] ${
                      slide === i ? "scale-125 bg-white" : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Story — logo, name, intro, locations */}
            <div className="flex flex-col overflow-y-auto p-6 md:p-8 lg:p-10">
              <div className="relative h-10 w-28 shrink-0">
                <Image
                  src={img(brand.logoPath)}
                  alt={info.name}
                  fill
                  sizes="112px"
                  className="object-contain object-left"
                />
              </div>

              <h3 className="mt-4 font-serif text-xl font-bold leading-snug tracking-tight text-[var(--color-theme)] md:text-2xl">
                {info.name}
              </h3>
              <p className="mt-1.5 text-sm leading-snug text-[var(--color-body)]">
                {info.taglineSub}
              </p>

              <p className="mt-5 text-sm leading-relaxed tracking-wide text-[var(--color-body)]">
                {info.intro}
              </p>

              <ul className="mt-6 space-y-2 md:mt-auto md:pt-6">
                {info.locations.map((loc, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-[var(--color-body)]"
                  >
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-theme)]"
                      strokeWidth={1.8}
                    />
                    <span>{loc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
