"use server";

import axios from "axios";
import type { SponsorInput, VisitorInput } from "@/lib/Validation";

export async function registerVisitor(input: VisitorInput) {
  const response = await axios.post("/api/register/visitor", input);
  return response.data as { success: true };
}

export async function registerSponsor(input: SponsorInput) {
  const response = await axios.post("/api/register/sponsor", input);
  return response.data as { success: true };
}
