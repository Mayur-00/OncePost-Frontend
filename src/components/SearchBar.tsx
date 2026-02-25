import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='h-50 w-full bg-white flex'>
        <input type="text"  className='h-30 w-[80%] outline-zinc-900'/>
        <button className='py-2 px-3 bg-violet-700'><Search/></button>
    </div>
  )
}

export default SearchBar