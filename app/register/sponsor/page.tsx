import type { Metadata } from "next";
import SponsorForm from "../_components/SponsorForm";

export const metadata: Metadata = {
  title: "Register as a Sponsor | MedBX",
};

export default function SponsorRegistrationPage() {
  return (
    <main className="min-h-screen bg-surface py-16 md:py-24">
      <SponsorForm />
    </main>
  );
}
