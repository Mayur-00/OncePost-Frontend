import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PostWithDate, } from "./types";
import { scheduledPosts } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 
/** ISO week number */
export function getWeekNumber(d: Date): number {
  const jan1 = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(
    ((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7
  );
}


 export const postsByDate = (posts:scheduledPosts[]) => {
    const map: Record<string, PostWithDate[]> = {};
    posts.forEach((p) => {
      const d = new Date(p.scheduledAt)
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!map[key]) map[key] = [];
      map[key].push({ ...p, _date: d });
    });
    return map;
  };

