"use client";

import { useState } from "react";
import { registerVisitor } from "@/actions/register";
import { useLanguage } from "@/app/context/LanguageContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChoiceCheckbox, RegisterField, SubmitButton } from "./RegisterField";
import {
  EVENT_DAYS,
  SECTORS,
  SOURCES,
  VISIT_REASONS,
  VISITOR_ROLES,
  type VisitorInput,
} from "@/lib/Validation";

type VisitorFormState = Omit<VisitorInput, "consent"> & { consent: boolean };

const initialForm: VisitorFormState = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  city: undefined,
  role: "other",
  specialty: undefined,
  jobTitle: undefined,
  sectors: [],
  reasons: [],
  days: [],
  source: undefined,
  marketingOptIn: false,
  consent: true,
};

export default function VisitorForm() {
  const { t } = useLanguage();
  const labels = t.register.visitor;
  const [form, setForm] = useState<VisitorFormState>(initialForm);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const update = <K extends keyof VisitorFormState>(key: K, value: VisitorFormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const toggle = <K extends "sectors" | "reasons" | "days">(
    key: K,
    value: VisitorInput[K][number],
  ) => {
    const values = form[key] as string[];
    update(
      key,
      (values.includes(value as string)
        ? values.filter((item) => item !== value)
        : [...values, value]) as VisitorInput[K],
    );
  };

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
      await registerVisitor({ ...form, consent: true });
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
        <p className="mt-4 text-on-surface-variant">{labels.intro}</p>
      </div>
      <form onSubmit={submit} className="space-y-8 rounded-xl bg-white p-6 shadow-clinical-lg md:p-10">
        <div className="grid gap-5 md:grid-cols-2">
          <RegisterField id="fullName" label={labels.fullName}><Input id="fullName" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} /></RegisterField>
          <RegisterField id="email" label={labels.email}><Input id="email" required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></RegisterField>
          <RegisterField id="phone" label={labels.phone}><Input id="phone" required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></RegisterField>
          <RegisterField id="country" label={labels.country}><Input id="country" required value={form.country} onChange={(e) => update("country", e.target.value)} /></RegisterField>
          <RegisterField id="city" label={labels.city}><Input id="city" value={form.city ?? ""} onChange={(e) => update("city", e.target.value || undefined)} /></RegisterField>
          <RegisterField id="role" label={labels.role}><Select value={form.role} onValueChange={(value) => update("role", value as VisitorInput["role"])}><SelectTrigger id="role" className="h-12 w-full"><SelectValue /></SelectTrigger><SelectContent>{VISITOR_ROLES.map((value) => <SelectItem key={value} value={value}>{labels.options[value]}</SelectItem>)}</SelectContent></Select></RegisterField>
          <RegisterField id="specialty" label={labels.specialty}><Input id="specialty" value={form.specialty ?? ""} onChange={(e) => update("specialty", e.target.value || undefined)} /></RegisterField>
          <RegisterField id="jobTitle" label={labels.jobTitle}><Input id="jobTitle" value={form.jobTitle ?? ""} onChange={(e) => update("jobTitle", e.target.value || undefined)} /></RegisterField>
          <RegisterField id="source" label={labels.source}><Select value={form.source ?? ""} onValueChange={(value) => update("source", (value || undefined) as VisitorInput["source"])}><SelectTrigger id="source" className="h-12 w-full"><SelectValue placeholder={labels.select} /></SelectTrigger><SelectContent>{SOURCES.map((value) => <SelectItem key={value} value={value}>{labels.options[value]}</SelectItem>)}</SelectContent></Select></RegisterField>
        </div>
        <ChoiceGroup label={labels.sectors} values={SECTORS} optionLabels={labels.options} selected={form.sectors} onToggle={(value) => toggle("sectors", value)} />
        <ChoiceGroup label={labels.reasons} values={VISIT_REASONS} optionLabels={labels.options} selected={form.reasons} onToggle={(value) => toggle("reasons", value)} />
        <ChoiceGroup label={labels.days} values={EVENT_DAYS} optionLabels={labels.options} selected={form.days} onToggle={(value) => toggle("days", value)} />
        <div className="space-y-4 border-t border-outline-variant pt-6">
          {/* <ChoiceCheckbox id="marketingOptIn" label={labels.marketing} checked={form.marketingOptIn} onChange={() => update("marketingOptIn", !form.marketingOptIn)} /> */}
          <ChoiceCheckbox id="visitorConsent" label={labels.consent} checked={form.consent} onChange={() => update("consent", !form.consent)} />
        </div>
        {message && <p className="text-sm text-secondary">{message}</p>}
        {error && <p className="text-sm text-error">{error}</p>}
        <SubmitButton pending={pending}>{labels.submit}</SubmitButton>
      </form>
    </section>
  );
}

function ChoiceGroup<T extends string>({
  label,
  values,
  optionLabels,
  selected,
  onToggle,
}: {
  label: string;
  values: readonly T[];
  optionLabels: Readonly<Record<string, string>>;
  selected: readonly T[];
  onToggle: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-on-surface">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {values.map((value) => (
          <ChoiceCheckbox key={value} id={`${label}-${value}`} label={optionLabels[value]} checked={selected.includes(value)} onChange={() => onToggle(value)} />
        ))}
      </div>
    </fieldset>
  );
}
