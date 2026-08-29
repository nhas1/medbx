"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export interface PartnerItem {
  name: string;
  image?: string;
}

interface PartnersScrollerProps {
  title?: string;
  items?: Array<string | PartnerItem>;
  isMedia?: boolean;
}

const defaultPartners = [
  "NHAS HOLDING",
  "RIEP",
  "MINISTRY OF HEALTH",
  "SAUDI FDA",
  "KFSHRC",
  "ARAMCO MED",
  "SEHA",
  "NAHDI",
];

export default function PartnersScroller({
  title,
  items: propsItems,
  isMedia = false,
}: PartnersScrollerProps) {
  const { t } = useLanguage();
  const rawItems = propsItems || (isMedia ? t.mediaPartners.items : defaultPartners);
  const displayTitle = title ?? (isMedia ? t.mediaPartners.title : t.partners.title);
  const items = [...rawItems, ...rawItems];

  return (
    <section className="py-10 bg-[var(--color-surface-container-low)] border-y border-[var(--color-outline-variant)]/20 overflow-hidden">
      {displayTitle && (
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-6 px-4">
          {displayTitle}
        </p>
      )}
      <div className="overflow-hidden w-full">
        <div className="scroller-track flex items-center">
          {items.map((item, i) => {
            const name = typeof item === "string" ? item : item.name;
            const image = typeof item === "object" ? item.image : undefined;

            if (image) {
              return (
                <div
                  key={`${name}-${i}`}
                  className="flex items-center justify-center h-12 px-8 bg-white w-[200px] min-h-[80px] rounded-md"
                >
                  <Image
                    src={image}
                    alt={name}
                    width={140}
                    height={48}
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
              );
            }

            return (
              <span
                key={`${name}-${i}`}
                className={[
                  "text-xl font-bold whitespace-nowrap select-none px-6",
                  i % 2 === 0
                    ? "text-[var(--color-primary)] opacity-50"
                    : "text-[var(--color-secondary)] opacity-50",
                ].join(" ")}
              >
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
