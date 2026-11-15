// lib/validation.ts
import { z } from "zod";

// ---- قيم ثابتة (استخدمها في الفورم كمان عشان تفضل متطابقة) ----
export const VISITOR_ROLES = [
  "practitioner",
  "student",
  "researcher",
  "entrepreneur",
  "investor",
  "government",
  "job_seeker",
  "other",
] as const;

export const SECTORS = [
  "clinical_care",
  "biotech_pharma",
  "medical_devices",
  "digital_health",
  "ai_health",
  "health_investment",
  "medical_recruitment",
] as const;

export const VISIT_REASONS = [
  "sessions",
  "workshops",
  "recruitment",
  "b2b",
  "exhibition",
  "investment",
] as const;

export const EVENT_DAYS = ["day1", "day2", "day3"] as const;

export const SOURCES = [
  "instagram",
  "snapchat",
  "tiktok",
  "whatsapp",
  "x",
  "email",
  "friend",
  "other",
] as const;

export const SPONSOR_TIERS = [
  "diamond",
  "gold",
  "silver",
  "session",
  "workshop",
  "media",
  "undecided",
] as const;

export const SPONSOR_GOALS = [
  "brand_visibility",
  "product_showcase",
  "recruitment",
  "partnerships",
  "investment",
] as const;

export const BUDGET_RANGES = [
  "lt_50k",
  "50k_150k",
  "150k_500k",
  "gt_500k",
  "unsure",
] as const;

// ---- مساعدات ----
const text = (max = 120) => z.string().trim().min(1).max(max);
const optionalText = (max = 120) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s\-()]{8,20}$/, "invalid_phone");

const email = z.string().trim().toLowerCase().email().max(190);

// ---- فورم الزائر ----
export const visitorSchema = z.object({
  fullName: text(100).min(2),
  email,
  phone,
  country: text(80),
  city: optionalText(80),
  role: z.enum(VISITOR_ROLES),
  specialty: optionalText(120),
  jobTitle: optionalText(120),
  sectors: z.array(z.enum(SECTORS)).min(1).max(SECTORS.length),
  reasons: z.array(z.enum(VISIT_REASONS)).min(1).max(VISIT_REASONS.length),
  days: z.array(z.enum(EVENT_DAYS)).min(1).max(EVENT_DAYS.length),
  source: z.enum(SOURCES).optional(),
  marketingOptIn: z.boolean().default(false),
  // موافقة صريحة على سياسة الخصوصية (PDPL)
  consent: z.literal(true, { message: "consent_required" }),
});

export type VisitorInput = z.infer<typeof visitorSchema>;

// ---- فورم الراعي ----
export const sponsorSchema = z.object({
  company: text(150),
  industry: text(120),
  size: optionalText(40),
  country: text(80),
  contactName: text(100).min(2),
  email,
  phone,
  tier: z.enum(SPONSOR_TIERS),
  budget: z.enum(BUDGET_RANGES).optional(),
  goals: z.array(z.enum(SPONSOR_GOALS)).min(1).max(SPONSOR_GOALS.length),
  needsBooth: z.boolean().default(false),
  notes: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .transform((v) => (v ? v : undefined)),
  consent: z.literal(true, { message: "consent_required" }),
});

export type SponsorInput = z.infer<typeof sponsorSchema>;
