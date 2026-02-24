import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse, requireAdmin } from "@/lib/api";

// GET — search registrations by last 4 digits OR get attendance for a date
export async function GET(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q") || "";
  const date = searchParams.get("date") || "";

  // Search by last 4 digits of ID
  if (query) {
    const registrations = await prisma.registration.findMany({
      where: {
        id: { endsWith: query, mode: "insensitive" },
      },
      orderBy: { createdAt: "desc" },
    });

    // Attach attendance status for today
    const today = new Date().toISOString().slice(0, 10);
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        registrationId: { in: registrations.map((r) => r.id) },
        date: date || today,
      },
    });

    const attendedIds = new Set(attendanceRecords.map((a) => a.registrationId));

    const results = registrations.map((r) => ({
      ...r,
      present: attendedIds.has(r.id),
    }));

    return jsonResponse(results);
  }

  // Get all attendance for a specific date
  if (date) {
    const records = await prisma.attendance.findMany({
      where: { date },
      orderBy: { markedAt: "desc" },
    });

    const regIds = records.map((r) => r.registrationId);
    const registrations = await prisma.registration.findMany({
      where: { id: { in: regIds } },
    });

    const regMap = new Map(registrations.map((r) => [r.id, r]));

    const results = records.map((a) => ({
      ...a,
      registration: regMap.get(a.registrationId) || null,
    }));

    return jsonResponse(results);
  }

  return errorResponse("Provide ?q= or ?date= parameter");
}

// POST — mark/unmark attendance
export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const { registrationId, date, present } = await request.json();

    if (!registrationId || !date) {
      return errorResponse("registrationId and date are required");
    }

    // Verify registration exists
    const reg = await prisma.registration.findUnique({
      where: { id: registrationId },
    });
    if (!reg) {
      return errorResponse("Registration not found", 404);
    }

    if (present) {
      // Mark present
      await prisma.attendance.upsert({
        where: {
          registrationId_date: { registrationId, date },
        },
        create: { registrationId, date },
        update: {},
      });
    } else {
      // Remove attendance
      await prisma.attendance.deleteMany({
        where: { registrationId, date },
      });
    }

    return jsonResponse({ success: true, registrationId, date, present });
  } catch (error) {
    console.error("Attendance error:", error);
    return errorResponse("Failed to update attendance", 500);
  }
}
