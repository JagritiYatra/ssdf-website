import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Linkedin } from "lucide-react";
import {
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_MOTTO_SANSKRIT,
  SITE_MOTTO_MEANING,
  CONTACT,
  NAV_LINKS,
  LEGAL_LINKS,
  PARTNERS,
  SOCIAL_LINKS,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-200">
      {/* Partners Strip */}
      <div className="border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-xs font-semibold text-navy-400 mb-8 uppercase tracking-[0.2em]">
            Our Partners & Collaborators
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {PARTNERS.map((partner) => {
              const isJpg = partner.logo.endsWith(".jpg") || partner.logo.endsWith(".jpeg");
              return (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  title={partner.name}
                >
                  <div className={`rounded-xl p-5 md:p-6 transition-all duration-300 ${isJpg ? "bg-white/90 group-hover:bg-white" : "bg-white/10 group-hover:bg-white/20"}`}>
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={180}
                      height={90}
                      className={`h-14 md:h-20 w-auto object-contain transition-opacity ${isJpg ? "" : "brightness-0 invert opacity-80 group-hover:opacity-100"}`}
                    />
                  </div>
                  <p className="text-center text-xs text-navy-400 mt-2 group-hover:text-navy-200 transition-colors">
                    {partner.name}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* About Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo-dark-bg.png"
                alt={SITE_SHORT_NAME}
                width={80}
                height={80}
                className="w-[72px] h-[72px] rounded-xl"
              />
              <div>
                <h3 className="text-white font-bold text-lg">{SITE_SHORT_NAME}</h3>
                <p className="text-golden-400 text-sm italic">&ldquo;{SITE_MOTTO_SANSKRIT}&rdquo;</p>
              </div>
            </div>
            <p className="text-sm text-navy-300 mb-4 max-w-md leading-relaxed">
              {SITE_MOTTO_MEANING}
            </p>
            <p className="text-sm text-navy-400 leading-relaxed">
              {SITE_NAME} is a {CONTACT.type} incorporated on{" "}
              {CONTACT.incorporationDate} in Deoria, Uttar Pradesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 hover:text-golden-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-golden-400/40 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 hover:text-golden-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-golden-400/40 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <div className="w-8 h-8 bg-golden-400/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-golden-400" />
                </div>
                <span className="text-navy-300">{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-golden-400/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-golden-400" />
                </div>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-navy-300 hover:text-golden-400 transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-golden-400/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-golden-400" />
                </div>
                <span className="text-navy-300">{CONTACT.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-golden-400/10 rounded-lg flex items-center justify-center shrink-0">
                  <Linkedin size={14} className="text-golden-400" />
                </div>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-300 hover:text-golden-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-center text-xs text-navy-500">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-center text-[10px] text-navy-600 mt-1">
            CIN: {CONTACT.cin} | {CONTACT.type}
          </p>
        </div>
      </div>
    </footer>
  );
}
