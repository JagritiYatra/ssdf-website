import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { otpVerifySchema } from "@/lib/validators";
import { verifyOtp } from "@/lib/otp";
import { createUserSession } from "@/lib/auth";
import { jsonResponse, errorResponse } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = otpVerifySchema.safeParse(body);
    if (!result.success) {
      return errorResponse(result.error.issues[0].message);
    }

    const { email, code } = result.data;

    const valid = await verifyOtp(email, code, "user-login");
    if (!valid) {
      return errorResponse("Invalid or expired OTP", 401);
    }

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Fallback: auto-create from registration data
      const registration = await prisma.registration.findFirst({
        where: { email },
        select: { fullName: true },
      });
      if (!registration) {
        return errorResponse("User not found", 404);
      }
      user = await prisma.user.create({
        data: { email, name: registration.fullName },
      });
    }

    await createUserSession(user.id, user.email);
    return jsonResponse({ success: true, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return errorResponse("Verification failed", 500);
  }
}
