import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api";
import { NextResponse } from "next/server";

interface TeamMember {
  name: string;
  role: string;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (registrations.length === 0) {
    return NextResponse.json({ error: "No registrations to export" }, { status: 404 });
  }

  const headers = [
    "ID",
    "Full Name",
    "Email",
    "Phone",
    "Team Name",
    "Institution",
    "State",
    "Category",
    "Team Members",
    "Registered At",
  ];

  const rows = registrations.map((r) => [
    r.id,
    r.fullName,
    r.email,
    r.phone,
    r.teamName,
    r.institution,
    r.state,
    r.category,
    (r.teamMembers as unknown as TeamMember[])
      .map((m) => `${m.name} (${m.role})`)
      .join("; "),
    new Date(r.createdAt).toLocaleString(),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=ssdf-registrations-${new Date().toISOString().slice(0, 10)}.csv`,
    },
  });
}
