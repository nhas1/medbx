"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveNews } from "@/actions/news";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { NewsInput } from "@/lib/validation-news";

type Post = {
  id: number;
  titleAr: string;
  titleEn: string;
  summaryAr: string | null;
  summaryEn: string | null;
  coverImageUrl: string | null;
  type: string;
  status: string;
  publishedAt: Date | null;
};

export default function NewsForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [form, setForm] = useState<NewsInput>(
    post
      ? {
          titleAr: post.titleAr,
          titleEn: post.titleEn,
          summaryAr: post.summaryAr || "",
          summaryEn: post.summaryEn || "",
          coverImageUrl: post.coverImageUrl || "",
          type: post.type === "announcement" || post.type === "registration" ? post.type : "news",
          status: post.status === "published" ? "published" : "draft",
          publishedAt: post.publishedAt?.toISOString() || null,
        }
      : {
          titleAr: "",
          titleEn: "",
          summaryAr: "",
          summaryEn: "",
          type: "news",
          status: "draft",
          publishedAt: null,
        },
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  function update<K extends keyof NewsInput>(key: K, value: NewsInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }
  async function submit(status = form.status) {
    setPending(true);
    setError("");
    const result = await saveNews({ ...form, status }, post?.id);
    if (!result.ok) setError(result.error);
    else router.push("/admin/news");
    setPending(false);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post ? "Edit news post" : "New news post"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">Type</label>
            <select
              id="type"
              value={form.type}
              onChange={(e) => update("type", e.target.value as NewsInput["type"])}
              className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
            >
              <option value="news">News</option>
              <option value="announcement">Announcement</option>
              <option value="registration">Registration update</option>
            </select>
          </div>
        <Tabs defaultValue="ar">
          <TabsList>
            <TabsTrigger value="ar">العربية</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>
          <TabsContent value="ar" className="space-y-4">
            <Input
              placeholder="العنوان"
              value={form.titleAr}
              onChange={(e) => update("titleAr", e.target.value)}
            />
            <Textarea
              placeholder="الملخص"
              value={form.summaryAr || ""}
              onChange={(e) => update("summaryAr", e.target.value)}
            />
          </TabsContent>
          <TabsContent value="en" className="space-y-4">
            <Input
              placeholder="Title"
              value={form.titleEn}
              onChange={(e) => update("titleEn", e.target.value)}
            />
            <Textarea
              placeholder="Summary"
              value={form.summaryEn || ""}
              onChange={(e) => update("summaryEn", e.target.value)}
            />
          </TabsContent>
        </Tabs>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex flex-wrap gap-2">
          <Button disabled={pending} onClick={() => submit("draft")}>
            Save draft
          </Button>
          <Button disabled={pending} onClick={() => submit("published")}>
            Save & publish
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
