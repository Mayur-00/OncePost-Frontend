import React from 'react'

const SidebarUserBarSkeleton = () => {
  return (
     <div
        className={`w-full h-[8%] flex items-center  gap-2  rounded-md bg-zinc-50 animate-pulse shadow-lg px-0 justify-center lg:px-2`}
      >
     
        <div
          className="h-6 w-7 bg-zinc-300 rounded-sm animate-pulse"
        ></div>
        <div
          className={`hidden w-full items-center p-1 gap-2 h-full justify-between lg:flex `}
        >
          <div className="flex gap-1 w-full justify-between">
            <span className="h-3 w-20 bg-zinc-300 rounded-md animate-pulse ">
             
            </span>
            <div className=" h-3 w-7 bg-zinc-300 rounded-sm animate-pulse">
              
            </div>
          </div>

        </div>
      </div>
  )
}

export default SidebarUserBarSkeleton