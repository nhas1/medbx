import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/admin/AppSidebar";
import { ModalProvider } from "@/providers/modal-provider";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="pt-20">
          <SidebarTrigger
            aria-label="Toggle sidebar"
            className="rounded-lg border bg-background shadow-sm mx-2"
          />
          <div className="min-w-0 flex-1 space-y-6 p-3 sm:p-4 md:p-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ModalProvider>
  );
}
