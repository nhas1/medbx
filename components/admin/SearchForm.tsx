"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchForm({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const field = event.currentTarget.elements.namedItem("q");
    const value = field instanceof HTMLInputElement ? field.value.trim() : "";
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("q", value);
    else params.delete("q");
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center"
    >
      <Input
        name="q"
        key={q}
        defaultValue={q}
        placeholder={placeholder}
        className="sm:max-w-sm"
      />
      <Button type="submit" className="w-full sm:w-auto">
        Search
      </Button>
    </form>
  );
}
