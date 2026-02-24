import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import { SITE_NAME, SITE_DESCRIPTION, SITE_MOTTO } from "@/lib/constants";

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
  title: {
    default: `${SITE_NAME} — ${SITE_MOTTO}`,
    template: `%s | SSDF`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "SSDF",
    "science education",
    "CanSat India",
    "model rocketry",
    "space science",
    "Deoria",
    "rural youth",
    "IN-SPACe",
  ],
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} antialiased bg-white text-navy-800 font-sans`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
