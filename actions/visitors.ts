"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const idsSchema = z.array(z.coerce.number().int().positive()).min(1);

// ─── Queries ──────────────────────────────────────────────────────────────────

export type VisitorQuery = {
  page: number;
  pageSize: number;
  q?: string;
  role?: string;
  source?: string;
  from?: Date;
  to?: Date;
};

export async function getVisitors(query: VisitorQuery) {
  const q = query.q?.trim();
  const where = {
    ...(q
      ? {
          OR: [
            { fullName: { contains: q } },
            { email: { contains: q } },
            { phone: { contains: q } },
            { country: { contains: q } },
            { city: { contains: q } },
            { role: { contains: q } },
            { specialty: { contains: q } },
            { jobTitle: { contains: q } },
          ],
        }
      : {}),
    ...(query.role ? { role: query.role } : {}),
    ...(query.source ? { source: query.source } : {}),
    ...(query.from || query.to
      ? {
          createdAt: {
            ...(query.from ? { gte: query.from } : {}),
            ...(query.to ? { lte: query.to } : {}),
          },
        }
      : {}),
  };

  const items = await prisma.visitor.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (query.page - 1) * query.pageSize,
    take: query.pageSize,
  });
  const total = await prisma.visitor.count({ where });

  return { items, total, pages: Math.max(1, Math.ceil(total / query.pageSize)) };
}

export async function getVisitorCount() {
  return prisma.visitor.count();
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function deleteVisitors(ids: number[]) {
  const parsed = idsSchema.safeParse(ids);
  if (!parsed.success) return { ok: false as const, error: "Invalid visitor selection." };
  await prisma.visitor.deleteMany({ where: { id: { in: parsed.data } } });
  revalidatePath("/admin/visitors");
  revalidatePath("/admin");
  return { ok: true as const };
}
