'use client'
import { usePostStore } from '@/stores/post.store'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreatePostButton = () => {
    const {postsLoading} = usePostStore()

    if(postsLoading) return (
        <div className='h-8 lg:h-10 rounded-md bg-zinc-300 animate-pulse w-20  lg:w-28  '>
        </div>
    )
  return (
      <Link
              href="/create"
              className="h-8 lg:h-10 text-sm flex items-center justify-center gap-1 px-2 lg:px-4 rounded-md bg-violet-500  text-violet-50 text-md 
    transition-all duration-200 hover:bg-violet-500 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <PlusIcon className='size-5' />
            <p> Create Post</p>
            </Link>
  )
}

export default CreatePostButton