import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { getAbsoluteUrl, siteDescription, siteTitle } from "@/lib/seo";

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
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
  title: {
    default: siteTitle,
    template: `%s | ${profile.name}`,
  },
  description: siteDescription,
  applicationName: `${profile.name} Portfolio`,
  authors: [
    {
      name: profile.name,
      ...(getAbsoluteUrl("/") ? { url: getAbsoluteUrl("/") } : {}),
    },
  ],
  creator: profile.name,
  publisher: profile.name,
  ...(getAbsoluteUrl("/")
    ? { alternates: { canonical: getAbsoluteUrl("/") } }
    : {}),
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
    siteName: profile.name,
    locale: siteConfig.locale,
    ...(getAbsoluteUrl("/") ? { url: getAbsoluteUrl("/") } : {}),
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
