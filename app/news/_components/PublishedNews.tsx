"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import PageHeader from "@/app/components/PageHeader";

type NewsItem = {
  id: number;
  titleAr: string;
  titleEn: string;
  summaryAr: string | null;
  summaryEn: string | null;
  type: string;
  publishedAt: Date | null;
};

export default function PublishedNews({ items }: { items: NewsItem[] }) {
  const { locale, t } = useLanguage();
  const [selectedType, setSelectedType] = useState("all");
  const typeLabels = {
    all: t.news.categories.all,
    news: locale === "ar" ? "أخبار" : "News",
    announcement: t.news.categories.announcements,
    registration: t.news.categories.registrationUpdates,
  };
  const filteredItems =
    selectedType === "all"
      ? items
      : items.filter((item) => (item.type || "news") === selectedType);

  return (
    <main className="min-h-screen">
      <PageHeader
        title={t.news.title}
        subtitle={t.news.subtitle}
        imageSrc="/health.jpg"
      />
      <section className="bg-(--color-surface) px-6 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-350">
          <div className="mb-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
            {Object.entries(typeLabels).map(([type, label]) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={[
                  "rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all sm:text-sm",
                  selectedType === type
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "border border-gray-200 bg-white text-muted-foreground hover:border-primary hover:text-primary",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const title = locale === "ar" ? item.titleAr : item.titleEn;
              const summary = locale === "ar" ? item.summaryAr : item.summaryEn;
              return (
                <div
                  key={item.id}
                  className="group flex flex-col gap-5 rounded-2xl border border-gray-200/80 bg-white p-3 shadow-clinical transition hover:border-primary/40 hover:bg-gray-50/80 hover:shadow-clinical-lg md:flex-row md:items-center md:justify-between md:p-4"
                >
                  <div className="flex-1">
                    <span className="inline-flex rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                      {typeLabels[item.type as keyof typeof typeLabels] || typeLabels.news}
                    </span>
                    <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight text-primary transition-colors group-hover:text-secondary sm:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-3 text-xs font-medium text-muted-foreground sm:text-sm">
                      {item.publishedAt?.toLocaleDateString()}
                    </p>
                    {summary && (
                      <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                        {summary}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {filteredItems.length === 0 && (
            <p className="mt-10 text-muted-foreground">
              {locale === "ar" ? "لا توجد أخبار منشورة حالياً." : "No published news yet."}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
