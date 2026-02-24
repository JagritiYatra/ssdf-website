"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CTABanner() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-10 md:py-14 bg-gradient-to-br from-golden-400 via-golden-400 to-golden-500 relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/8 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-golden-300/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-navy-900/10 rounded-2xl mb-5">
            <Rocket className="text-navy-900" size={28} />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-900 mb-4 leading-tight">
            Ready to Launch Your Journey?
          </h2>
          <p className="text-base sm:text-lg text-navy-800/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Register for CanSat India 2026 — India&apos;s premier student satellite
            competition. Design, build, and launch your own CanSat!
          </p>
          <Link href="/register">
            <Button variant="secondary" size="lg" className="shadow-xl">
              Register Your Team <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
