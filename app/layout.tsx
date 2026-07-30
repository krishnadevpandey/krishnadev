// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krishnadev Pandey — Materials, MEMS & Functional Devices",
  description:
    "Research portfolio of Krishnadev Pandey — undergraduate researcher in piezoelectric thin films, ferroelectric devices, MEMS integration, and computational materials science at MANIT Bhopal and IISc Bangalore.",
  keywords: [
    "piezoelectric thin films",
    "ferroelectric devices",
    "MEMS",
    "PZT",
    "materials science",
    "IISc Bangalore",
    "MANIT Bhopal",
    "Krishnadev Pandey",
    "DFT",
    "Laser Doppler Vibrometry",
  ],
  authors: [{ name: "Krishnadev Pandey" }],
  creator: "Krishnadev Pandey",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://krishnadev.pages.dev", // update to your actual domain
    title: "Krishnadev Pandey — Materials, MEMS & Functional Devices",
    description:
      "Research portfolio — piezoelectric thin films, ferroelectric devices, MEMS, and computational materials science.",
    siteName: "Krishnadev Pandey",
  },
  twitter: {
    card: "summary",
    title: "Krishnadev Pandey — Materials, MEMS & Functional Devices",
    description:
      "Research portfolio — piezoelectric thin films, ferroelectric devices, MEMS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060608",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}