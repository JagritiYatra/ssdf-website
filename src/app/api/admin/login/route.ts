import { NextRequest } from "next/server";
import { verifyPassword, createSession } from "@/lib/auth";
import { jsonResponse, errorResponse } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return errorResponse("Password is required");
    }

    const valid = await verifyPassword(password);
    if (!valid) {
      return errorResponse("Incorrect password", 401);
    }

    await createSession();
    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse("Login failed", 500);
  }
}
