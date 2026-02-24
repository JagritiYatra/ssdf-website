import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validators";
import { verifyOtp } from "@/lib/otp";
import { hashPassword } from "@/lib/auth";
import { jsonResponse, errorResponse } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      return errorResponse(result.error.issues[0].message);
    }

    const { email, code, newPassword } = result.data;

    const valid = await verifyOtp(email, code, "forgot-password");
    if (!valid) {
      return errorResponse("Invalid or expired OTP", 401);
    }

    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { email },
      data: { passwordHash },
    });

    return jsonResponse({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return errorResponse("Password reset failed", 500);
  }
}
