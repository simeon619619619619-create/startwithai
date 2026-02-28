import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function isAuthorized(req: Request) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  const auth = req.headers.get("authorization") || "";
  const token = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7) : "";
  return token === pw;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const supabase = supabaseAdmin();

  const { data, error } = await supabase
    .from("chat_leads")
    .select("id, session_id, website, email, progress, completed, answers, created_at, updated_at, last_seen_at")
    .order("updated_at", { ascending: false })
    .limit(500);

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}
