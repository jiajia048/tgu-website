import type { Metadata, Viewport } from "next";
import {
  Inter,
  Playfair_Display,
  Noto_Sans_SC,
  Noto_Serif_SC,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const notoSansSC = Noto_Sans_SC({
  preload: false,
  display: "swap",
  variable: "--font-noto-sans-sc",
});

const notoSerifSC = Noto_Serif_SC({
  preload: false,
  display: "swap",
  variable: "--font-noto-serif-sc",
});

const SITE_URL = "https://tgu-website.vercel.app";
const OG_TITLE = "About Us | TGU";
const OG_DESCRIPTION = "A leading travel food & beverage operator in Asia.";
const OG_IMAGE = "/logos/logo.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: OG_TITLE,
  description: OG_DESCRIPTION,
  icons: {
    icon: [{ url: OG_IMAGE, type: "image/png" }],
    shortcut: OG_IMAGE,
    apple: [{ url: OG_IMAGE, type: "image/png" }],
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "TGU",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 750,
        height: 740,
        alt: "TGU",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Pinch-zoom stays enabled; capping it keeps iOS from zooming on field focus
  maximumScale: 5,
  // Lets the page paint behind the notch so safe-area insets can be applied
  viewportFit: "cover",
  themeColor: "#ffffff",
};

const fontVariables = [
  inter.variable,
  playfair.variable,
  notoSansSC.variable,
  notoSerifSC.variable,
].join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
