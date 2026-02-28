import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function isAuthorized(req: Request) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  const auth = req.headers.get("authorization") || "";
  const token = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7) : "";
  return token === pw;
}

function csvEscape(v: unknown) {
  const s = v === null || v === undefined ? "" : String(v);
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("chat_leads")
    .select("id, session_id, website, email, progress, completed, answers, created_at, updated_at, last_seen_at")
    .order("updated_at", { ascending: false })
    .limit(5000);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const rows = data || [];
  const headers = [
    "id",
    "session_id",
    "website",
    "email",
    "progress",
    "completed",
    "created_at",
    "updated_at",
    "last_seen_at",
    "answers_json",
  ];

  const lines = [headers.join(",")];
  for (const r of rows as Array<Record<string, unknown>>) {
    lines.push(
      [
        r.id,
        r.session_id,
        r.website,
        r.email,
        r.progress,
        r.completed,
        r.created_at,
        r.updated_at,
        r.last_seen_at,
        JSON.stringify(r.answers ?? {}),
      ]
        .map(csvEscape)
        .join(",")
    );
  }

  const csv = lines.join("\n");

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename=leads_${new Date().toISOString().slice(0, 10)}.csv`,
    },
  });
}
