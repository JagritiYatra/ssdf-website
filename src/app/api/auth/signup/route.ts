import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validators";
import { hashPassword, createUserSession } from "@/lib/auth";
import { jsonResponse, errorResponse } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return errorResponse(result.error.issues[0].message);
    }

    const { name, email, password } = result.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return errorResponse("An account with this email already exists");
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    await createUserSession(user.id, user.email);
    return jsonResponse({ success: true, user: { id: user.id, name: user.name, email: user.email } }, 201);
  } catch (error) {
    console.error("Signup error:", error);
    return errorResponse("Signup failed", 500);
  }
}
