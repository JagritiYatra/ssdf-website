"use client";

import { Shield, Check } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/constants";

const sections = [
  {
    title: "1. Information We Collect",
    subsections: [
      {
        subtitle: "a) Personal Information (provided by you)",
        list: [
          "Full name, email address, and phone number",
          "Photograph (uploaded during event registration for ID card generation)",
          "Institutional affiliation, state, and educational category (School/College/Professional)",
          "Team name and team member details for competition events",
          "Payment information (processed by Razorpay — we do not store card details)",
        ],
      },
      {
        subtitle: "b) Automatically Collected Information",
        list: [
          "Browser type, device type, operating system, and IP address",
          "Pages visited, time spent on pages, and navigation patterns",
          "Cookies and similar tracking technologies (see Section 6)",
        ],
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    list: [
      "To process event registrations and generate participant ID cards",
      "To communicate about programs, events, schedules, and updates",
      "To verify eligibility for competitions, scholarships, and programs",
      "To process payments and issue receipts for registration fees",
      "To improve our Website, services, and user experience",
      "To comply with legal obligations and respond to lawful requests",
      "To publish event photographs and media for promotional and educational purposes (with appropriate consent)",
    ],
  },
  {
    title: "3. Data Storage & Security",
    content:
      "Registration data is stored securely using industry-standard practices. We implement reasonable technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of electronic storage or transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "4. Data Sharing & Disclosure",
    intro:
      "We do not sell, rent, or trade your personal information. We may share your data only in the following circumstances:",
    list: [
      "Partner Organizations — With ISRO, IN-SPACe, Astronomical Society of India, and other collaborating institutions, solely for event coordination and verification purposes",
      "Payment Processors — With Razorpay for secure payment processing (governed by Razorpay's privacy policy)",
      "Legal Requirements — When required by law, court order, or government regulation",
      "Safety — When necessary to protect the safety of participants during events",
    ],
  },
  {
    title: "5. Data Retention",
    content:
      "We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. Registration data for events is retained for a period of 3 years from the date of the event for record-keeping and alumni engagement. You may request deletion of your personal data by contacting us.",
  },
  {
    title: "6. Cookies",
    content:
      "Our Website may use cookies and similar technologies for analytics and improving user experience. Cookies are small data files stored on your device. You can control cookie preferences through your browser settings. Disabling cookies may affect certain Website features.",
  },
  {
    title: "7. Third-Party Links",
    content:
      "Our Website may contain links to external websites (including partner organizations, payment gateways, and social media). We are not responsible for the privacy practices of these third-party sites. We encourage you to read their privacy policies before providing any personal information.",
  },
  {
    title: "8. Children's Privacy",
    content:
      "Many of our programs are designed for students, including those under 18 years of age. We collect minors' information only with parental or guardian consent during registration. Parents/guardians may contact us to review, modify, or delete their child's personal information.",
  },
  {
    title: "9. Your Rights",
    list: [
      "Access the personal data we hold about you",
      "Request correction of inaccurate or incomplete data",
      "Request deletion of your personal data (subject to legal retention requirements)",
      "Withdraw consent for data processing at any time",
      "Lodge a complaint with the relevant data protection authority",
    ],
  },
  {
    title: "10. Changes to This Policy",
    content:
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this page periodically.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy"
        highlight="Policy"
        subtitle="We are committed to protecting the privacy of visitors and users of our Website in compliance with the Information Technology Act, 2000."
        icon={<Shield className="text-golden-400" size={24} />}
      />

      {/* Intro */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6 md:p-8 border-l-4 border-river-400">
            <p className="text-navy-500 text-xs uppercase tracking-wider mb-3">
              Last updated: February 6, 2026
            </p>
            <p className="text-navy-600 leading-relaxed text-sm sm:text-base">
              <strong className="text-navy-800">{SITE_NAME}</strong>, a Section
              8 Non-Profit Company (CIN:{" "}
              <span className="font-mono text-xs">{CONTACT.cin}</span>), is
              committed to protecting the privacy of visitors and users of our
              Website ({SITE_URL}). This Privacy Policy explains how we collect,
              use, disclose, and protect your personal information.
            </p>
          </Card>
        </div>
      </section>

      {/* Sections */}
      <section className="py-10 md:py-14 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {sections.map((s) => (
            <Card key={s.title} className="p-6 md:p-8">
              <h2 className="text-lg font-bold text-navy-800 mb-4">
                {s.title}
              </h2>
              {s.intro && (
                <p className="text-navy-600 text-sm leading-relaxed mb-3">
                  {s.intro}
                </p>
              )}
              {s.content && (
                <p className="text-navy-600 text-sm leading-relaxed">
                  {s.content}
                </p>
              )}
              {s.subsections &&
                s.subsections.map((sub) => (
                  <div key={sub.subtitle} className="mb-4 last:mb-0">
                    <h3 className="text-sm font-semibold text-navy-700 mb-2">
                      {sub.subtitle}
                    </h3>
                    <ul className="space-y-2">
                      {sub.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-forest-50 text-forest-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={12} />
                          </div>
                          <span className="text-navy-600 text-sm leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              {s.list && !s.subsections && (
                <ul className="space-y-2.5">
                  {s.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-forest-50 text-forest-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} />
                      </div>
                      <span className="text-navy-600 text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-navy-800 mb-5">
            11. Contact Us
          </h2>
          <Card className="p-6 md:p-8 bg-navy-50 border-navy-100">
            <p className="text-navy-600 text-sm mb-4">
              For any privacy-related queries or requests, please contact:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <p className="text-navy-500 text-xs uppercase tracking-wider mb-0.5">
                  Organization
                </p>
                <p className="text-navy-700 font-medium">{SITE_NAME}</p>
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
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-river-500 hover:text-river-600 font-medium"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div>
                <p className="text-navy-500 text-xs uppercase tracking-wider mb-0.5">
                  Phone
                </p>
                <p className="text-navy-700 font-medium">{CONTACT.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-navy-500 text-xs uppercase tracking-wider mb-0.5">
                  Address
                </p>
                <p className="text-navy-700 font-medium">{CONTACT.address}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
