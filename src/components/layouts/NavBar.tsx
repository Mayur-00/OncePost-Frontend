import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const NavBar = () => {
  return (
    <header className='w-full h-15 bg-white/50 shadow-xl   backdrop-blur-2xl flex  justify-between p-5 border-b border-white text-zinc-700 sticky top-0'>
        <nav className='h-full  flex items-center justify-center '>
            <h1 className='font-bold'>OncePost</h1>
        </nav>

        <nav className='h-full   flex items-center gap-5'>
            <a href='/home' className='py-2 px-10 hover:bg-white bg-zinc-white outline-1 rounded-sm  animate-in transition-colors '>Home</a>
            <a className='py-2 px-10 hover:bg-white  bg-zinc-100 outline-1 rounded-sm  animate-in transition-colors '>Posts</a>
            <a className='py-2 px-10 hover:bg-white  bg-zinc-100 outline-1 rounded-sm  transition delay-75 animate-in duration-300 '>Settings</a>

        </nav>

        <nav className='h-full flex items-center justify-center '>
          <Avatar >
            <AvatarImage src={'/robert.jpg'} alt='avatar'/>
             <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </nav>

    </header>
  )
}

export default NavBar