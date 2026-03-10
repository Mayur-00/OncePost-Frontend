"use client"
import React, { useEffect } from 'react'
import ProfileDropdown from '../ProfileDropdown'
import { useUserStore } from '@/stores/user.store'
import SidebarUserBarSkeleton from '../skeleton/SidebarUserBarSkeleton'
import Link from 'next/link'

const UserProfileBar = () => {
    const user = useUserStore((state) => state.user); // ✅ Use selector
    const getUser = useUserStore((state) => state.getUser); 
    const isFetching = useUserStore((state) => state.isFetching); 
    const subscripton = useUserStore((state) => state.subscriptions);

  
    
    if(isFetching) return (
      <SidebarUserBarSkeleton/>
    )
  return (


     <div
        className={`w-full h-[8%] flex items-center  gap-2  rounded-md bg-white shadow-lg px-0 justify-center lg:px-2`}
      >
      <Link href="/settings">
        <img
          className="h-6 w-6 rounded-sm"
          src={user?.profile_Picture || " /user-placeholder.png"}
          alt="profile_pic"
        /></Link>
        <div
          className={`hidden w-full items-center p-1 gap-2 h-full justify-between lg:flex `}
        >
          <div className="flex gap-1 w-full justify-between items-center">
            <h5 className="text-xs text-zinc-900 ">
              {user?.name || "user"}
            </h5>
            <div className="  p-1 bg-violet-200 rounded-sm">
              <p className="text-xs text-violet-700">{subscripton?.[0]?.plan.plan_tier || "none"}</p>
            </div>
          </div>

          <ProfileDropdown />
        </div>
      </div>
  )
}

export default UserProfileBar