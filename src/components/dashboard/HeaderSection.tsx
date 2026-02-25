import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CreatePostButton from './CreatePostButton'

const HeaderSection = () => {
  return (
     <section className="w-full flex flex-col gap-3 lg:flex-row  items-center justify-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Welcome back 👋</h1>
              <p className="text-xs lg:text-sm text-zinc-600 mt-1">
                Here’s what’s happening with your posts today
              </p>
            </div>

          <CreatePostButton/>
          </section>
  )
}

export default HeaderSection