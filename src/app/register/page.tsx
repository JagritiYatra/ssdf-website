"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Rocket } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PhotoUpload from "@/components/registration/PhotoUpload";
import TeamMemberInput from "@/components/registration/TeamMemberInput";
import { step1Schema, step2Schema } from "@/lib/validators";
import { RegistrationFormData } from "@/types/registration";

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

const CATEGORIES = [
  { value: "school", label: "School (Class 9-12)" },
  { value: "college", label: "College / University" },
  { value: "professional", label: "Professional" },
];

const steps = ["Personal Info", "Team Details", "Review & Submit"];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    phone: "",
    photoUrl: "",
    teamName: "",
    institution: "",
    state: "",
    category: "school",
    teamMembers: [{ name: "", role: "Team Lead" }],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (field: keyof RegistrationFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep1 = () => {
    const result = step1Schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((e) => {
        const key = e.path[0] as string;
        fieldErrors[key] = e.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const result = step2Schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((e) => {
        const key = e.path.join(".");
        fieldErrors[key] = e.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const nextStep = () => {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    setStep((s) => Math.min(s + 1, 2));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      const reg = await res.json();
      router.push(`/register/success?id=${reg.id}`);
    } catch (err) {
      setSubmitting(false);
      alert(err instanceof Error ? err.message : "Registration failed. Please try again.");
    }
  };

  return (
    <>
      <PageHeader
        title="Register for"
        highlight="CanSat India 2026"
        subtitle="Complete the form below to register your team for India's premier student satellite competition"
        icon={<Rocket className="text-golden-400" size={24} />}
      />

      {/* Progress Steps */}
      <section className="bg-white border-b border-navy-100">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      i < step
                        ? "bg-forest-400 text-white"
                        : i === step
                        ? "bg-golden-400 text-navy-900"
                        : "bg-navy-100 text-navy-400"
                    }`}
                  >
                    {i < step ? <Check size={16} /> : i + 1}
                  </div>
                  <span
                    className={`hidden sm:block text-sm font-medium ${
                      i <= step ? "text-navy-800" : "text-navy-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 mx-2 ${
                      i < step ? "bg-forest-400" : "bg-navy-100"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 md:py-10 bg-navy-50">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-bold text-navy-800 mb-4">
                    Personal Information
                  </h2>
                  <Input
                    id="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    error={errors.fullName}
                  />
                  <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    error={errors.email}
                  />
                  <Input
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    error={errors.phone}
                  />
                  <PhotoUpload
                    value={form.photoUrl}
                    onChange={(v) => updateField("photoUrl", v)}
                    error={errors.photoUrl}
                  />
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-bold text-navy-800 mb-4">
                    Team Details
                  </h2>
                  <Input
                    id="teamName"
                    label="Team Name"
                    placeholder="Your team name"
                    value={form.teamName}
                    onChange={(e) => updateField("teamName", e.target.value)}
                    error={errors.teamName}
                  />
                  <Input
                    id="institution"
                    label="Institution / Organization"
                    placeholder="School, college, or organization name"
                    value={form.institution}
                    onChange={(e) => updateField("institution", e.target.value)}
                    error={errors.institution}
                  />
                  <Select
                    id="state"
                    label="State"
                    value={form.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    options={STATES.map((s) => ({ value: s, label: s }))}
                    error={errors.state}
                  />
                  <Select
                    id="category"
                    label="Category"
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    options={CATEGORIES}
                    error={errors.category}
                  />
                  <TeamMemberInput
                    members={form.teamMembers}
                    onChange={(m) => updateField("teamMembers", m)}
                    errors={errors.teamMembers || errors["teamMembers.0.name"] || errors["teamMembers.0.role"]}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-xl font-bold text-navy-800 mb-6">
                    Review & Confirm
                  </h2>
                  <div className="space-y-4">
                    <ReviewSection title="Personal Info">
                      <ReviewField label="Name" value={form.fullName} />
                      <ReviewField label="Email" value={form.email} />
                      <ReviewField label="Phone" value={form.phone} />
                      {form.photoUrl && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-navy-500 w-24">Photo:</span>
                          <img
                            src={form.photoUrl}
                            alt="Preview"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                      )}
                    </ReviewSection>

                    <ReviewSection title="Team Details">
                      <ReviewField label="Team" value={form.teamName} />
                      <ReviewField label="Institution" value={form.institution} />
                      <ReviewField label="State" value={form.state} />
                      <ReviewField
                        label="Category"
                        value={CATEGORIES.find((c) => c.value === form.category)?.label || form.category}
                      />
                    </ReviewSection>

                    <ReviewSection title="Team Members">
                      {form.teamMembers.map((m, i) => (
                        <ReviewField
                          key={i}
                          label={`Member ${i + 1}`}
                          value={`${m.name} (${m.role})`}
                        />
                      ))}
                    </ReviewSection>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-navy-100">
              {step > 0 ? (
                <Button variant="ghost" onClick={prevStep}>
                  <ArrowLeft className="mr-2" size={18} /> Back
                </Button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <Button onClick={nextStep}>
                  Next <ArrowRight className="ml-2" size={18} />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Registration"}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-navy-50 rounded-lg p-4">
      <h3 className="font-semibold text-navy-800 mb-3 text-sm uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex text-sm">
      <span className="text-navy-500 w-24 shrink-0">{label}:</span>
      <span className="text-navy-800 font-medium">{value}</span>
    </div>
  );
}
