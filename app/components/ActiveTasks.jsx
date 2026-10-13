"use client";

import { FiCalendar, FiMessageSquare } from "react-icons/fi";
import { useApp } from "./AppContext";

const statusStyles = {
  progress: "border-sky-600/40 bg-sky-50 text-sky-700",
  review: "border-indigo-600/40 bg-indigo-50 text-indigo-700",
  new: "border-slate-400/50 bg-slate-100 text-slate-600",
};

export default function ActiveTasks({ showViewAll = true, tasks: taskList }) {
  const { tasks: contextTasks, submitTask, messageClient, setView } = useApp();
  const tasks = taskList ?? contextTasks;

  return (
    <section aria-label="Active tasks">
      <div className="flex items-end justify-between gap-3 mb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">Active Tasks</h2>
          <p className="text-sm text-slate-500">
            Track deliverables, deadlines and submission status
          </p>
        </div>
        {showViewAll ? (
          <button
            type="button"
            onClick={() => setView("Tasks")}
            className="text-sm font-semibold text-slate-900 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
          >
            View all →
          </button>
        ) : null}
      </div>

      <div className="bg-white/95 border border-slate-200/80 rounded-xl shadow-xs divide-y divide-slate-200/80 overflow-hidden">
        {tasks.map((task) => {
          const inReview = task.status === "In Review";
          return (
            <article
              key={task.id}
              className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold tracking-tight">{task.title}</h3>
                    <span
                      className={`text-[11px] font-semibold border px-2 py-0.5 rounded-full ${
                        statusStyles[task.tone] ?? statusStyles.new
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{task.description}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <FiCalendar size={12} /> Due {task.deadline} · {task.client}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => messageClient(task.client)}
                    aria-label={`Message client for ${task.title}`}
                    className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <FiMessageSquare size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => submitTask(task.id)}
                    disabled={inReview}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      inReview
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                    }`}
                  >
                    {inReview ? "In review" : "Submit work"}
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-semibold text-slate-700">{task.progress}%</span>
                </div>
                <div
                  className="h-1.5 rounded-full bg-slate-200 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={task.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${task.title} progress`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      inReview ? "bg-indigo-500" : "bg-slate-900"
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
