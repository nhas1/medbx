import type { Metadata } from "next";
import NewsPage from "../components/NewsPage";

export const metadata: Metadata = {
  title: "الأخبار والإعلانات | منتدى ميدبكس - MedBX Forum",
  description:
    "متابعة شاملة لأحدث المستجدات، الإعلانات الرسمية، وتحديثات مشاركة وتدشين فعاليات منتدى ميدبكس.",
  openGraph: {
    title: "الأخبار والإعلانات | منتدى ميدبكس",
    description: "أحدث الأخبار والإعلانات في منتدى ميدبكس للابتكار الصحي.",
    type: "website",
  },
};

export default function News() {
  return (
    <main className="min-h-screen pt-20 md:pt-20">
      <NewsPage />
    </main>
  );
}
