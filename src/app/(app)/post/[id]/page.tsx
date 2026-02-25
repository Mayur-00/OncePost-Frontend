"use client"

import { LinkedinIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [post, setPost] = useState(null)
    const params = useParams();
    const {id} = params;
    
  return (
       <>
        <section className='w-full h-full bg-yellow-200'>
          <section className='w-full h-screen grid grid-cols-2 gap-2 p-2'>
            <div className='col-span-1 flex flex-col gap-2 h-120 rounded-md bg-zinc-100 p-2 overflow-y-auto'>
              <span className='flex items-center  h-10 w-full gap-2'><LinkedinIcon className='text-blue-500 size-5'/> <h1 className='font-semibold text-zinc-500 '>Linkedin</h1></span>
              <img src="/postsPlaceholder.png" alt="post-img" className='w-full h-60 object-cover bg-red-200 outline rounded-md' />
              <p className='text-zinc-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus repudiandae a explicabo odio et possimus accusantium fugiat quis. Iste pariatur eligendi quos! Illum eligendi, error minus, sapiente dolore, amet pariatur at sed veniam illo aliquid nisi iure numquam praesentium ab quidem doloribus modi magnam aut?</p>
            </div>
            <div className='col-span-1 h-100 rounded-md bg-zinc-900'>
              
            </div>
          </section>

        </section>
       </>
        
  )
}

export default page