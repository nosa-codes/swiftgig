"use client";

import { FiCheckCircle, FiMapPin, FiStar } from "react-icons/fi";
import Modal from "./Modal";
import Avatar from "./Avatar";
import { useApp } from "./AppContext";
import { user } from "../lib/data";

export default function ProfileModal() {
  const { profileOpen, setProfileOpen, available, toggleAvailable } = useApp();

  return (
    <Modal
      open={profileOpen}
      onClose={() => setProfileOpen(false)}
      title="Profile"
      footer={
        <button
          type="button"
          onClick={() => setProfileOpen(false)}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Done
        </button>
      }
    >
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} size="h-14 w-14 text-lg" available={available} />
          <div>
            <p className="text-lg font-bold tracking-tight flex items-center gap-1.5">
              {user.name}
              <FiCheckCircle className="text-sky-500" aria-label="Verified" />
            </p>
            <p className="text-sm text-slate-500">{user.role}</p>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              <FiMapPin size={12} /> {user.location} · Member since {user.memberSince}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-slate-200/80 p-3">
            <dt className="text-xs text-slate-500">Rating</dt>
            <dd className="font-bold mt-1 flex items-center gap-1">
              {user.rating}
              <FiStar className="fill-amber-400 text-amber-400 text-xs" />
            </dd>
          </div>
          <div className="rounded-xl border border-slate-200/80 p-3">
            <dt className="text-xs text-slate-500">Completed</dt>
            <dd className="font-bold mt-1">{user.completedGigs} gigs</dd>
          </div>
          <div className="rounded-xl border border-slate-200/80 p-3">
            <dt className="text-xs text-slate-500">Reviews</dt>
            <dd className="font-bold mt-1">{user.reviews}</dd>
          </div>
          <div className="rounded-xl border border-slate-200/80 p-3">
            <dt className="text-xs text-slate-500">Email</dt>
            <dd className="font-bold mt-1 text-xs break-all">{user.email}</dd>
          </div>
        </dl>

        <div className="rounded-xl border border-slate-200/80 p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">Availability</p>
            <p className="text-xs text-slate-500">
              {available ? "Clients can see you as available for work" : "You won't appear in client searches"}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={available}
            aria-label="Toggle availability"
            onClick={toggleAvailable}
            className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${
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

        <div>
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
          <p className="text-xs text-slate-400 mt-1.5">
            Add portfolio samples to reach 100%.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
