import type { Metadata } from "next";
import SponsorsPage from "../components/SponsorsPage";

export const metadata: Metadata = {
  title: "فرص الرعاية والتغطية | منتدى ميدبكس - MedBX Forum",
  description:
    "ضع علامتك التجارية في طليعة مسيرة التحول الصحي بالمملكة العربية السعودية. استكشف باقات وفرص الرعاية الاستراتيجية والماسية والذهبية.",
  openGraph: {
    title: "فرص الرعاية والتغطية | منتدى ميدبكس",
    description: "فرص باقات الرعاية المتميزة في منتدى ميدبكس للابتكار الصحي.",
    type: "website",
  },
};

export default function Sponsors() {
  return (
    <main className="min-h-screen pt-20 md:pt-20">
      <SponsorsPage />
    </main>
  );
}
