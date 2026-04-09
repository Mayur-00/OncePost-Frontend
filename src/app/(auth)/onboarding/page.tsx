'use client'

import LinkedinConnectionSection from "@/components/onboarding/LinkedinConnectionSection";
import XConnectionSection from "@/components/onboarding/XConnectionSection";
import { useUserStore } from "@/stores/user.store";
import { Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const OnboardingPage = () => {
  const {
    getUser,
    user,
    connectedAccounts,
    isFetching,
    handleOnboarding,
  } = useUserStore();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const connectedCount = useMemo(() => {
    return connectedAccounts?.filter(acc => !acc.isExpired).length || 0;
  }, [connectedAccounts]);

  const handleNext = async () => {
    if (connectedCount === 0) {
      toast.error("Please connect at least one account to continue.");
      return;
    }

    setLoading(true);

    const res = await handleOnboarding();

    if (!res.success) {
      toast.error("Failed to proceed");
      setLoading(false);
      return;
    }
    
    toast.success("You're all set 🎉");
    window.location.href="/dashboard";

    setLoading(false);
    return;
  };

  useEffect(() => {
    if (!user) getUser();

    if (user?.isOnboarded) {
      router.replace("/dashboard");
    }
  }, [user]);

  if (isFetching) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <Loader2 className="animate-spin size-10 text-violet-600" />
        <h1 className="text-lg font-medium text-gray-600">
          Preparing your workspace...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 to-white px-6 py-10 flex flex-col">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto w-full mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Connect Your Social Accounts
        </h1>
        <p className="text-gray-600">
          Connect at least one platform to start scheduling and analyzing posts.
        </p>

        {/* Progress */}
        <div className="mt-6 flex items-center gap-2 text-sm">
          <CheckCircle className="size-4 text-green-500" />
          <span>{connectedCount} account(s) connected</span>
        </div>
      </div>

      {/* Social Cards */}
      <div className="flex-1 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <LinkedinConnectionSection />
        <XConnectionSection />
      </div>

      {/* Footer Button */}
      <div className="max-w-5xl mx-auto w-full mt-10 flex justify-end">
        <button
          disabled={loading}
          onClick={handleNext}
          className="px-8 py-3 bg-violet-600  text-white rounded-lg font-medium shadow-md disabled:bg-violet-300 flex items-center justify-center gap-2 transition hover:bg-violet-800 cursor-pointer"
        >
          {loading ?<Loader2 className="animate-spin size-4" />:" Continue"}
         
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;