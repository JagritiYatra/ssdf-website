import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validators";
import { jsonResponse, errorResponse } from "@/lib/api";
import { sendRegistrationConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = registrationSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return errorResponse(errors[0].message);
    }

    const data = result.data;

    // Generate sequential ID
    const count = await prisma.registration.count();
    const id = `SSDF-CANSAT-2026-${String(count + 1).padStart(4, "0")}`;

    const registration = await prisma.registration.create({
      data: {
        id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        photoUrl: data.photoUrl || null,
        bloodGroup: data.bloodGroup || null,
        teamName: data.teamName,
        institution: data.institution,
        state: data.state,
        category: data.category,
        teamMembers: data.teamMembers,
      },
    });

    // Fire-and-forget confirmation email
    sendRegistrationConfirmation(data.email, {
      id: registration.id,
      fullName: data.fullName,
      teamName: data.teamName,
      category: data.category,
      institution: data.institution,
      state: data.state,
      bloodGroup: data.bloodGroup || undefined,
      phone: data.phone,
    }).catch((err) => console.error("Confirmation email failed:", err));

    return jsonResponse(registration, 201);
  } catch (error) {
    console.error("Registration error:", error);
    return errorResponse("Registration failed", 500);
  }
}
