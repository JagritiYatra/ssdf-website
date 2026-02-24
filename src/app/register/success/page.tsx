"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Home } from "lucide-react";
import Button from "@/components/ui/Button";
import IDCardPreview from "@/components/registration/IDCardPreview";
import { getRegistrationById } from "@/lib/registration-store";
import { Registration } from "@/types/registration";

function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [registration, setRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    if (id) {
      const reg = getRegistrationById(id);
      if (reg) setRegistration(reg);
    }
  }, [id]);

  if (!registration) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-800 mb-4">
            Registration not found
          </h1>
          <Link href="/register">
            <Button variant="secondary">Register Again</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-16 bg-navy-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <CheckCircle className="mx-auto mb-4 text-forest-400" size={64} />
            <h1 className="text-3xl md:text-4xl font-extrabold text-navy-800 mb-2">
              Registration Successful!
            </h1>
            <p className="text-navy-500 text-lg">
              Your registration ID is{" "}
              <span className="font-bold text-golden-500 font-mono">
                {registration.id}
              </span>
            </p>
          </motion.div>

          {/* ID Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-navy-800 text-center mb-6">
              Your Participant ID Card
            </h2>
            <IDCardPreview registration={registration} />
          </motion.div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link href="/">
              <Button variant="ghost">
                <Home className="mr-2" size={18} /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <p className="text-navy-500">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
