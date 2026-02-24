import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the SSDF website and participating in SSDF events and programs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
