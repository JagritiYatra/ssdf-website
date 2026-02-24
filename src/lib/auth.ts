import { cookies } from "next/headers";
import { createHmac } from "crypto";
import bcrypt from "bcryptjs";

const USER_COOKIE = "ssdf-user-session";
const ADMIN_COOKIE = "ssdf-admin-session";
const USER_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const ADMIN_MAX_AGE = 60 * 60 * 24; // 24 hours

export const ADMIN_EMAILS = [
  "techakash@jagritiyatra.com",
  "manishbajaj@jagriti.org",
];

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

// --- Password utilities ---

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// --- Admin Session ---

export async function createAdminSession(email: string): Promise<void> {
  const payload = JSON.stringify({
    role: "admin",
    email,
    iat: Math.floor(Date.now() / 1000),
  });
  const token = sign(payload);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_MAX_AGE,
    path: "/",
  });
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const payload = verify(token);
  if (!payload) return false;

  try {
    const data = JSON.parse(payload);
    const age = Math.floor(Date.now() / 1000) - data.iat;
    return data.role === "admin" && age < ADMIN_MAX_AGE;
  } catch {
    return false;
  }
}

// --- User Session ---

export async function createUserSession(userId: string, email: string): Promise<void> {
  const payload = JSON.stringify({
    role: "user",
    userId,
    email,
    iat: Math.floor(Date.now() / 1000),
  });
  const token = sign(payload);
  const cookieStore = await cookies();
  cookieStore.set(USER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: USER_MAX_AGE,
    path: "/",
  });
}

export async function destroyUserSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(USER_COOKIE);
}

export async function getUserSession(): Promise<{ userId: string; email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_COOKIE)?.value;
  if (!token) return null;

  const payload = verify(token);
  if (!payload) return null;

  try {
    const data = JSON.parse(payload);
    const age = Math.floor(Date.now() / 1000) - data.iat;
    if (data.role !== "user" || age >= USER_MAX_AGE) return null;
    return { userId: data.userId, email: data.email };
  } catch {
    return null;
  }
}
