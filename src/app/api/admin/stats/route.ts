import { prisma } from "@/lib/prisma";
import { jsonResponse, requireAdmin } from "@/lib/api";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const [total, school, college, professional] = await Promise.all([
    prisma.registration.count(),
    prisma.registration.count({ where: { category: "school" } }),
    prisma.registration.count({ where: { category: "college" } }),
    prisma.registration.count({ where: { category: "professional" } }),
  ]);

  return jsonResponse({ total, school, college, professional });
}
