import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import { LanguageProvider } from "./context/LanguageContext";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

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
      className={`${plusJakartaSans.variable} ${tajawal.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
