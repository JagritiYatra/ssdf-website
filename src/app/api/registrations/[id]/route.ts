import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse } from "@/lib/api";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const registration = await prisma.registration.findUnique({
    where: { id },
  });

  if (!registration) {
    return errorResponse("Registration not found", 404);
  }

  return jsonResponse(registration);
}
