"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  Handshake,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const items = [
  {
    title: { en: "Overview", ar: "نظرة عامة" },
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: { en: "Visitors", ar: "الزوار" },
    href: "/admin/visitors",
    icon: Users,
  },
  {
    title: { en: "Sponsor Leads", ar: "طلبات الرعاية" },
    href: "/admin/sponsors",
    icon: Handshake,
  },
  { title: { en: "News", ar: "الأخبار" }, href: "/admin/news", icon: FileText },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { dir, locale } = useLanguage();
  const isRtl = dir === "rtl";

  return (
    <Sidebar
      side={isRtl ? "right" : "left"}
      collapsible="icon"
      variant="inset"
      dir={dir}
      className="pt-20"
    >
      {/* <SidebarHeader className="gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <BarChart3 className="size-5" />
          </div>
          <div className="grid flex-1 text-start leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-semibold">MEDBX</span>
            <span className="truncate text-xs text-muted-foreground">
              {locale === "ar" ? "لوحة الإدارة" : "Admin dashboard"}
            </span>
          </div>
        </div>
      </SidebarHeader> */}
      <SidebarSeparator className="mx-3 w-auto" />
      <SidebarContent>
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel>
            {locale === "ar" ? "المنصة" : "Platform"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => {
                const title = item.title[locale];
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={
                        pathname === item.href ||
                        (item.href !== "/admin" &&
                          pathname.startsWith(item.href))
                      }
                      tooltip={{
                        children: title,
                        side: isRtl ? "left" : "right",
                      }}
                      className="h-10 rounded-lg px-3"
                    >
                      <item.icon />
                      <span>{title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
