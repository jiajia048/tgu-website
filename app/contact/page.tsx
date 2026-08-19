"use client";

import type { FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Headphones,
  Newspaper,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { img } from "@/lib/img";
import { useTypography } from "@/lib/typography";

const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const DEPT_ICONS = [Briefcase, Headphones, Newspaper] as const;

export default function ContactPage() {
  const { t, locale } = useLanguage();
  const typo = useTypography();

  const departments = [
    t.contact.b2b.departments.item1,
    t.contact.b2b.departments.item2,
    t.contact.b2b.departments.item3,
  ];

  const inputBase =
    "w-full rounded-lg bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-body)] placeholder-[var(--color-body)]/40 outline-none border border-transparent transition-colors duration-200 focus:border-[var(--color-theme)] focus:ring-1 focus:ring-[var(--color-theme)]/20";

  function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject =
      locale === "zh" ? "TGU官网｜留言反馈" : "TGU Website | Contact Form";
    const source =
      locale === "zh"
        ? "来源：TGU官网「联系我们」"
        : "Source: TGU Website, Contact Us";
    const body = [
      source,
      "",
      `${t.contact.connect.form.fullName}：${form.get("name") ?? ""}`,
      `${t.contact.connect.form.phone}：${form.get("phone") ?? ""}`,
      `${t.contact.connect.form.email}：${form.get("email") ?? ""}`,
      "",
      `${t.contact.connect.form.message}：`,
      String(form.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:vivian.ni@tgu-asia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
      {/* ════════════════════════════════════════
          Banner
      ════════════════════════════════════════ */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: typo.heroHeight }}
      >
        <Image
          src={img("/images/contact_us.jpg")}
          alt={t.contact.bannerTitle}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${typo.heroOverlay}`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 md:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className={`mx-auto px-6 text-center ${typo.heroTitleColor} ${typo.heroTitle} ${typo.measureHeroHeading}`}
          >
            {t.contact.bannerTitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
            className={`mx-auto mt-3 max-w-2xl px-6 text-center md:mt-4 ${typo.heroLedeColor} ${typo.heroLede}`}
          >
            {t.contact.bannerDesc}
          </motion.p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          Section 1 — B2B Collaborations
      ════════════════════════════════════════ */}
      <section className={`pt-16 pb-16 md:pt-24 md:pb-24 ${typo.surfaceBg}`}>
        {/* Title & intro */}
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center mb-12 md:mb-20">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={FADE_UP}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`${typo.titleColor} ${typo.sectionTitle}`}
          >
            {t.contact.b2b.titleLead}
            <span className="text-[var(--color-theme)]">
              {t.contact.b2b.titleHighlight}
            </span>
          </motion.h1>
        </div>

        {/* 2-col grid: pills | office info */}
        <div className="mx-auto max-w-6xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
          {/* Left — Department pills */}
          <div className="flex flex-col gap-4">
            {departments.map((dept, i) => {
              const Icon = DEPT_ICONS[i];
              return (
                <motion.a
                  key={i}
                  href={`mailto:${dept.email}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={FADE_UP}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                    delay: i * 0.08,
                  }}
                  className="
                    group flex items-center gap-4
                    rounded-full bg-[var(--color-background)]
                    px-4 py-3 md:px-5 md:py-4
                    transition-all duration-300
                    hover:shadow-md hover:shadow-black/[0.05]
                    hover:-translate-y-0.5
                  "
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-[var(--color-theme)]">
                    <Icon
                      className="w-5 h-5 text-[var(--color-text-inverse)]"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="flex flex-col min-w-0 flex-1">
                    <span
                      className={`truncate text-sm font-semibold ${typo.titleColor}`}
                    >
                      {dept.name}
                    </span>
                    <span className="text-xs md:text-sm text-[var(--color-body)]/80 group-hover:text-[var(--color-theme)] transition-colors duration-200 truncate">
                      {dept.email}
                    </span>
                  </span>
                </motion.a>
              );
            })}
          </div>

          {/* Right — Office info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={FADE_UP}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-[var(--color-theme)]">
              {t.contact.b2b.office.title}
            </h3>
            <div className="flex flex-col gap-5">
              <InfoRow icon={MapPin} text={t.contact.b2b.office.address} />
              <InfoRow icon={Phone} text={t.contact.b2b.office.phone} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          Section 2 — Connect with us
      ════════════════════════════════════════ */}
      <section className="py-16 md:py-28 bg-[var(--color-background)]">
        {/* Title & intro */}
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center mb-10 md:mb-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={FADE_UP}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`${typo.titleColor} ${typo.sectionTitle}`}
          >
            {t.contact.connect.titleLead}
            <span className="text-[var(--color-theme)]">
              {t.contact.connect.titleHighlight}
            </span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={FADE_UP}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
            className={`mx-auto mt-5 md:mt-6 md:text-base ${typo.bodyColor} ${typo.bodySm} ${typo.measure}`}
          >
            {t.contact.connect.desc}
          </motion.p>
        </div>

        {/* 2-col grid: image + form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={FADE_UP}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-6xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch"
        >
          {/* Left — Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl min-h-[280px] md:min-h-[420px] lg:min-h-0">
            <Image
              src={img("/images/contact_us.jpg")}
              alt="Contact TGU"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right — Form */}
          <form
            onSubmit={handleEmailSubmit}
            className={`flex flex-col gap-4 md:gap-5 rounded-2xl p-6 md:p-10 ${typo.surfaceBg}`}
          >
            <input
              type="text"
              name="name"
              required
              maxLength={100}
              placeholder={`* ${t.contact.connect.form.fullName}`}
              className={inputBase}
            />
            <input
              type="tel"
              name="phone"
              required
              maxLength={30}
              placeholder={`* ${t.contact.connect.form.phone}`}
              className={inputBase}
            />
            <input
              type="email"
              name="email"
              required
              maxLength={254}
              placeholder={`* ${t.contact.connect.form.email}`}
              className={inputBase}
            />
            <textarea
              name="message"
              rows={5}
              maxLength={2000}
              placeholder={t.contact.connect.form.message}
              className={`${inputBase} resize-none`}
            />

            <button
              type="submit"
              className={`
                group mt-2 flex items-center gap-2 self-start
                py-2 text-base font-semibold ${typo.uiLabel} ${typo.titleColor}
                transition-colors duration-200
                hover:text-[var(--color-theme)]
              `}
            >
              <span>{t.contact.connect.form.submit}</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}

/* ──────────────────────────────────────────── */
function InfoRow({
  icon: Icon,
  text,
}: {
  icon: typeof MapPin;
  text: string;
}) {
  const typo = useTypography();

  return (
    <div className="flex items-start gap-4">
      <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-theme)]">
        <Icon
          className="w-4 h-4 text-[var(--color-text-inverse)]"
          strokeWidth={1.8}
        />
      </span>
      <p
        className={`pt-2 text-base leading-relaxed ${typo.bodyColor} ${typo.uiLabel}`}
      >
        {text}
      </p>
    </div>
  );
}
