"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import {
  ShieldCheck,
  XCircle,
  Building,
  MapPin,
  Users,
  Calendar,
  Tag,
  Home,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_SHORT_NAME } from "@/lib/constants";
import { Registration } from "@/types/registration";
import Button from "@/components/ui/Button";

export default function VerifyPage() {
  const params = useParams();
  const id = params.id as string;
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    fetch(`/api/registrations/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setRegistration(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-50">
        <div className="w-8 h-8 border-4 border-navy-200 border-t-golden-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !registration) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <XCircle className="mx-auto mb-4 text-red-400" size={56} />
          <h1 className="text-2xl font-bold text-navy-800 mb-2">
            Registration Not Found
          </h1>
          <p className="text-navy-500 mb-2">
            ID: <span className="font-mono font-bold">{id}</span>
          </p>
          <p className="text-navy-400 text-sm mb-6">
            This registration ID does not exist in our system. Please check the
            ID and try again.
          </p>
          <Link href="/">
            <Button variant="secondary">
              <Home className="mr-2" size={18} /> Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabel = {
    school: "School",
    college: "College / University",
    professional: "Professional",
  }[registration.category];

  const categoryColor = {
    school: "bg-blue-50 text-blue-600 border-blue-200",
    college: "bg-purple-50 text-purple-600 border-purple-200",
    professional: "bg-emerald-50 text-emerald-600 border-emerald-200",
  }[registration.category];

  const teamMembers = registration.teamMembers as Array<{
    name: string;
    role: string;
  }>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-golden-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-forest-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-10">
        {/* Verified Badge */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-white rounded-lg p-0.5">
              <Image
                src="/images/logo-transparent.png"
                alt={SITE_SHORT_NAME}
                width={40}
                height={40}
                className="w-10 h-10 rounded-md"
              />
            </div>
            <span className="text-white font-bold text-lg">{SITE_SHORT_NAME}</span>
          </Link>

          <div className="inline-flex items-center gap-2 bg-forest-400/10 border border-forest-400/30 text-forest-400 px-4 py-2 rounded-full text-sm font-semibold">
            <ShieldCheck size={18} />
            Verified Registration
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-navy-800 px-6 py-4 flex items-center gap-3">
            <Image
              src="/images/logo-transparent.png"
              alt={SITE_SHORT_NAME}
              width={36}
              height={36}
              className="w-9 h-9 rounded-md bg-white p-0.5"
            />
            <div>
              <p className="font-bold text-sm text-golden-400">
                CANSAT INDIA 2026
              </p>
              <p className="text-xs text-navy-300">
                Shrinarayani Science Development Foundation
              </p>
            </div>
            <div className="ml-auto">
              <p className="font-mono font-bold text-sm text-golden-400">
                {registration.id}
              </p>
            </div>
          </div>

          <div className="h-1 bg-golden-400" />

          {/* Profile Section */}
          <div className="px-6 py-5">
            <div className="flex items-start gap-4 mb-5">
              {/* Photo */}
              {registration.photoUrl ? (
                <img
                  src={registration.photoUrl}
                  alt={registration.fullName}
                  className="w-20 h-20 rounded-full object-cover border-3 border-navy-800 shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-navy-100 border-3 border-navy-800 flex items-center justify-center text-navy-800 font-bold text-2xl shrink-0">
                  {registration.fullName.charAt(0)}
                </div>
              )}

              <div className="min-w-0">
                <h1 className="text-xl font-bold text-navy-800 mb-1">
                  {registration.fullName}
                </h1>
                <p className="text-navy-500 text-sm">{registration.teamName}</p>
                <span
                  className={cn(
                    "inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
                    categoryColor
                  )}
                >
                  {categoryLabel}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 bg-navy-50 rounded-xl p-4">
              <DetailRow icon={Building} label="Institution" value={registration.institution} />
              <DetailRow icon={MapPin} label="State" value={registration.state} />
              <DetailRow icon={Tag} label="Category" value={categoryLabel} />
              <DetailRow
                icon={Calendar}
                label="Registered"
                value={new Date(registration.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
            </div>

            {/* Team Members */}
            {teamMembers.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Users size={16} className="text-navy-400" />
                  <span className="text-sm font-medium text-navy-600">
                    Team Members ({teamMembers.length})
                  </span>
                </div>
                <div className="bg-navy-50 rounded-xl p-4 space-y-2">
                  {teamMembers.map((m, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-navy-800 font-medium">{m.name}</span>
                      <span className="text-navy-400 text-xs bg-white px-2 py-0.5 rounded-full">
                        {m.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QR Code */}
            <div className="mt-5 pt-4 border-t border-navy-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-navy-400 mb-1">Scan to verify</p>
                <p className="text-xs font-mono text-navy-500">{registration.id}</p>
              </div>
              <QRCodeSVG
                value={`https://ssdf.org.in/verify/${registration.id}`}
                size={64}
                fgColor="#1B2D4F"
                bgColor="transparent"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-navy-800 px-6 py-3 text-center">
            <p className="text-xs italic text-golden-400">
              Sa Vidya Ya Vimuktaye — True knowledge is that which liberates
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <Home className="mr-1.5" size={14} /> Home
            </Button>
          </Link>
          <Link href={`/register/success?id=${registration.id}`}>
            <Button size="sm">
              <Download className="mr-1.5" size={14} /> Download ID Card
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon size={16} className="text-navy-400 shrink-0" />
      <span className="text-navy-500 w-24 shrink-0">{label}</span>
      <span className="text-navy-800 font-medium">{value}</span>
    </div>
  );
}
