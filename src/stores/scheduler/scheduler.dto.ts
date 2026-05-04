import { z } from "zod";

export const schedulePostSchema = z
  .object({
    content: z
      .string()
      .min(1, "Content is required")
      .max(5000, "Content must be less than 5000 characters"),
    platforms: z.array(z.string()).min(1, "Select at least one platform"),
    imageLink: z.string().optional(),
    imageMimeType: z.string().optional(),
    scheduledDateAndTime: z.string().refine(
      (value) => {
        if (!value) return true;
        const scheduledDate = new Date(value);
        return scheduledDate.getTime() > Date.now();
      },
      { message: "Please select a future date and time" },
    ),
  }).refine((data) => data.content.trim() || data.imageLink, {
    message: "Add content or image",
    path: ["content"],
  });

export type SchedulePostFormData = z.infer<typeof schedulePostSchema>;
