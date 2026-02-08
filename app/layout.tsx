import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HeroUIProviders from "@/components/heroui-provider";
import PwaRegister from "@/components/pwa-register";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://hidromontjovancic.rs"),
  title: {
    default: "Hidromont Jovancic | Vodovodne i kanalizacione instalacije",
    template: "%s | Hidromont Jovancic",
  },
  description:
    "Hidromont Jovancic - vodovodne i kanalizacione instalacije, montaza sanitarije, protivpozarne instalacije, zemljani radovi i iskopi.",
  applicationName: "Hidromont Jovancic",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HM Admin",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  keywords: [
    "hidromont jovancic",
    "vodovodne instalacije",
    "kanalizacione instalacije",
    "protivpozarne instalacije",
    "montaza sanitarije",
    "zemljani radovi",
    "iskopi",
    "Nis",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "/",
    siteName: "Hidromont Jovancic",
    title: "Hidromont Jovancic | Vodovodne i kanalizacione instalacije",
    description:
      "Strucni tim za instalacione i zemljane radove: vodovod, kanalizacija, sanitarije, PP mreza i iskopi.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4a100",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr-Latn-RS" className={inter.variable}>
      <body className="bg-light text-dark antialiased">
        <PwaRegister />
        <HeroUIProviders>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </HeroUIProviders>
        <Analytics />
      </body>
    </html>
  );
}
