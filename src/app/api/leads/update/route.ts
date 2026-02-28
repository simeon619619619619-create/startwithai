import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

type Payload = {
  id?: string;
  sessionId?: string;
  website?: string;
  email?: string;
  progress?: number;
  completed?: boolean;
  lastQuestion?: string;
  answers?: Record<string, unknown>;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Payload;

    const id = (body.id || "").trim();
    const sessionId = (body.sessionId || "").trim();

    if (!id || !sessionId) {
      return NextResponse.json({ ok: false, message: "Missing id or sessionId" }, { status: 400 });
    }

    const supabase = supabaseAdmin();

    // Upsert partial progress.
    const { error } = await supabase.from("chat_leads").upsert(
      {
        id,
        session_id: sessionId,
        website: body.website || null,
        email: body.email || null,
        progress: typeof body.progress === "number" ? body.progress : 0,
        completed: !!body.completed,
        answers: body.answers || {},
        last_question: body.lastQuestion || null,
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ ok: false, message: msg }, { status: 500 });
  }
}
