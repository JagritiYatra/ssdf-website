import { cookies } from "next/headers";
import { createHmac } from "crypto";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "ssdf-admin-session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

function sign(payload: string): string {
  const secret = process.env.ADMIN_SECRET!;
  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

function verify(token: string): string | null {
  const secret = process.env.ADMIN_SECRET!;
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return null;

  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);

  const expected = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  if (signature !== expected) return null;
  return payload;
}

export async function verifyPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH!;
  return bcrypt.compare(password, hash);
}

export async function createSession(): Promise<void> {
  const payload = JSON.stringify({
    role: "admin",
    iat: Math.floor(Date.now() / 1000),
  });
  const token = sign(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const payload = verify(token);
  if (!payload) return false;

  try {
    const data = JSON.parse(payload);
    const age = Math.floor(Date.now() / 1000) - data.iat;
    return data.role === "admin" && age < SESSION_MAX_AGE;
  } catch {
    return false;
  }
}
