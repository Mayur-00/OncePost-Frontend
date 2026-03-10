

import { usePostStore } from '@/stores/post.store'
import React from 'react'
import QuickActionsSkeleton from '../skeleton/QuickActionsSkeleton'
import Link from 'next/link'


const QuickActions = () => {
  return (
    <div className='h-60 w-full lg:w-[90%] ml-auto bg-white flex flex-col rounded-md items-center gap-2 p-2 outline-1 outline-zinc-300 shadow-xl'>
        <div className='w-full mb-4 p-2 font-bold'><h1 className='text-xl'>QuickActions</h1></div>
        <Link href='/create' className=' h-5 w-50 md: lg:h-8 lg:w-80 text-sm lg:text-md outline-2 bg-transparent rounded-lg text-zinc-600 hover:bg-zinc-100 cursor-pointer flex items-center justify-center'>Create a post</Link>
        <Link href='/posts' className='h-5 w-50 lg:h-8 lg:w-80 text-sm lg:text-md outline-2 bg-transparent rounded-lg text-zinc-600 hover:bg-zinc-100 cursor-pointer flex items-center justify-center'>View Posts</Link>
        <Link href='/settings' className='h-5 w-50 lg:h-8 lg:w-80 text-sm lg:text-md outline-2 bg-transparent rounded-lg text-zinc-600 hover:bg-zinc-100 cursor-pointer flex items-center justify-center'>View Profile</Link>
    </div>
  )
}

export default QuickActions