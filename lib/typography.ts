"use client";

import { useLanguage, type Locale } from "@/contexts/LanguageContext";

/**
 * Locale-aware design tokens.
 *
 * Chinese and English need genuinely different treatments: CJK reads well with
 * open tracking, loose leading, centred blocks and a near-black ink, whereas
 * the same settings make English look like a translated brochure printed in
 * pure black. Every token below therefore ships two variants — the `zh` side
 * reproduces the classes the site shipped with, the `en` side follows an
 * Inter-led editorial scale on a warmer ink ramp.
 *
 * Typography tokens carry font, size, weight, leading and tracking only, so
 * colour and spacing stay composable at the call site. Colour and surface
 * tokens are listed separately below.
 *
 * Both locales share the TGU red and gold; only the neutral ramp differs.
 */
export type DesignTokens = {
  /* ── Typography ── */
  /** Full-bleed banner headline. */
  heroTitle: string;
  /** Sentence-length supporting line under a banner headline. */
  heroLede: string;
  /** Short companion line under a banner headline. */
  heroEyebrow: string;
  /** Small uppercase label sitting above a heading. */
  kicker: string;
  /** Primary section heading. */
  sectionTitle: string;
  /** Display-scale section heading, for a section that carries a whole screen. */
  sectionTitleLg: string;
  /** Supporting line directly under a section heading. */
  sectionLede: string;
  /** Heading inside a card. */
  cardTitle: string;
  /** Larger card heading, e.g. a feature card. */
  cardTitleLg: string;
  /** Compact heading for a column or list item. */
  labelTitle: string;
  /** Long-form informational paragraph. */
  body: string;
  /** Long-form paragraph in a full-width block; only Chinese is justified. */
  bodyBlock: string;
  /** Short paragraph inside cards, list items and timelines. */
  bodySm: string;
  /** Captions and notes; supply leading at the call site. */
  caption: string;
  /** Large numeral in a stat block. */
  statValue: string;
  /** Label under a stat numeral. */
  statLabel: string;
  /** Label under a prominent, oversized stat numeral. */
  statLabelLg: string;
  /** Uppercase metadata label inside a card; supply the size at the call site. */
  metaLabel: string;
  /** Tracking for tabs, filter pills, buttons and nav links. */
  uiLabel: string;

  /* ── Reading widths ── */
  /** Standard paragraph. */
  measure: string;
  /** Larger introductory paragraph. */
  measureLede: string;
  /** Copy inside a split (two-column) layout. */
  measureSplit: string;
  /** Line-break control for a section heading. */
  measureHeading: string;
  /** Line-break control for a banner headline. */
  measureHeroHeading: string;
  /** Centred content column for a section with no split layout. */
  measureContainer: string;

  /* ── Composition ── */
  /**
   * Text alignment for informational sections. English reads left, Chinese
   * stays centred. This governs alignment only — pair it with `editorialMx`
   * so the block itself stays centred in the page grid.
   */
  editorialAlign: string;
  /** Flex/grid cross-axis counterpart of `editorialAlign`. */
  editorialItems: string;
  /** Block centring for measured text columns and logos. */
  editorialMx: string;

  /* ── Colour and surface ── */
  /** Heading ink. */
  titleColor: string;
  /** Body ink. */
  bodyColor: string;
  /** Secondary copy: notes, captions, metadata. */
  mutedColor: string;
  /** Tinted section background. */
  surfaceBg: string;
  /** Near-black background, matching the heading ink. */
  inkBg: string;
  /** Elevated information panel. */
  panel: string;
  /** Divider colour inside a panel. */
  panelDivide: string;
  /** Headline set over photography. */
  heroTitleColor: string;
  /** Supporting line set over photography. */
  heroLedeColor: string;
  /** Scrim between hero photography and hero text. */
  heroOverlay: string;
  /** Banner height. A CSS length for `style`, not a utility class. */
  heroHeight: string;
  /** Numeral colour in the homepage stats panel. */
  statValueColor: string;
};

const ZH: DesignTokens = {
  heroTitle: "font-serif text-3xl font-bold tracking-widest md:text-4xl lg:text-5xl",
  heroLede: "text-sm leading-relaxed tracking-wide md:text-base",
  heroEyebrow: "text-sm tracking-[0.2em] md:text-base lg:text-lg",
  kicker: "text-sm font-medium uppercase tracking-wider md:text-base",
  sectionTitle:
    "font-serif text-2xl font-bold leading-snug tracking-tight md:text-3xl lg:text-4xl",
  sectionTitleLg:
    "font-serif text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl",
  sectionLede: "text-base font-medium tracking-wide md:text-lg",
  cardTitle: "font-serif text-lg font-bold leading-snug tracking-tight md:text-xl",
  cardTitleLg: "font-serif text-xl font-bold leading-snug tracking-tight md:text-2xl",
  labelTitle: "font-serif text-base font-semibold tracking-widest md:text-lg",
  body: "text-sm leading-loose tracking-wide md:text-base md:leading-loose",
  bodyBlock:
    "text-sm leading-loose tracking-wide md:text-base md:leading-loose md:text-justify",
  bodySm: "text-sm leading-relaxed tracking-wide",
  caption: "text-xs tracking-wide",
  statValue: "font-bold tracking-tight",
  statLabel: "text-xs tracking-wider md:text-sm",
  statLabelLg: "text-sm tracking-widest md:text-lg",
  metaLabel: "font-medium uppercase tracking-wider",
  uiLabel: "tracking-wide",

  measure: "max-w-none",
  measureLede: "max-w-3xl",
  measureSplit: "max-w-none",
  measureHeading: "max-w-none",
  measureHeroHeading: "max-w-none",
  measureContainer: "max-w-none",

  editorialAlign: "text-center",
  editorialItems: "items-center",
  editorialMx: "mx-auto",

  titleColor: "text-[var(--color-title)]",
  bodyColor: "text-[var(--color-body)]",
  mutedColor: "text-[var(--color-body)]/60",
  surfaceBg: "bg-[var(--color-surface)]",
  inkBg: "bg-[var(--color-title)]",
  panel:
    "rounded-2xl bg-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5",
  panelDivide: "divide-gray-100",
  heroTitleColor: "text-white",
  heroLedeColor: "text-white/80",
  heroOverlay: "bg-black/45",
  heroHeight: "clamp(220px, 36vw, 480px)",
  statValueColor: "text-[var(--color-title)]",
};

const EN: DesignTokens = {
  heroTitle:
    "font-sans text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em]",
  heroLede: "text-base font-normal leading-[1.6] tracking-normal md:text-[1.0625rem]",
  heroEyebrow: "text-base font-normal leading-[1.6] tracking-normal md:text-[1.0625rem]",
  kicker: "text-[11px] font-semibold uppercase tracking-[0.1em] md:text-xs",
  sectionTitle:
    "font-sans text-[1.875rem] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.25rem] lg:text-[2.625rem]",
  sectionTitleLg:
    "font-sans text-[2rem] font-semibold leading-[1.06] tracking-[-0.025em] md:text-[2.5rem] lg:text-[3rem]",
  sectionLede: "text-base font-normal leading-[1.55] tracking-normal md:text-lg",
  cardTitle: "font-sans text-lg font-semibold leading-[1.25] tracking-[-0.015em] md:text-xl",
  cardTitleLg:
    "font-sans text-xl font-semibold leading-[1.2] tracking-[-0.02em] md:text-[1.625rem]",
  labelTitle: "font-sans text-base font-semibold tracking-[-0.01em] md:text-[1.0625rem]",
  body: "text-base leading-[1.65] tracking-normal md:text-[1.0625rem]",
  bodyBlock: "text-left text-base leading-[1.65] tracking-normal md:text-[1.0625rem]",
  bodySm: "text-sm leading-[1.6] tracking-normal md:text-[15px]",
  caption: "text-xs tracking-normal",
  statValue: "font-semibold tracking-[-0.02em]",
  statLabel: "text-[13px] tracking-normal md:text-sm",
  statLabelLg: "text-sm tracking-normal md:text-[15px]",
  metaLabel: "font-semibold uppercase tracking-[0.1em]",
  uiLabel: "tracking-normal",

  measure: "max-w-[680px]",
  measureLede: "max-w-[720px]",
  measureSplit: "max-w-[560px]",
  measureHeading: "max-w-[24ch]",
  measureHeroHeading: "max-w-[880px]",
  measureContainer: "max-w-[720px]",

  editorialAlign: "text-left",
  editorialItems: "items-start",
  editorialMx: "mx-auto",

  titleColor: "text-[var(--color-title-en)]",
  bodyColor: "text-[var(--color-body-en)]",
  mutedColor: "text-[var(--color-muted-en)]",
  surfaceBg: "bg-[var(--color-surface-en)]",
  inkBg: "bg-[var(--color-title-en)]",
  panel:
    "rounded-2xl bg-white shadow-[0_2px_28px_-10px_rgba(34,33,31,0.16)] ring-1 ring-[var(--color-hairline-en)]",
  panelDivide: "divide-[var(--color-hairline-en)]",
  heroTitleColor: "text-[var(--color-inverse-en)]",
  heroLedeColor: "text-[var(--color-inverse-en)]/85",
  heroOverlay: "bg-linear-to-b from-black/30 via-black/45 to-black/65",
  heroHeight: "clamp(320px, 40vw, 520px)",
  statValueColor: "text-[var(--color-theme)]",
};

export function getTokens(locale: Locale): DesignTokens {
  return locale === "en" ? EN : ZH;
}

export function useTypography(): DesignTokens {
  const { locale } = useLanguage();
  return getTokens(locale);
}
