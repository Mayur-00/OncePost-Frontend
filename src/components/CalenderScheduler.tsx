"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Plus, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { PostDetailPanel } from "./PostDetailPanel";

import { PostWithDate } from "@/lib/types";
import { getWeekNumber } from "@/lib/utils";
import { SchedulerCalendar } from "./SchedulerCalender";
import { usePostStore } from "@/stores/post.store";
import { scheduledPosts } from "@/sampledata";
import { useSchedulerStore } from "@/stores/scheduler/scheduler.store";

// ─── Constants ────────────────────────────────────────────────────────────────
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_ABBR = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];




export function CalendarScheduler() {
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedPost, setSelectedPost] = useState<PostWithDate | null>(null);
  const [month, setMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const {getScheduledPosts} = useSchedulerStore()

  function goToPrev() {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth());
    setMonth(newDate);
  }

  function goToNext() {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth());
    setMonth(newDate);
  }

  function goToToday() {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstOfMonth = new Date(currentYear, currentMonth, 1);

  useEffect(() => {
    console.log("fetching scheduled posts")
    getScheduledPosts();
}, [])

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-white px-6 py-3.5 shadow-sm">
        {/* Left: date badge + title */}
        <div className="flex items-center gap-4">
          <div className="flex min-w-12 flex-col items-center rounded-xl bg-violet-600 px-3 py-1.5 text-white">
            <span className="text-[10px] font-semibold uppercase tracking-widest">
              {MONTH_ABBR[today.getMonth()]}
            </span>
            <span className="text-2xl font-semibold leading-tight">{today.getDate()}</span>
          </div>

          <div>
            <h1 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-stone-900">
              {MONTH_NAMES[currentMonth]} {currentYear}
              <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-xs font-medium text-stone-500">
                Week {getWeekNumber(firstOfMonth)}
              </Badge>
            </h1>
            <p className="mt-0.5 text-sm text-stone-400">
              {MONTH_NAMES[currentMonth].slice(0, 3)} 1, {currentYear} –{" "}
              {MONTH_NAMES[currentMonth].slice(0, 3)} {lastDayOfMonth}, {currentYear}
            </p>
          </div>
        </div>

        {/* Right: controls */}
        <div className="flex flex-wrap items-center gap-2">
        

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-stone-200"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-4 w-4 text-stone-500" />
          </Button>

          <Button
            variant="outline"
            className="h-9 rounded-lg border-stone-200 px-4 text-sm font-medium text-white bg-violet-500 hover:bg-violet-700 cursor-pointer"
            onClick={goToToday}
          >
            Today
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-stone-200"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4 text-stone-500" />
          </Button>

          {/* <Button
            variant="outline"
            className="h-9 rounded-lg border-stone-200 px-4 text-sm font-medium"
          >
            <CalendarDays className="mr-1.5 h-4 w-4" />
            Month view
          </Button>

          <Button className="h-9 rounded-lg bg-violet-600 px-4 text-sm font-medium text-white hover:bg-violet-700">
            <Plus className="mr-1.5 h-4 w-4" />
            Add event
          </Button> */}
        </div>
      </header>

      {/* ── Scheduler Calendar ── */}
      <SchedulerCalendar
        month={month}
        today={today}
        onSelectPost={setSelectedPost}
      />

      {/* ── Post Detail Dialog ── */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
            
          {selectedPost && <PostDetailPanel post={selectedPost} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}