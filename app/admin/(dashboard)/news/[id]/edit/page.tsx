import { notFound } from "next/navigation";
import NewsForm from "../../_components/NewsForm";
import { getNewsForEdit } from "@/actions/news";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getNewsForEdit(Number(id));
  if (!post) notFound();
  return <NewsForm post={post} />;
}
