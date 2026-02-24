import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import {
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_DESCRIPTION,
  SITE_MOTTO,
  SITE_URL,
  CONTACT,
} from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_MOTTO}`,
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "SSDF",
    "Shrinarayani Science Development Foundation",
    "science education",
    "CANSAT India",
    "CanSat India 2026",
    "model rocketry",
    "space science",
    "IN-SPACe",
    "ISRO",
    "student satellite competition",
    "Deoria",
    "Uttar Pradesh",
    "rural youth",
    "science olympiad",
    "rocketry workshop",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Promoting science education and model rocketry`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "theme-color": "#1B2D4F",
    "msapplication-TileColor": "#1B2D4F",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-transparent.png`,
  description: SITE_DESCRIPTION,
  foundingDate: "2026-02-06",
  address: {
    "@type": "PostalAddress",
    streetAddress: "10/236 Raghav Nagar, Civil Lines, Near Income Tax Office",
    addressLocality: "Deoria",
    addressRegion: "Uttar Pradesh",
    postalCode: "274001",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CONTACT.phone,
    email: CONTACT.email,
    contactType: "customer service",
  },
  sameAs: [
    "https://www.linkedin.com/company/112378159/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased bg-white text-navy-800 font-sans`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
