import api from "@/lib/axios";
import { PostsObj, PostStore } from "@/types";
import { queryObjects } from "v8";
import { create } from "zustand";

export const usePostStore = create<PostStore>((set) => ({
  posts: null,
  recentsPost: null,
  scheduledPosts: null,
  selectedPost: null,
  postsLoading: false,
  isSubmiting: false,

  getPosts: async (limit: number, skip: number) => {
    try {
      set({ postsLoading: true });

      const res = await api.get(`/post/all?limit=${limit}&skip=${skip}`);

      const newPosts = res.data.data;

      set({ posts: newPosts });
      console.log(newPosts);


      set({ recentsPost: newPosts });
        set({
          scheduledPosts: newPosts.filter(function (post: PostsObj) {
            return post.status === "SCHEDULED"
          }),
        });

      

      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      console.log("error in the getPosts function", error);
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
      console.log(newPosts);

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
      console.log("error in the getPosts function", error);
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

      const res = await api.post(`/post/publish-post`, data);

      return {
        success: true,
        message:
          "Post Created Successfully it can take few minutes to publish ",
      };
    } catch (error) {
      console.log("api call failed for post creation :", error);

      return {
        success: false,
        message: "Post Creation Failed",
      };
    } finally {
      set({ isSubmiting: false });
    }
  },
}));
