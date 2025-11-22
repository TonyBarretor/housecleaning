import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium House Cleaning Service | Professional Home Cleaning",
  description: "Experience luxury house cleaning services for busy professionals. Background-checked staff, eco-friendly products, and 100% satisfaction guarantee. Book your free estimate today!",
  keywords: ["house cleaning", "premium cleaning service", "professional cleaners", "eco-friendly cleaning", "home cleaning"],
  authors: [{ name: "Premium House Cleaning" }],
  openGraph: {
    title: "Premium House Cleaning Service",
    description: "Come home to peace, calm, and a spotless space. Premium cleaning for busy professionals who value their time.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://premiumcleaning.com",
    siteName: "Premium House Cleaning",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Premium House Cleaning Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium House Cleaning Service",
    description: "Experience the luxury of a spotless home. Book your free estimate today!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
