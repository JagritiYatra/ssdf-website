"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";

interface PhotoUploadProps {
  value: string;
  onChange: (base64: string) => void;
  error?: string;
}

export default function PhotoUpload({ value, onChange, error }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Photo must be under 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-navy-700 mb-1">
        Participant Photo
      </label>
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
          dragOver
            ? "border-river-400 bg-river-50"
            : error
            ? "border-red-400"
            : "border-navy-200 hover:border-navy-400"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="relative inline-block">
            <Image
              src={value}
              alt="Participant photo"
              width={120}
              height={120}
              className="w-28 h-28 rounded-full object-cover mx-auto"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="py-4">
            <Camera className="mx-auto text-navy-300 mb-2" size={32} />
            <p className="text-sm text-navy-500">
              Click or drag to upload photo
            </p>
            <p className="text-xs text-navy-400 mt-1">Max 2MB, JPG/PNG</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) processFile(file);
          }}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
