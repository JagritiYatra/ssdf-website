import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonResponse, requireAdmin } from "@/lib/api";

export async function GET(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (category !== "all") {
    where.category = category;
  }

  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { teamName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { id: { contains: search, mode: "insensitive" } },
    ];
  }

  const [registrations, total] = await Promise.all([
    prisma.registration.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.registration.count({ where }),
  ]);

  return jsonResponse({
    data: registrations,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
