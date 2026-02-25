import React from 'react'

const MiniFooterSkeleton = () => {
  return (
     <div className="h-50 w-[90%] ml-auto bg-white flex flex-col rounded-md gap-3 p-3 shadow-xl">
      
      {/* Header */}
      <div className="w-full pb-2 border-b border-zinc-300 animate-pulse">
        <div className="h-5 w-30 bg-zinc-300 rounded-lg animate-pulse "></div>
        <div className="h-3 w-80 bg-zinc-300 mt-2 rounded-lg animate-pulse "></div>
      </div>

      {/* Insights Items */}
      <div className="flex flex-col gap-2 text-sm">


        <div className="flex justify-between items-center">
          <span className="h-5 w-60 bg-zinc-300 rounded-lg animate-pulse"></span>
          <span className="h-5 w-10 bg-zinc-300 rounded-lg animate-pulse"></span>

        </div>
        <div className="flex justify-between items-center">
          <span className="h-5 w-40 bg-zinc-300 rounded-lg animate-pulse"></span>
          <span className="h-5 w-10 bg-zinc-300 rounded-lg animate-pulse"></span>

        </div>
        <div className="flex justify-between items-center">
          <span className="h-5 w-70 bg-zinc-300 rounded-lg animate-pulse"></span>
          <span className="h-5 w-10 bg-zinc-300 rounded-lg animate-pulse"></span>

        </div>
      

      </div>

    </div>
  )
}

export default MiniFooterSkeleton