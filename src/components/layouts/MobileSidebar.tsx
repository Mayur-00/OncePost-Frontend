import { CogIcon, File, Home, User } from 'lucide-react'
import React from 'react'
import MobileSidebarNavigationSection from '../mobile-sidebar/MobileSidebarNavigationSection'


const MobileSidebar = () => {
  console.log('sidebar 2')
  return (
    <aside className='w-full h-15  bg-gray-50 flex justify-center md:hidden absolute z-50 outline-[1px] outline-zinc-200 '>
        <MobileSidebarNavigationSection/>
        
    </aside>
  )
}

export default MobileSidebar