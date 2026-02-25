import React from 'react'

const QuickActionsSkeleton = () => {
  return (
      <div className='h-60 w-[90%] ml-auto bg-white flex flex-col rounded-md items-center gap-2 p-2 outline-1 outline-zinc-300 shadow-xl animate-pulse'>
        <div className='w-full mb-4 p-2 font-bold'><div className='h-5 w-40 bg-zinc-300 rounded-lg animate-pulse'></div></div>
        <div  className='h-7 w-80  bg-zinc-300 rounded-lg animate-pulse'></div>
        <div  className='h-7 w-80  bg-zinc-300 rounded-lg animate-pulse'></div>
        <div  className='h-7 w-80  bg-zinc-300 rounded-lg animate-pulse'></div>
      
        
      
       

    </div>
  )
}

export default QuickActionsSkeleton