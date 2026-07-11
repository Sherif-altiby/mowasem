export const dynamic = "force-static"; 
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const domain = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  return {
    // nofollow and noindex
    robots: {
      index: false,
      follow: false,
    },
    metadataBase: new URL(domain),
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist.",
    
    keywords: ["404", "not found", "error", "page not found"],
    openGraph: {
      title: "404 - Page Not Found",
      description: "The page you are looking for does not exist.",
      images: ["/assets/not-found.svg"],
    },
  };
}
export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen px-4  py-20 md:py-40 ">
      <div className="w-full   relative ">
        <Image
          src="/assets/not-found.svg"
          alt="404"
           width={480}
           height={480}
          className="mx-auto  object-contain"
        />
      </div>
      <p className="text-lg text-gray-700 mb-6 text-center">
        الصفحة المطلوبة غير موجودة يرجى العودة للصفحة الرئيسية
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-white rounded-lg shadow  transition duration-300 ease-in-out hover:bg-primary/80 hover:shadow-lg hover:scale-105 transform "
      >
        ارجع للصفحة الرئيسية
      </Link>
    </div>
  );
}
