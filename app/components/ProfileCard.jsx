"use client";

import { FiCheckCircle, FiStar } from "react-icons/fi";
import Avatar from "./Avatar";
import { useApp } from "./AppContext";
import { user } from "../lib/data";

export default function ProfileCard() {
  const { available, toggleAvailable, setProfileOpen } = useApp();

  return (
    <section
      aria-label="Profile"
      className="bg-white/95 border border-slate-200/80 rounded-xl shadow-xs p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight">Your Profile</h2>
        <span
          className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border ${
            available
              ? "border-green-600/40 bg-green-50 text-green-700"
              : "border-slate-400/50 bg-slate-100 text-slate-500"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${available ? "bg-green-500" : "bg-slate-400"}`}
          />
          {available ? "Available for work" : "Unavailable"}
        </span>
      </div>

      <div className="flex items-center gap-3.5">
        <Avatar name={user.name} size="h-14 w-14 text-lg" available={available} />
        <div className="min-w-0">
          <p className="font-bold tracking-tight flex items-center gap-1.5">
            {user.name}
            <FiCheckCircle className="text-sky-500 shrink-0" aria-label="Verified" />
          </p>
          <p className="text-sm text-slate-500">{user.role}</p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-xl border border-slate-200/80 p-3">
          <dt className="text-xs text-slate-500">Rating</dt>
          <dd className="font-bold mt-0.5 flex items-center gap-1">
            {user.rating}
            <FiStar className="fill-amber-400 text-amber-400 text-xs" />
            <span className="text-xs text-slate-400 font-normal">/ 5</span>
          </dd>
        </div>
        <div className="rounded-xl border border-slate-200/80 p-3">
          <dt className="text-xs text-slate-500">Completed gigs</dt>
          <dd className="font-bold mt-0.5">{user.completedGigs}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <p className="font-semibold text-slate-600">Profile completion</p>
          <p className="text-slate-500">{user.profileCompletion}%</p>
        </div>
        <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-slate-900"
            style={{ width: `${user.profileCompletion}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200/80">
        <div>
          <p className="text-sm font-semibold">Available for work</p>
          <p className="text-xs text-slate-400">Toggle to pause new matches</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={available}
          aria-label="Toggle availability"
          onClick={toggleAvailable}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer ${
            available ? "bg-green-500" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
              available ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      </div>

      <button
        type="button"
        onClick={() => setProfileOpen(true)}
        className="w-full mt-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        View Profile
      </button>
    </section>
  );
}
