import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Launch Pad",
  description: "SSDF Launch Pad — a dedicated facility for model rocketry and CanSat launches on the banks of the Gandak River in Deoria, Uttar Pradesh.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
