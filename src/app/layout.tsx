import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { site } from "@/config/site";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans-family",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.name} — ${site.headline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: getSiteUrl(),
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
