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
        scale: 3,
        backgroundColor: "#ffffff",
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

  const verifyUrl = `https://ssdf.org.in/verify/${registration.id}`;

  return (
    <div>
      {/* Scrollable wrapper for mobile */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4">
      {/* ID Card — all inline styles for html2canvas compatibility */}
      <div
        ref={cardRef}
        style={{
          width: 600,
          height: 340,
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          overflow: "hidden",
          fontFamily: "Arial, Helvetica, sans-serif",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#1B2D4F",
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/images/logo-transparent.png"
            alt="SSDF"
            style={{ width: 36, height: 36, marginRight: 10, borderRadius: 4 }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: "#F0C030",
                fontWeight: 700,
                fontSize: 14,
                lineHeight: "18px",
              }}
            >
              CANSAT INDIA 2026
            </div>
            <div style={{ color: "#9FAFD0", fontSize: 11, lineHeight: "14px" }}>
              Shrinarayani Science Development Foundation
            </div>
          </div>
          <div
            style={{
              color: "#F0C030",
              fontWeight: 700,
              fontSize: 12,
              fontFamily: "monospace",
              textAlign: "right",
              whiteSpace: "nowrap",
            }}
          >
            {registration.id}
          </div>
        </div>

        {/* Golden accent line */}
        <div style={{ height: 3, backgroundColor: "#F0C030" }} />

        {/* Body */}
        <div style={{ padding: "14px 24px", display: "flex" }}>
          {/* Photo + QR */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            {registration.photoUrl ? (
              <img
                src={registration.photoUrl}
                alt={registration.fullName}
                crossOrigin="anonymous"
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #1B2D4F",
                }}
              />
            ) : (
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  backgroundColor: "#E8EDF5",
                  border: "3px solid #1B2D4F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1B2D4F",
                  fontWeight: 700,
                  fontSize: 28,
                }}
              >
                {registration.fullName.charAt(0)}
              </div>
            )}
            <div style={{ marginTop: 10 }}>
              <QRCodeSVG
                value={verifyUrl}
                size={80}
                fgColor="#1B2D4F"
                bgColor="#ffffff"
              />
            </div>
          </div>

          {/* Details */}
          <div style={{ flex: 1, paddingTop: 2 }}>
            <div
              style={{
                color: "#1B2D4F",
                fontWeight: 700,
                fontSize: 19,
                lineHeight: "24px",
                marginBottom: 10,
              }}
            >
              {registration.fullName}
            </div>
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

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#1B2D4F",
            padding: "8px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#F0C030",
              fontSize: 11,
              fontStyle: "italic",
              lineHeight: "16px",
            }}
          >
            Sa Vidya Ya Vimuktaye — True knowledge is that which liberates
          </div>
        </div>
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
    <div
      style={{
        display: "flex",
        fontSize: 13,
        lineHeight: "20px",
        marginBottom: 4,
      }}
    >
      <span
        style={{
          color: "#4A9AD9",
          fontWeight: 600,
          width: 82,
          flexShrink: 0,
        }}
      >
        {label}:
      </span>
      <span
        style={{
          color: "#314878",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </div>
  );
}
