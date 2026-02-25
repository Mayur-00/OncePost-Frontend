import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
   const params =  useSearchParams();
   const error = params.get('error')
  return (
    <div className='h-full w-full bg-zinc-200 flex items-center justify-center'>
        <div className='h-[50%] w-[70%] bg-red-300 text-red-500 flex items-center justify-center'>
            <h1 className='text-2xl'>{error}</h1>
        </div>
    </div>
  )
}

export default page