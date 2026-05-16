 export interface SubscriptionPlan {
  id: string;
  plan_tier: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  maxPostsPerMonth: number;
}

 export interface UserSubscription {
  id: string;
  status: string;
  start_date: string;
  end_date: string;
  post_creation_remaining:number
  plan: SubscriptionPlan;
}

export interface SubscriptionState {
  plans: SubscriptionPlan[];
  currentPlan: string;
  currentSubscription:UserSubscription | null;
  isFetchingCurrentPlan:boolean;
  loading: boolean;
  upgradingPlanId: string | null;
  error: string | null;
  
  // Actions
  fetchCurrentUserSubscription: () => Promise<void>;
  fetchPlans: () => Promise<void>;
  createOrder: (planId: string) => Promise<any>;
  verifyPayment: (payload: {
    order_id: string;
    payment_id: string;
    payment_signature: string;
    transaction_id: string;
  }) => Promise<boolean>;
  setUpgradingPlanId: (planId: string | null) => void;
};