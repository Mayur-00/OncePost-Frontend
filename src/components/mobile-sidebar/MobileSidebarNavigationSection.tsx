'use client'
import { useUserStore } from '@/stores/user.store'
import { Album, Cog, LayoutGrid, Link2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

    const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/posts", label: "Posts", icon: Album },
  { href: "/settings", label: "Settings", icon: Cog },
];

const MobileSidebarNavigationSection = () => {
    const path = usePathname();
    const {user,isFetching} = useUserStore();



  return (
    <div className="h-full flex gap-10 items-center px-2 ">

      {navItems.map(({ href, label, icon: Icon })=> {
          const isActive = path.startsWith(href);
        return (
          <Link key={href} href={href} aria-current ={isActive? "page" : undefined}
          className={`h-10 w-10 text-[15px] rounded-sm font-normal flex items-center gap-2 cursor-pointer justify-center p-0 lg:px-4 lg:justify-start   ${
            isActive
              ? "bg-violet-500/90 text-white hover:bg-violet-500/80"
              : "bg-transparent hover:bg-white "
          }`}
        >
          <Icon className="size-5 stroke-2" />
          <h2 className={`hidden lg:block`}>{label}</h2>
        </Link>
        )

      })}

    {
      isFetching? (
        <span className='h-8 w-8 bg-zinc-300 rounded-md outline animate-pulse' >
        </span>
      ) : (
        <Link href="/settings" className='h-8 w-8  rounded-md outline' >
        <img
          className="h-full w-full rounded-sm object-cover"
          src={user?.profile_Picture || " /user-placeholder.png"}
          alt="profile_pic"
        /></Link>
      )
    }
      </div>
  )
}

export default MobileSidebarNavigationSection