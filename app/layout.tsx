import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CARVO — Automotive Protection",
  description:
    "Carvo Malaysia — premium automotive protection. Window film, ceramic coating, paint protection film, and car mats, executed to a standard you can see at arm's length.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable}`}>
      <body>
        {children}
        {/* drag-to-fill image placeholder web component; upgrades <image-slot> retroactively */}
        <Script src="/image-slot.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
