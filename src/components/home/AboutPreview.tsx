"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutPreview() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-10 md:py-14 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="/images/launch-pad.jpg"
                  alt="SSDF Launch Pad on the banks of Gandak River"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium drop-shadow-lg">
                    SSDF Launch Pad — Gandak River Banks, Deoria
                  </p>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-golden-400/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-river-400/20 rounded-xl -z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center gap-2 text-golden-500 mb-3">
              <BookOpen size={18} />
              <span className="text-xs font-semibold uppercase tracking-wider">About Us</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-800 mb-5 leading-tight">
              Inspired by the Sacred Flow of{" "}
              <span className="text-golden-500">Maa Narayani River</span>
            </h2>
            <p className="text-navy-500 text-base leading-relaxed mb-4">
              Our foundation nurtures knowledge, curiosity, and scientific
              thinking in society. Rooted in Indian values and dedicated to
              community upliftment, we awaken curiosity, experimentation,
              and confidence among the youth of Deoria and beyond.
            </p>
            <p className="text-navy-500 text-base leading-relaxed mb-6">
              Our effort is not merely to teach subjects, but to ignite a
              lifelong love for science, innovation, and nation-building.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-navy-50 rounded-xl p-3.5">
                <p className="text-2xl font-bold text-navy-800">2026</p>
                <p className="text-xs text-navy-500">Incorporated</p>
              </div>
              <div className="bg-navy-50 rounded-xl p-3.5">
                <p className="text-2xl font-bold text-navy-800">Sec. 8</p>
                <p className="text-xs text-navy-500">Non-Profit Company</p>
              </div>
            </div>

            <Link href="/about">
              <Button variant="secondary">
                Read Our Full Story <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
