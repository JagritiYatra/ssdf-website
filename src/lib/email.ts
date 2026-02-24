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
  data: {
    id: string;
    fullName: string;
    teamName: string;
    category: string;
    institution: string;
    state: string;
    bloodGroup?: string;
    phone: string;
  }
) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Registration Confirmed — ${data.id} | CANSAT India 2026-27`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
        <!-- Header -->
        <div style="background: #1B2D4F; padding: 20px 24px; text-align: center;">
          <h2 style="color: #F0C030; margin: 0; font-size: 18px;">IN-SPACe Model Rocketry / CANSAT India 2026-27</h2>
          <p style="color: #9FAFD0; font-size: 12px; margin: 4px 0 0;">Shrinarayani Science Development Foundation</p>
        </div>
        <div style="height: 3px; background: #F0C030;"></div>

        <!-- Content -->
        <div style="padding: 24px;">
          <div style="background: #ecfdf5; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;">
            <p style="color: #16a34a; font-weight: bold; margin: 0; font-size: 15px;">Registration Confirmed!</p>
          </div>

          <p style="color: #334155; margin: 0 0 20px; font-size: 14px;">
            Hi <strong>${data.fullName}</strong>, your registration for CANSAT India 2026-27 has been confirmed.
          </p>

          <!-- ID Card Details -->
          <div style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 20px;">
            <div style="background: #1B2D4F; padding: 10px 16px;">
              <span style="color: #F0C030; font-family: monospace; font-weight: bold; font-size: 14px;">${data.id}</span>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 16px; color: #64748b; width: 120px;">Name</td>
                <td style="padding: 10px 16px; color: #1e293b; font-weight: 600;">${data.fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 16px; color: #64748b;">Team</td>
                <td style="padding: 10px 16px; color: #1e293b;">${data.teamName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 16px; color: #64748b;">Category</td>
                <td style="padding: 10px 16px; color: #1e293b; text-transform: capitalize;">${data.category}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 16px; color: #64748b;">Institution</td>
                <td style="padding: 10px 16px; color: #1e293b;">${data.institution}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 16px; color: #64748b;">State</td>
                <td style="padding: 10px 16px; color: #1e293b;">${data.state}</td>
              </tr>
              ${data.bloodGroup ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 16px; color: #64748b;">Blood Group</td>
                <td style="padding: 10px 16px; color: #e05050; font-weight: 600;">${data.bloodGroup}</td>
              </tr>
              ` : ""}
              <tr>
                <td style="padding: 10px 16px; color: #64748b;">Phone</td>
                <td style="padding: 10px 16px; color: #1e293b;">${data.phone}</td>
              </tr>
            </table>
          </div>

          <!-- CTA Buttons -->
          <div style="text-align: center; margin: 24px 0;">
            <a href="https://ssdf.org.in/register/success?id=${data.id}" style="display: inline-block; background: #F0C030; color: #1B2D4F; font-weight: bold; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px;">View & Download ID Card</a>
          </div>
          <div style="text-align: center;">
            <a href="https://ssdf.org.in/verify/${data.id}" style="color: #4A9AD9; font-size: 12px; text-decoration: underline;">Verify Registration Online</a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #1B2D4F; padding: 14px 24px; text-align: center;">
          <p style="color: #9FAFD0; font-size: 11px; margin: 0;">887-870-5000 | www.ssdf.org.in | director@ssdf.org.in</p>
          <p style="color: #F0C030; font-size: 11px; font-style: italic; margin: 4px 0 0;">सा विद्या या विमुक्तये</p>
        </div>
      </div>
    `,
  });
}
