import { sponsorSchema } from "@/lib/Validation";
import { getIp, rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const limit = rateLimit(`sponsor:${getIp(request)}`);
  if (!limit.ok) {
    return Response.json(
      { error: "rate_limit_exceeded" },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfter) },
      },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const result = sponsorSchema.safeParse(payload);
  if (!result.success) {
    return Response.json(
      {
        error: "validation_failed",
        fields: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const {
    company,
    industry,
    size,
    country,
    contactName,
    email,
    phone,
    tier,
    goals,
    notes,
  } = result.data;

  try {
    await prisma.sponsorLead.create({
      data: {
        company,
        industry,
        size,
        country,
        contactName,
        email,
        phone,
        tier,
        goals,
        notes,
      },
    });
  } catch (error) {
    console.error("Failed to create sponsor lead", error);
    return Response.json({ error: "internal_server_error" }, { status: 500 });
  }

  return Response.json({ success: true }, { status: 201 });
}
