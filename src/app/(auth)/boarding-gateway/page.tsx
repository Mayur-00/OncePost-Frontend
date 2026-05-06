"use client"

import { useUserStore } from '@/stores/user.store';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const GatewayPage = () => {
  const router = useRouter();
  const getUser = useUserStore((state) => state.getUser);
  const user = useUserStore((state) => state.user);
  const isFetching = useUserStore((state) => state.isFetching); 

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (!isFetching && user) {
      if (user.isOnboarded) {
        router.replace("/dashboard");
      } else {
        router.replace("/onboarding");
      }
    } 
    
  }, [user, isFetching, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <Loader2 className="animate-spin size-10 text-violet-600" />
      <h1 className="text-lg font-medium text-gray-600">
        Preparing your workspace...
      </h1>
    </div>
  )
}

export default GatewayPage;