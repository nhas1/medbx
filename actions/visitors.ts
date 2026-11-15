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
  const where = {
    ...(query.q
      ? {
          OR: [
            { fullName: { contains: query.q } },
            { email: { contains: query.q } },
            { phone: { contains: query.q } },
            { organization: { contains: query.q } },
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

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function deleteVisitors(ids: number[]) {
  const parsed = idsSchema.safeParse(ids);
  if (!parsed.success) return { ok: false as const, error: "Invalid visitor selection." };
  await prisma.visitor.deleteMany({ where: { id: { in: parsed.data } } });
  revalidatePath("/admin/visitors");
  return { ok: true as const };
}
