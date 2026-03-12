"use client";

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react';

const page = () => {

  return (
    <Suspense fallback= {<div className='h-full w-full flex items-center justify-center'><p className='animate-pulse'>Loading Error</p></div>}>
      <div className='h-full w-full bg-zinc-200 flex items-center justify-center'>
        <div className='h-[50%] w-[70%] bg-red-300 text-red-500 flex items-center justify-center'>
            <Error/>
        </div>
    </div>
    </Suspense>
  )
}

function Error (){
     const params =  useSearchParams();
   const error = params.get('error')
   return <h1 className='text-2xl'>{error}</h1>
}

export default page