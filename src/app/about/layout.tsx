import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Shrinarayani Science Development Foundation (SSDF) — a Section 8 non-profit promoting science education, space science, and model rocketry for rural youth in Deoria, Uttar Pradesh.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
