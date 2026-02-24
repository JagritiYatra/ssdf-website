"use client";

import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import Button from "@/components/ui/Button";
import { Registration } from "@/types/registration";
import html2canvas from "html2canvas";

interface IDCardPreviewProps {
  registration: Registration;
}

export default function IDCardPreview({ registration }: IDCardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `${registration.id}-id-card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to generate ID card:", err);
    }
  };

  const categoryLabel = {
    school: "School",
    college: "College / University",
    professional: "Professional",
  }[registration.category];

  return (
    <div>
      {/* ID Card */}
      <div
        ref={cardRef}
        className="mx-auto bg-white rounded-xl overflow-hidden shadow-2xl"
        style={{ width: 525, height: 325 }}
      >
        {/* Header */}
        <div
          className="px-6 py-3 flex items-center gap-3"
          style={{ backgroundColor: "#1B2D4F" }}
        >
          <img
            src="/images/logo-transparent.png"
            alt="SSDF"
            style={{ width: 36, height: 36 }}
          />
          <div>
            <p
              className="font-bold text-sm"
              style={{ color: "#F0C030" }}
            >
              CANSAT INDIA 2026
            </p>
            <p className="text-xs" style={{ color: "#9FAFD0" }}>
              Shrinarayani Science Development Foundation
            </p>
          </div>
          <div className="ml-auto text-right">
            <p
              className="font-mono font-bold text-sm"
              style={{ color: "#F0C030" }}
            >
              {registration.id}
            </p>
          </div>
        </div>

        {/* Golden accent line */}
        <div style={{ height: 3, backgroundColor: "#F0C030" }} />

        {/* Body */}
        <div className="px-6 py-4 flex gap-5">
          {/* Photo + QR */}
          <div className="flex flex-col items-center gap-3">
            {registration.photoUrl ? (
              <img
                src={registration.photoUrl}
                alt={registration.fullName}
                crossOrigin="anonymous"
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #1B2D4F",
                }}
              />
            ) : (
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  backgroundColor: "#E8EDF5",
                  border: "3px solid #1B2D4F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1B2D4F",
                  fontWeight: "bold",
                  fontSize: 28,
                }}
              >
                {registration.fullName.charAt(0)}
              </div>
            )}
            <QRCodeSVG
              value={`https://ssdf.org.in/verify/${registration.id}`}
              size={70}
              fgColor="#1B2D4F"
              bgColor="transparent"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h3
              className="font-bold text-xl mb-3"
              style={{ color: "#1B2D4F" }}
            >
              {registration.fullName}
            </h3>
            <div className="space-y-1.5">
              <DetailRow label="Team" value={registration.teamName} />
              <DetailRow label="Institution" value={registration.institution} />
              <DetailRow label="Category" value={categoryLabel} />
              <DetailRow label="State" value={registration.state} />
              <DetailRow
                label="Members"
                value={registration.teamMembers.map((m) => m.name).join(", ")}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-2 text-center"
          style={{ backgroundColor: "#1B2D4F" }}
        >
          <p className="text-xs italic" style={{ color: "#F0C030" }}>
            Sa Vidya Ya Vimuktaye — True knowledge is that which liberates
          </p>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-6">
        <Button onClick={handleDownload}>
          <Download className="mr-2" size={18} />
          Download ID Card as PNG
        </Button>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex text-sm">
      <span
        className="font-medium shrink-0"
        style={{ color: "#4A9AD9", width: 80 }}
      >
        {label}:
      </span>
      <span style={{ color: "#314878" }} className="truncate">
        {value}
      </span>
    </div>
  );
}
