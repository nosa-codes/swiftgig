"use client";

import { useState } from "react";
import NavBar from "./components/NavBar";
import { Dashboard } from "./components/Dashboard";
import Gigs from "./components/Gigs";
import Tasks from "./components/Tasks";
import Earnings from "./components/Earnings";
import Activity from "./components/Activity";
import { FiCalendar } from "react-icons/fi";
import { FaWandMagicSparkles } from "react-icons/fa6";

export default function Home() {

  const [view, setView] = useState("Dashboard");
  return (
    <div>
      <header>
        <NavBar view={view} setView={setView} />
      </header>

      <main className="bg-[#F8FAFC] h-dvh lg:py-10 lg:px-50 space-y-6">
        <div className=" border-b border-slate-200/80 py-2.5">
          <div className="flex items-center gap-2 text-slate-500 text-sm"><FiCalendar /> Monday, October 12, 2026 <span>.</span> <span className="flex items-center border border-green-700 bg-green-200/80 text-green-700 px-2 rounded-full gap-1 text-xs"><span className="h-2 w-2 rounded-full animate-pulse bg-green-500 " />Live Dispatch Active</span></div>

          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Good Morning, Nosa</h2>
            <div className="flex items-center gap-4">
              <button className="text-slate-900 bg-white/95 shadow-xs p-1.5 rounded-xl text-sm">Withdraw ₦145,000</button>
              <button className="bg-slate-900 text-white shadow-xs p-1.5 rounded-xl text-sm flex items-center gap-2"><FaWandMagicSparkles className="text-sky-400" />Discover Gigs</button>
            </div>
          </div>
          <p className="text-xs">Here's what's happening with your gigs today</p>
        </div>

        <div>
          {view === "Dashboard" ? <Dashboard /> : view === "Gigs" ? <Gigs /> : view === "Tasks" ? <Tasks /> : view === "Earnings" ? <Earnings /> : view === "Activity" ? <Activity /> : ""}
        </div>
      </main>
    </div>
  );
}