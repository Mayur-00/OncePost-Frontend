
'use client'
import { usePostStore } from "@/stores/post.store";
import { useUserStore } from "@/stores/user.store";
import React from "react";
import AnalyticsSkeleton from "../skeleton/AnalyticsSkeleton";
import { useSchedulerStore } from "@/stores/scheduler/scheduler.store";


const AnalyticsSection = () => {
   const posts = usePostStore((state) => state.posts)
   const postsLoading = usePostStore((state) => state.postsLoading)
   const connectedAccounts = useUserStore((state) => state.connectedAccounts);
   const scheduledPostsMap = useSchedulerStore((state)=>state.scheduledPostsMap)

   if (postsLoading){ return(<AnalyticsSkeleton/>) }else {
    return (
    <section className="w-full h-full lg:min-h-40 grid grid-cols-1  md:grid-cols-3 gap-8 my-5 lg:my-10 text-zinc-900">
      
      {/* Card 1 */}
      <div className="group bg-white p-6 rounded-lg  outline outline-zinc-300 shadow-lg transition-all duration-200 
                      hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
        <div className="text-3xl mb-3">📚</div>

        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-tight group-hover:text-zinc-800">
            {posts?.length || '0'}
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Total Posts
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="group bg-white p-6 rounded-lg  outline outline-zinc-300  shadow-lg transition-all duration-200 
                      hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
        <div className="text-3xl mb-3">📆</div>

        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-tight group-hover:text-zinc-800">
            {Object.keys(scheduledPostsMap || {}).length || '0'}
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Scheduled Posts
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="group bg-white p-6 outline outline-zinc-300 rounded-lg shadow-lg transition-all duration-200 
                      hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
        <div className="text-3xl mb-3">📱</div>

        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-tight group-hover:text-zinc-800">
            {connectedAccounts?.length || '0'}
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Connected Accounts
          </p>
        </div>
      </div>

    </section>
  );
   }
  
};

export default AnalyticsSection;
