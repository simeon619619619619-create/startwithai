import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clamp(s: string, n: number) {
  return s.length > n ? s.slice(0, n) : s;
}

function isIpLike(host: string) {
  return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host) || host.includes(":");
}

function isPrivateHost(host: string) {
  const h = host.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (h === "127.0.0.1" || h === "::1") return true;
  if (h.startsWith("192.168.")) return true;
  if (h.startsWith("10.")) return true;
  // 172.16.0.0/12
  const m = h.match(/^172\.(\d+)\./);
  if (m) {
    const n = Number(m[1]);
    if (n >= 16 && n <= 31) return true;
  }
  // link-local
  if (h.startsWith("169.254.")) return true;
  return false;
}

async function fetchWithTimeout(url: string, method: "HEAD" | "GET") {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 4500);
  try {
    return await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "StartWithAI/1.0 (eligibility-check)",
        accept: "text/html,application/xhtml+xml",
      },
    });
  } finally {
    clearTimeout(t);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { url?: string };
    const raw = (body.url || "").trim();

    if (!raw) {
      return NextResponse.json({ ok: false, reason: "missing", message: "Моля, въведете URL на фирмения сайт." }, { status: 400 });
    }

    // Basic client-like validation
    const candidate = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;

    let u: URL;
    try {
      u = new URL(candidate);
    } catch {
      return NextResponse.json({ ok: false, reason: "invalid_url", message: "Невалиден URL. Пример: https://company.com" }, { status: 400 });
    }

    if (u.username || u.password) {
      return NextResponse.json({ ok: false, reason: "credentials", message: "URL не трябва да съдържа потребител/парола." }, { status: 400 });
    }

    const host = u.hostname;
    if (!host.includes(".")) {
      return NextResponse.json({ ok: false, reason: "not_domain", message: "Моля, въведете реален домейн (напр. company.com)." }, { status: 400 });
    }

    if (isIpLike(host) && isPrivateHost(host)) {
      return NextResponse.json({ ok: false, reason: "private_host", message: "Невалиден домейн." }, { status: 400 });
    }

    // Try HEAD first, then GET
    let res: Response | null = null;
    try {
      res = await fetchWithTimeout(u.toString(), "HEAD");
    } catch {
      res = null;
    }
    if (!res) {
      try {
        res = await fetchWithTimeout(u.toString(), "GET");
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "";
        if (msg.toLowerCase().includes("aborted")) {
          return NextResponse.json({ ok: false, reason: "timeout", message: "Сайтът не отговаря (timeout)." }, { status: 408 });
        }
        if (msg.toLowerCase().includes("getaddrinfo") || msg.toLowerCase().includes("enotfound")) {
          return NextResponse.json({ ok: false, reason: "dns", message: "Домейнът не съществува (DNS грешка)." }, { status: 400 });
        }
        return NextResponse.json({ ok: false, reason: "fetch", message: "Не успяхме да достъпим сайта. Проверете URL." }, { status: 400 });
      }
    }

    // Consider redirects OK; 4xx/5xx not OK
    if (res.status >= 400) {
      return NextResponse.json(
        { ok: false, reason: "http_status", message: `Сайтът върна грешка (HTTP ${res.status}).` },
        { status: 400 }
      );
    }

    const finalUrl = res.url || u.toString();
    const ct = res.headers.get("content-type") || "";

    // If HEAD gave no content-type, do small GET to extract title
    let title = "";
    let description = "";
    if (ct.includes("text/html")) {
      // Try to GET a small amount (we can't stream easily here; read and clamp)
      try {
        const r2 = await fetchWithTimeout(finalUrl, "GET");
        const html = clamp(await r2.text(), 200_000);
        const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : "";
        const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i);
        description = descMatch ? descMatch[1].trim() : "";
      } catch {
        // ignore
      }
    }

    return NextResponse.json({ ok: true, url: finalUrl, title, description });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ ok: false, reason: "server", message: msg }, { status: 500 });
  }
}
