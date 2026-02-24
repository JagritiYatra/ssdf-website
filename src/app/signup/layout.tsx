import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an SSDF account to manage your registrations and access your dashboard.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
