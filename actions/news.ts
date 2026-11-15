"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { newsSchema, type NewsInput } from "@/lib/validation-news";

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getPublishedNews() {
  return prisma.news.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getNewsForEdit(id: number) {
  return prisma.news.findUnique({ where: { id } });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

function refresh() {
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
}

export async function saveNews(input: NewsInput, id?: number) {
  const parsed = newsSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Please correct the news fields." };
  const data = {
    ...parsed.data,
    summaryAr: parsed.data.summaryAr || null,
    summaryEn: parsed.data.summaryEn || null,
    coverImageUrl: parsed.data.coverImageUrl || null,
    publishedAt:
      parsed.data.status === "published"
        ? parsed.data.publishedAt
          ? new Date(parsed.data.publishedAt)
          : new Date()
        : null,
  };
  const record = id
    ? await prisma.news.update({ where: { id }, data })
    : await prisma.news.create({ data });
  refresh();
  return { ok: true as const, id: record.id };
}

export async function deleteNews(id: number) {
  const parsed = z.coerce.number().int().positive().safeParse(id);
  if (!parsed.success) return { ok: false as const, error: "Invalid news post." };
  await prisma.news.delete({ where: { id: parsed.data } });
  refresh();
  return { ok: true as const };
}
