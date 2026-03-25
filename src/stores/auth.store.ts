"use client";

import api from "@/lib/axios";
import { loginUserData, registerUserData } from "@/schema/auth.schema";
import { ApiResponse } from "@/types";
import { AxiosError } from "axios";
import { create } from "zustand";

type AuthState = {
  loading: boolean;

  googleAuthSuccess: (token: string) => Promise<response>;
  registerUser: (data: registerUserData) => Promise<response>;
  loginUser: (data: loginUserData) => Promise<response>;
};

type response = {
  success: boolean;
  message: string;
  code?:string;
};

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,

  googleAuthSuccess: async (token: string) => {
    try {
      const result = await api.post<ApiResponse>("/auth/google", {
        token: token,
      });

      if (!result.data.success) {
        return { success: false, message: "sign in failed api" };
      }
      return { success: true, message: "sign in success" };
    } catch (error) {
      console.log("failed to verify G auth token");
      return { success: false, message: "sign in failed" };
    }
  },

  registerUser: async (data) => {
    try {
      set({ loading: true });
      const result = await api.post<ApiResponse>("auth/register", data);

      if (!result.data.success) {
        return { success: false, message: "sign in failed api" };
      }

      console.log("server call failed while registering user");

      return { success: true, message: "sign in success" };
    } catch (error) {
      console.log("server call failed while registering user");

      return { success: false, message: "sign in failed api" };
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async (data) => {
    try {
      set({ loading: true });

      await api.post("/auth/login", data);

      console.log("api call success, login user");

      return { success: true, message: "sign in success" };
    } catch (error) {
      console.log("api call failed : ", error);

      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
        return { success: false, message: error.response?.data.message, code:error.response?.data.error_code};
      }

      return { success: false, message: "sign in failed" };
    } finally {
      set({ loading: false });
    }
  },
}));
