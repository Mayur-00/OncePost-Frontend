"use client";

import api from "@/lib/axios";
import { useUserStore } from "@/stores/user.store";
import React, { useEffect, useState } from "react";


declare global {
  interface Window {
    Razorpay: any;
  }
}

interface SubscriptionPlan {
  id: string;
  plan_tier: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
}

const UpgradePage = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<string>("FREE");
  const [loading, setLoading] = useState(true);

  const {user, subscriptions} = useUserStore()

  useEffect(() => {
    const fetchData = async () => {
      const plansRes = await api.get("/subscription/plans");;
      const plansData = await plansRes.data.data;
      console.log(plansData);
      

      setPlans(plansData);
      setCurrentPlan(subscriptions?.[0]?.plan?.plan_tier || '' );
      setLoading(false);
    };

    fetchData();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async (plan: SubscriptionPlan) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    // 1️⃣ Create order from backend
    const orderRes = await api.post("/subscription/create-order", {
     plan_id:plan.id
    });

    const orderData = orderRes.data.data
    console.log(orderData);
    

    if (!orderRes.data.success) {
      alert("Failed to create order");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: "oncePodt",
      description: `Upgrade to ${plan.plan_tier}`,
      order_id: orderData.order.id,
      handler: async function (response: any) {
        // 2️⃣ Send payment response for verification
        console.log('response', response);
        
        const verifyRes = await api.post("/subscription/verify-payment", {
         
            order_id:  response.razorpay_payment_id,
            payment_id: response.razorpay_payment_id,
            payment_signature: response.razorpay_signature,
            transaction_id:orderData.transaction_id
        });

        if (verifyRes.status===200) {
          alert("Payment successful!");
          window.location.replace('/dashboard');
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: user?.name ?? 'unknown',
        email: user?.email ?? '',
      },
      theme: {
        color: "#2563eb",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading plans...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        Choose Your Plan
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.plan_tier;

          return (
            <div
              key={plan.id}
              className={`bg-white p-6 rounded-xl shadow-md border-2 transition ${
                isCurrent
                  ? "border-blue-600 scale-105"
                  : "border-transparent"
              }`}
            >
              <h2 className="text-xl font-bold mb-2">
                {plan.plan_tier}
              </h2>

              <p className="text-3xl font-extrabold mb-4">
                ₹{plan.price}
                <span className="text-sm text-gray-500"> /month</span>
              </p>

              <p className="text-gray-600 mb-4">
                {plan.description}
              </p>

              <ul className="space-y-2 mb-6 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-500">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                disabled={isCurrent}
                onClick={() => handleUpgrade(plan)}
                className={`w-full py-2 rounded-lg font-semibold transition ${
                  isCurrent
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isCurrent ? "Current Plan" : "Upgrade Now"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradePage;