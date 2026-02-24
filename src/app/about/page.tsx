"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Telescope,
  BookOpen,
  Lightbulb,
  Users,
  GraduationCap,
  Heart,
  Monitor,
  Info,
  Eye,
  Target,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SITE_NAME, CONTACT } from "@/lib/constants";

const objectives = [
  { icon: Telescope, title: "Science & Space Education", desc: "Promote education in science, astronomy, space studies, mathematics, and technology with practical exposure." },
  { icon: BookOpen, title: "Workshops & Competitions", desc: "Organize workshops, science fairs, Olympiads, training programs, and model rocketry activities." },
  { icon: Lightbulb, title: "Learning Resources", desc: "Develop meaningful study material and digital learning resources for rural and semi-urban students." },
  { icon: Users, title: "National Collaborations", desc: "Collaborate with national scientific institutions including IN-SPACe, ISRO, and DRDO." },
  { icon: GraduationCap, title: "Scholarships & Awards", desc: "Provide scholarships, recognition, and encouragement to talented students and educators." },
  { icon: Heart, title: "Rural Outreach", desc: "Ensure science education reaches underprivileged, rural, and marginalized communities." },
  { icon: Monitor, title: "Computer Education", desc: "Offer computer education, personality development, and competitive exam guidance." },
];

const vision = [
  "To make Deoria Lok Sabha a land where scientific thinking and traditional wisdom walk together.",
  "To awaken curiosity in every child, like a flowing river that never stops learning.",
  "To nurture a generation that serves society through knowledge, innovation, and character.",
];

const mission = [
  "To spread science and skill-based education from villages to classrooms with dedication and sincerity.",
  "To create opportunities for rural youth to explore space, technology, and innovation.",
  "To provide guidance, mentorship, and equal opportunities to every deserving student.",
];

export default function AboutPage() {
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation();
  const { ref: vmRef, isVisible: vmVisible } = useScrollAnimation();
  const { ref: objRef, isVisible: objVisible } = useScrollAnimation();

  return (
    <>
      <PageHeader
        title="About"
        highlight="SSDF"
        subtitle="Sa Vidya Ya Vimuktaye — True knowledge is that which liberates from ignorance and limitations."
        icon={<Info className="text-golden-400" size={24} />}
      />

      {/* Founding Story */}
      <section className="py-10 md:py-14 bg-white" ref={storyRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image src="/images/launch-pad.jpg" alt="SSDF Launch Pad" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={storyVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="flex items-center gap-2 text-golden-500 mb-3">
                <BookOpen size={18} />
                <span className="text-xs font-semibold uppercase tracking-wider">Our Story</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-5">
                Inspired by the Sacred Flow of Maa Narayani River
              </h2>
              <p className="text-navy-500 leading-relaxed mb-4">
                Inspired by the sacred flow of <strong className="text-navy-700">Maa Narayani River</strong>,
                our foundation works with the spirit of nurturing knowledge, curiosity, and scientific
                thinking in society.
              </p>
              <p className="text-navy-500 leading-relaxed mb-6">
                Rooted in Indian values and dedicated to community upliftment, we aim to awaken curiosity
                (jigyasa), experimentation (prayog), and confidence among the youth of Deoria Lok Sabha
                and beyond. Our effort is not merely to teach subjects, but to ignite a lifelong love for
                science, innovation, and nation-building.
              </p>
              <div className="bg-navy-50 rounded-xl p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-sm"><span className="text-navy-400 w-28 shrink-0">Entity</span><span className="text-navy-700 font-medium">{SITE_NAME}</span></div>
                <div className="flex items-center gap-2 text-sm"><span className="text-navy-400 w-28 shrink-0">Type</span><span className="text-navy-700 font-medium">{CONTACT.type}</span></div>
                <div className="flex items-center gap-2 text-sm"><span className="text-navy-400 w-28 shrink-0">Incorporated</span><span className="text-navy-700 font-medium">{CONTACT.incorporationDate}</span></div>
                <div className="flex items-center gap-2 text-sm"><span className="text-navy-400 w-28 shrink-0">Location</span><span className="text-navy-700 font-medium">{CONTACT.address}</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-10 md:py-14 bg-navy-50" ref={vmRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={vmVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
              <Card className="p-6 md:p-8 h-full border-t-2 border-golden-400">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-golden-50 text-golden-600 rounded-xl flex items-center justify-center">
                    <Eye size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-800">Vision</h3>
                </div>
                <ul className="space-y-3">
                  {vision.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-golden-400 rounded-full mt-2 shrink-0" />
                      <span className="text-navy-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={vmVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}>
              <Card className="p-6 md:p-8 h-full border-t-2 border-river-400">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-river-50 text-river-600 rounded-xl flex items-center justify-center">
                    <Target size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-800">Mission</h3>
                </div>
                <ul className="space-y-3">
                  {mission.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-river-400 rounded-full mt-2 shrink-0" />
                      <span className="text-navy-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-10 md:py-14 bg-white" ref={objRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-3">Our 7 Objectives</h2>
            <p className="text-navy-500 max-w-xl mx-auto text-sm">Guiding pillars of our work in science education and community development</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {objectives.map((obj, i) => {
              const Icon = obj.icon;
              return (
                <motion.div key={obj.title} initial={{ opacity: 0, y: 20 }} animate={objVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: i * 0.06 }}>
                  <Card className="p-5 h-full">
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 bg-forest-50 text-forest-600 rounded-lg flex items-center justify-center shrink-0">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-navy-800 mb-1">{obj.title}</h3>
                        <p className="text-navy-500 text-xs leading-relaxed">{obj.desc}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
