"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Ruler, Rocket, Shield, Navigation } from "lucide-react";
import Card from "@/components/ui/Card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const specs = [
  {
    icon: MapPin,
    title: "Location",
    value: "Banks of Gandak River, Deoria, UP",
  },
  {
    icon: Ruler,
    title: "Launch Area",
    value: "Open field with clear sky access",
  },
  {
    icon: Rocket,
    title: "Capacity",
    value: "Model rockets and CanSat payloads",
  },
  {
    icon: Shield,
    title: "Safety Zone",
    value: "Designated safety perimeter with trained marshals",
  },
  {
    icon: Navigation,
    title: "Recovery",
    value: "River-side open terrain for payload recovery",
  },
];

export default function LaunchPadPage() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      {/* Hero with Parallax Effect */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/launch-pad.jpg"
            alt="SSDF Launch Pad aerial view"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/60 to-navy-900" />
        </div>
        <div className="relative z-10 h-full flex items-end pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-golden-400 font-medium text-sm mb-3">
                <MapPin size={16} />
                Deoria, Uttar Pradesh
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
                SSDF{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-golden-300 to-golden-500">
                  Launch Pad
                </span>
              </h1>
              <p className="text-navy-200 text-base sm:text-lg max-w-2xl leading-relaxed">
                Our dedicated rocket and CanSat launch facility on the banks of
                the Gandak River — where science meets the sky.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About the Launch Pad */}
      <section className="py-10 md:py-14 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-golden-500 mb-3">
              <Rocket size={18} />
              <span className="text-xs font-semibold uppercase tracking-wider">About the Facility</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-3">
              A World-Class Launch Site in Rural India
            </h2>
            <p className="text-navy-500 max-w-xl mx-auto text-sm">
              Purpose-built for model rocketry and CanSat launches
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <p className="text-navy-600 leading-relaxed">
                The SSDF Launch Pad is a dedicated facility for model rocketry
                and CanSat launches, situated on the scenic banks of the Gandak
                River in Deoria, Uttar Pradesh. This facility serves as the
                primary launch site for the CanSat India competition and all
                SSDF rocketry workshops.
              </p>
              <p className="text-navy-600 leading-relaxed">
                With open terrain, clear sky access, and river-side recovery
                areas, the site provides ideal conditions for rocket launches
                and payload recovery operations. The facility is equipped with
                safety measures and trained launch marshals to ensure safe
                operations.
              </p>
              <p className="text-navy-600 leading-relaxed">
                The launch pad has hosted the CANSAT India Student Competition
                with 150+ participants from different parts of India, making it one of the most active
                student rocketry sites in eastern Uttar Pradesh.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              {specs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={spec.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Card className="p-4 flex items-start gap-4">
                      <div className="w-10 h-10 bg-golden-50 text-golden-600 rounded-lg flex items-center justify-center shrink-0">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-800 text-sm">{spec.title}</h3>
                        <p className="text-navy-500 text-sm">{spec.value}</p>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 md:py-14 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-3">Location</h2>
            <p className="text-navy-500 text-sm">Find us on the banks of Gandak River, Deoria</p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl aspect-[16/9] max-w-4xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114123.55449703895!2d83.74!3d26.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993e5e1149830c5%3A0xa9c0951e2e12c4f3!2sDeoria%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SSDF Launch Pad Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
