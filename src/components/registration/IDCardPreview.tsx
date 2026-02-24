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
          width: 640,
          minHeight: 400,
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          overflow: "hidden",
          fontFamily: "Arial, Helvetica, sans-serif",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header with logos */}
        <div
          style={{
            backgroundColor: "#1B2D4F",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* SSDF Logo */}
          <img
            src="/images/logo-transparent.png"
            alt="SSDF"
            style={{ width: 34, height: 34, borderRadius: 4 }}
          />
          {/* Event name & org */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: "#F0C030",
                fontWeight: 700,
                fontSize: 11,
                lineHeight: "14px",
              }}
            >
              IN-SPACe Model Rocketry / CANSAT India 2026-27
            </div>
            <div style={{ color: "#9FAFD0", fontSize: 10, lineHeight: "13px" }}>
              Shrinarayani Science Development Foundation
            </div>
          </div>
          {/* Partner logos */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <img
              src="/images/partners/inspace.png"
              alt="IN-SPACe"
              style={{ height: 28, width: "auto" }}
            />
            <img
              src="/images/partners/isro.png"
              alt="ISRO"
              style={{ height: 28, width: "auto" }}
            />
            <img
              src="/images/partners/amrit-prayas.png"
              alt="Amrit Prayas"
              style={{ height: 28, width: "auto" }}
            />
            <img
              src="/images/partners/bargad.png"
              alt="Bargad"
              style={{ height: 28, width: "auto" }}
            />
            <img
              src="/images/partners/shashank-mani.png"
              alt="Shashank Mani"
              style={{ height: 28, width: "auto" }}
            />
          </div>
        </div>

        {/* Golden accent line */}
        <div style={{ height: 3, backgroundColor: "#F0C030" }} />

        {/* Registration ID bar */}
        <div
          style={{
            backgroundColor: "#F5F7FB",
            padding: "5px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#1B2D4F",
              fontWeight: 700,
              fontSize: 11,
              fontFamily: "monospace",
              whiteSpace: "nowrap",
            }}
          >
            {registration.id}
          </span>
          <span
            style={{
              color: "#4A9AD9",
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            {categoryLabel}
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "12px 16px", display: "flex" }}>
          {/* Photo + QR */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            {registration.photoUrl ? (
              <img
                src={registration.photoUrl}
                alt={registration.fullName}
                crossOrigin="anonymous"
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #1B2D4F",
                }}
              />
            ) : (
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  backgroundColor: "#E8EDF5",
                  border: "3px solid #1B2D4F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1B2D4F",
                  fontWeight: 700,
                  fontSize: 26,
                }}
              >
                {registration.fullName.charAt(0)}
              </div>
            )}
            <div style={{ marginTop: 8 }}>
              <QRCodeSVG
                value={verifyUrl}
                size={76}
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
                fontSize: 18,
                lineHeight: "22px",
                marginBottom: 8,
              }}
            >
              {registration.fullName}
            </div>
            <DetailRow label="Team" value={registration.teamName} />
            <DetailRow label="Institution" value={registration.institution} />
            <DetailRow label="State" value={registration.state} />
            {registration.bloodGroup && (
              <DetailRow label="Blood Group" value={registration.bloodGroup} />
            )}
            <DetailRow
              label="Members"
              value={registration.teamMembers.map((m) => m.name).join(", ")}
            />
          </div>
        </div>

        {/* Footer — contact + tagline */}
        <div
          style={{
            backgroundColor: "#1B2D4F",
            padding: "6px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#9FAFD0",
                fontSize: 9,
                lineHeight: "14px",
              }}
            >
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
        fontSize: 12,
        lineHeight: "18px",
        marginBottom: 3,
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
