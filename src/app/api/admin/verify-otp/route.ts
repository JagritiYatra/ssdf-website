import { NextRequest } from "next/server";
import { otpVerifySchema } from "@/lib/validators";
import { verifyOtp } from "@/lib/otp";
import { ADMIN_EMAILS, createAdminSession } from "@/lib/auth";
import { jsonResponse, errorResponse } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = otpVerifySchema.safeParse(body);
    if (!result.success) {
      return errorResponse(result.error.issues[0].message);
    }

    const { email, code } = result.data;

    if (!ADMIN_EMAILS.includes(email)) {
      return errorResponse("Not authorized", 403);
    }

    const valid = await verifyOtp(email, code, "admin-login");
    if (!valid) {
      return errorResponse("Invalid or expired OTP", 401);
    }

    await createAdminSession(email);
    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Admin verify OTP error:", error);
    return errorResponse("Verification failed", 500);
  }
}
