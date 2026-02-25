'use client'
import { useUserStore } from '@/stores/user.store'
import { Album, Cog, LayoutGrid } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const MobileSidebarNavigationSection = () => {
    const path = usePathname();
    const {user,isFetching} = useUserStore();

  return (
    <div className="h-full flex gap-10 items-center px-2 ">
        <a href="/dashboard"
          className={`h-10 w-10 text-[15px] rounded-sm font-normal flex items-center gap-2 cursor-pointer justify-center p-0 lg:px-4 lg:justify-start   ${
            path === "/dashboard"
              ? "bg-violet-500/90 text-white hover:bg-violet-500/80"
              : "bg-transparent hover:bg-white "
          }`}
        >
          <LayoutGrid className="size-5 stroke-2" />
          <h2 className={`hidden lg:block`}>Dashboard</h2>
        </a>
        <a
        href="/posts"
          className={`h-10 w-10 text-[15px] rounded-sm font-normal flex items-center gap-2 cursor-pointer justify-center p-0 lg:px-4 lg:justify-start    ${
            path === "/posts"
              ? "bg-violet-500/90 text-white hover:bg-violet-500/80"
              : "bg-transparent hover:bg-white"
          }`}
        >
          <Album className="size-5 stroke-2" />
          <h2 className={`hidden lg:block`}>Posts</h2>
        </a>
        <a
        href="/settings"
          className={`h-10 w-10 text-[15px] rounded-sm font-normal flex items-center gap-2 cursor-pointer justify-center p-0 lg:px-4 lg:justify-start    ${
            path === "/settings"
              ? "bg-violet-500/90 text-white hover:bg-violet-500/80"
              : "bg-transparent hover:bg-white"
          }`}
        >
          <Cog className="size-5 stroke-2" />
          <h2 className={`hidden lg:block`}>settings</h2>
        </a>

    {
      isFetching? (
        <span className='h-8 w-8 bg-zinc-300 rounded-md outline animate-pulse' >
        </span>
      ) : (
        <a href="/profile" className='h-8 w-8  rounded-md outline' >
        <img
          className="h-full w-full rounded-sm object-cover"
          src={user?.profile_Picture || " /user-placeholder.png"}
          alt="profile_pic"
        /></a>
      )
    }
      </div>
  )
}

export default MobileSidebarNavigationSection