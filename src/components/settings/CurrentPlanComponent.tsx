'use client'

import { useRouter } from "next/navigation";
import { Crown, CheckCircle } from "lucide-react";
import { useUserStore } from "@/stores/user.store";
import CurrentPlanSkeleton from "../skeleton/CurrentPlanSkeleton";

const CurrentPlanComponent = () => {
  const router = useRouter();

  const {subscriptions, isFetching} = useUserStore();

  // ✅ Mock Data (remove later when endpoint is ready)
  

  if(!subscriptions && isFetching){
    return <CurrentPlanSkeleton/>
  }
  if(!subscriptions ){
    return (
       <section className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
        <h1>Nothing to show</h1>
       </section>
    )
  }
  const activeSub = subscriptions[0]
  const plan = subscriptions[0].plan;

  const postsUsed =
    plan.maxPostsPerMonth - activeSub.post_creation_remaining;

  const postUsagePercent =
    (postsUsed / plan.maxPostsPerMonth) * 100;


  return (
    <section className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Crown className="text-violet-600" />
          <h2 className="text-xl font-semibold">Current Plan</h2>
        </div>

        <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
          {plan.plan_tier}
        </span>
      </div>

      {/* Pricing */}
      <div>
        <p className="text-2xl font-bold">
          ₹{plan.price}
          <span className="text-sm font-normal text-gray-500">
            {" "} / month
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Renews on {new Date(activeSub.end_date).toDateString()}
        </p>
      </div>

      {/* Usage */}
      <div className="space-y-4">

        {/* Post Usage */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Posts Used</span>
            <span>
              {postsUsed}/{plan.maxPostsPerMonth}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-violet-600 h-2 rounded-full"
              style={{ width: `${postUsagePercent}%` }}
            />
          </div>
        </div>

        {/* Account Usage */}
        {/* <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Connected Accounts</span>
            <span>
              {accountsUsed}/{plan.maxSocialAccounts}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${accountUsagePercent}%` }}
            />
          </div>
        </div> */}

      </div>

      {/* Features */}
      {/* <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        {plan.features.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-2">
            <CheckCircle size={14} className="text-green-500" />
            {feature}
          </div>
        ))}
      </div> */}

      {/* Action */}
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/upgrade")}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md"
        >
          Upgrade Plan
        </button>
      </div>

    </section>
  );
};

export default CurrentPlanComponent;