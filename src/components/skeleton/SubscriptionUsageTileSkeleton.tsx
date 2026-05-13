
import { Crown } from "lucide-react";


const SubscriptionUsageTileSkeleton = () => {
  
  return (
    <div className="bg-white border border-zinc-300 shadow-md h-auto w-full flex flex-col gap-2 p-2 rounded-md animate-pulse">
      <div className="w-full flex justify-between">
        <span className="h-6  w-25 bg-zinc-300 rounded-md animate-pulse"></span>
        <button className="h-8 w-20 bg-zinc-300 rounded-md ">
          
        </button>
      </div>
      <div className="w-full bg-zinc-300 rounded-full h-2 animate-pulse">
        
      </div>
      <div className="flex justify-between text-sm mb-1 ">
        <span className="h-5 w-20 bg-zinc-300 rounded-md animate-pulse"></span>
        <span className="h-5 w-10 bg-zinc-300 animate-pulse rounded-md">
          
        </span>
      </div>
    </div>
  );
};

export default SubscriptionUsageTileSkeleton;
