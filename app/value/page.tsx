import type { Metadata } from "next";
import ValuePage from "../components/ValuePage";

export const metadata: Metadata = {
  title: "القيمة والخدمات | منتدى ميدبكس - MedBX Forum",
  description:
    "القيمة المضافة للزوار والشركات والخدمات والتسهيلات المتكاملة في منتدى ميدبكس للابتكار الصحي.",
  openGraph: {
    title: "القيمة والخدمات | منتدى ميدبكس",
    description: "القيمة المضافة للزوار والشركات والخدمات والتسهيلات المتكاملة في منتدى ميدبكس.",
    type: "website",
  },
};

export default function Value() {
  return (
    <main className="min-h-screen pt-20 md:pt-20">
      <ValuePage />
    </main>
  );
}
