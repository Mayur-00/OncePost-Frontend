"use client";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import HeaderSection from "@/components/dashboard/HeaderSection";
import MiniFooter from "@/components/dashboard/MiniFooter";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentsSection from "@/components/dashboard/RecentsSection";
import SubscriptionUsageTile from "@/components/dashboard/SubscriptionUsageTile";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  // 2️⃣ Redirect if not onboarded
  useEffect(() => {
    if (user && !user.isOnboarded) {
      console.log("user is not onboarded");
      router.replace("/onboarding");
    }
  }, [user, router]);

  return (
    <>
      <HeaderSection /> 
      <SubscriptionUsageTile />
      <AnalyticsSection />
      <section className="h-auto w-full flex flex-col lg:flex-row my-5  p-0 lg:p-5 rounded-md gap-5 lg:gap-0 bg-gray-50 shadow-lg  ">
        <RecentsSection />
        <section className="w-full lg:w-[40%] mx-auto h-auto flex flex-col gap-5 lg:gap-5 ">
          <QuickActions />
          <MiniFooter />
        </section>
      </section>
    </>
  );
}
