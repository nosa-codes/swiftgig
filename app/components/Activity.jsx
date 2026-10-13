"use client";

import RecentActivity from "./RecentActivity";
import { useApp } from "./AppContext";

export default function Activity() {
  const { activity } = useApp();

  return (
    <RecentActivity
      entries={activity}
      title="Activity History"
      subtitle="Full feed of task milestones, alerts and disbursements"
      sampleNote
    />
  );
}
