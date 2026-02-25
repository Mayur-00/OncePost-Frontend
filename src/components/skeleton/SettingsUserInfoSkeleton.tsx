import { User } from 'lucide-react'
import React from 'react'

const SettingsUserInfoSkeleton = () => {
  return (
       <section className="bg-white w-full h-80 rounded-md shadow-md p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3 ">
        <User />
        <h2 className="text-lg font-semibold">Account Information</h2>
      </div>

      <div className="flex w-full items-center  gap-10 ">
        <div className="h-30 w-35  lg:h-28 lg:w-28 relative bg-zinc-300 rounded-lg animate-pulse">
        </div>

        <div className="  flex flex-col items-center lg:flex-row gap-2">
          <span
            className="w-40 h-8 lg:w-60 lg:h-10  rounded-md mt-1 outline-none bg-zinc-300 animate-pulse"
          ></span>

            <span
            className="w-40 h-8 lg:w-60 lg:h-10  rounded-md mt-1 outline-none bg-zinc-300 animate-pulse"
          ></span>

          <button
            className="h-10 w-30 px-4 py-2 mt-1 bg-zinc-300 rounded-md animate-pulse"
          >
          </button>
        </div>
      </div>
    </section>
  )
}

export default SettingsUserInfoSkeleton