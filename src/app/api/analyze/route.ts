import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clamp(s: string, n: number) {
  return s.length > n ? s.slice(0, n) : s;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { url?: string };
    const urlRaw = (body.url || "").trim();
    if (!urlRaw) {
      return NextResponse.json({ ok: false, message: "Missing url" }, { status: 400 });
    }

    // Ensure protocol
    const url = urlRaw.startsWith("http://") || urlRaw.startsWith("https://") ? urlRaw : `https://${urlRaw}`;

    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "StartWithAI/1.0 (eligibility-check)",
        accept: "text/html,application/xhtml+xml",
      },
    }).finally(() => clearTimeout(t));

    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("text/html")) {
      return NextResponse.json({ ok: true, url, title: "", description: "", note: "non-html" });
    }

    const html = clamp(await res.text(), 200_000);

    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : "";

    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    const description = descMatch ? descMatch[1].trim() : "";

    return NextResponse.json({ ok: true, url, title, description });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ ok: false, message: msg }, { status: 500 });
  }
}
