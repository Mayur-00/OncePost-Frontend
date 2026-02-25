import React from 'react'

const ConnectedAccountsSkeleton = () => {
  return (
     <section className="bg-white rounded-md shadow-md p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className='h-5 w-8 bg-zinc-300 rounded-md animate-pulse'></div>
          <span className="h-5 w-30 bg-zinc-300 rounded-md animate-pulse"></span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-zinc-100 animate-pulse rounded-md p-4">
            <div className="flex items-center gap-3">
              <div className='h-10 w-10 rounded-md bg-zinc-300 animate-pulse'></div>
                <span className='h-5 w-30 lg:w-60 bg-zinc-300 rounded-md animate-pulse'></span>
            </div>
           
               <span className="h-8 w-20 bg-zinc-300 rounded-md animate-pulse"></span>
          
          </div>

          <div className="flex items-center justify-between bg-zinc-100 animate-pulse rounded-md p-4">
            <div className="flex items-center gap-3">
              <div className='h-10 w-10 rounded-md bg-zinc-300 animate-pulse'></div>
              <span className='h-5 w-30 lg:w-60 bg-zinc-300 rounded-md animate-pulse'></span>
            </div>
          <span className="h-8 w-20 bg-zinc-300 rounded-md animate-pulse"></span>
          </div>
        </div>
      </section>
  )
}

export default ConnectedAccountsSkeleton