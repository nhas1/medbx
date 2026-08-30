import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Tajawal, Geist } from "next/font/google";
import { LanguageProvider } from "./context/LanguageContext";
import "./globals.css";
import Navbar from "./components/Navbar";
import ContactFooter from "./components/ContactFooter";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "منتدى ميدبكس",
  description:
    "المنصة الوطنية السعودية الرائدة التي تجمع بين التوظيف الطبي، الأبحاث الطبية، والابتكارات التقنية الصحية. نربط الجهات الرائدة بأفضل الكفاءات والكوادر.",
  openGraph: {
    title: "منتدى ميدبكس",
    description: "المنصة الوطنية السعودية الرائدة في الابتكار الصحي.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cn(tajawal.variable, "font-sans", geist.variable)}
    >
      <body className="antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          {children}
          <ContactFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
