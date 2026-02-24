import { prisma } from "./prisma";
import { sendOtpEmail } from "./email";

const OTP_EXPIRY_MINUTES = 10;
const OTP_COOLDOWN_SECONDS = 60;

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function generateAndSendOtp(
  email: string,
  purpose: string
): Promise<{ success: boolean; error?: string }> {
  // Rate limit: 1 per 60s per email+purpose
  const recent = await prisma.otp.findFirst({
    where: {
      email,
      purpose,
      createdAt: { gte: new Date(Date.now() - OTP_COOLDOWN_SECONDS * 1000) },
    },
    orderBy: { createdAt: "desc" },
  });

  if (recent) {
    return { success: false, error: "Please wait 60 seconds before requesting another OTP" };
  }

  // Invalidate old unused OTPs for this email+purpose
  await prisma.otp.updateMany({
    where: { email, purpose, used: false },
    data: { used: true },
  });

  const code = generateCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await prisma.otp.create({
    data: { email, code, purpose, expiresAt },
  });

  await sendOtpEmail(email, code, purpose);

  return { success: true };
}

export async function verifyOtp(
  email: string,
  code: string,
  purpose: string
): Promise<boolean> {
  const otp = await prisma.otp.findFirst({
    where: {
      email,
      purpose,
      used: false,
      expiresAt: { gte: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otp || otp.code !== code) return false;

  await prisma.otp.update({
    where: { id: otp.id },
    data: { used: true },
  });

  return true;
}
