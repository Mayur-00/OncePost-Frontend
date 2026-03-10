"use client";

import api from "@/lib/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface SubscriptionPlan {
  id: string;
  plan_tier: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
}

const PricingPage = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const plansRes = await api.get("/subscription/plans");
      const plansData = plansRes.data.data;

      setPlans(plansData);
    } catch (error) {
      setError("Failed to get plans, please retry later...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Loading plans...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="border border-red-400 bg-red-50 rounded-lg p-6 text-center">
          <h1 className="text-red-600 font-semibold mb-2">{error}</h1>

          <Link
            href="/"
            className="text-sm underline text-red-500 hover:text-red-700"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <h1 className="text-3xl font-bold text-center mb-12">
        Choose Your Plan
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          return (
            <div
              key={plan.id}
              className="bg-white p-6 rounded-xl shadow-md border flex flex-col"
            >
              {/* PLAN TITLE */}

              <h2 className="text-xl font-bold mb-2">
                {plan.plan_tier}
              </h2>

              {/* PRICE */}

              <p className="text-3xl font-extrabold mb-4">
                ₹{plan.price}
                <span className="text-sm text-gray-500">
                  {" "}
                  /month
                </span>
              </p>

              {/* DESCRIPTION */}

              <p className="text-gray-600 mb-4">
                {plan.description}
              </p>

              {/* FEATURES */}

              <ul className="space-y-2 text-sm mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-500">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* BUTTON */}

              <Link
                href="/sign-up"
                className="mt-auto w-full text-center py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingPage;