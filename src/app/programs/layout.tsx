import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore SSDF programs — CANSAT India student satellite competition, model rocketry workshops, science fairs, olympiads, scholarships, and computer education.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
