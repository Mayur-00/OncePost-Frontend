"use client";

import { PostWithDate } from "@/lib/types";
import { cn } from "@/lib/utils";


// ─── Color palettes (index = id % 5) ─────────────────────────────────────────
const PILL_STYLES = [
  "bg-blue-100 text-blue-700",
  "bg-pink-100 text-pink-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
  "bg-violet-100 text-violet-700",
] as const;

const DOT_STYLES = [
  "bg-blue-500",
  "bg-pink-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-violet-500",
] as const;

interface PostPillProps {
  post: PostWithDate;
  onClick: () => void;
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function PostPill({ post, onClick }: PostPillProps) {


  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "flex w-full items-center gap-1.5 overflow-hidden rounded-md px-1.5 py-0.5 text-left transition-all duration-100 hover:brightness-95 active:scale-[0.98] cursor-pointer",
        "bg-emerald-300"
      )}
    >
      {/* Dot */}
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
        )}
      />

      {/* Content */}
      <span className="flex-1 truncate text-[11.5px] font-medium leading-tight">
        {post.content}
      </span>

      {/* Time */}
      <span className="shrink-0 font-mono text-[10px] opacity-60">
        {formatTime(post._date)}
      </span>
    </button>
  );
}