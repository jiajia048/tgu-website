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

export const metadata: Metadata = {
  title: "TGU",
  description: "TGU Official Website",
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
