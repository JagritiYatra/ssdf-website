import { isAdminAuthenticated } from "@/lib/auth";
import { jsonResponse, errorResponse } from "@/lib/api";

// Lightweight auth check — cookie-only, no DB queries
export async function GET() {
  const authed = await isAdminAuthenticated();
  if (!authed) return errorResponse("Unauthorized", 401);
  return jsonResponse({ authenticated: true });
}
