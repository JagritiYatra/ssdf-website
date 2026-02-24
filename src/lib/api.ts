import { NextResponse } from "next/server";
import { isAdminAuthenticated, getUserSession } from "./auth";

export function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function requireAdmin(): Promise<NextResponse | null> {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return errorResponse("Unauthorized", 401);
  }
  return null;
}

export async function requireUser(): Promise<
  { userId: string; email: string } | NextResponse
> {
  const session = await getUserSession();
  if (!session) {
    return errorResponse("Unauthorized", 401);
  }
  return session;
}
