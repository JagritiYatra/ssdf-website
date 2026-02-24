import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "SSDF <noreply@ssdf.org.in>";

export async function sendOtpEmail(email: string, code: string, purpose: string) {
  const subjectMap: Record<string, string> = {
    "user-login": "Your SSDF Login OTP",
    "admin-login": "Admin Login OTP — SSDF",
    "forgot-password": "Reset Your SSDF Password",
  };

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: subjectMap[purpose] || "Your SSDF OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #1e293b; margin: 0;">SSDF</h2>
          <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Shrinarayani Science Development Foundation</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <p style="color: #334155; margin: 0 0 16px;">Your one-time verification code is:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e293b; background: #f1f5f9; padding: 12px 24px; border-radius: 8px; display: inline-block;">${code}</span>
          </div>
          <p style="color: #64748b; font-size: 13px; margin: 16px 0 0;">This code expires in 10 minutes. Do not share it with anyone.</p>
        </div>
      </div>
    `,
  });
}

export async function sendRegistrationConfirmation(
  email: string,
  data: { id: string; fullName: string; teamName: string; category: string }
) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Registration Confirmed — ${data.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #1e293b; margin: 0;">SSDF</h2>
          <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Shrinarayani Science Development Foundation</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h3 style="color: #16a34a; margin: 0 0 12px;">Registration Confirmed!</h3>
          <p style="color: #334155; margin: 0 0 16px;">Hi ${data.fullName}, your CanSat India 2026 registration is confirmed.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #64748b;">Registration ID</td><td style="padding: 8px 0; color: #1e293b; font-weight: bold; font-family: monospace;">${data.id}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Team</td><td style="padding: 8px 0; color: #1e293b;">${data.teamName}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">Category</td><td style="padding: 8px 0; color: #1e293b; text-transform: capitalize;">${data.category}</td></tr>
          </table>
          <div style="margin-top: 20px; text-align: center;">
            <a href="https://ssdf.org.in/register/success?id=${data.id}" style="display: inline-block; background: #d4a017; color: #1e293b; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none;">View ID Card</a>
          </div>
        </div>
      </div>
    `,
  });
}
