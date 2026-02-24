import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Shrinarayani Science Development Foundation. Address: 10/236 Raghav Nagar, Civil Lines, Deoria, U.P. 274001. Phone: 887-870-5000.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
