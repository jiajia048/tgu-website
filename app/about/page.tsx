"use client";

import { motion, type Variants } from "framer-motion";
import { Users, Store, Award, DollarSign, Maximize } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { img } from "@/lib/img";
import { useTypography } from "@/lib/typography";

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
  const typo = useTypography();

  return (
    <div className={`mx-auto w-full ${maxWidthClass}`}>
      <motion.div
        variants={STAGGER_PARENT}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className={`flex w-full flex-col divide-y overflow-hidden sm:flex-row sm:divide-x sm:divide-y-0 ${typo.panel} ${typo.panelDivide}`}
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
              <Icon
                className="mb-4 h-7 w-7 text-[var(--color-highlight)] md:h-8 md:w-8"
                strokeWidth={1.5}
              />
              <span
                className={`text-2xl text-[var(--color-theme)] md:text-3xl lg:text-4xl ${typo.statValue}`}
              >
                {item.number}
              </span>
              <span className={`mt-2 ${typo.bodyColor} ${typo.statLabel}`}>
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
          className={`mt-4 text-center leading-relaxed ${typo.mutedColor} ${typo.caption}`}
        >
          * {note}
        </motion.p>
      ) : null}
    </div>
  );
}

export default function AboutPage() {
  const { t, locale } = useLanguage();
  const typo = useTypography();
  const isEn = locale === "en";
  const { company, timeline, leadership, investor } = t.about;

  return (
    <main>
      {/* ════════════════════════════════════════
          Banner — full-width image hero
      ════════════════════════════════════════ */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: typo.heroHeight }}
      >
        <Image
          src={img("/images/aboutus/bg.jpg")}
          alt="途捷餐饮 关于我们"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${typo.heroOverlay}`} />

        {/* Centered text — sits below the navbar */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 md:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className={`mx-auto px-6 text-center ${typo.heroTitleColor} ${typo.heroTitle} ${typo.measureHeroHeading}`}
          >
            {company.bannerTitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
            className={`mx-auto mt-3 max-w-2xl px-6 text-center md:mt-4 ${typo.heroLedeColor} ${typo.heroEyebrow}`}
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
            className={
              isEn
                ? "grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-8"
                : typo.editorialAlign
            }
          >
            <motion.div
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={isEn ? "lg:col-span-5" : undefined}
            >
              {isEn ? (
                <p className={`mb-4 text-[var(--color-theme)] ${typo.kicker}`}>
                  {company.title}
                </p>
              ) : null}
              <h1 className={`${typo.titleColor} ${typo.sectionTitle}`}>
                {company.heading}
              </h1>
            </motion.div>
            <motion.div
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={
                isEn
                  ? "space-y-5 lg:col-span-6 lg:col-start-7"
                  : "mt-8 space-y-6 md:mt-10"
              }
            >
              {company.body.map((paragraph, i) => (
                <p
                  key={i}
                  className={`${typo.bodyColor} ${isEn ? typo.body : typo.bodyBlock}`}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
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
              className={`mb-14 text-center md:mb-20 ${typo.titleColor} ${typo.sectionTitle}`}
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
                    <span
                      className={`flex h-8 items-center text-2xl leading-none text-[var(--color-theme)] md:text-3xl ${typo.statValue}`}
                    >
                      {item.year}
                    </span>
                    <span className="relative z-10 mt-3 mb-5 h-4 w-4 flex-shrink-0 rounded-full border-2 border-[var(--color-theme)] bg-white" />
                    <p className={`${typo.bodyColor} ${typo.bodySm}`}>
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
        className={`scroll-mt-20 py-20 md:scroll-mt-28 md:py-32 ${typo.surfaceBg}`}
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
              <p className={`text-[var(--color-theme)] ${typo.kicker}`}>
                {leadership.title}
              </p>
              <h2
                className={`mt-3 ${typo.titleColor} ${typo.sectionTitle} ${typo.measureHeading}`}
              >
                {leadership.subtitle}
              </h2>
              <p className={`mt-6 ${typo.bodyColor} ${typo.body} ${typo.measureSplit}`}>
                {leadership.intro}
              </p>

              <div
                className={`mt-8 space-y-6 border-t pt-8 ${
                  isEn ? "border-[var(--color-hairline-en)]" : "border-gray-300/70"
                }`}
              >
                {leadership.points.map((point, i) => (
                  <div key={point.title} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-theme)] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3
                        className={`text-base font-semibold ${typo.titleColor} ${
                          isEn ? "tracking-[-0.01em]" : ""
                        }`}
                      >
                        {point.title}
                      </h3>
                      <p className={`mt-1.5 ${typo.bodyColor} ${typo.bodySm}`}>
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
            className={
              isEn
                ? "grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-8"
                : typo.editorialAlign
            }
          >
            <motion.div
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={isEn ? "lg:col-span-5" : undefined}
            >
              <a
                href="https://www.invus.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Invus"
                className={`relative block h-10 w-40 md:h-12 md:w-48 transition-opacity duration-200 hover:opacity-80 ${
                  isEn ? "mx-0" : "mx-auto"
                }`}
              >
                <Image
                  src={img("/images/aboutus/invuslogo.png")}
                  alt="Invus"
                  fill
                  className={`object-contain ${isEn ? "object-left" : "object-center"}`}
                  sizes="192px"
                />
              </a>
              {isEn ? (
                <p className={`mt-8 text-[var(--color-theme)] ${typo.kicker}`}>
                  {investor.title}
                </p>
              ) : null}
              <h2
                className={`${isEn ? "mt-4" : "mt-8 md:mt-10"} ${typo.titleColor} ${
                  typo.sectionTitle
                }`}
              >
                {investor.subtitle}
              </h2>
            </motion.div>
            <motion.p
              variants={FADE_UP}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`${
                isEn
                  ? "lg:col-span-6 lg:col-start-7"
                  : "mt-8 md:mt-10"
              } ${typo.bodyColor} ${isEn ? typo.body : typo.bodyBlock}`}
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
