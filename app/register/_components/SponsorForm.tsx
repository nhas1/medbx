"use client";

import { useState } from "react";
import { registerSponsor } from "@/actions/register";
import { useLanguage } from "@/app/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SPONSOR_GOALS, SPONSOR_TIERS, type SponsorInput } from "@/lib/Validation";
import { ChoiceCheckbox, RegisterField, SubmitButton } from "./RegisterField";

type SponsorFormState = Omit<SponsorInput, "consent"> & { consent: boolean };

const initialForm: SponsorFormState = {
  company: "",
  industry: "",
  size: undefined,
  country: "",
  contactName: "",
  email: "",
  phone: "",
  tier: "undecided",
  budget: undefined,
  goals: [],
  needsBooth: false,
  notes: undefined,
  consent: true,
};

export default function SponsorForm() {
  const { t } = useLanguage();
  const labels = t.register.sponsor;
  const [form, setForm] = useState<SponsorFormState>(initialForm);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const update = <K extends keyof SponsorFormState>(key: K, value: SponsorFormState[K]) => setForm((current) => ({ ...current, [key]: value }));
  const toggleGoal = (value: SponsorInput["goals"][number]) => update("goals", form.goals.includes(value) ? form.goals.filter((item) => item !== value) : [...form.goals, value]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    setError("");
    if (!form.consent) {
      setError(labels.consentError);
      setPending(false);
      return;
    }
    try {
      await registerSponsor({ ...form, consent: true });
      setMessage(labels.success);
      setForm(initialForm);
    } catch {
      setError(labels.error);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-primary md:text-5xl">{labels.title}</h1>
        <p className="mt-6 text-on-surface-variant">{labels.intro}</p>
      </div>
      <form onSubmit={submit} className="space-y-8 rounded-xl bg-white p-6 shadow-clinical-lg md:p-10">
        <div className="grid gap-5 md:grid-cols-2">
          <RegisterField id="company" label={labels.company}><Input id="company" required value={form.company} onChange={(e) => update("company", e.target.value)} /></RegisterField>
          <RegisterField id="industry" label={labels.industry}><Input id="industry" required value={form.industry} onChange={(e) => update("industry", e.target.value)} /></RegisterField>
          <RegisterField id="size" label={labels.size}><Input id="size" value={form.size ?? ""} onChange={(e) => update("size", e.target.value || undefined)} /></RegisterField>
          <RegisterField id="country" label={labels.country}><Input id="country" required value={form.country} onChange={(e) => update("country", e.target.value)} /></RegisterField>
          <RegisterField id="contactName" label={labels.contactName}><Input id="contactName" required value={form.contactName} onChange={(e) => update("contactName", e.target.value)} /></RegisterField>
          <RegisterField id="email" label={labels.email}><Input id="email" required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></RegisterField>
          <RegisterField id="phone" label={labels.phone}><Input id="phone" required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></RegisterField>
          <RegisterField id="tier" label={labels.tier}><Select value={form.tier} onValueChange={(value) => update("tier", value as SponsorInput["tier"])}><SelectTrigger id="tier" className="h-12 w-full"><SelectValue /></SelectTrigger><SelectContent>{SPONSOR_TIERS.map((value) => <SelectItem key={value} value={value}>{labels.options[value]}</SelectItem>)}</SelectContent></Select></RegisterField>
        </div>
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-on-surface">{labels.goals}</legend>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">{SPONSOR_GOALS.map((value) => <ChoiceCheckbox key={value} id={`goal-${value}`} label={labels.options[value]} checked={form.goals.includes(value)} onChange={() => toggleGoal(value)} />)}</div>
        </fieldset>
        <RegisterField id="notes" label={labels.notes}><Textarea id="notes" rows={5} value={form.notes ?? ""} onChange={(e) => update("notes", e.target.value || undefined)} /></RegisterField>
        <div className="space-y-4 border-t border-outline-variant pt-6">
          <ChoiceCheckbox id="needsBooth" label={labels.booth} checked={form.needsBooth} onChange={() => update("needsBooth", !form.needsBooth)} />
          <ChoiceCheckbox id="sponsorConsent" label={labels.consent} checked={form.consent} onChange={() => update("consent", !form.consent)} />
        </div>
        {message && <p className="text-sm text-secondary">{message}</p>}
        {error && <p className="text-sm text-error">{error}</p>}
        <SubmitButton pending={pending}>{labels.submit}</SubmitButton>
      </form>
    </section>
  );
}
