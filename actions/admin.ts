"use server";

const STATIC_ADMIN_PASSWORD = "medbx2026";

export async function verifyAdminPassword(password: string) {
  if (typeof password !== "string" || !password) {
    return { ok: false as const, error: "Invalid password." };
  }
  const valid = password === STATIC_ADMIN_PASSWORD;
  return valid
    ? { ok: true as const }
    : { ok: false as const, error: "Invalid password." };
}
