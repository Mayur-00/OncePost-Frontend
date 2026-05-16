"use client";

import  { useEffect, useState } from "react";
import Script from "next/script";
import { useUserStore } from "@/stores/user.store";
import { useSubscriptionStore } from "@/stores/subscription/subscription.store";
import { toast } from "sonner";

const UpgradePage = () => {
  const { user } = useUserStore();
  const [sdkReady, setSdkReady] = useState(false);

  const {
    plans,
    currentPlan,
    loading,
    upgradingPlanId,
    error,
    fetchPlans,
    createOrder,
    verifyPayment,
    setUpgradingPlanId,
  } = useSubscriptionStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleUpgrade = async (plan: any) => {
    if (!sdkReady || typeof (window as any).Razorpay === "undefined") {
      toast.error("Payment gateway is initializing. Please try again.");
      return;
    }

    try {
      // 1️⃣ Initialize order via centralized action
      const orderData = await createOrder(plan.id);

      // 2️⃣ Open Razorpay Frame
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: process.env.NEXT_PUBLIC_APP_NAME || "CrossPost",
        description: `Upgrade to ${plan.plan_tier}`,
        order_id: orderData.order.id,
        prefill: {
          name: user?.name ?? "",
          email: user?.email ?? "",
        },
        theme: { color: "#2563eb" },
        handler: async function (response: any) {
          // 3️⃣ Verify payment via store action
          const isVerified = await verifyPayment({
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            payment_signature: response.razorpay_signature,
            transaction_id: orderData.transaction_id,
          });

          if (isVerified) {
            window.location.replace("/dashboard");
          } else {
            toast.error("Payment verification failed. Please check your bank.");
          }
        },
        modal: {
          ondismiss: function () {
            setUpgradingPlanId(null);
          },
        },
      };

      const razor = new (window as any).Razorpay (options);
      razor.open();
    } catch (err) {
      alert("Could not initialize transaction. Please try again.");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading plans...</div>;
  if (error) return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setSdkReady(true)}
      />

      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">Choose Your Plan</h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.plan_tier;
          const isProcessingThis = upgradingPlanId === plan.id;
          const isAnyProcessing = upgradingPlanId !== null;

          return (
            <div
              key={plan.id}
              className={`bg-white p-6 rounded-xl shadow-md border-2 ${
                isCurrent ? "border-blue-600 scale-105" : "border-transparent"
              }`}
            >
              <h2 className="text-xl font-bold mb-2">{plan.plan_tier}</h2>
              <p className="text-3xl font-extrabold mb-4">₹{plan.price}<span className="text-sm font-normal text-gray-500"> /month</span></p>
              <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>

              <ul className="space-y-3 mb-8 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-500">✔</span> {feature}
                  </li>
                ))}
              </ul>

              <button
                disabled={isCurrent || isAnyProcessing}
                onClick={() => handleUpgrade(plan)}
                className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                  isCurrent
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : isProcessingThis
                    ? "bg-blue-400 text-white cursor-wait"
                    : isAnyProcessing
                    ? "bg-blue-200 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isCurrent ? "Current Plan" : isProcessingThis ? "Processing..." : "Upgrade Now"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradePage;