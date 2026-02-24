import { destroyUserSession } from "@/lib/auth";
import { jsonResponse } from "@/lib/api";

export async function POST() {
  await destroyUserSession();
  return jsonResponse({ success: true });
}
