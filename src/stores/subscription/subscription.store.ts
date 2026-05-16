import { create } from "zustand";
import api from "@/lib/axios";
import { SubscriptionState } from "./types";
import { toast } from "sonner";

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  plans: [],
  currentPlan: "FREE",
  currentSubscription: null,
  isFetchingCurrentPlan:false,
  loading: true,
  upgradingPlanId: null,
  error: null,

  fetchCurrentUserSubscription: async () => {
    try {
        set({isFetchingCurrentPlan:true})
      const res = await api.get("/subscription/current");
      if (!res.data.success) toast.error("Failed To Get Current Plan");
      const sub = res.data.data;
      set({
        currentSubscription: {
          id: sub.id,
          plan: sub.plan,
          end_date: sub.end_date,
          start_date: sub.start_date,
          status: sub.status,
          post_creation_remaining:sub.post_creation_remaining   
        },
      });
    } catch (error) {
      toast.error("Failed To Get Current Plan");
    } finally {
        set({isFetchingCurrentPlan:false});
    }
  },
  setUpgradingPlanId: (planId) => set({ upgradingPlanId: planId }),

  fetchPlans: async () => {
    try {
        const currentSub = get().currentSubscription
      set({ error: null });
      const res = await api.get("/subscription/plans");
      const plansData = res.data.data || [];

      const activeTier = currentSub?.plan?.plan_tier || "FREE";

      set({
        plans: plansData,
        currentPlan: activeTier,
        loading: false,
      });
    } catch (err) {
      console.error("Store error fetching plans:", err);
      set({ error: "Failed to load pricing configurations.", loading: false });
    }
  },

  createOrder: async (planId) => {
    set({ upgradingPlanId: planId });
    try {
      const res = await api.post("/subscription/create-order", {
        plan_id: planId,
      });
      if (!res.data.success) throw new Error("Order generation rejected");
      return res.data.data;
    } catch (err) {
      console.error("Store error creating order:", err);
      set({ upgradingPlanId: null });
      throw err;
    }
  },

  verifyPayment: async (payload) => {
    try {
      const res = await api.post("/subscription/verify-payment", payload);
      return res.status === 200;
    } catch (err) {
      console.error("Store error verifying payment:", err);
      set({ upgradingPlanId: null });
      return false;
    }
  },
}));
