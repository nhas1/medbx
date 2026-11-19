"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

type NewsItem = {
  id: number;
  titleAr: string;
  titleEn: string;
  summaryAr: string | null;
  summaryEn: string | null;
  type: string;
  publishedAt: Date | null;
};

type NewsType = "all" | "news" | "announcement" | "registration";

export default function PublishedNews({
  items,
  selectedType,
}: {
  items: NewsItem[];
  selectedType: string;
}) {
  const { locale, t } = useLanguage();
  const activeType: NewsType = [
    "all",
    "news",
    "announcement",
    "registration",
  ].includes(selectedType)
    ? (selectedType as NewsType)
    : "all";
  const typeLabels = {
    all: t.news.categories.all,
    news: locale === "ar" ? "أخبار" : "News",
    announcement: t.news.categories.announcements,
    registration: t.news.categories.registrationUpdates,
  };
  const filteredItems =
    activeType === "all"
      ? items
      : items.filter((item) => (item.type || "news") === activeType);

  return (
    <main className="min-h-screen">
      <section className="relative mb-10 flex h-[50vh] min-h-105 overflow-hidden bg-primary py-20 text-white shadow-clinical md:py-28">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/health.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-linear-to-b from-primary/80 via-primary/60 to-primary/90" />
        </div>
        <div className="relative z-10 mx-auto flex w-[92%] flex-col items-center justify-center gap-5 text-center md:w-[50vw]">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {t.news.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
            {t.news.subtitle}
          </p>
        </div>
      </section>
      <section className="bg-(--color-surface) px-6 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-350">
          <div className="mb-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
            {Object.entries(typeLabels).map(([type, label]) => (
              <Link
                key={type}
                href={type === "all" ? "/news" : `/news?type=${type}`}
                className={[
                  "rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all sm:text-sm",
                  activeType === type
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "border border-gray-200 bg-white text-muted-foreground hover:border-primary hover:text-primary",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                      {typeLabels[item.type as keyof typeof typeLabels] ||
                        typeLabels.news}
                    </span>
                    <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight text-primary transition-colors group-hover:text-secondary sm:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-3 text-xs font-medium text-muted-foreground sm:text-sm">
                      {item.publishedAt?.toLocaleDateString(
                        locale === "ar" ? "ar-SA" : "en-US",
                      )}
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
              {locale === "ar"
                ? "لا توجد أخبار منشورة حالياً."
                : "No published news yet."}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
