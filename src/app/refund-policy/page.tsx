"use client";

import { RotateCcw, Check, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/constants";

const refundTiers = [
  { timeframe: "30+ days before the event", refund: "Full refund (100%) minus gateway charges", color: "bg-forest-50 text-forest-700" },
  { timeframe: "15–29 days before the event", refund: "50% refund", color: "bg-golden-50 text-golden-700" },
  { timeframe: "7–14 days before the event", refund: "25% refund", color: "bg-orange-50 text-orange-700" },
  { timeframe: "Less than 7 days before event", refund: "No refund", color: "bg-red-50 text-red-700" },
];

const nonRefundable = [
  "Merchandise, kits, or physical materials already shipped or delivered",
  "Completed workshops or programs already attended",
  "Voluntary donations",
  "No-show (failure to attend without prior cancellation notice)",
];

const processingSteps = [
  "Approved refunds will be processed within 7–10 business days from the date of approval.",
  "Refunds will be credited to the original payment method (bank account, UPI, or card) used during registration.",
  "Payment gateway charges (typically 2–3%) are non-refundable and will be deducted from the refund amount where applicable.",
  "SSDF is not responsible for delays caused by banks or payment processors.",
];

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader
        title="Refund &"
        highlight="Cancellation Policy"
        subtitle="Transparent refund guidelines for all programs, events, and registrations."
        icon={<RotateCcw className="text-golden-400" size={24} />}
      />

      {/* Intro */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6 md:p-8 border-l-4 border-golden-400">
            <p className="text-navy-500 text-xs uppercase tracking-wider mb-3">
              Last updated: February 6, 2026
            </p>
            <p className="text-navy-600 leading-relaxed text-sm sm:text-base">
              This policy applies to all payments made through {SITE_URL} for
              programs, events, registrations, and donations managed by{" "}
              <strong className="text-navy-800">{SITE_NAME}</strong>, a Section
              8 Non-Profit Company (CIN:{" "}
              <span className="font-mono text-xs">{CONTACT.cin}</span>).
            </p>
          </Card>
        </div>
      </section>

      {/* Registration Fees */}
      <section className="py-10 md:py-14 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold text-navy-800 mb-4">
              1. Registration Fees
            </h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              SSDF may charge registration fees for certain programs and events
              such as CanSat India Student Competition, model rocketry workshops,
              science fairs, and training programs. These fees are used
              exclusively to cover event organization costs including venue,
              materials, logistics, safety equipment, and mentorship.
            </p>
          </Card>

          {/* Cancellation Tiers */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold text-navy-800 mb-5">
              2. Cancellation by Participant
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {refundTiers.map((tier) => (
                <div
                  key={tier.timeframe}
                  className={`rounded-xl p-4 ${tier.color}`}
                >
                  <p className="font-semibold text-sm mb-1">{tier.timeframe}</p>
                  <p className="text-xs opacity-80">{tier.refund}</p>
                </div>
              ))}
            </div>
            <p className="text-navy-600 text-sm leading-relaxed">
              Cancellation requests must be submitted in writing via email to{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-river-500 hover:text-river-600 font-medium"
              >
                {CONTACT.email}
              </a>{" "}
              with the subject line: &ldquo;Cancellation Request —
              [Registration ID]&rdquo;.
            </p>
          </Card>

          {/* Cancellation by SSDF */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold text-navy-800 mb-4">
              3. Cancellation by SSDF
            </h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              In the event that SSDF cancels a program or event due to
              unforeseen circumstances (including but not limited to natural
              disasters, government orders, insufficient registrations, or safety
              concerns), participants will receive a{" "}
              <strong className="text-navy-800">full refund (100%)</strong> of
              the registration fee. Alternatively, participants may choose to
              transfer their registration to a rescheduled event or a different
              program of equivalent value.
            </p>
          </Card>

          {/* Event Rescheduling */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold text-navy-800 mb-4">
              4. Event Rescheduling
            </h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              If an event is rescheduled to a different date, registered
              participants will be automatically transferred to the new date.
              Participants who cannot attend on the rescheduled date may request
              a refund as per the cancellation policy above, with the timeframe
              calculated from the originally scheduled date.
            </p>
          </Card>

          {/* Donations */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold text-navy-800 mb-4">
              5. Donations
            </h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              Donations made to SSDF are voluntary and non-refundable. Once a
              donation is processed, it is deemed final. In case of an accidental
              or duplicate transaction, please contact us within 48 hours at{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-river-500 hover:text-river-600 font-medium"
              >
                {CONTACT.email}
              </a>{" "}
              for assistance.
            </p>
          </Card>

          {/* Refund Processing */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold text-navy-800 mb-4">
              6. Refund Processing
            </h2>
            <ul className="space-y-2.5">
              {processingSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-forest-50 text-forest-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} />
                  </div>
                  <span className="text-navy-600 text-sm leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Non-Refundable */}
          <Card className="p-6 md:p-8 border-l-4 border-red-300">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-red-500" />
              <h2 className="text-lg font-bold text-navy-800">
                7. Non-Refundable Items
              </h2>
            </div>
            <ul className="space-y-2.5">
              {nonRefundable.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0" />
                  <span className="text-navy-600 text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Dispute Resolution */}
          <Card className="p-6 md:p-8">
            <h2 className="text-lg font-bold text-navy-800 mb-4">
              8. Dispute Resolution
            </h2>
            <p className="text-navy-600 text-sm leading-relaxed">
              If you are not satisfied with the refund decision, you may escalate
              the matter by writing to{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-river-500 hover:text-river-600 font-medium"
              >
                {CONTACT.email}
              </a>{" "}
              with subject &ldquo;Refund Dispute — [Registration ID]&rdquo;. All
              disputes will be resolved amicably. If unresolved, disputes shall
              be subject to the exclusive jurisdiction of courts in Deoria, Uttar
              Pradesh, India.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-navy-800 mb-5">
            9. Contact Information
          </h2>
          <Card className="p-6 md:p-8 bg-navy-50 border-navy-100">
            <p className="text-navy-600 text-sm mb-4">
              For refund or cancellation requests, please contact:
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
