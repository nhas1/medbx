import { z } from "zod";

export const newsSchema = z.object({
  titleAr: z.string().trim().min(1).max(200),
  titleEn: z.string().trim().min(1).max(200),
  summaryAr: z.string().trim().max(2000).optional(),
  summaryEn: z.string().trim().max(2000).optional(),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  type: z.enum(["news", "announcement", "registration"]),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().datetime().nullable().optional(),
});

export type NewsInput = z.infer<typeof newsSchema>;
