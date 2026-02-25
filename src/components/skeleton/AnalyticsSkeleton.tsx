import React from 'react'

const AnalyticsSkeleton = () => {
  return (
     <section className="w-full min-h-40 grid grid-cols-1 md:grid-cols-3 gap-8 my-10 text-zinc-900">
      
      {/* Card 1 */}
      <div className="group bg-white p-6 rounded-lg  outline outline-zinc-300    shadow-lg 
                      transition: delay-100 animate-out duration-100 ">
        <div className="h-10 w-10 mb-3 bg-zinc-300 animate-pulse rounded-lg"></div>

        <div className=" flex flex-col items-center gap-5 ">
          <div className=" h-5 w-30 bg-zinc-300 rounded-lg animate-pulse ">
    
          </div>
          <div className="h-5 w-60 bg-zinc-300 rounded-lg animate-pulse">
          </div>
        </div>
      </div>
      <div className="group bg-white p-6 rounded-lg  outline outline-zinc-300    shadow-lg 
                      transition: delay-100 animate-out duration-100 ">
        <div className="h-10 w-10 mb-3 bg-zinc-300 animate-pulse rounded-lg"></div>

        <div className=" flex flex-col items-center gap-5 ">
          <div className=" h-5 w-30 bg-zinc-300 rounded-lg animate-pulse ">
    
          </div>
          <div className="h-5 w-60 bg-zinc-300 rounded-lg animate-pulse">
          </div>
        </div>
      </div>
      <div className="group bg-white p-6 rounded-lg  outline outline-zinc-300    shadow-lg 
                      transition: delay-100 animate-out duration-100 ">
        <div className="h-10 w-10 mb-3 bg-zinc-300 animate-pulse rounded-lg"></div>

        <div className=" flex flex-col items-center gap-5 ">
          <div className=" h-5 w-30 bg-zinc-300 rounded-lg animate-pulse ">
    
          </div>
          <div className="h-5 w-60 bg-zinc-300 rounded-lg animate-pulse">
          </div>
        </div>
      </div>

     
    
    

    </section>
  )
}

export default AnalyticsSkeleton