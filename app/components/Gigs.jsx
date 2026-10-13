"use client";

import { useMemo, useState } from "react";
import { FiCalendar, FiSearch } from "react-icons/fi";
import { useApp } from "./AppContext";
import { formatNaira, gigCategories, gigs } from "../lib/data";

export default function Gigs() {
  const { openGig, appliedIds, applyToGig } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return gigs.filter((gig) => {
      const matchesCategory = category === "All" || gig.category === category;
      const matchesQuery =
        q === "" ||
        gig.title.toLowerCase().includes(q) ||
        gig.client.toLowerCase().includes(q) ||
        gig.skills.some((skill) => skill.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search gigs by title, client or skill…"
            aria-label="Search gigs"
            className="w-full bg-white border border-slate-200/80 rounded-xl pl-9 pr-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
          />
        </div>
        <div
          role="group"
          aria-label="Filter by category"
          className="flex items-center rounded-xl gap-1.5 px-1.5 py-1 bg-slate-200/50 w-fit overflow-x-auto max-w-full"
        >
          {gigCategories.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => setCategory(option)}
              className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                category === option
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-400">
        {filtered.length} sample {filtered.length === 1 ? "listing" : "listings"} · these are
        mock gigs for the prototype, not real postings.
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((gig) => {
            const applied = appliedIds.includes(gig.id);
            return (
              <article
                key={gig.id}
                className="bg-white/95 border border-slate-200/80 rounded-xl shadow-xs p-4 sm:p-5 flex flex-col transition-all duration-200 hover:border-slate-300 hover:shadow-sm hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-300 text-slate-600">
                    {gig.category}
                  </span>
                  <span className="text-[11px] text-sky-600 font-semibold">
                    {gig.match}% match
                  </span>
                </div>

                <h2 className="font-bold tracking-tight">{gig.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{gig.client}</p>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{gig.description}</p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mt-3">
                  <span className="font-bold">{formatNaira(gig.budget)}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <FiCalendar size={12} /> Due {gig.deadline}
                  </span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-200/80 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openGig(gig)}
                    className="flex-1 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    View Gig
                  </button>
                  <button
                    type="button"
                    onClick={() => applyToGig(gig)}
                    disabled={applied}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      applied
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                    }`}
                  >
                    {applied ? "Applied (simulated)" : "Apply (simulated)"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="bg-white/95 border border-slate-200/80 rounded-xl shadow-xs p-10 text-center">
          <p className="font-semibold">No gigs match your search</p>
          <p className="text-sm text-slate-500 mt-1">
            Try a different keyword or category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-4 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
