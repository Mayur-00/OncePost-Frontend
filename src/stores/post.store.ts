import api from "@/lib/axios";
import { postsByDate } from "@/lib/utils";
import {
  ApiResponse,
  GetScheduledPostResponse,
  PostsObj,
  PostStore,
} from "@/types";
import axios from "axios";
import { queryObjects } from "v8";
import { create } from "zustand";

export const usePostStore = create<PostStore>((set) => ({
  posts: null,
  recentsPost: null,
  scheduledPostsMap: {},
  selectedPost: null,
  postsLoading: false,
  isSubmiting: false,

  getPosts: async (limit: number, skip: number) => {
    try {
      set({ postsLoading: true });

      const res = await api.get(`/post/all?limit=${limit}&skip=${skip}`);

      const newPosts = res.data.data;

      set({ posts: newPosts });
      console.log("posts retrieved");

      set({ recentsPost: newPosts });
      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      console.log("An Error Occured While Getting Post");
      return {
        success: true,
        message: error,
      };
    } finally {
      set({ postsLoading: false });
    }
  },
  searchPosts: async (
    query: string,
    type: string,
    limit: number,
    skip: number,
  ) => {
    try {
      set({ postsLoading: true });

      const res = await api.get(
        `/post/query?query=${query}&type=${type}&limit=${limit}&skip=${skip}`,
      );

      const newPosts = res.data.data;

      set({ posts: newPosts });
      console.log("Search Query Success");

      if (postMessage.length > 1) {
        set({
          recentsPost: newPosts.sort((a: PostsObj, b: PostsObj) => {
            a.createdAt.getTime() - b.createdAt.getTime();
          }),
        });
      } else {
        set({ recentsPost: newPosts });
      }

      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      console.log("An Error Occured While Searching Post");
      return {
        success: true,
        message: error,
      };
    } finally {
      set({ postsLoading: false });
    }
  },
  createPost: async (data: any) => {
    try {
      set({ isSubmiting: true });

      const res = await api.post<GetScheduledPostResponse>(
        `/post/publish-post`,
        data,
      );

      return {
        success: true,
        message:
          "Post Created Successfully it can take few minutes to publish ",
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
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
                message: error.response.data.message,
              };
            }
          }
        }
      } 
      return {
        success: false,
        message: "Post Creation Failed",
      };
    } finally {
      set({ isSubmiting: false });
    }
  },
  getScheduledPosts: async () => {
    try {
      set({ postsLoading: true });

      const res = await api.get<GetScheduledPostResponse>(`/post/schedule`);

      if (!res.data.success) {
        return {
          success: false,
          message: res.data.message,
        };
      }
      const newmap = postsByDate(res.data.data);

      set({ scheduledPostsMap: newmap });

      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      console.log("An Error Occured While fetching scheduled posts", error);

      return {
        success: false,
        message: "scheduled post fetch failed",
      };
    }
  },
}));
