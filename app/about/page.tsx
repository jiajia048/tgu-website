"use client";

import { motion, type Variants } from "framer-motion";
import { Users, Store, Award, DollarSign, Maximize } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { img } from "@/lib/img";

/* ── Shared scroll-reveal variants ── */
const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const STAGGER_PARENT: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const COMPANY_STAT_ICONS = [Users, Store, Award] as const;
const INVESTOR_STAT_ICONS = [DollarSign, Users, Store, Maximize] as const;

type Stat = { number: string; desc: string };

/* ════════════════════════════════════════
    Reusable Stats Bar — elevated white card
════════════════════════════════════════ */
function StatsBar({
  stats,
  icons,
  note,
  maxWidthClass = "max-w-none",
}: {
  stats: Stat[];
  icons: readonly React.ComponentType<{ className?: string; strokeWidth?: number }>[];
  note?: string;
  maxWidthClass?: string;
}) {
  return (
    <div className={`mx-auto w-full ${maxWidthClass}`}>
      <motion.div
        variants={STAGGER_PARENT}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="flex w-full flex-col divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5 sm:flex-row sm:divide-x sm:divide-y-0"
      >
        {stats.map((item, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              variants={FADE_UP}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex flex-1 flex-col items-center px-5 py-8 text-center md:px-6 md:py-10"
            >
              {Icon ? (
                <Icon
                  className="mb-4 h-7 w-7 text-[var(--color-highlight)] md:h-8 md:w-8"
                  strokeWidth={1.5}
                />
              ) : null}
              <span className="text-2xl font-bold tracking-tight text-[var(--color-theme)] md:text-3xl lg:text-4xl">
                {item.number}
              </span>
              <span className="mt-2 text-xs tracking-wider text-[var(--color-body)] md:text-sm">
                {item.desc}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {note ? (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-center text-xs tracking-wide text-[var(--color-body)]/60"
        >
          * {note}
        </motion.p>
      ) : null}
    </div>
  );
}

export default function AboutPage() {
  const { t } = useLanguage();
  const { company, timeline, leadership, investor } = t.about;

  return (
    <main>
      {/* ════════════════════════════════════════
          Banner — full-width image hero
      ════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(220px, 36vw, 480px)" }}>
        <Image
          src={img("/images/aboutus/bg.jpg")}
          alt="途捷餐饮 关于我们"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* dark overlay for readability */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Centered text — sits below the navbar */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 md:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="font-serif text-3xl font-bold tracking-widest text-white md:text-4xl lg:text-5xl"
          >
            {company.bannerTitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
            className="mt-3 text-sm tracking-[0.2em] text-white/80 md:mt-4 md:text-base lg:text-lg"
          >
            {company.subtitle}
          </motion.p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          Block 1 — Company Introduction
      ════════════════════════════════════════ */}
      <section
        id="company"
        className="scroll-mt-20 bg-white pt-16 pb-20 md:pt-24 md:pb-28"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          {/* Heading + body */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={STAGGER_PARENT}
            className="text-center"
          >
            <motion.h1
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-serif text-2xl font-bold leading-snug tracking-tight text-[var(--color-title)] md:text-3xl lg:text-4xl"
            >
              {company.subtitle}
            </motion.h1>
            <motion.p
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-8 text-sm leading-loose tracking-wide text-[var(--color-body)] md:mt-10 md:text-base md:leading-loose md:text-justify"
            >
              {company.body}
            </motion.p>
          </motion.div>

          {/* Stats bar */}
          <div className="mt-14 md:mt-20">
            <StatsBar stats={company.stats} icons={COMPANY_STAT_ICONS} />
          </div>

          {/* Timeline */}
          <div className="mt-24 md:mt-32">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-14 text-center font-serif text-2xl font-bold tracking-tight text-[var(--color-title)] md:mb-20 md:text-3xl lg:text-4xl"
            >
              {timeline.title}
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={STAGGER_PARENT}
              className="-mx-6 overflow-x-auto px-6 pb-4 md:mx-0 md:overflow-visible md:px-0"
            >
              <div className="relative flex min-w-max md:min-w-0 md:justify-between">
                {/* horizontal rail (aligned to node centers) */}
                <div className="absolute top-[3.25rem] right-0 left-0 h-0.5 -translate-y-1/2 bg-gray-200 md:right-[8.33%] md:left-[8.33%]" />

                {timeline.items.map((item) => (
                  <motion.div
                    key={item.year}
                    variants={FADE_UP}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative flex w-48 flex-shrink-0 flex-col items-center px-3 text-center md:w-auto md:flex-1 md:px-4"
                  >
                    <span className="flex h-8 items-center text-2xl font-bold leading-none tracking-tight text-[var(--color-theme)] md:text-3xl">
                      {item.year}
                    </span>
                    <span className="relative z-10 mt-3 mb-5 h-4 w-4 flex-shrink-0 rounded-full border-2 border-[var(--color-theme)] bg-white" />
                    <p className="text-sm leading-relaxed tracking-wide text-[var(--color-body)]">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          Block 2 — Leadership Team
      ════════════════════════════════════════ */}
      <section
        id="leadership"
        className="scroll-mt-20 bg-[var(--color-surface)] py-20 md:scroll-mt-28 md:py-32"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={STAGGER_PARENT}
            className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16"
          >
            <motion.div
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="md:col-span-5"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-200 shadow-md">
                <Image
                  src={img("/images/aboutus/ourteam.jpg")}
                  alt={leadership.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
            </motion.div>

            <motion.div
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="md:col-span-7"
            >
              <p className="text-sm font-medium tracking-wider text-[var(--color-theme)] uppercase md:text-base">
                {leadership.title}
              </p>
              <h2 className="mt-3 font-serif text-2xl font-bold leading-snug tracking-tight text-[var(--color-title)] md:text-3xl lg:text-4xl">
                {leadership.subtitle}
              </h2>
              <p className="mt-6 text-sm leading-loose tracking-wide text-[var(--color-body)] md:text-base">
                {leadership.intro}
              </p>

              <div className="mt-8 space-y-6 border-t border-gray-300/70 pt-8">
                {leadership.points.map((point, i) => (
                  <div key={point.title} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-theme)] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--color-title)]">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed tracking-wide text-[var(--color-body)]">
                        {point.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          Block 3 — Investor Introduction
      ════════════════════════════════════════ */}
      <section
        id="investor"
        className="scroll-mt-20 bg-white py-20 md:scroll-mt-28 md:py-32"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={STAGGER_PARENT}
            className="text-center"
          >
            <motion.div
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative mx-auto h-10 w-40 md:h-12 md:w-48"
            >
              <Image
                src={img("/images/aboutus/invuslogo.png")}
                alt="Invus"
                fill
                className="object-contain object-center"
                sizes="192px"
              />
            </motion.div>
            <motion.h2
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-8 font-serif text-2xl font-bold leading-snug tracking-tight text-[var(--color-title)] md:mt-10 md:text-3xl lg:text-4xl"
            >
              {investor.subtitle}
            </motion.h2>
            <motion.p
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-8 text-sm leading-loose tracking-wide text-[var(--color-body)] md:mt-10 md:text-base md:leading-loose md:text-justify"
            >
              {investor.body}
            </motion.p>
          </motion.div>

          <div className="mt-14 md:mt-20">
            <StatsBar
              stats={investor.stats}
              icons={INVESTOR_STAT_ICONS}
              note={investor.statsNote}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
