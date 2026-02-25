"use client";

import { useState, ChangeEvent } from "react";
import {
  Upload,
  Send,
  Loader2,
  X,
  SendHorizontalIcon,
  ArrowRightIcon,
  CheckCheckIcon,
  CheckIcon,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PostPreview from "@/components/PostPreview";
import { useUserStore } from "@/stores/user.store";
import { usePostStore } from "@/stores/post.store";

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [UploadedImage, setUploadedImage] = useState<any>();
  const [uploading, setUploading] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const [wantToSchedule, setWantToSchedule] = useState(false);
  const [ScheduleTime, setScheduleTime] = useState<Date | null>(null)

  const router = useRouter();

  const { createPost, isSubmiting } = usePostStore();
  const { connectedAccounts } = useUserStore();

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

    setMediaType(file.type);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET!);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );

      setUploadedImage({
        url: res.data.secure_url,
      });
      setImagePreview(res.data.secure_url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform],
    );
  };


  const handlePost = async () => {
    if (!content.trim() && !UploadedImage) {
      toast.error("Add content or image");
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error("Select at least one platform");
      return;
    };

      const formData = new FormData();
      formData.append("content", content);
      selectedPlatforms.forEach((platform) =>
        formData.append("platforms[]", platform),
      );

      if (UploadedImage) {
        formData.append("imageLink", UploadedImage.url);
        formData.append("imageMimeType", mediaType);
      }

    if (wantToSchedule) {
      if(!ScheduleTime){
        toast.error('Please Select Valid Date & Time');
        return;
      }

      if(ScheduleTime.getTime()<= Date.now()){
          toast.error('Please Select Future Date & Time');
        return;
      };

      formData.append("scheduledDateAndTime", ScheduleTime.toISOString());

      const response = await createPost(formData);

      if (!response.success) {
        toast.error(response.message);
      }

      toast.success(response.message);

      router.replace("/dashboard");

    } else {
    

      const response = await createPost(formData);

      if (!response.success) {
        toast.error(response.message);
      }

      toast.success(response.message);

      router.replace("/dashboard");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold">Create Post</h1>
        <p className="text-sm text-zinc-600 mt-1">
          Write once, publish everywhere
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT — CREATE FORM */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-xl p-6 flex flex-col gap-6">
          {/* Platforms */}
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between border rounded-md p-4">
              <div className="flex items-center gap-3">
                <Linkedin />
                <span>LinkedIn</span>
              </div>
              {linkedinConnected ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <LinkedinConnectbutton />
              )}
            </div>

            <div className="flex items-center justify-between border rounded-md p-4">
              <div className="flex items-center gap-3">
                <Twitter />
                <span>X (Twitter)</span>
              </div>
              {xConnected ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XConnectButton />
              )}
            </div>
          </div> */}

          {/* Textarea */}
          <textarea
            value={content}
            disabled={isSubmiting}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What do you want to share?"
            className="w-full h-36 border rounded-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Image */}
          {!imagePreview ? (
            <label className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer">
              {uploading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                <>
                  <Upload className="mx-auto mb-2" />
                  <p>Upload image</p>
                </>
              )}
              <input
                type="file"
                hidden
                disabled={uploading}
                onChange={handleFileSelect}
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                className="rounded-md max-h-80 object-cover w-full"
              />
              <button
                disabled={isSubmiting}
                onClick={() => {
                  setImagePreview(null);
                  setUploadedImage(null);
                }}
                className="absolute top-2 right-2 bg-black text-white p-1 rounded-full"
              >
                <X />
              </button>
            </div>
          )}

          {/* Platform select */}
          <div className="flex gap-6">
            {connectedAccounts &&
              connectedAccounts.map((platform) => (
                <label
                  key={platform.id}
                  className={`flex items-center gap-2 cursor-pointer  py-1 px-2 rounded outline-1  ${platform.platform === "LINKEDIN" ? "bg-blue-500 text-blue-50 outline-black hover:bg-blue-600" : "bg-black text-zinc-100 outline-zinc-100 hover:bg-zinc-800"}`}
                >
                  <input
                    type="checkbox"
                    disabled={isSubmiting}
                    checked={selectedPlatforms.includes(platform.platform)}
                    onChange={() => togglePlatform(platform.platform)}
                    className="hidden"
                  />
                  {platform.platform.toLowerCase()}

                  {selectedPlatforms.includes(platform.platform) && (
                    <CheckIcon className="size-5 " />
                  )}
                </label>
              ))}
            {connectedAccounts?.length === 0 && (
              <div className="h-auto w-full flex items-center  p-2   gap-10 ">
                <p className="text-red-400">
                  Please connect your social media accounts to procced
                </p>
                <a
                  className="bg-zinc-800 text-zinc-100 px-4 py-1 rounded-md cursor-pointer transition delay-100  hover:bg-zinc-900 hover:scale-y-105 shadow "
                  href="/settings"
                >
                  Settings
                </a>
              </div>
            )}
          </div>

          <div>
            <label className="flex  text-sm gap-2">
              <input type="checkbox"
              checked={wantToSchedule}
              onChange={()=> setWantToSchedule(!wantToSchedule)}
               />
              <p>Want To Schedule This Post For Some Other Time ?</p>
            </label>

            {
              wantToSchedule && (
                <input type="datetime-local" placeholder="Select Date & Time"  onChange={(e)=>setScheduleTime(new Date(e.target.value))} />
              )
            }
          </div>

          {/* Submit */}
          <button
            onClick={handlePost}
            disabled={isSubmiting || uploading}
            className="bg-violet-600 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-violet-700 cursor-pointer transition delay-75 hover:scale-y-110 "
          >
            {isSubmiting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                {" "}
                {
                  wantToSchedule ? 'Schedule Post' : 'Publish Post'
                }
                 <ArrowRightIcon className="size-5" />
              </>
            )}
          </button>
          <p className="text-sm text-zinc-400">
            <strong>Note:</strong> It Can Take Some Time According To Platfrom
            To Publsh The Post After Post Creation{" "}
          </p>
        </div>

        {/* RIGHT — LIVE PREVIEW */}
        <div className="lg:col-span-1 sticky top-24 h-fit">
          <PostPreview
            content={content}
            imagePreview={imagePreview!}
            platforms={selectedPlatforms}
          />
        </div>
      </div>
    </>
  );
}
