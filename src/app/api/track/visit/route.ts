import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      sessionId?: string;
      path?: string;
      website?: string;
      email?: string;
      referrer?: string;
      userAgent?: string;
    };

    const sessionId = (body.sessionId || "").trim();
    const path = (body.path || "").trim() || "/";

    if (!sessionId) {
      return NextResponse.json({ ok: false, message: "Missing sessionId" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip")?.trim() ||
      null;

    const supabase = supabaseAdmin();
    const { error } = await supabase.from("site_visits").insert({
      session_id: sessionId,
      path,
      website: body.website || null,
      email: body.email || null,
      referrer: body.referrer || req.headers.get("referer") || null,
      user_agent: body.userAgent || req.headers.get("user-agent") || null,
      ip,
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ ok: false, message: msg }, { status: 500 });
  }
}
