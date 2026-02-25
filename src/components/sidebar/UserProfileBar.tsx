"use client"
import React, { useEffect } from 'react'
import ProfileDropdown from '../ProfileDropdown'
import { useUserStore } from '@/stores/user.store'
import SidebarUserBarSkeleton from '../skeleton/SidebarUserBarSkeleton'

const UserProfileBar = () => {
    const user = useUserStore((state) => state.user); // ✅ Use selector
    const getUser = useUserStore((state) => state.getUser); 
    const isFetching = useUserStore((state) => state.isFetching); 

    useEffect(()=>{
        if(!user){
            getUser();
        }
    }, []);
    
    if(isFetching) return (
      <SidebarUserBarSkeleton/>
    )
  return (


     <div
        className={`w-full h-[8%] flex items-center  gap-2  rounded-md bg-white shadow-lg px-0 justify-center lg:px-2`}
      >
      <a href="/profile">
        <img
          className="h-6 w-6 rounded-sm"
          src={user?.profile_Picture || " /user-placeholder.png"}
          alt="profile_pic"
        /></a>
        <div
          className={`hidden w-full items-center p-1 gap-2 h-full justify-between lg:flex `}
        >
          <div className="flex gap-1 w-full justify-between">
            <h5 className="text-xs text-zinc-900 ">
              {user?.name || "user"}
            </h5>
            <div className=" px-1 bg-violet-200 rounded-sm">
              <p className="text-xs text-violet-700">Free</p>
            </div>
          </div>

          <ProfileDropdown />
        </div>
      </div>
  )
}

export default UserProfileBar