import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Refund and cancellation policy for SSDF events and program registrations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
