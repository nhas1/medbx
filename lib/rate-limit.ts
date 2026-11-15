// lib/rate-limit.ts
// Rate limit بسيط في الذاكرة: مناسب لسيرفر Node واحد (زي الاستضافة).
// بيتصفّر لو التطبيق اتعمله restart. لو عملت أكتر من instance استخدم Redis/Upstash.

type Entry = { count: number; resetAt: number };
const hits = new Map<string, Entry>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return {
      ok: false as const,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }
  return { ok: true as const };
}

// تنظيف دوري عشان الـ Map ماتكبرش
setInterval(
  () => {
    const now = Date.now();
    for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
  },
  15 * 60 * 1000,
).unref?.();

export function getIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return (
    fwd?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "unknown"
  ).trim();
}
