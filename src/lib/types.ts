import { ScheduledPost } from "@/stores/scheduler/types";


export interface PostWithDate extends ScheduledPost {
  _date: Date;
}