import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { otpRequestSchema } from "@/lib/validators";
import { generateAndSendOtp } from "@/lib/otp";
import { jsonResponse, errorResponse } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = otpRequestSchema.safeParse(body);
    if (!result.success) {
      return errorResponse(result.error.issues[0].message);
    }

    const { email } = result.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return errorResponse("No account found with this email", 404);
    }

    const otpResult = await generateAndSendOtp(email, "user-login");
    if (!otpResult.success) {
      return errorResponse(otpResult.error!, 429);
    }

    return jsonResponse({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Login OTP error:", error);
    return errorResponse("Failed to send OTP", 500);
  }
}
