import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { uploadPhoto } from "@/lib/r2";
import { jsonResponse, errorResponse } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return errorResponse("No file provided");
    }

    if (!file.type.startsWith("image/")) {
      return errorResponse("File must be an image");
    }

    if (file.size > 2 * 1024 * 1024) {
      return errorResponse("File must be under 2MB");
    }

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const url = await uploadPhoto(buffer, filename, file.type);

    return jsonResponse({ url });
  } catch (error) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return errorResponse(message, 500);
  }
}
