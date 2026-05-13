"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Album, Calendar1Icon, CalendarCogIcon, CalendarHeartIcon, CalendarIcon, CirclePlus, Cog, LayoutGrid, PlusCircle, PlusIcon } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/create", label: "Create", icon: CirclePlus },
  { href: "/schedule", label: "Schedule", icon: CalendarIcon },
  { href: "/posts", label: "Posts", icon: Album },
  { href: "/settings", label: "Settings", icon: Cog },
];

export default function SidebarNavigationButtonsSection() {
  const path = usePathname();

  return (
    <div className="w-full h-[80%] my-2 flex flex-col py-2 gap-4">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = path.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`h-[8%] text-[15px] rounded-sm flex items-center gap-2 justify-center p-0 lg:px-4 lg:justify-start ${
              isActive
                ? "bg-violet-500/90 text-white"
                : "hover:bg-white"
            }`}
          >
            <Icon className="size-5 stroke-2" />
            <h2 className="hidden lg:block">{label}</h2>
          </Link>
        );
      })}

      <div className="border-t border-zinc-400 text-xs text-zinc-500 flex flex-col gap-2 mt-5 p-2">
      <Link href={'/privacy-policy'}>Privacy Policy</Link>
      <Link href={'/terms'}>Terms & Conditions</Link>
      <Link href={'/help'}>Help</Link>

      </div>
    </div>
    
  );
}