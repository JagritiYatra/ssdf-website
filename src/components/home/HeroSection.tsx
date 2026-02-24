"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Sparkles,
  Landmark,
  Trophy,
} from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import RocketSVG from "./RocketSVG";
import SatelliteSVG from "./SatelliteSVG";
import LaunchPadSVG from "./LaunchPadSVG";
import Button from "@/components/ui/Button";

const slides = [
  {
    id: 0,
    badge: "CANSAT India 2026-27 — Registrations Open",
    badgeIcon: Sparkles,
    title: (
      <>
        Igniting{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-golden-300 to-golden-500">
          Scientific Curiosity
        </span>{" "}
        in Rural India
      </>
    ),
    subtitle:
      "Promoting science education, space science & model rocketry for youth in Deoria, Uttar Pradesh and beyond.",
    cta: { label: "Register for CANSAT 2026-27", href: "/register" },
    secondaryCta: { label: "Learn More", href: "/about" },
    showRocket: true,
    showPartners: true,
  },
  {
    id: 1,
    badge: "Supported by ISRO & IN-SPACe",
    badgeIcon: Landmark,
    title: (
      <>
        Backed by India&apos;s{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-river-300 to-river-500">
          Top Space Organizations
        </span>
      </>
    ),
    subtitle:
      "\"Space technology should benefit health, education & agriculture\" — MP Shashank Mani Tripathi. ISRO & IN-SPACe jointly inspect and support our launch facility.",
    cta: { label: "Explore Programs", href: "/programs" },
    secondaryCta: { label: "About SSDF", href: "/about" },
    showRocket: false,
    showPartners: true,
  },
  {
    id: 2,
    badge: "Historic Achievement — First in North India",
    badgeIcon: Trophy,
    title: (
      <>
        North India&apos;s{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-300 to-forest-500">
          First Student Rocket
        </span>{" "}
        Launch Pad
      </>
    ),
    subtitle:
      "700+ participants from 6 states, 70+ model rockets launched, 200+ institutions — Kushinagar became the country's first North Indian launch pad for student rocketry.",
    cta: { label: "View Launch Pad", href: "/launch-pad" },
    secondaryCta: { label: "News & Media", href: "/news" },
    showRocket: false,
    showPartners: false,
  },
];

const INTERVAL = 6000;

const slideVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  const slide = slides[current];
  const BadgeIcon = slide.badgeIcon;

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ParticleBackground />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-golden-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-river-400/8 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content - carousel area */}
          <div className="flex-1 text-center lg:text-left min-h-[340px] sm:min-h-[320px] md:min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 bg-golden-400/10 border border-golden-400/20 rounded-full px-4 py-1.5 mb-5">
                  <BadgeIcon size={14} className="text-golden-400" />
                  <span className="text-golden-400 text-xs sm:text-sm font-medium">
                    {slide.badge}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-white leading-[1.1] mb-5">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-navy-300 mb-7 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href={slide.cta.href}>
                    <Button size="lg" className="w-full sm:w-auto">
                      {slide.cta.label} <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </Link>
                  <Link href={slide.secondaryCta.href}>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      {slide.secondaryCta.label}
                    </Button>
                  </Link>
                </div>

                {slide.showPartners && (
                  <div className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                    <span className="text-xs text-navy-400">In collaboration with</span>
                    <div className="flex items-center gap-4">
                      <Image
                        src="/images/partners/inspace.png"
                        alt="IN-SPACe"
                        width={80}
                        height={30}
                        className="h-5 sm:h-6 w-auto brightness-0 invert opacity-50"
                      />
                    </div>
                  </div>
                )}

                {!slide.showPartners && (
                  <div className="mt-8 flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                    <div className="text-center lg:text-left">
                      <p className="text-2xl font-bold text-golden-400">700+</p>
                      <p className="text-[10px] text-navy-400 uppercase tracking-wider">Participants</p>
                    </div>
                    <div className="w-px h-8 bg-navy-700" />
                    <div className="text-center lg:text-left">
                      <p className="text-2xl font-bold text-golden-400">70+</p>
                      <p className="text-[10px] text-navy-400 uppercase tracking-wider">Rockets Launched</p>
                    </div>
                    <div className="w-px h-8 bg-navy-700" />
                    <div className="text-center lg:text-left">
                      <p className="text-2xl font-bold text-golden-400">6</p>
                      <p className="text-[10px] text-navy-400 uppercase tracking-wider">States</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side: animated SVG illustrations per slide */}
          <div className="hidden md:flex items-center justify-center flex-shrink-0 w-36 md:w-40 lg:w-52 xl:w-60">
            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${slide.id}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {slide.id === 0 && <RocketSVG />}
                {slide.id === 1 && <SatelliteSVG />}
                {slide.id === 2 && <LaunchPadSVG />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 justify-center lg:justify-start mt-10">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? "w-8 bg-golden-400"
                  : "w-3 bg-navy-600 hover:bg-navy-500"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
          <span className="text-[10px] text-navy-500 ml-2 tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] text-navy-400 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="text-golden-400/60" size={18} />
        </div>
      </motion.div>
    </section>
  );
}
