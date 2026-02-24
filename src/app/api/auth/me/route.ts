import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/auth";
import { jsonResponse, errorResponse } from "@/lib/api";

export async function GET() {
  const session = await getUserSession();
  if (!session) {
    return errorResponse("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  if (!user) {
    return errorResponse("User not found", 404);
  }

  return jsonResponse(user);
}
