"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_SHORT_NAME } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy-900/95 backdrop-blur-md shadow-lg py-1"
          : "bg-navy-900 py-2"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="bg-white rounded-lg p-0.5">
              <Image
                src="/images/logo-transparent.png"
                alt={SITE_SHORT_NAME}
                width={52}
                height={52}
                className="w-10 h-10 md:w-12 md:h-12 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-base md:text-lg leading-tight tracking-wide">
                {SITE_SHORT_NAME}
              </span>
              <span className="text-golden-400 text-[10px] md:text-xs font-medium leading-tight hidden sm:block">
                Sa Vidya Ya Vimuktaye
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.filter((l) => l.href !== "/register").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  pathname === link.href
                    ? "text-golden-400 bg-white/5"
                    : "text-navy-200 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/register" className="ml-3">
              <Button size="sm" className="shadow-golden-400/20 shadow-lg">
                Register Now <ChevronRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-navy-900 border-t border-navy-800",
          isOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === link.href
                  ? "text-golden-400 bg-navy-800"
                  : "text-navy-200 hover:text-white hover:bg-navy-800/60"
              )}
            >
              {link.label}
              <ChevronRight size={16} className="opacity-40" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
