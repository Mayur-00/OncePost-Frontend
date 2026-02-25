"use client"

import { useUserStore } from '@/stores/user.store';
import { LayoutGrid } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react'

interface prop {
    path:string;
    title:string
}

const SideBarButton:React.FC<prop> = ({path,title})=> {
    const pathname = usePathname();

    const {sidebar} = useUserStore()
  return (
      <a href={`/${path}`}
          className={`h-[10%] text-[15px] rounded-sm font-normal flex items-center gap-2 cursor-pointer ${sidebar?'px-4':'justify-center p-0'}  ${
            pathname === path
              ? "bg-violet-500/90 text-white hover:bg-violet-500/80"
              : "bg-transparent hover:bg-white "
          }`}
        >
          <LayoutGrid className="size-5 stroke-2" />
          <h2 className={`${sidebar?'block':'hidden'}`}>Dashboard</h2>
        </a>
  )
}

export default SideBarButton