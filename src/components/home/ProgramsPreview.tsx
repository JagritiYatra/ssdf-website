"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Flame,
  FlaskConical,
  Trophy,
  GraduationCap,
  Monitor,
  ArrowRight,
  Layers,
} from "lucide-react";
import Card from "@/components/ui/Card";
import { programs } from "@/lib/programs-data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const iconMap: Record<string, React.ElementType> = {
  Rocket, Flame, FlaskConical, Trophy, GraduationCap, Monitor,
};

const colorMap: Record<string, { icon: string; badge: string; border: string }> = {
  golden: { icon: "bg-golden-50 text-golden-600", badge: "bg-golden-50 text-golden-700", border: "group-hover:border-golden-400" },
  river: { icon: "bg-river-50 text-river-600", badge: "bg-river-50 text-river-700", border: "group-hover:border-river-400" },
  forest: { icon: "bg-forest-50 text-forest-600", badge: "bg-forest-50 text-forest-700", border: "group-hover:border-forest-400" },
};

export default function ProgramsPreview() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-10 md:py-14 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center gap-2 text-forest-500 justify-center mb-2">
            <Layers size={18} />
            <span className="text-xs font-semibold uppercase tracking-wider">What We Do</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-800 mb-3">
            Our Programs
          </h2>
          <p className="text-navy-500 max-w-xl mx-auto">
            Empowering the next generation of scientists and innovators through hands-on learning
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((program, i) => {
            const Icon = iconMap[program.icon] || Rocket;
            const color = colorMap[program.color];
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={`/programs/${program.slug}`} className="group block h-full">
                  <Card hover className={`p-5 sm:p-6 h-full border-t-2 border-transparent ${color.border} transition-all`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color.icon}`}>
                        <Icon size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-navy-800 mb-1.5 group-hover:text-navy-900">
                          {program.title}
                        </h3>
                        <p className="text-navy-500 text-sm leading-relaxed line-clamp-2">
                          {program.shortDesc}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          {program.featured && (
                            <span className="text-[10px] font-bold text-golden-700 bg-golden-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                              Featured
                            </span>
                          )}
                          <span className="inline-flex items-center text-river-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Learn more <ArrowRight size={12} className="ml-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
