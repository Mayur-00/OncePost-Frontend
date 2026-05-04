import { PostWithDate } from "@/lib/types";
import { SchedulePostFormData } from "./scheduler.dto";

export interface SchedulerStore{
    selectedDate:Date|null;
    selectedPost:PostWithDate | null,
    scheduledPostsMap:Record<string, PostWithDate[]>,
    submiting:boolean,
    isFetching:boolean,

    getScheduledPosts : () => Promise<{success:boolean, message:string }>,
    schedulePost : (data:SchedulePostFormData) => Promise<{success:boolean, message:string }>
};

export interface ScheduledPost{
    id: string;
    content: string;
    mediaUrl: string | '';
    scheduled_for: string[];
    scheduledAt: Date ;
}

 export type SchedulePostApiResponseType = {
    status:number,
    success:boolean,
    data:ScheduledPost,
    message:string
 }