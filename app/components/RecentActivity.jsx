"use client";

import { useState } from "react";
import ActivityItem from "./ActivityItem";
import { activityFilters } from "../lib/data";

export default function RecentActivity({
  entries,
  title = "Recent Activity",
  subtitle = "Real-time feed of task milestones, alerts, and disbursements",
  onViewAll,
  defaultFilter = "All",
  sampleNote = false,
}) {
  const [filter, setFilter] = useState(defaultFilter);

  const filtered =
    filter === "All" ? entries : entries.filter((entry) => entry.category === filter);

  return (
    <section
      aria-label={title}
      className="bg-white/95 border border-slate-200/80 rounded-xl shadow-xs p-4 sm:p-5"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-2">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <div
          role="group"
          aria-label="Filter activity"
          className="flex items-center rounded-xl gap-1.5 px-1.5 py-1 bg-slate-200/50 w-fit overflow-x-auto max-w-full"
        >
          {activityFilters.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
              className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                filter === option
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <ul className="divide-y divide-slate-200/80">
          {filtered.map((entry) => (
            <ActivityItem key={entry.id} entry={entry} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400 py-8 text-center">
          No {filter.toLowerCase()} activity yet.
        </p>
      )}

      <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-slate-200/80">
        {sampleNote ? (
          <p className="text-xs text-slate-400">Sample data — not live transactions.</p>
        ) : (
          <span />
        )}
        {onViewAll ? (
          <button
            type="button"
            onClick={onViewAll}
            className="text-sm font-semibold text-slate-900 hover:text-slate-600 transition-colors cursor-pointer ml-auto"
          >
            View All Activity →
          </button>
        ) : null}
      </div>
    </section>
  );
}
