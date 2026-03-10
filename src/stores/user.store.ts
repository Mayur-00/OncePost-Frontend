import api from "@/lib/axios";
import { ApiResponse, ConnectedAccount, UserObj, UserStore } from "@/types";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  connectedAccounts: null,
  subscriptions:null,
  loading: false,
  isFetching:false,
  profilePictureUpdating: false,
  profileNameUpdating: false,
  profilePicture: "",

  getUser: async () => {
    try {
      set({ isFetching: true });

      const res = await api.get<ApiResponse>("/auth/user");
      const data = res.data;

      if (!data.success) {
        toast.error("Failed To Get User");
        return;
      }

      const usersdata = data.data as UserObj;

      set({
        user: {
          id: usersdata.id,
          name: usersdata.name,
          email: usersdata.email,
          profile_Picture: usersdata.profile_picture,
          createdAt: usersdata.createdAt.toString().split("T")[0],
          isOnboarded:usersdata.isOnboarded
        },
        connectedAccounts: usersdata.connected_accounts.map((acc) => ({
          id: acc.id,
          platform: acc.platform,
          display_name: acc.display_name,
          profile_picture: acc.profile_picture,
          isActive: acc.isActive,
          isExpired: acc.isExpired,
        })),
        subscriptions: usersdata.subscriptions.map((sub) => (
          {
            end_date:sub.end_date.toString().split("T")[0],
            start_date:sub.start_date.toString().split("T")[0],
            post_creation_remaining:sub.post_creation_remaining,
            status:sub.status,
            plan:sub.plan
          }
        ))
      });

      toast.success("User fetched successfully");
    } catch (error) {
      console.log(error);
      toast.error("Api call failed");
    } finally {
      set({ isFetching: false });
    }
  },
  updateProfilePicture: async (imageLink: string) => {
    try {
      set({ profilePictureUpdating: true });

      const res = await api.put("/auth/user", { imageLink });

      if (!res.data.success) {
        toast.error("Failed to update profile picture");
        return;
      }

      const data = res.data.data;

      set((state) => ({
        user: state.user ? { ...state.user, profile_Picture: data.profile_picture } : null,
      }));

      toast.success("Profile picture updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile picture");
    } finally {
      set({ profilePictureUpdating: false });
    }
  },
  updateProfileName: async (name: string) => {
    try {
      set({ profileNameUpdating: true });

      const res = await api.patch("/auth/user", { name });

      if (!res.data.success) {
        toast.error("Failed to update profile name");
        return;
      }

      const data = res.data.data
      

       set((state) => ({
        user: state.user ? { ...state.user, name: data.name } : null,
      }));


      toast.success("Profile name updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile name");
    } finally {
      set({ profileNameUpdating: false });
    }
  },
  deleteAccount: async () => {
    try {

      const res = await api.delete("/auth/user");

      if (!res.data.success) {
        return {
          success:false,
          message:'account deletion failed'
        }
      }

      return {
        success:true,
        message:'account deleted successfully'
      }
    } catch (error) {
      console.log(error);
   
      return {
          success:false,
          message:'account deletion failed'
        }
    }
  },
  uploadImage: async (file) => {
    const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUD_PRESET;

    try {
      set({ profilePictureUpdating: true });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET!);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );

      set({ profilePicture: res.data.secure_url });
      return res.data.secure_url;
    } catch {
      toast.error("Image upload failed");
      return null;
    } finally {
      set({ profilePictureUpdating: false });
    }
  },
  handleOnboarding :async () => {
     try {

      const res = await api.get("/auth/onboarding");

      if (!res.data.success) {
        return {
          success:false,
          message:'onboarding toggle failed'
        }
      }
        toast.success("onboarded success");

      return {
        success:true,
        message:'onboarding toggled successfully'
      }
    } catch (error) {
      toast.success("onboarding failed");
      console.log(error);
   
      return {
          success:false,
          message:'onboarding toggled failed'
        }
    }
  },
}));