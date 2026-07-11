import Link from "next/link";
import WhatsappContact from "./WhatsappContact";
import Links from "@/components/layout/Navbar/Links";

interface HeroHeaderProps {
  phone: string;
}

export default function HeroHeader({ phone }: HeroHeaderProps) {
  return (
    <nav className="overflow-visible   p-4 md:p-4 lg:p-6">
      <div className="container flex items-center justify-between px-0! container mx-auto">
        <Link href={"/"} className=" text-white font-bold text-lg lg:text-xl   xl:text-2xl  2xl:text-3xl whitespace-nowrap">
          مواسم
        </Link>
        <div className="flex items-center gap-3">
          <Links type="mainPage" />
          <WhatsappContact phone={phone || "+966501234567"} />
        </div>
      </div>
    </nav>
  );
}
