"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { CameraIcon, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { useUserStore } from "@/stores/user.store";
import SettingsUserInfoSkeleton from "../skeleton/SettingsUserInfoSkeleton";

const UserInfoBar = () => {
  const [name, setName] = useState<string | undefined>("");

  const {
    profilePicture,
    profileNameUpdating,
    profilePictureUpdating,
    uploadImage,
    updateProfilePicture,
    updateProfileName,
    user,
    getUser,
    isFetching
  } = useUserStore();

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUD_PRESET;

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

   const res = await uploadImage(file);
    
   if(res){
     updateProfilePicture(res);
   }
  };

  const handleNameChange = async ()=> {
    try {
      if(!name?.trim()){
        toast.error('please enter a name to before submiting');
        return
      };
      if(name.length > 15 ){
        toast.error('name length cannot be greater than 15 chars');
        return
      };

     await updateProfileName(name);

     setName('');

    } catch (error) {
      toast.error("Failed to Update Name");
      return
    };
  }

  if(isFetching) return (
    <SettingsUserInfoSkeleton/>
  )

  return (
    <section className="bg-white w-full h-80 rounded-md shadow-md p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <User />
        <h2 className="text-lg font-semibold">Account Information</h2>
      </div>

      <div className="flex w-full items-center gap-5 lg:gap-10">
        <div className="h-30 w-35 lg:h-28 lg:w-28 relative">
          <img
            src={ user?.profile_Picture || "user-placeholder.png"}
            alt="Profile"
            className={`h-full w-full rounded-lg border shadow-md object-cover col-span-1 ${profilePictureUpdating ? "animate-pulse" : "animate-none"}`}
          />

          <label className="h-8 w-8 lg:h-10 lg:w-10 bg-violet-700 absolute -top-4 p-2 -right-3 flex items-center justify-center rounded-full text-white">
            <input
              disabled={profilePictureUpdating}
              type="file"
              hidden
              onChange={handleFileSelect}
            />
            <CameraIcon />
          </label>
        </div>

        <div className="w-75  flex flex-col items-center lg:flex-row gap-2">
          <input
            type="text"
            placeholder={user?.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-40 h-8 lg:w-80 lg:h-10 border rounded-md px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-violet-400"
          />

          <input
            type="email"
            disabled
            value={user?.email || 'unknown'}
            className="w-40 h-8  lg:w-80 lg:h-10 border rounded-md px-3 py-2 mt-1 bg-gray-100 text-zinc-500 cursor-not-allowed"
          />

          <button
            disabled={profileNameUpdating}
            onClick={handleNameChange}
            className="h-10  bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md"
          >
            {profileNameUpdating ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserInfoBar;
