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
  Clock,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { programs } from "@/lib/programs-data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Flame,
  FlaskConical,
  Trophy,
  GraduationCap,
  Monitor,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  golden: { bg: "bg-golden-50", text: "text-golden-600", border: "border-golden-400" },
  river: { bg: "bg-river-50", text: "text-river-600", border: "border-river-400" },
  forest: { bg: "bg-forest-50", text: "text-forest-600", border: "border-forest-400" },
};

function Countdown() {
  const target = new Date("2026-03-14T09:00:00+05:30");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 justify-center lg:justify-start">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="bg-navy-800 text-golden-400 text-2xl md:text-3xl font-bold w-16 md:w-20 h-16 md:h-20 rounded-lg flex items-center justify-center tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <p className="text-navy-400 text-xs mt-1 capitalize">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProgramsPage() {
  const { ref, isVisible } = useScrollAnimation();
  const cansat = programs.find((p) => p.featured);

  return (
    <>
      <PageHeader
        title="Our"
        highlight="Programs"
        subtitle="Fostering scientific temper, innovation, and experimentation among students and professionals"
        icon={<Rocket className="text-golden-400" size={24} />}
      />

      {/* Featured: CanSat India */}
      {cansat && (
        <section className="py-10 md:py-12 bg-gradient-to-b from-navy-900 to-navy-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-bold text-navy-900 bg-golden-400 px-3 py-1 rounded-full mb-4">
                  FEATURED EVENT
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                  {cansat.title}
                </h2>
                <p className="text-navy-200 text-lg mb-6">
                  {cansat.details.description}
                </p>
                <div className="flex items-center gap-2 text-golden-400 mb-6">
                  <Clock size={18} />
                  <span className="text-sm font-medium">{cansat.details.timeline}</span>
                </div>
                <Link href="/register">
                  <Button size="lg">
                    Register Now <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
              </div>
              <div>
                <p className="text-navy-300 text-sm font-medium mb-4 text-center lg:text-left">
                  Launch Day Countdown
                </p>
                <Countdown />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Programs Grid */}
      <section className="py-10 md:py-14 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="All Programs"
            subtitle="Explore our comprehensive range of science education initiatives"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, i) => {
              const Icon = iconMap[program.icon] || Rocket;
              const color = colorMap[program.color];
              return (
                <motion.div
                  key={program.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link href={`/programs/${program.slug}`}>
                    <Card hover className="p-6 h-full border-t-4 border-t-transparent hover:border-t-golden-400 transition-all">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${color.bg} ${color.text}`}
                      >
                        <Icon size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-navy-800 mb-3">
                        {program.title}
                      </h3>
                      <p className="text-navy-500 text-sm leading-relaxed mb-4">
                        {program.shortDesc}
                      </p>
                      <span className="inline-flex items-center text-river-500 text-sm font-medium">
                        Learn more <ArrowRight className="ml-1" size={14} />
                      </span>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
