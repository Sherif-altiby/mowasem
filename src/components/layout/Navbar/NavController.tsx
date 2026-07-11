"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const HeroHeader = dynamic(() => import("@/components/ui/HeroHeader/HeroHeader"));
const Navbar     = dynamic(() => import("@/components/layout/Navbar/Navbar"));

interface NavControllerProps {
  phone: string;
}

export default function NavController({ phone }: NavControllerProps) {
  const pathname = usePathname();
  const isHome   = pathname === "/";

  if (isHome) {
    return (
      <header className="absolute top-0 left-0 right-0 w-full z-50 pt-6 px-4">
        <HeroHeader phone={phone} />
      </header>
    );
  }

  return <Navbar phone={phone} />;
}