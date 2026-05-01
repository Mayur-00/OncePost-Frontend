

export interface ScheduledPost {
  id: string;
  scheduledAt: Date; // ISO 8601
  content: string ;
  mediaUrl: string | "";
  scheduled_for:string[];
}

export interface PostWithDate extends ScheduledPost {
  _date: Date;
}