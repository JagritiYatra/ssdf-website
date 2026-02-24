"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Flame,
  FlaskConical,
  Trophy,
  GraduationCap,
  Monitor,
  ArrowLeft,
  ArrowRight,
  Check,
  Users,
  Calendar,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getProgramBySlug, programs } from "@/lib/programs-data";

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Flame,
  FlaskConical,
  Trophy,
  GraduationCap,
  Monitor,
};

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const program = getProgramBySlug(slug);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-800 mb-4">
            Program Not Found
          </h1>
          <Link href="/programs">
            <Button variant="secondary">
              <ArrowLeft className="mr-2" size={18} /> Back to Programs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[program.icon] || Rocket;
  const otherPrograms = programs.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="relative pt-24 pb-10 md:pt-28 md:pb-12 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-navy-950/50 to-transparent" />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-golden-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-river-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-golden-400/20 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/programs"
            className="inline-flex items-center text-navy-400 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft size={14} className="mr-1.5" /> All Programs
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4"
          >
            <div className="w-14 h-14 bg-golden-400/10 border border-golden-400/20 text-golden-400 rounded-2xl flex items-center justify-center shrink-0">
              <Icon size={28} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 leading-tight">
                {program.title}
              </h1>
              <p className="text-navy-300 text-base sm:text-lg leading-relaxed">{program.shortDesc}</p>
              {program.featured && (
                <span className="inline-block mt-3 text-xs font-bold text-navy-900 bg-golden-400 px-3 py-1 rounded-full">
                  FEATURED EVENT
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-navy-600 text-lg leading-relaxed mb-10">
            {program.details.description}
          </p>

          {/* Highlights */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-navy-800 mb-5">Highlights</h2>
            <div className="space-y-3">
              {program.details.highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-forest-50 text-forest-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <span className="text-navy-600">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <Card className="p-5 bg-navy-50 border-navy-100">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-river-50 text-river-600 rounded-lg flex items-center justify-center shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-navy-800 text-sm mb-1">Eligibility</h3>
                  <p className="text-navy-600 text-sm">{program.details.eligibility}</p>
                </div>
              </div>
            </Card>

            {program.details.timeline && (
              <Card className="p-5 bg-golden-50 border-golden-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-golden-100 text-golden-700 rounded-lg flex items-center justify-center shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800 text-sm mb-1">Timeline</h3>
                    <p className="text-navy-600 text-sm">{program.details.timeline}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* CTA */}
          {program.featured && (
            <div className="text-center mt-12">
              <Link href="/register">
                <Button size="lg">
                  Register for {program.title}{" "}
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Programs */}
      <section className="py-10 md:py-14 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-navy-800 mb-2">Other Programs</h2>
            <p className="text-navy-500 text-sm">Explore more of our initiatives</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPrograms.map((p) => {
              const PIcon = iconMap[p.icon] || Rocket;
              return (
                <Link key={p.slug} href={`/programs/${p.slug}`}>
                  <Card hover className="p-6 h-full">
                    <div className="w-10 h-10 bg-golden-50 text-golden-600 rounded-lg flex items-center justify-center mb-3">
                      <PIcon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-navy-800 mb-2">
                      {p.title}
                    </h3>
                    <p className="text-navy-500 text-sm leading-relaxed">{p.shortDesc}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
