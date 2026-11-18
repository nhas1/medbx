import type { Metadata } from "next";
import { cookies } from "next/headers";
import PublishedNews from "./_components/PublishedNews";
import { getPublishedNews } from "@/actions/news";

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

export default async function News({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const items = await getPublishedNews();
  const selectedType = typeof params.type === "string" ? params.type : "all";
  const locale =
    (await cookies()).get("medbx_locale")?.value === "en" ? "en" : "ar";

  return (
    <PublishedNews items={items} locale={locale} selectedType={selectedType} />
  );
}
