import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Media",
  description: "Latest news, media coverage, and press clippings about SSDF events including CANSAT India competition, model rocketry launches, and science education initiatives.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
