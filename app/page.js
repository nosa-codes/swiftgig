"use client";

import { FiCalendar } from "react-icons/fi";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { Toaster } from "sonner";
import NavBar from "./components/NavBar";
import { Dashboard } from "./components/Dashboard";
import Gigs from "./components/Gigs";
import Tasks from "./components/Tasks";
import Earnings from "./components/Earnings";
import Activity from "./components/Activity";
import GigModal from "./components/GigModal";
import ProfileModal from "./components/ProfileModal";
import { AppProvider, useApp } from "./components/AppContext";

const viewMeta = {
  Gigs: {
    title: "Find Gigs",
    subtitle: "Browse sample opportunities matched to your skills.",
  },
  Tasks: {
    title: "My Tasks",
    subtitle: "Manage active deliverables and submission status.",
  },
  Earnings: {
    title: "Earnings",
    subtitle: "Track your sample balance and payout history.",
  },
  Activity: {
    title: "Activity",
    subtitle: "Every milestone, alert and disbursement in one feed.",
  },
};

function WelcomeHeader() {
  const { view, setView } = useApp();
  const meta = viewMeta[view];

  if (view === "Dashboard") {
    return (
      <section aria-label="Welcome" className="border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2 text-slate-500 text-sm flex-wrap">
          <FiCalendar aria-hidden="true" />
          <span>Monday, October 12, 2026</span>
          <span className="flex items-center gap-1.5 border border-green-700/40 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Live Dispatch Active
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-2.5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Good morning, Alex 👋
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Here&apos;s what&apos;s happening with your gigs today.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setView("Earnings")}
              className="text-slate-900 bg-white/95 border border-slate-200/80 shadow-xs px-3.5 py-2 rounded-xl text-sm font-semibold hover:bg-white hover:border-slate-300 transition-colors cursor-pointer"
            >
              Withdraw ₦145,000
            </button>
            <button
              type="button"
              onClick={() => setView("Gigs")}
              className="bg-slate-900 text-white shadow-xs px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <FaWandMagicSparkles className="text-sky-400" aria-hidden="true" />
              Discover Gigs
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Page header" className="border-b border-slate-200/80 pb-4">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{meta.title}</h2>
      <p className="text-sm text-slate-500 mt-1">{meta.subtitle}</p>
    </section>
  );
}

function AppShell() {
  const { view } = useApp();

  return (
    <div className="min-h-dvh bg-[#F8FAFC] text-slate-900">
      <header>
        <NavBar />
      </header>

      <main className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-4 lg:pt-8 pb-28 lg:pb-12 space-y-5 sm:space-y-6">
        <WelcomeHeader />
        <div>
          {view === "Dashboard" ? (
            <Dashboard />
          ) : view === "Gigs" ? (
            <Gigs />
          ) : view === "Tasks" ? (
            <Tasks />
          ) : view === "Earnings" ? (
            <Earnings />
          ) : view === "Activity" ? (
            <Activity />
          ) : null}
        </div>
      </main>

      <GigModal />
      <ProfileModal />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
