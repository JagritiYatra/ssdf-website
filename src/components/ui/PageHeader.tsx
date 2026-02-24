"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function PageHeader({ title, highlight, subtitle, icon, className }: PageHeaderProps) {
  return (
    <section className={cn("relative pt-24 pb-10 md:pt-28 md:pb-12 bg-navy-900 overflow-hidden", className)}>
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-navy-950/50 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-golden-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-river-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-golden-400/20 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center w-14 h-14 bg-golden-400/10 border border-golden-400/20 rounded-2xl mb-5"
          >
            {icon}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
        >
          {title}{" "}
          {highlight && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-golden-300 to-golden-500">
              {highlight}
            </span>
          )}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-navy-300 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
