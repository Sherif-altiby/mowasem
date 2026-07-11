import "./globals.css";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getGlobalSettings } from "@/services/PagesData/settingsService";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import { Changa } from "next/font/google";
import { cn } from "@/lib/utils";
import NavController from "@/components/layout/Navbar/NavController";

const Footer = dynamic(() => import("@/components/layout/Footer/Footer"));
const WhatsAppFloatingButton = dynamic(() => import("@/components/common/WhatsButton/WhatsButton"));


export async function generateMetadata() {
  const metadata = await getSeoMetadata("home", "");
  return {
    ...metadata,
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://zahabweawdeh.com"),
  };
}

const changa = Changa({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getGlobalSettings().catch(() => null);
  const mainPhoneNumber =
    (settings?.data?.contactInfo?.phones?.[0]?.countryCode ?? "") +
    (settings?.data?.contactInfo?.phones?.[0]?.number ?? "");

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={cn("font-sans", changa.variable)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" as="image" href="/assets/HERO.webp" />
        <meta name="theme-color" content="#18181b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${changa.className} antialiased pb-[60px] lg:pb-0`}>



        <NavController phone={mainPhoneNumber} />

        <main className="min-h-[calc(100vh-200px)]">
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </main>

        {settings && (
          <Suspense fallback={null}>
            <Footer settings={settings} />
          </Suspense>
        )}

        <Suspense fallback={null}>
          <WhatsAppFloatingButton phone={mainPhoneNumber} />
        </Suspense>

      </body>
    </html>
  );
}