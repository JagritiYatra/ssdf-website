"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Clock,
  Send,
  Headphones,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { SITE_NAME, CONTACT } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ContactPage() {
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();
  const { ref: orgRef, isVisible: orgVisible } = useScrollAnimation();

  return (
    <>
      <PageHeader
        title="Contact"
        highlight="Us"
        subtitle="Have questions about our programs, events, or registration? We'd love to hear from you."
        icon={<Headphones className="text-golden-400" size={24} />}
      />

      {/* Contact Cards */}
      <section className="py-10 md:py-14 bg-white" ref={cardsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={cardsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 }}
            >
              <Card className="p-5 h-full">
                <div className="w-10 h-10 bg-golden-50 text-golden-600 rounded-xl flex items-center justify-center mb-3">
                  <Mail size={20} />
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-1">Email</h3>
                <p className="text-navy-500 text-xs mb-3 leading-relaxed">
                  General inquiries, registrations & program info
                </p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-river-500 hover:text-river-600 font-medium text-xs inline-flex items-center gap-1.5"
                >
                  <Send size={12} />
                  {CONTACT.email}
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={cardsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-5 h-full">
                <div className="w-10 h-10 bg-golden-50 text-golden-600 rounded-xl flex items-center justify-center mb-3">
                  <Phone size={20} />
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-1">Phone</h3>
                <p className="text-navy-500 text-xs mb-3 leading-relaxed">
                  Urgent queries or event day support
                </p>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s|-/g, "")}`}
                  className="text-river-500 hover:text-river-600 font-medium text-xs inline-flex items-center gap-1.5"
                >
                  <Phone size={12} />
                  {CONTACT.phone}
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={cardsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
            >
              <Card className="p-5 h-full">
                <div className="w-10 h-10 bg-golden-50 text-golden-600 rounded-xl flex items-center justify-center mb-3">
                  <MapPin size={20} />
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-1">
                  Registered Office
                </h3>
                <p className="text-navy-500 text-xs mb-3 leading-relaxed">
                  Visit us or send correspondence
                </p>
                <p className="text-navy-700 text-xs font-medium leading-relaxed">
                  {CONTACT.address}
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={cardsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-5 h-full">
                <div className="w-10 h-10 bg-golden-50 text-golden-600 rounded-xl flex items-center justify-center mb-3">
                  <Clock size={20} />
                </div>
                <h3 className="text-sm font-bold text-navy-800 mb-1">
                  Office Hours
                </h3>
                <p className="text-navy-500 text-xs mb-3 leading-relaxed">
                  We are available during these hours
                </p>
                <p className="text-navy-700 text-xs font-medium">
                  Mon – Sat: 10:00 AM – 6:00 PM IST
                </p>
                <p className="text-navy-400 text-[10px] mt-1">
                  Closed on Sundays & National Holidays
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Organization Details */}
      <section className="py-10 md:py-14 bg-navy-50" ref={orgRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={orgVisible ? { opacity: 1, y: 0 } : {}}
          >
            <Card className="p-6 md:p-8 border-t-2 border-golden-400">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 bg-golden-50 text-golden-600 rounded-xl flex items-center justify-center shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-navy-800">
                    Organization Details
                  </h2>
                  <p className="text-navy-500 text-xs mt-0.5">
                    Official registration and compliance information
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm">
                <div>
                  <p className="text-navy-500 text-xs uppercase tracking-wider mb-0.5">
                    Full Name
                  </p>
                  <p className="text-navy-700 font-medium">{SITE_NAME}</p>
                </div>
                <div>
                  <p className="text-navy-500 text-xs uppercase tracking-wider mb-0.5">
                    Type
                  </p>
                  <p className="text-navy-700 font-medium">{CONTACT.type}</p>
                </div>
                <div>
                  <p className="text-navy-500 text-xs uppercase tracking-wider mb-0.5">
                    Incorporated
                  </p>
                  <p className="text-navy-700 font-medium">
                    {CONTACT.incorporationDate}
                  </p>
                </div>
                <div>
                  <p className="text-navy-500 text-xs uppercase tracking-wider mb-0.5">
                    CIN
                  </p>
                  <p className="text-navy-700 font-medium font-mono text-xs">
                    {CONTACT.cin}
                  </p>
                </div>
                <div>
                  <p className="text-navy-500 text-xs uppercase tracking-wider mb-0.5">
                    PAN
                  </p>
                  <p className="text-navy-700 font-medium font-mono text-xs">
                    {CONTACT.pan}
                  </p>
                </div>
                <div>
                  <p className="text-navy-500 text-xs uppercase tracking-wider mb-0.5">
                    TAN
                  </p>
                  <p className="text-navy-700 font-medium font-mono text-xs">
                    {CONTACT.tan}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-3">
              Our Location
            </h2>
            <p className="text-navy-500 max-w-xl mx-auto text-sm">
              Deoria, Uttar Pradesh — on the banks of the sacred Gandak River
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-navy-100 shadow-lg h-64 sm:h-80 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28499.59!2d83.77!3d26.50!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993e5a1c2b8f5f7%3A0x2c6d0e5e5e5e5e5e!2sDeoria%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SSDF Office Location - Deoria, Uttar Pradesh"
            />
          </div>
        </div>
      </section>
    </>
  );
}
