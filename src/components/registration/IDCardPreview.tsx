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
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          overflow: "hidden",
          fontFamily: "Arial, Helvetica, sans-serif",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header — Event name + SSDF logo */}
        <div
          style={{
            backgroundColor: "#1B2D4F",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img
            src="/images/logo-transparent.png"
            alt="SSDF"
            style={{ width: 38, height: 38, borderRadius: 6 }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: "#F0C030",
                fontWeight: 700,
                fontSize: 12,
                lineHeight: "16px",
              }}
            >
              IN-SPACe Model Rocketry / CANSAT India 2026-27
            </div>
            <div style={{ color: "#9FAFD0", fontSize: 10, lineHeight: "14px" }}>
              Shrinarayani Science Development Foundation
            </div>
          </div>
          <div
            style={{
              color: "#F0C030",
              fontWeight: 700,
              fontSize: 11,
              fontFamily: "monospace",
              textAlign: "right",
              whiteSpace: "nowrap",
              backgroundColor: "rgba(240,192,48,0.1)",
              padding: "4px 8px",
              borderRadius: 6,
            }}
          >
            {registration.id}
          </div>
        </div>

        {/* Golden accent line */}
        <div style={{ height: 3, backgroundColor: "#F0C030" }} />

        {/* Body */}
        <div style={{ padding: "16px 20px", display: "flex", gap: 16 }}>
          {/* Left: Photo + QR */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
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
                  fontWeight: 700,
                  fontSize: 28,
                }}
              >
                {registration.fullName.charAt(0)}
              </div>
            )}
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: 4,
                borderRadius: 6,
                border: "1px solid #E8EDF5",
              }}
            >
              <QRCodeSVG
                value={verifyUrl}
                size={72}
                fgColor="#1B2D4F"
                bgColor="#ffffff"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div style={{ flex: 1, paddingTop: 4 }}>
            <div
              style={{
                color: "#1B2D4F",
                fontWeight: 700,
                fontSize: 20,
                lineHeight: "24px",
                marginBottom: 12,
              }}
            >
              {registration.fullName}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              <InfoChip label="Category" value={categoryLabel} color="#4A9AD9" />
              {registration.bloodGroup && (
                <InfoChip label="Blood" value={registration.bloodGroup} color="#E05050" />
              )}
              <InfoChip label="State" value={registration.state} color="#3D8B6E" />
            </div>

            <DetailRow label="Team" value={registration.teamName} />
            <DetailRow label="Institution" value={registration.institution} />
            <DetailRow
              label="Members"
              value={registration.teamMembers.map((m) => m.name).join(", ")}
            />
          </div>
        </div>

        {/* Partner logos strip */}
        <div
          style={{
            padding: "8px 20px",
            backgroundColor: "#F5F7FB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            borderTop: "1px solid #E8EDF5",
          }}
        >
          <img src="/images/partners/inspace.png" alt="IN-SPACe" style={{ height: 22, width: "auto" }} />
          <img src="/images/partners/amrit-prayas.jpg" alt="Amrit Prayas" style={{ height: 26, width: "auto" }} />
          <img src="/images/partners/bargad.png" alt="Bargad" style={{ height: 26, width: "auto" }} />
          <img src="/images/partners/jagriti.png" alt="Jagriti" style={{ height: 20, width: "auto" }} />
        </div>

        {/* Footer — contact + tagline */}
        <div
          style={{
            backgroundColor: "#1B2D4F",
            padding: "7px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#9FAFD0", fontSize: 9, lineHeight: "14px" }}>
            887-870-5000 | www.ssdf.org.in | director@ssdf.org.in
          </div>
          <div
            style={{
              color: "#F0C030",
              fontSize: 10,
              fontStyle: "italic",
              lineHeight: "14px",
            }}
          >
            सा विद्या या विमुक्तये
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

function InfoChip({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        backgroundColor: `${color}10`,
        border: `1px solid ${color}30`,
        borderRadius: 20,
        padding: "3px 10px",
      }}
    >
      <span style={{ color, fontSize: 9, fontWeight: 600, textTransform: "uppercase" }}>
        {label}:
      </span>
      <span style={{ color: "#1B2D4F", fontSize: 11, fontWeight: 700 }}>
        {value}
      </span>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        fontSize: 12,
        lineHeight: "18px",
        marginBottom: 3,
      }}
    >
      <span
        style={{
          color: "#4A9AD9",
          fontWeight: 600,
          width: 78,
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
