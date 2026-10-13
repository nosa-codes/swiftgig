"use client";

import ActiveTasks from "./ActiveTasks";
import { useApp } from "./AppContext";

export default function Tasks() {
  const { tasks } = useApp();
  const inReview = tasks.filter((task) => task.status === "In Review").length;
  const inProgress = tasks.length - inReview;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <div className="bg-white/95 border border-slate-200/80 rounded-xl shadow-xs px-4 py-3 min-w-36">
          <p className="text-xs text-slate-500">Active tasks</p>
          <p className="text-xl font-bold mt-0.5">{tasks.length}</p>
        </div>
        <div className="bg-white/95 border border-slate-200/80 rounded-xl shadow-xs px-4 py-3 min-w-36">
          <p className="text-xs text-slate-500">In progress</p>
          <p className="text-xl font-bold mt-0.5">{inProgress}</p>
        </div>
        <div className="bg-white/95 border border-slate-200/80 rounded-xl shadow-xs px-4 py-3 min-w-36">
          <p className="text-xs text-slate-500">In review</p>
          <p className="text-xl font-bold mt-0.5">{inReview}</p>
        </div>
      </div>

      <ActiveTasks showViewAll={false} />
    </div>
  );
}
