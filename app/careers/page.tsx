"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Award, Globe2, HeartHandshake, Upload } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { img } from "@/lib/img";
import { useTypography } from "@/lib/typography";

const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const CULTURE_ICONS = [Award, Globe2, HeartHandshake] as const;

export default function CareersPage() {
  const { t, locale } = useLanguage();
  const typo = useTypography();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const cultureCards = [
    t.careers.culture.item1,
    t.careers.culture.item2,
    t.careers.culture.item3,
  ];

  const inputBase =
    "w-full rounded-lg bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-body)] placeholder-[var(--color-body)]/40 outline-none border border-transparent transition-colors duration-200 focus:border-[var(--color-theme)] focus:ring-1 focus:ring-[var(--color-theme)]/20";

  function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject =
      locale === "zh" ? "TGU官网｜职位申请" : "TGU Website | Job Application";
    const source =
      locale === "zh"
        ? "来源：TGU官网「加入我们」"
        : "Source: TGU Website, Careers";
    const attachmentNote =
      locale === "zh"
        ? "简历附件：请在邮件客户端中手动添加 PDF 简历"
        : "Resume attachment: please attach your PDF resume in the email client";
    const body = [
      source,
      "",
      `${t.careers.form.lastName}：${form.get("lastName") ?? ""}`,
      `${t.careers.form.firstName}：${form.get("firstName") ?? ""}`,
      `${t.careers.form.phone}：${form.get("phone") ?? ""}`,
      `${t.careers.form.email}：${form.get("email") ?? ""}`,
      `${attachmentNote}${fileName ? `（${fileName}）` : ""}`,
      "",
      `${t.careers.form.message}：`,
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
          alt={t.careers.bannerTitle}
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
            {t.careers.bannerTitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
            className={`mx-auto mt-3 max-w-2xl px-6 text-center md:mt-4 ${typo.heroLedeColor} ${typo.heroLede}`}
          >
            {t.careers.bannerDesc}
          </motion.p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          Section 1 — Header & Intro (culture cards, kept)
      ════════════════════════════════════════ */}

      {/* ════════════════════════════════════════
          Section 2 — Culture Cards
      ════════════════════════════════════════ */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 bg-[var(--color-background)]">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {cultureCards.map((card, i) => {
              const Icon = CULTURE_ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={FADE_UP}
                  transition={{
                    duration: 0.55,
                    ease: "easeOut",
                    delay: i * 0.12,
                  }}
                  className={`rounded-2xl p-6 md:p-10 ${typo.surfaceBg}`}
                >
                  <Icon
                    className="w-10 h-10 text-[var(--color-highlight)]"
                    strokeWidth={1.4}
                  />
                  <h3 className={`mt-5 text-lg font-bold text-[var(--color-theme)] ${
                    locale === "en" ? "tracking-[-0.015em]" : ""
                  }`}>
                    {card.title}
                  </h3>
                  <p className={`mt-3 ${typo.bodyColor} ${typo.bodySm}`}>
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          Section 3 — Application (Image + Form)
      ════════════════════════════════════════ */}
      <section className={`py-20 md:py-32 ${typo.surfaceBg}`}>
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={FADE_UP}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-stretch"
          >
            {/* Left — Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl min-h-[260px] md:min-h-[400px] lg:min-h-0">
              <Image
                src={img("/images/contact_us.jpg")}
                alt="Careers at TGU"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right — Form */}
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col gap-5"
            >
              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="lastName"
                  required
                  maxLength={100}
                  placeholder={`* ${t.careers.form.lastName}`}
                  className={inputBase}
                />
                <input
                  type="text"
                  name="firstName"
                  required
                  maxLength={100}
                  placeholder={`* ${t.careers.form.firstName}`}
                  className={inputBase}
                />
              </div>

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                required
                maxLength={30}
                placeholder={`* ${t.careers.form.phone}`}
                className={inputBase}
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                required
                maxLength={254}
                placeholder={`* ${t.careers.form.email}`}
                className={inputBase}
              />

              {/* CV upload */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setFileName(file ? file.name : "");
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`${inputBase} flex items-center gap-3 cursor-pointer text-left`}
                >
                  <Upload
                    className="w-4 h-4 flex-shrink-0 text-[var(--color-theme)]"
                    strokeWidth={2}
                  />
                  <span className={fileName ? "text-[var(--color-body)]" : "text-[var(--color-body)]/40"}>
                    {fileName || t.careers.form.cv}
                  </span>
                </button>
                <p
                  className={`mt-2 leading-relaxed text-[var(--color-body)]/50 ${typo.caption}`}
                >
                  {t.careers.form.cvHint}
                </p>
              </div>

              {/* Message */}
              <textarea
                name="message"
                rows={4}
                maxLength={2000}
                placeholder={t.careers.form.message}
                className={`${inputBase} resize-none`}
              />

              {/* Submit */}
              <button
                type="submit"
                className="
                  mt-2 w-full rounded-lg py-3.5 text-sm font-semibold tracking-wider
                  bg-[var(--color-theme)] text-[var(--color-text-inverse)]
                  transition-all duration-200
                  hover:brightness-110 hover:shadow-lg hover:shadow-[var(--color-theme)]/20
                  active:scale-[0.98]
                "
              >
                {t.careers.form.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
