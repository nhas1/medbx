import type { Metadata } from "next";
import VisitorForm from "../_components/VisitorForm";

export const metadata: Metadata = {
  title: "Register as a Visitor | MedBX",
};

export default function VisitorRegistrationPage() {
  return (
    <main className="min-h-screen bg-surface py-16 md:py-24">
      <VisitorForm />
    </main>
  );
}
