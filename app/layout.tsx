import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HeroUIProviders from "@/components/heroui-provider";
import PwaRegister from "@/components/pwa-register";
import { brandName, brandNameWithDiacritics, siteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brandName} | Vodovodne i kanalizacione instalacije`,
    template: `%s | ${brandName}`,
  },
  description:
    "HIDRO MONT JOVANCIC, Nis - vodovodne i kanalizacione instalacije, montaza sanitarije, protivpozarne instalacije, zemljani radovi i iskopi.",
  applicationName: brandName,
  category: "construction",
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
    "hidro mont jovancic",
    "hidro mont jovančić",
    "hidromont nis",
    "vodovodne instalacije",
    "kanalizacione instalacije",
    "vodovodne instalacije nis",
    "kanalizacione instalacije nis",
    "protivpozarne instalacije",
    "pp instalacije nis",
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
    siteName: brandName,
    title: `${brandName} | Vodovodne i kanalizacione instalacije`,
    description:
      "Strucni tim za instalacione i zemljane radove: vodovod, kanalizacija, sanitarije, PP mreza i iskopi.",
    images: [
      {
        url: "/oldsite/p1.jpg",
        width: 1200,
        height: 630,
        alt: `${brandName} - vodovodne i kanalizacione instalacije`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} | Vodovodne i kanalizacione instalacije`,
    description:
      "Vodovodne i kanalizacione instalacije, PP mreza, sanitarije, zemljani radovi i iskopi u Nisu i okolini.",
    images: ["/oldsite/p1.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f6ecf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brandName,
    alternateName: [brandNameWithDiacritics, "Hidromont Jovancic", "Hidromont Nis"],
    image: `${siteUrl}/oldsite/p1.jpg`,
    url: siteUrl,
    telephone: "+381637012339",
    email: "hidromontjovancic@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Moravske divizije 36",
      addressLocality: "Nis",
      postalCode: "18000",
      addressCountry: "RS",
    },
    areaServed: ["Nis", "Niska Banja", "Leskovac", "Prokuplje", "Aleksinac"],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vodovodne instalacije" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kanalizacione instalacije" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Protivpozarne instalacije" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Zemljani radovi i iskopi" } },
    ],
  };

  return (
    <html lang="sr-Latn-RS" className={inter.variable}>
      <body className="bg-light text-dark antialiased">
        <PwaRegister />
        <HeroUIProviders>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </HeroUIProviders>
        <style>{`
          .text-primary { color: #0f6ecf !important; }
          .bg-primary { background-color: #0f6ecf !important; }
          .border-primary { border-color: #0f6ecf !important; }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
