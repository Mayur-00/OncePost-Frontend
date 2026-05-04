"use client";

import { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { PostWithDate } from "@/lib/types";
import { PostPill } from "./PostPill";
import { Plus } from "lucide-react";
import { usePostStore } from "@/stores/post.store";
import { CreateScheduleDialog } from "./SchedulePostDialog";
import { useSchedulerStore } from "@/stores/scheduler/scheduler.store";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SchedulerCalendarProps {
  month: Date;
  today: Date;
  onSelectPost: (post: PostWithDate) => void;
}

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MAX_VISIBLE = 3;

// ─── Component ────────────────────────────────────────────────────────────────
export function SchedulerCalendar({
  month,
  today,
  onSelectPost,
}: SchedulerCalendarProps) {
  const currentYear = month.getFullYear();
  const currentMonth = month.getMonth();
  const scheduledPostsMap = useSchedulerStore((state)=>state.scheduledPostsMap);


  const cells = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startOffset = firstDay.getDay();
    const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;

    return Array.from({ length: totalCells }, (_, i) => {
      const dayOffset = i - startOffset + 1;
      const cellDate = new Date(currentYear, currentMonth, dayOffset);
      const isOtherMonth = dayOffset < 1 || dayOffset > lastDay.getDate();
      const isToday = cellDate.toDateString() === today.toDateString();
      const key = `${cellDate.getFullYear()}-${cellDate.getMonth()}-${cellDate.getDate()}`;
      const posts = scheduledPostsMap[key] ?? [];
      return { cellDate, isOtherMonth, isToday, posts, key };
    });
  }, [currentYear, currentMonth, scheduledPostsMap, today]);

  useEffect(() => {
  console.log("Map updated:", scheduledPostsMap);
}, [scheduledPostsMap]);

  return (
    <div className="overflow-auto">
      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 border-l border-t border-stone-200 bg-stone-50">
        {DOW.map((d) => (
          <div
            key={d}
            className="border-b border-r border-stone-200 bg-white py-2.5 text-center text-xs font-semibold uppercase tracking-widest text-stone-400"
          >
            {d}
          </div>
        ))}

        {/* Date cells */}
        {cells.map(({ cellDate, isOtherMonth, isToday, posts }, i) => {
          const visible = posts.slice(0, MAX_VISIBLE);
          const remaining = posts.length - MAX_VISIBLE;

          return (
            <div
              key={i}
              className={cn(
                "group relative min-h-32 border-b border-r border-stone-200 p-2 transition-colors duration-100 ",
                isOtherMonth
                  ? "bg-stone-50/70"
                  : "bg-white hover:bg-violet-50/30",
                
              )}
            >
              {/* Day number */}
              <div
                className={cn(
                  "mb-1.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  isOtherMonth
                    ? "text-stone-300"
                    : isToday
                      ? "bg-violet-600 text-white shadow-sm shadow-violet-200"
                      : "text-stone-700 group-hover:text-stone-900",
                )}
              >
                {cellDate.getDate()}
              </div>

              {/* Post pills */}
              <div className="space-y-0.5">
                {visible.map((post) => (
                  <PostPill
                    key={post.id}
                    post={post}
                    onClick={() => onSelectPost(post)}
                    
                  />
                ))}

                {remaining > 0 && (
                  <button className="mt-0.5 w-full rounded px-1.5 py-0.5 text-left text-[11px] font-medium text-stone-400 transition-colors hover:text-violet-600">
                    {remaining} more...
                  </button>
                )}
              </div>
              <button
                className={cn(
                  "absolute bottom-2 right-2 flex items-center justify-center bg-violet-600 p-1.5 text-white rounded-md shadow-sm cursor-pointer",
                  "opacity-0 scale-95 transition-all duration-200", 
                  "group-hover:opacity-100 group-hover:scale-100",
                )}
                
              >
                <CreateScheduleDialog initialDate={cellDate} />
                
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
