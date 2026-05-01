"use client";

import { Calendar, Clock, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PostWithDate } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DialogTitle } from "./ui/dialog";


function formatTime(d: Date): string {
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatFullDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface PostDetailPanelProps {
  post: PostWithDate;
}

export function PostDetailPanel({ post }: PostDetailPanelProps) {

  // console.log(post)

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      {/* Color accent bar */}
      <div
        className={`h-1.5 w-full bg-violet-500`}
      />

      <div className="p-6">
        {/* Label */}
        <div className="mb-3 flex items-center gap-2">
          <Badge
            variant="outline"
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide `}
          >
            Scheduled Post
          </Badge>
        </div>

        {/* Content */}
        <DialogTitle className="mb-5 text-[15px] leading-relaxed text-stone-800 font-medium">
          {post.content}
        </DialogTitle>

        {/* Image */}
        {post.mediaUrl ? (
          <div className="mb-5 overflow-hidden rounded-xl border border-stone-100">
            <img
              src={post.mediaUrl}
              alt="Post visual"
              className="h-48 w-full object-cover"
            />
          </div>
        ) : (
          <div className="mb-5 flex h-24 w-full items-center justify-center rounded-xl border border-dashed border-stone-200 bg-stone-50">
            <div className="flex flex-col items-center gap-1 text-stone-300">
              <ImageIcon className="h-6 w-6" />
              <span className="text-xs">No image attached</span>
            </div>
          </div>
        )}

        <Separator className="mb-4" />

        {/* Meta */}
        <div className="flex justify-between">
            <div className="space-y-2">
          <div className="flex items-center gap-2.5 text-sm text-stone-500">
            <Calendar className="h-4 w-4 text-stone-400" />
            <span>{formatFullDate(post._date)}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-stone-500">
            <Clock className="h-4 w-4 text-stone-400" />
            <span>{formatTime(post._date)}</span>
          </div>
        </div>
        <div className=" flex gap-2">
            
            {post.scheduled_for.map((pl)=>(
                <div key={pl} className={cn("h-5 w-auto flex items-center justify-center p-2 rounded-sm text-xs text-white", 
                    pl==='LINKEDIN'?"bg-blue-500":"bg-black"
                )}>{pl}</div>
            ))}
        </div>
        </div>
      </div>
    </div>
  );
}