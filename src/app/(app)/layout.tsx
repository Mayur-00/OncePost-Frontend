'use client'

import MobileSidebar from "@/components/layouts/MobileSidebar";
import SideBar from "@/components/layouts/SideBar";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const getUser = useUserStore((state) => state.getUser);
  const user = useUserStore((state) => state.user);

  const router = useRouter();

  // 1️⃣ Fetch user if not present
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  // 2️⃣ Redirect if not onboarded
  useEffect(() => {
    if (user && !user.isOnboarded) {
      console.log('user is not onboarded');
      router.push('/onboarding');
    }
  }, [user, router]);

  return (
    <main className="h-screen w-screen flex overflow-y-auto relative">
      <SideBar/>
      <MobileSidebar/>
      <section className="w-full p-4 lg:p-6 mt-15 lg:m-0 flex flex-col gap-6 overflow-y-auto">
        {children}
      </section>
      <Toaster position="bottom-right"/>
    </main>
  );
}