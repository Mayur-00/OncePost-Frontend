"use client"
import { useUserStore } from '@/stores/user.store';
import { Album, Cog, LayoutGrid } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react'

const SidebarNavigationButtonsSection = () => {
    const path = usePathname();


  return (
    <div className="w-full h-[80%] my-2  flex flex-col py-2 gap-4">
        <a href="/dashboard"
          className={`h-[8%] text-[15px] rounded-sm font-normal flex items-center gap-2 cursor-pointer justify-center p-0 lg:px-4 lg:justify-start   ${
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
          className={`h-[8%] text-[15px] rounded-sm font-normal flex items-center gap-2 cursor-pointer justify-center p-0 lg:px-4 lg:justify-start     ${
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
          className={`h-[8%] text-[15px] rounded-sm font-normal flex items-center gap-2 cursor-pointer justify-center p-0 lg:px-4 lg:justify-start    ${
            path === "/settings"
              ? "bg-violet-500/90 text-white hover:bg-violet-500/80"
              : "bg-transparent hover:bg-white"
          }`}
        >
          <Cog className="size-5 stroke-2" />
          <h2 className={`hidden lg:block`}>settings</h2>
        </a>

        <div className={`w-full border-t border-zinc-300 flex mt-5 flex-col gap-3 justify-start  text-zinc-500 py-5 text-[10px] lg:p-5 lg:text-xs `}>
          <a href="/feedback" className="hover:text-zinc-700 ">Feedback</a>
          <a href="/privacy" className="hover:text-zinc-700">Privacy Policy</a>
          <a href="/help" className="hover:text-zinc-700">Help</a>

        </div>
      </div>
  )
}

export default SidebarNavigationButtonsSection