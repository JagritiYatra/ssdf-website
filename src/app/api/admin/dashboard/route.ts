import { prisma } from "@/lib/prisma";
import { jsonResponse, requireAdmin } from "@/lib/api";

// Combined endpoint: stats + last 5 registrations in one request
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const [total, school, college, professional, recent] = await Promise.all([
    prisma.registration.count(),
    prisma.registration.count({ where: { category: "school" } }),
    prisma.registration.count({ where: { category: "college" } }),
    prisma.registration.count({ where: { category: "professional" } }),
    prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        fullName: true,
        photoUrl: true,
        teamName: true,
        category: true,
        createdAt: true,
      },
    }),
  ]);

  return jsonResponse({
    stats: { total, school, college, professional },
    recent,
  });
}
