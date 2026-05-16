'use client'

import MobileSidebar from "@/components/layouts/MobileSidebar";
import SideBar from "@/components/layouts/SideBar";
import { useSubscriptionStore } from "@/stores/subscription/subscription.store";
import { useUserStore } from "@/stores/user.store";
import { useEffect, useRef } from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1️⃣ Safe Selector Strategy: Pull actions and state cleanly
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);
  const fetchCurrentUserSubscription = useSubscriptionStore((state) => state.fetchCurrentUserSubscription);

  // 2️⃣ Use a ref flag to prevent duplicate sync loops during the same mount lifecycle
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const syncAccountData = async () => {
      if (!user) {
        await getUser();
      }
      await fetchCurrentUserSubscription();
    };

    syncAccountData();
  }, [getUser, fetchCurrentUserSubscription]); // Removed 'user' dependency to stop cascade triggers

  return (
    <main className="h-screen w-screen flex overflow-y-auto relative">
      <SideBar />
      <MobileSidebar />
      <section className="w-full p-4 lg:p-6 mt-15 lg:m-0 flex flex-col gap-6 overflow-y-auto">
        {children}
      </section>
      <Toaster position="bottom-right" />
    </main>
  );
}