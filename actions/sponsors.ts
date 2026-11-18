"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const idSchema = z.coerce.number().int().positive();
const statusSchema = z.enum(["new", "contacted", "won", "lost"]);

// ─── Queries ──────────────────────────────────────────────────────────────────

export type SponsorQuery = {
  page: number;
  pageSize: number;
  q?: string;
  status?: string;
  tier?: string;
  from?: Date;
  to?: Date;
};

export async function getSponsors(query: SponsorQuery) {
  const q = query.q?.trim();
  const where = {
    ...(q
      ? {
          OR: [
            { company: { contains: q } },
            { industry: { contains: q } },
            { contactName: { contains: q } },
            { email: { contains: q } },
            { phone: { contains: q } },
            { country: { contains: q } },
          ],
        }
      : {}),
    ...(query.status ? { status: query.status } : {}),
    ...(query.tier ? { tier: query.tier } : {}),
    ...(query.from || query.to
      ? {
          createdAt: {
            ...(query.from ? { gte: query.from } : {}),
            ...(query.to ? { lte: query.to } : {}),
          },
        }
      : {}),
  };

  const items = await prisma.sponsorLead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (query.page - 1) * query.pageSize,
    take: query.pageSize,
  });
  const total = await prisma.sponsorLead.count({ where });

  return {
    items,
    total,
    pages: Math.max(1, Math.ceil(total / query.pageSize)),
  };
}

export async function getSponsorCount() {
  return prisma.sponsorLead.count();
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function updateSponsorStatus(id: number, status: string) {
  const parsedId = idSchema.safeParse(id);
  const parsedStatus = statusSchema.safeParse(status);
  if (!parsedId.success || !parsedStatus.success)
    return { ok: false as const, error: "Invalid sponsor update." };
  await prisma.sponsorLead.update({
    where: { id: parsedId.data },
    data: { status: parsedStatus.data },
  });
  revalidatePath("/admin/sponsors");
  revalidatePath("/admin");
  return { ok: true as const };
}

export async function deleteSponsor(id: number) {
  const parsed = idSchema.safeParse(id);
  if (!parsed.success) return { ok: false as const, error: "Invalid sponsor." };
  await prisma.sponsorLead.delete({ where: { id: parsed.data } });
  revalidatePath("/admin/sponsors");
  revalidatePath("/admin");
  return { ok: true as const };
}
