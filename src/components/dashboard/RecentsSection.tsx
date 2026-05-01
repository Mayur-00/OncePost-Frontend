"use client"
import { usePostStore } from '@/stores/post.store'
import { Linkedin, LinkedinIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import RecentsSkeleton from '../skeleton/RecentsSkeleton'

const RecentsSection = () => {
  const {posts, postsLoading, recentsPost, getPosts} = usePostStore()
   
  useEffect(()=>{
    if(!posts){
    getPosts(10, 0);
    }
  },[])
  
  if(postsLoading) return (<RecentsSkeleton/>)
  return (

      <section className='w-full lg:w-[60%]  h-120 overflow-y-auto flex flex-col bg-white text-black p-5 rounded-md gap-3 outline outline-zinc-300 shadow-xl'>
        <div className='text-xl lg:text-2xl font-bold'><h1>Recents</h1></div>
        
       {
        recentsPost?.map((post)=>(
             <div key={post.id} className='w-100 lg:w-full h-50 lg:h-20 bg-white wrap-break-word whitespace-pre-wrap  leading-relaxed  shadow-lg  rounded-md p-2 flex  gap-2 relative cursor-pointer transition delay-100 duration-100 ease-in-out hover:-translate-y- hover:scale-101'>
           <img src={post.mediaUrl || '/postsPlaceholder.png'} alt="image" className='h-15 w-15 lg:h-15 lg:w-15 rounded-sm outline-1 shadow-lg object-cover'  />
           <div className='flex flex-col gap-3 text-xs lg:text-sm  wrap-break-word whitespace-pre-wrap  leading-relaxed  '>
             <h2>{post.content?.substring(0, 45) + " ... "}</h2>
            <div className='flex gap-3 items-center'>
            {
              post.platform_post? (
                post.platform_post.map((platfom)=>(
                    <div key={platfom.id} className={`h-5 w-10 p-3 flex items-center justify-center rounded-full  ${platfom.platform === 'LINKEDIN'? "bg-blue-600 text-zinc-300 ":"bg-black text-zinc-300 w-10"} outline-zinc-600 text-sm`}>{platfom.platform ==='LINKEDIN' ? (<LinkedinIcon size={20}/>) : 'X'}</div>
                ))
              ) : (
                 post.scheduled_for &&
                post.scheduled_for.map((platfom, idx)=>(
                    <div key={idx} className={`h-5 w-10 p-3 flex items-center justify-center rounded-full  ${platfom === 'LINKEDIN'? "bg-blue-600 text-zinc-300 ":"bg-black text-zinc-300 w-10"} outline-zinc-600 text-sm`}>{platfom ==='LINKEDIN' ? (<LinkedinIcon size={20}/>) : 'X'}</div>
                ))
              )
            }
            <div className={`h-5 w-20 ${post.status === 'UPLOADED' ? 'bg-green-700 text-green-100 ': post.status !=='SCHEDULED' ? 'bg-red-700 text-red-100':'bg-zinc-100 text-zinc-900'} flex items-center justify-center rounded-sm outline text-xs p-3 `}>{post.status}</div>
            {
              post.scheduledAt ? (
                <span className='text-zinc-400 text-xs'>  {`${post.status ==='SCHEDULED'? "Scheduled For" : ''}  ${new Date(post.scheduledAt).toLocaleTimeString('en-us', {hour:'numeric', minute:'2-digit', hour12:true})} : ${new Date(post.scheduledAt).toLocaleDateString()}` }</span>
              ) : (
                <span className='text-zinc-400 text-xs'>{` ${new Date(post.updatedAt).toLocaleTimeString()} : ${new Date(post.updatedAt).toLocaleDateString()}`}</span>
              )
            }
            </div> 
                    
           </div>


        
        </div>
        ))
       }

       {
        posts?.length ===0 && (
        <div className='h-full w-full flex justify-center'>
            <a className='h-8 lg:h-10 w-50 text-sm lg: lg:w-50 flex items-center justify-center rounded-md bg-violet-500 text-violet-50 hover:bg-violet-400 ' href="/create">Create your First Posts Now!</a>
        </div>
    
        )
       }

    </section>

  )
}

export default RecentsSection