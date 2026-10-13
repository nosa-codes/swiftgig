"use client";

import Cards from "./Cards";
import RecentActivity from "./RecentActivity";
import ProfileCard from "./ProfileCard";
import RecommendedGigs from "./RecommendedGigs";
import ActiveTasks from "./ActiveTasks";
import { useApp } from "./AppContext";
import { metrics } from "../lib/data";

export function Dashboard() {
  const { setView, setProfileOpen, activity } = useApp();

  const handleMetricClick = (metric) => {
    if (metric.id === "rating") {
      setProfileOpen(true);
      return;
    }
    if (metric.target) setView(metric.target);
  };

  const appliedEntries = activity.filter((entry) => entry.id.startsWith("act-applied-"));
  const seedEntries = activity.filter((entry) => /^act-\d+$/.test(entry.id)).slice(0, 4);
  const recentEntries = [...appliedEntries.slice(0, 2), ...seedEntries];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {metrics.map((metric) => (
          <Cards
            key={metric.id}
            name={metric.name}
            value={metric.value}
            short_txt={metric.short_txt}
            link={metric.link}
            star={metric.star}
            icon={metric.icon}
            icon_bg={metric.icon_bg}
            onClick={metric.link ? () => handleMetricClick(metric) : undefined}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-start">
        <div className="lg:col-span-2">
          <RecentActivity
            entries={recentEntries}
            onViewAll={() => setView("Activity")}
            sampleNote
          />
        </div>
        <ProfileCard />
      </div>

      <RecommendedGigs />

      <ActiveTasks />
    </div>
  );
}
