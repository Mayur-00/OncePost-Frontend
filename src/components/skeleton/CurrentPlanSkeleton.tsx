import React from 'react'

const CurrentPlanSkeleton = () => {
  return (
      <section className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-300 w-30 h-30 animate-pulse rounded-md" />
          <h2 className="bg-zinc-300 w-60 h-10 animate-pulse rounded-md"></h2>
        </div>

        <span className="bg-zinc-300 animate-pulse px-3 py-1 rounded-full text-sm font-medium">
   
        </span>
      </div>

      {/* Pricing */}
      <div>
        <p className="bg-zinc-300 w-40 h-10 animate-pulse rounded-md">
         
        </p>

      </div>

      {/* Usage */}
      <div className="space-y-4">

        {/* Post Usage */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className='bg-zinc-300 w-40 h-10 animate-pulse rounded-md'></span>
            
          </div>
          <div className="w-full bg-zinc-300 animate-pulse rounded-full h-2 ">
            
          </div>
        </div>

        {/* Account Usage */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className='bg-zinc-300 w-40 h-10 animate-pulse rounded-md'> </span>
           
          </div>
          <div className="w-full bg-zinc-300 animate-pulse rounded-full h-2">
           
          </div>
        </div>

      </div>

      {/* Features */}
      {/* <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        {plan.features.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-2">
            <CheckCircle size={14} className="text-green-500" />
            {feature}
          </div>
        ))}
      </div> */}

      {/* Action */}
      <div className="flex justify-end">
        <div
        
          className="bg-zinc-300 animate-pulse px-4 py-2 rounded-md"
        >
     
        </div>
      </div>

    </section>
  )
}

export default CurrentPlanSkeleton