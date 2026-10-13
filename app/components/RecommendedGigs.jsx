"use client";

import { FiArrowRight, FiCalendar } from "react-icons/fi";
import { useApp } from "./AppContext";
import { formatNaira, gigs } from "../lib/data";

export default function RecommendedGigs() {
  const { openGig, appliedIds } = useApp();
  const recommended = gigs.filter((gig) => gig.recommended).slice(0, 3);

  return (
    <section aria-label="Recommended gigs">
      <div className="flex items-end justify-between gap-3 mb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">Recommended Gigs</h2>
          <p className="text-sm text-slate-500">
            Matched to your skills — sample listings
          </p>
        </div>
        <p className="text-xs text-slate-400 hidden sm:block">Sample data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommended.map((gig) => {
          const applied = appliedIds.includes(gig.id);
          return (
            <article
              key={gig.id}
              className="bg-white/95 border border-slate-200/80 rounded-xl shadow-xs p-4 sm:p-5 flex flex-col hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-300 text-slate-600 shrink-0">
                  {gig.category}
                </span>
                <span className="text-[11px] text-sky-600 font-semibold shrink-0">
                  {gig.match}% match
                </span>
              </div>

              <h3 className="font-bold tracking-tight leading-snug">{gig.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{gig.client}</p>

              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 text-xs">Budget</dt>
                  <dd className="font-bold">{formatNaira(gig.budget)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 text-xs flex items-center gap-1">
                    <FiCalendar size={12} /> Deadline
                  </dt>
                  <dd className="text-slate-700 text-xs sm:text-sm">{gig.deadline}</dd>
                </div>
              </dl>

              <div className="mt-auto pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                {applied ? (
                  <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-600/30 rounded-full px-2 py-0.5">
                    Applied (simulated)
                  </span>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={() => openGig(gig)}
                  className="text-sm font-semibold text-slate-900 flex items-center gap-1 hover:text-slate-600 transition-colors cursor-pointer ml-auto"
                >
                  View Gig <FiArrowRight className="text-xs" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
