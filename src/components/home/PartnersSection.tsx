"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import { PARTNERS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function PartnersSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-12 md:py-16 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 text-golden-500 mb-3">
            <Handshake size={18} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Collaborations
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-navy-800">
            Our Partners & Collaborators
          </h2>
          <p className="text-navy-500 text-sm mt-2 max-w-md mx-auto">
            Working together with leading organizations to advance science education and space technology in India.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-center gap-6 md:gap-8 lg:gap-10 overflow-x-auto"
        >
          {PARTNERS.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target={partner.url !== "#" ? "_blank" : undefined}
              rel={partner.url !== "#" ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center gap-2 shrink-0 transition-transform hover:scale-105"
            >
              <div className="bg-white rounded-lg p-2 shadow-sm border border-navy-100 group-hover:shadow-md group-hover:border-golden-200 transition-all">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={240}
                  height={120}
                  className="h-20 md:h-24 w-auto object-contain"
                />
              </div>
              <span className="text-[11px] text-navy-500 font-medium group-hover:text-navy-700 transition-colors">
                {partner.name}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
