import { useUserStore } from "@/stores/user.store";
import { Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import SubscriptionUsageTileSkeleton from "../skeleton/SubscriptionUsageTileSkeleton";
import Link from "next/link";


const SubscriptionUsageTile = () => {
  const router = useRouter();

  const subscriptions = useUserStore((state) => state.subscriptions);
  const isFetching = useUserStore((state) => state.subscriptions);

  if(isFetching && !subscriptions){

    return <SubscriptionUsageTileSkeleton/>
  }

   if(!subscriptions ){
    return (
     <SubscriptionUsageTileSkeleton/>
    )
  }
  const activeSub = subscriptions[0];
  const plan = subscriptions[0].plan;

  const postsUsed = plan.maxPostsPerMonth - activeSub.post_creation_remaining;

  const postUsagePercent = (postsUsed / plan.maxPostsPerMonth) * 100;
  return (
    <div className="bg-white border border-zinc-300 shadow-md h-auto w-full flex flex-col gap-2 p-2 rounded-md">
      <div className="w-full flex justify-between">
        <h1 className="text-violet-700 text-xl font-semibold">{plan.plan_tier}</h1>
        <Link href={"/upgrade"} className="py-1 px-2 bg-violet-500 rounded-md  text-white text-sm flex items-center gap-1">
          <Crown className="size-5 stroke-2" /> <p>Upgrade</p>
        </Link>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-violet-600 h-2 rounded-full"
          style={{ width: `${postUsagePercent }%` }}
        />
      </div>
      <div className="flex justify-between text-sm mb-1 ">
        <span>Posts Used</span>
        <span>
          {postsUsed }/{plan.maxPostsPerMonth }
        </span>
      </div>
    </div>
  );
};

export default SubscriptionUsageTile;
