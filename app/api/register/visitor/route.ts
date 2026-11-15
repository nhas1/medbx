import { visitorSchema } from "@/lib/Validation";
import { getIp, rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const limit = rateLimit(`visitor:${getIp(request)}`);
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

  const result = visitorSchema.safeParse(payload);
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
    fullName,
    email,
    phone,
    country,
    city,
    role,
    specialty,
    jobTitle,
    sectors,
    reasons,
    days,
    source,
    marketingOptIn,
  } = result.data;

  try {
    await prisma.visitor.create({
      data: {
        fullName,
        email,
        phone,
        country,
        city,
        role,
        specialty,
        jobTitle,
        sectors,
        reasons,
        days,
        source,
        marketingOptIn,
      },
    });
  } catch (error) {
    console.error("Failed to create visitor registration", error);
    return Response.json({ error: "internal_server_error" }, { status: 500 });
  }

  return Response.json({ success: true }, { status: 201 });
}
