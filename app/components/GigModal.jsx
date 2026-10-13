"use client";

import { FiCalendar, FiCheckCircle, FiClock, FiUser } from "react-icons/fi";
import Modal from "./Modal";
import { useApp } from "./AppContext";
import { formatNaira } from "../lib/data";

export default function GigModal() {
  const { gigModal, closeGig, appliedIds, applyToGig } = useApp();
  const gig = gigModal;
  const applied = gig ? appliedIds.includes(gig.id) : false;

  return (
    <Modal
      open={Boolean(gig)}
      onClose={closeGig}
      title={gig ? gig.title : "Gig details"}
      footer={
        gig ? (
          <>
            <button
              type="button"
              onClick={closeGig}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => applyToGig(gig)}
              disabled={applied}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                applied
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
              }`}
            >
              {applied ? "Application recorded" : "Apply (simulated)"}
            </button>
          </>
        ) : null
      }
    >
      {gig ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-full border border-slate-300 text-slate-600">
              {gig.category}
            </span>
            <span className="px-2 py-0.5 rounded-full border border-sky-600/40 bg-sky-50 text-sky-700">
              {gig.match}% skill match
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">{gig.description}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200/80 p-3">
              <dt className="text-xs text-slate-500 flex items-center gap-1.5">
                <FiUser size={13} /> Client
              </dt>
              <dd className="text-sm font-semibold mt-1">{gig.client}</dd>
            </div>
            <div className="rounded-xl border border-slate-200/80 p-3">
              <dt className="text-xs text-slate-500">Budget</dt>
              <dd className="text-sm font-semibold mt-1">{formatNaira(gig.budget)}</dd>
            </div>
            <div className="rounded-xl border border-slate-200/80 p-3">
              <dt className="text-xs text-slate-500 flex items-center gap-1.5">
                <FiCalendar size={13} /> Deadline
              </dt>
              <dd className="text-sm font-semibold mt-1">{gig.deadline}</dd>
            </div>
            <div className="rounded-xl border border-slate-200/80 p-3">
              <dt className="text-xs text-slate-500 flex items-center gap-1.5">
                <FiClock size={13} /> Posted
              </dt>
              <dd className="text-sm font-semibold mt-1">Sample listing</dd>
            </div>
          </dl>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {gig.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <p className="flex items-start gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
            <FiCheckCircle className="text-slate-400 mt-0.5 shrink-0" />
            <span>
              This is a sample gig for the prototype. Applying is recorded locally in the
              browser only — no real application is sent and no payment is involved.
            </span>
          </p>
        </div>
      ) : null}
    </Modal>
  );
}
