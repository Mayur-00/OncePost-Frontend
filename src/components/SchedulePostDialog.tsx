"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X, Check, Plus, Clock } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  schedulePostSchema,
  type SchedulePostFormData,
} from "@/stores/scheduler/scheduler.dto";
import { useSchedulerStore } from "@/stores/scheduler/scheduler.store";
import { useUserStore } from "@/stores/user.store";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import SubscriptionLimitBanner from "./SubscriptionLimitDialog";
import { cn } from "@/lib/utils";

const PLATFORM_LIMITS: Record<string, number> = {
  instagram: 2200,
  twitter: 280,
  linkedin: 3000,
  facebook: 5000,
  default: 5000,
};

interface CreateScheduleDialogProps {
  initialDate: Date; // e.g., from Calendar cell
}

export function CreateScheduleDialog({
  initialDate,
}: CreateScheduleDialogProps) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Local state for the time picker (HH:mm format)
  const [selectedTime, setSelectedTime] = useState("12:00");

  const { schedulePost } = useSchedulerStore();
  const { connectedAccounts, subscriptions } = useUserStore();
  const isLimitReached =
    (subscriptions && subscriptions[0].post_creation_remaining === 0) ?? false;

  const form = useForm<SchedulePostFormData>({
    resolver: zodResolver(schedulePostSchema),
    defaultValues: {
      content: "",
      platforms: [],
      imageLink: "",
      imageMimeType: "",
      scheduledDateAndTime: "",
    },
  });

  const watchContent = form.watch("content");
  const watchPlatforms = form.watch("platforms");
  const watchImage = form.watch("imageLink");

  // Merge Date + Time into the hidden form field
  useEffect(() => {
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const combinedDate = new Date(initialDate);
    combinedDate.setHours(hours, minutes, 0, 0);

    form.setValue("scheduledDateAndTime", combinedDate.toISOString(), {
      shouldValidate: true,
    });
  }, [initialDate, selectedTime, form]);

  const currentMaxLimit =
    watchPlatforms.length > 0
      ? Math.min(
          ...watchPlatforms.map(
            (p) => PLATFORM_LIMITS[p.toLowerCase()] || PLATFORM_LIMITS.default,
          ),
        )
      : PLATFORM_LIMITS.default;

  const isOverLimit = watchContent.length > currentMaxLimit;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024)
      return toast.error("Image size must be < 5MB");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET!);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );
      form.setValue("imageLink", res.data.secure_url);
      form.setValue("imageMimeType", file.type);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  async function onSubmit(values: SchedulePostFormData) {
    // console.log(values);
    const res = await schedulePost(values);
    if (res.success) {
      toast.success(res.message);
      setOpen(false);
      form.reset();
    } else {
      console.log(res)
      switch (res.message) {
          case "LINKEDIN_ACCOUNT_EXPIRED": {
            toast.error("your Linkedin account expired, please reconnect...");
            window.location.href = "/settings";
            break;
          }
          case "X_ACCOUNT_EXPIRED": {
            toast.error("your X account expired, please reconnect...");
            window.location.href = "/settings";
            break;
          };
          default : {
            toast.error(res.message);
            break;
          }
        }
      setOpen(false);
      form.reset();

      return;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Plus size={16} strokeWidth={3} />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden flex flex-col max-h-[95vh]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">
            Schedule Post for{" "}
            {initialDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </DialogTitle>
        </DialogHeader>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-2 custom-scrollbar">
          {isLimitReached && (
            <div className="mb-4">
              <SubscriptionLimitBanner
                limit={
                  subscriptions ? subscriptions[0].plan.maxPostsPerMonth : 0
                }
              />
            </div>
          )}

          <Form {...form}>
            <form
              id="schedule-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                    <Clock size={12} className="text-violet-500" />
                    Time
                  </FormLabel>
                  <Input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="h-9 focus-visible:ring-violet-500"
                  />
                </FormItem>

                <div className="flex flex-col justify-end items-end pb-2">
                  <span
                    className={cn(
                      "text-[10px] font-mono px-2 py-1 rounded bg-stone-100",
                      isOverLimit
                        ? "text-red-500 font-bold bg-red-50"
                        : "text-muted-foreground",
                    )}
                  >
                    {watchContent.length} / {currentMaxLimit}
                  </span>
                </div>
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider">
                      Content
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What's on your mind?"
                        className={cn(
                          "min-h-[120px] resize-none bg-stone-50/50 focus-visible:ring-violet-500",
                          isOverLimit &&
                            "border-red-500 focus-visible:ring-red-500",
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platforms"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider">
                      Target Platforms
                    </FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {connectedAccounts?.map((account) => {
                        const isSelected = watchPlatforms.includes(
                          account.platform,
                        );
                        return (
                          <Button
                            key={account.id}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className={cn(
                              "h-8 rounded-full text-[11px] transition-all",
                              isSelected
                                ? "bg-violet-600 hover:bg-violet-700 shadow-sm shadow-violet-100"
                                : "hover:border-violet-200",
                            )}
                            onClick={() => {
                              const next = isSelected
                                ? watchPlatforms.filter(
                                    (p) => p !== account.platform,
                                  )
                                : [...watchPlatforms, account.platform];
                              form.setValue("platforms", next, {
                                shouldValidate: true,
                              });
                            }}
                          >
                            {account.platform}
                            {isSelected && <Check className="ml-1 h-3 w-3" />}
                          </Button>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2 pb-4">
                <FormLabel className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider">
                  Media
                </FormLabel>
                {!watchImage ? (
                  <div className="relative border-2 border-dashed border-stone-200 rounded-xl p-6 flex flex-col items-center justify-center bg-stone-50/50 hover:bg-stone-50 hover:border-violet-300 transition-all cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                    />
                    {uploading ? (
                      <Loader2 className="animate-spin h-5 w-5 text-violet-600" />
                    ) : (
                      <Upload className="h-5 w-5 text-stone-400 group-hover:text-violet-500 transition-colors mb-1" />
                    )}
                    <p className="text-[10px] text-stone-500 font-medium">
                      Click to upload (Max 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="relative group overflow-hidden rounded-xl border border-stone-200">
                    <img
                      src={watchImage}
                      className="w-full h-32 object-cover"
                      alt="Preview"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          form.setValue("imageLink", "");
                          form.setValue("imageMimeType", "");
                        }}
                        className="bg-white text-red-500 p-2 rounded-full hover:scale-110 transition-transform shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </Form>
        </div>

        {/* FIXED FOOTER */}
        <div className="p-6 pt-4 border-t bg-stone-50/30">
          <Button
            form="schedule-form"
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 h-11 text-sm font-bold shadow-lg shadow-violet-100"
            disabled={
              form.formState.isSubmitting ||
              uploading ||
              isOverLimit ||
              isLimitReached
            }
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Schedule Post"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
