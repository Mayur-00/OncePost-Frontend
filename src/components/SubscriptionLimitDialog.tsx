"use client";

import { AlertTriangle, Crown, X, Zap } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  limit: number;
  className?: string;
};

export default function SubscriptionLimitBanner({ limit, className }: Props) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  if (!visible) return null;

  return (
    <div className={cn(
      "w-full bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between animate-in fade-in zoom-in-95 duration-300 relative",
      className
    )}>
      <div className="flex gap-3">
        {/* Animated Icon Container */}
        <div className="relative">
           <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle className="text-red-600" size={20} />
          </div>
          <Zap className="absolute -top-1 -right-1 text-amber-500 fill-amber-500" size={14} />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-bold text-red-900 flex items-center gap-2">
            Monthly Post Limit Reached
          </p>
          <p className="text-xs text-red-700 leading-snug max-w-[300px]">
            You've used all <span className="font-bold">{limit}</span> posts allowed on your current plan.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          onClick={() => router.push("/pricing")}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-violet-600 text-white px-2 py-2 rounded-lg text-xs hover:bg-violet-700 transition-all shadow-md hover:shadow-violet-200 active:scale-95"
        >
          <Crown size={14} />
          UPGRADE NOW
        </button>
        
        <button
          onClick={() => setVisible(false)}
          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors absolute top-0 right-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}