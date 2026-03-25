"use client";

import { useState, ChangeEvent } from "react";
import { Upload, Loader2, X, Check, SendHorizontal } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PostPreview from "@/components/PostPreview";
import { useUserStore } from "@/stores/user.store";
import { usePostStore } from "@/stores/post.store";
import PostLimitBanner from "@/components/PostLimiter";

interface ICreatePostForm {
  content: string;
  platforms: string[];
  imageLink?: string;
  imageMimeType?: string;
  scheduledDateAndTime?: string;
}

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [UploadedImage, setUploadedImage] = useState<any>();
  const [uploading, setUploading] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const [wantToSchedule, setWantToSchedule] = useState(false);
  const [ScheduleTime, setScheduleTime] = useState<Date | null>(null);

  const router = useRouter();

  const { createPost, isSubmiting } = usePostStore();
  const { connectedAccounts, subscriptions } = useUserStore();

  const isLimitReached =
    (subscriptions && subscriptions[0].post_creation_remaining === 0) ?? false;

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
    if (isLimitReached) {
      toast.error("Your Have Reached Your Maximum post creation limit");
      return;
    }
    if (!content.trim() && !UploadedImage) {
      toast.error("Add content or image");
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error("Select at least one platform");
      return;
    }

    let formData: ICreatePostForm = {
      content: content,
      platforms: selectedPlatforms,
    };

    if (UploadedImage) {
      formData.imageLink= UploadedImage.url;
      formData.imageMimeType = mediaType;

    }

    if (wantToSchedule) {
      if (!ScheduleTime) {
        toast.error("Please Select Valid Date & Time");
        return;
      }

      if (ScheduleTime.getTime() <= Date.now()) {
        toast.error("Please Select Future Date & Time");
        return;
      }

      formData.scheduledDateAndTime = ScheduleTime.toISOString();

      console.log("formdata ", formData);

      const response = await createPost(formData);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);

      window.location.href="/dashboard"
    } else {
      const response = await createPost(formData);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);

      window.location.href="/dashboard"
    }
  };

  return (
    <>
      {isLimitReached && (
        <PostLimitBanner
          limit={subscriptions ? subscriptions[0].plan.maxPostsPerMonth : 0}
        />
      )}

      <div className="w-5xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}

        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 space-y-6">
          {/* CONTENT */}

          <div>
            <h2 className="text-sm font-semibold mb-2">Post Content</h2>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share something..."
              className="w-full h-36 border rounded-lg p-4 resize-none focus:ring-2 focus:ring-violet-500"
            />

            <div className="text-xs text-gray-400 text-right">
              {content.length} characters
            </div>
          </div>

          {/* MEDIA */}

          <div>
            <h2 className="text-sm font-semibold mb-2">Media</h2>

            {!imagePreview ? (
              <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer">
                {uploading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Upload className="mb-2" />
                    <p className="text-sm">Click to upload image</p>
                  </>
                )}

                <input type="file" hidden onChange={handleFileSelect} />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  className="rounded-lg max-h-72 w-full object-cover"
                />

                <button
                  onClick={() => {
                    setImagePreview(null);
                    setUploadedImage(null);
                  }}
                  className="absolute top-2 right-2 bg-black text-white p-1 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* PLATFORMS */}

          <div>
            <h2 className="text-sm font-semibold mb-2">Platforms</h2>

            <div className="flex gap-3 flex-wrap">
              {connectedAccounts?.map((platform) => {
                const active = selectedPlatforms.includes(platform.platform);

                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.platform)}
                    className={`px-4 py-2 rounded-md border flex items-center gap-2 text-sm
                    ${
                      active
                        ? "bg-violet-600 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {platform.platform}

                    {active && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SCHEDULE */}

          <div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={wantToSchedule}
                onChange={() => setWantToSchedule(!wantToSchedule)}
              />
              Schedule this post
            </label>

            {wantToSchedule && (
              <input
                type="datetime-local"
                className="border p-2 rounded-md mt-2"
                onChange={(e) => setScheduleTime(new Date(e.target.value))}
              />
            )}
          </div>

          {/* SUBMIT */}

          <button
            onClick={handlePost}
            disabled={isSubmiting || uploading || isLimitReached}
            className="w-full bg-violet-600 disabled:bg-zinc-200 disabled:text-zinc-500 disabled:border-2 disabled:border-zinc-300 disabled:cursor-not-allowed cursor-pointer hover:bg-violet-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            {isSubmiting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                {wantToSchedule ? "Schedule Post" : "Publish Post"}
                <SendHorizontal size={18} />
              </>
            )}
          </button>
        </div>

        {/* RIGHT SIDE */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-sm font-semibold mb-4">Live Preview</h2>

          <PostPreview
            content={content}
            imagePreview={imagePreview || ""}
            platforms={selectedPlatforms}
          />
        </div>
      </div>
    </>
  );
}
