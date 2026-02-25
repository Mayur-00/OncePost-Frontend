'use client'

import { usePostStore } from "@/stores/post.store";
import React from "react";
import MiniFooterSkeleton from "../skeleton/MiniFooterSkeleton";

const MiniFooter = () => {

  const {postsLoading, scheduledPosts, posts} = usePostStore();

  if(postsLoading) {
    return <MiniFooterSkeleton/>
  }
  return (
    <div className="h-50 w-full lg:w-[90%] ml-auto bg-white flex flex-col rounded-md gap-3 p-3 shadow-xl">
      
      {/* Header */}
      <div className="w-full pb-2 border-b">
        <h1 className="text-xl font-semibold">Insights</h1>
        <p className="text-sm text-gray-500">Your posting performance at a glance</p>
      </div>

      {/* Insights Items */}
      <div className="flex flex-col gap-2 text-sm">

        <div className="flex justify-between items-center">
          <span className="text-gray-600  transition delay-75 animate-in duration-75 hover:scale-101 hover:text-zinc-900 hover:font-bold cursor-context-menu">Posts this week</span>
          <span className="font-semibold">{posts?.length || '0'}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600  transition delay-75 animate-in duration-75 hover:scale-101 hover:text-zinc-900 hover:font-bold cursor-context-menu">Scheduled posts</span>
          <span className="font-semibold">{scheduledPosts?.length || "0"}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600  transition delay-75 animate-in duration-75 hover:scale-101 hover:text-zinc-900 hover:font-bold cursor-context-menu">Failed posts</span>
          <span className="font-semibold text-red-500">0</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600  transition delay-75 animate-in duration-75 hover:scale-101 hover:text-zinc-900 hover:font-bold cursor-context-menu">Best posting time</span>
          <span className="font-semibold">9–11 AM</span>
        </div>

      </div>

    </div>
  );
};

export default MiniFooter;
