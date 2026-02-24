"use client";

import { FileText, Check } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/constants";

const sections = [
  {
    title: "1. About the Organization",
    content: `${`Shrinarayani Science Development Foundation`} is a Section 8 Company limited by guarantee under the Companies Act, 2013, registered at ${`C/O Ashutosh Kumar, Jagriti Sewa Sansthan, Raghav Nagar, Deoria New Colony, Deoria Sadar, Deoria-274001, Uttar Pradesh`}. SSDF is established with the objective of promoting science education, space science, model rocketry, and allied scientific activities among youth, particularly in rural and underserved areas.`,
  },
  {
    title: "2. Objectives & Nature of Services",
    intro: "SSDF provides the following services on a non-profit basis:",
    list: [
      "Organizing science competitions including CanSat India Student Competition, model rocketry events, science fairs, and olympiads",
      "Conducting workshops, training programs, and educational sessions in space science, rocketry, and scientific disciplines",
      "Providing scholarships, stipends, and financial support to meritorious students from rural and economically weaker backgrounds",
      "Operating and maintaining student rocket launch facilities for educational and research purposes",
      "Establishing and running computer education centers and science laboratories in underserved areas",
      "Facilitating collaborations with national space agencies (ISRO, IN-SPACe), scientific bodies (Astronomical Society of India), and educational institutions",
    ],
  },
  {
    title: "3. Eligibility",
    content:
      "Our services are available to students, educators, institutions, and individuals interested in science education and rocketry. Minors (under 18 years) must have parental or guardian consent to register for events and programs. By registering, you confirm that all information provided is accurate and complete.",
  },
  {
    title: "4. Registration & Event Participation",
    list: [
      "Registration for events and programs is subject to availability and eligibility criteria specified for each program.",
      "Participants must provide accurate personal details, institutional affiliation, and team information where applicable.",
      "SSDF reserves the right to accept, reject, or cancel any registration at its sole discretion.",
      "Participants must abide by all safety guidelines and event rules during activities, especially during model rocket launches and field events.",
      "SSDF may photograph, video record, and publish media from events for promotional and educational purposes.",
    ],
  },
  {
    title: "5. Payments & Donations",
    content:
      "Being a Section 8 non-profit, SSDF does not distribute profits. Registration fees (where applicable) are used exclusively for event organization, materials, venue, and logistics. Donations received are utilized for furthering the Foundation's objectives as stated in its Memorandum of Association. All payments are processed securely through Razorpay payment gateway. SSDF does not store any payment card details on its servers.",
  },
  {
    title: "6. Intellectual Property",
    content:
      "All content on this Website including text, logos, graphics, photographs, and design elements are the intellectual property of SSDF or its content partners and are protected under applicable Indian copyright laws. You may not reproduce, distribute, or use any content without prior written permission from SSDF.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      'SSDF organizes activities involving model rocketry and field events with full safety protocols. However, participation in such activities involves inherent risks. SSDF, its directors, officers, and volunteers shall not be held liable for any injury, loss, or damage arising from participation in events, except in cases of proven negligence. The Website and its content are provided "as is" without warranties of any kind.',
  },
  {
    title: "8. User Conduct",
    list: [
      "Do not use the Website for any unlawful purpose",
      "Do not provide false or misleading information during registration",
      "Do not attempt to gain unauthorized access to the Website's systems",
      "Do not engage in any activity that disrupts or interferes with the Website's functionality",
    ],
  },
  {
    title: "9. Governing Law & Jurisdiction",
    content:
      "These Terms are governed by the laws of India. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts in Deoria, Uttar Pradesh, India.",
  },
  {
    title: "10. Amendments",
    content:
      "SSDF reserves the right to modify these Terms at any time. Changes will be effective upon posting on this page. Continued use of the Website constitutes acceptance of the revised Terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms &"
        highlight="Conditions"
        subtitle={`By accessing or using ${SITE_URL}, you agree to be bound by these Terms & Conditions.`}
        icon={<FileText className="text-golden-400" size={24} />}
      />

      {/* Intro */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6 md:p-8 border-l-4 border-golden-400">
            <p className="text-navy-500 text-xs uppercase tracking-wider mb-3">
              Last updated: February 6, 2026
            </p>
            <p className="text-navy-600 leading-relaxed text-sm sm:text-base">
              Welcome to {SITE_URL} (&ldquo;Website&rdquo;), owned and operated
              by <strong className="text-navy-800">{SITE_NAME}</strong>{" "}
              (&ldquo;SSDF&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;our&rdquo;), a Section 8 Non-Profit Company incorporated
              under the Companies Act, 2013 with CIN:{" "}
              <strong className="text-navy-800 font-mono text-xs">
                {CONTACT.cin}
              </strong>
              .
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
              {s.list && (
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

      {/* Contact Info */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-navy-800 mb-5">
            11. Contact Information
          </h2>
          <Card className="p-6 md:p-8 bg-navy-50 border-navy-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <p className="text-navy-500 text-xs uppercase tracking-wider mb-0.5">
                  Organization
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
                  CIN
                </p>
                <p className="text-navy-700 font-medium font-mono text-xs">
                  {CONTACT.cin}
                </p>
              </div>
              <div>
                <p className="text-navy-500 text-xs uppercase tracking-wider mb-0.5">
                  Address
                </p>
                <p className="text-navy-700 font-medium">{CONTACT.address}</p>
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
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
