import { create } from "zustand";
import { SchedulePostApiResponseType, SchedulerStore } from "./types";
import { postsByDate } from "@/lib/utils";
import { GetScheduledPostResponse } from "@/types";
import api from "@/lib/axios";
import axios from "axios";

export const useSchedulerStore = create<SchedulerStore>((set) => ({
  selectedPost: null,
  selectedDate: null,
  scheduledPostsMap: {},
  isFetching: false,
  submiting: false,

  getScheduledPosts: async () => {
    try {
      set({ isFetching: true });

      const res = await api.get<GetScheduledPostResponse>(`/post/schedule`);

      if (!res.data.success) {
        return {
          success: false,
          message: res.data.message,
        };
      } 
      const newmap = postsByDate(res.data.data);
      console.log(newmap);
      

      set({ scheduledPostsMap: newmap });

      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      console.log("An Error Occured While fetching scheduled posts");

      return {
        success: false,
        message: "scheduled post fetch failed",
      };
    } finally {
      set({ isFetching: false });
    }
  },

  schedulePost: async (data) => {
    try {
      const res = await api.post<SchedulePostApiResponseType>(
        "/post/schedule",data);

      if (!res.data.success) {
        return {
          success: false,
          message: res.data.message,
        };
      }
      const post = res.data.data;

      const d = new Date(post.scheduledAt);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

      set((state) => {
        const existingPost = state.scheduledPostsMap[key] || [];

        return {
          scheduledPostsMap: {
            ...state.scheduledPostsMap,
            [key]: [...existingPost, { ...post, _date: d }],
          },
        };
      });

      
      return {
        success: true,
        message: "post created successfull",
      };
    } catch (error) {
     if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data.error_code);
          switch (error.response.data.error_code) {
            case "LINKEDIN_ACCOUNT_EXPIRED": {
              return {
                success: false,
                message: "LINKEDIN_ACCOUNT_EXPIRED",
              };
            }
            case "X_ACCOUNT_EXPIRED": {
              return {
                success: false,
                message: "X_ACCOUNT_EXPIRED",
              };
            }

            default: {
              return {
                success: false,
                message: "Failed To Schedule Post",
              };
            }
          }
        }
      } 

        return {
        success: false,
        message: "Failed To Schedule Post"
      };
    }
  },
}));
