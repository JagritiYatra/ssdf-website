import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/api";
import { jsonResponse, errorResponse } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await requireUser();
  if (result instanceof NextResponse) return result;

  try {
    const registrations = await prisma.registration.findMany({
      where: { email: result.email },
      orderBy: { createdAt: "desc" },
    });

    return jsonResponse(registrations);
  } catch (error) {
    console.error("User registrations error:", error);
    return errorResponse("Failed to fetch registrations", 500);
  }
}
