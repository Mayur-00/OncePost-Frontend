import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'

const ProfileDropdown = () => {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger><Ellipsis className="size-5 hover:text-black cursor-pointer"/></DropdownMenuTrigger>
  <DropdownMenuContent className='bg-white'>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><Link href="/settings">Profile</Link></DropdownMenuItem>
    <DropdownMenuItem variant='destructive'>Logout</DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default ProfileDropdown