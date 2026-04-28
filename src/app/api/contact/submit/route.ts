import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  businessType?: string;
  teamSize?: string;
  services?: string[];
  pains?: string;
  budget?: string;
  timeline?: string;
  details?: string;
  voucher?: boolean;
  consent?: boolean;
};

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] || c));
}

function row(label: string, value?: string | string[] | boolean) {
  if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) return "";
  let v: string;
  if (Array.isArray(value)) v = value.map((x) => `<li>${escape(x)}</li>`).join("");
  else if (typeof value === "boolean") v = value ? "Да" : "Не";
  else v = escape(value).replace(/\n/g, "<br />");

  const content = Array.isArray(value) ? `<ul style="margin:0;padding-left:18px;">${v}</ul>` : v;
  return `<tr>
    <td style="padding:10px 14px;background:#f5f8fc;border:1px solid #dde3ee;width:35%;font-weight:600;color:#1A2B48;vertical-align:top;">${label}</td>
    <td style="padding:10px 14px;border:1px solid #dde3ee;color:#1A2B48;vertical-align:top;">${content}</td>
  </tr>`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Payload;

    // Server-side validation
    if (!body.name || !body.email || !body.consent) {
      return NextResponse.json({ ok: false, message: "Липсват задължителни полета (име, имейл, съгласие)" }, { status: 400 });
    }
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
    if (!emailValid) {
      return NextResponse.json({ ok: false, message: "Невалиден имейл" }, { status: 400 });
    }
    if (!body.businessType || !body.teamSize || !body.services?.length || !body.budget || !body.timeline) {
      return NextResponse.json({ ok: false, message: "Анкетата е непълна" }, { status: 400 });
    }

    const RESEND_KEY = process.env.RESEND_API_KEY_STARTWITHAI || process.env.RESEND_API_KEY;
    const FROM_EMAIL = process.env.STARTWITHAI_FROM_EMAIL || "StartWithAI <noreply@eufashioninstitute.com>";
    const NOTIFY_TO = "simeondimitrov@eufashioninstitute.com";

    if (!RESEND_KEY) {
      console.error("Missing RESEND_API_KEY_STARTWITHAI");
      return NextResponse.json({ ok: false, message: "Server misconfiguration (email)" }, { status: 500 });
    }

    const subject = `🎯 Нова заявка: ${body.name}${body.company ? ` (${body.company})` : ""} — ${body.budget}`;

    const html = `<div style="font-family:-apple-system,Arial,sans-serif;max-width:680px;margin:0 auto;color:#1A2B48;">
      <div style="background:#1A2B48;padding:24px;text-align:center;color:#fff;">
        <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;opacity:0.7;">StartWithAI · Нова заявка</div>
        <div style="margin-top:8px;font-size:20px;font-weight:600;">${escape(body.name)}${body.company ? ` · ${escape(body.company)}` : ""}</div>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5;">
          ${row("Име", body.name)}
          ${row("Фирма", body.company)}
          ${row("Имейл", body.email)}
          ${row("Телефон", body.phone)}
          ${row("Уебсайт", body.website)}
          ${row("Тип бизнес", body.businessType)}
          ${row("Размер екип", body.teamSize)}
          ${row("Услуги", body.services)}
          ${row("Бюджет", body.budget)}
          ${row("Timeline", body.timeline)}
          ${row("Болки", body.pains)}
          ${row("Допълнително", body.details)}
          ${row("Ваучерна програма", body.voucher)}
        </table>
      </div>
      <div style="background:#1A2B48;padding:14px;text-align:center;color:#999;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
        startwithai.vercel.app · ${new Date().toLocaleString("bg-BG", { timeZone: "Europe/Sofia" })}
      </div>
    </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; StartWithAI/1.0)",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [NOTIFY_TO],
        reply_to: body.email,
        subject,
        html,
      }),
    });
    const result = await res.json();
    if (!res.ok) {
      console.error("Resend error:", result);
      return NextResponse.json({ ok: false, message: "Грешка при изпращане на имейла" }, { status: 502 });
    }

    // Best-effort Supabase persistence (skip silently if env not set)
    try {
      const SUPABASE_URL = process.env.SUPABASE_URL;
      const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (SUPABASE_URL && SUPABASE_KEY) {
        await fetch(`${SUPABASE_URL}/rest/v1/business_inquiries`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            name: body.name,
            company: body.company,
            email: body.email,
            phone: body.phone,
            website: body.website,
            business_type: body.businessType,
            team_size: body.teamSize,
            services: body.services,
            pains: body.pains,
            budget: body.budget,
            timeline: body.timeline,
            details: body.details,
            voucher_interest: body.voucher,
            resend_id: result.id,
          }),
        }).catch((e) => console.error("Supabase insert failed:", e));
      }
    } catch (e) {
      console.error("Supabase optional persistence error:", e);
    }

    return NextResponse.json({ ok: true, id: result.id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("Contact submit error:", e);
    return NextResponse.json({ ok: false, message: msg }, { status: 500 });
  }
}
