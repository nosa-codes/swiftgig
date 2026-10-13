"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  activityFeed as seedActivity,
  initialTasks,
  notifications as seedNotifications,
  user as seedUser,
} from "../lib/data";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [view, setView] = useState("Dashboard");
  const [available, setAvailable] = useState(seedUser.available);
  const [gigModal, setGigModal] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [appliedIds, setAppliedIds] = useState([]);
  const [tasks, setTasks] = useState(initialTasks);
  const [notifications, setNotifications] = useState(seedNotifications);
  const [activity, setActivity] = useState(seedActivity);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleAvailable = useCallback(() => {
    setAvailable((prev) => {
      const next = !prev;
      toast.info(next ? "You're marked as available" : "You're marked as unavailable", {
        description: "Availability is synced across your profile (demo only).",
      });
      return next;
    });
  }, []);

  const openGig = useCallback((gig) => setGigModal(gig), []);
  const closeGig = useCallback(() => setGigModal(null), []);

  const applyToGig = useCallback(
    (gig) => {
      if (!gig || appliedIds.includes(gig.id)) return;
      setAppliedIds((prev) => [...prev, gig.id]);
      setActivity((prev) => [
        {
          id: `act-applied-${gig.id}`,
          title: "Application Submitted (Simulated)",
          desc: `Prototype application for "${gig.title}" was recorded locally.`,
          amount: null,
          status: "Pending",
          tone: "pending",
          timestamp: "Just now",
          author: gig.client,
          category: "Tasks",
          icon: "clock",
        },
        ...prev,
      ]);
      toast.success("Application recorded (simulated)", {
        description: "This prototype does not send real applications — nothing left your browser.",
      });
    },
    [appliedIds]
  );

  const submitTask = useCallback((taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, progress: 100, status: "In Review", tone: "review" }
          : task
      )
    );
    toast.success("Deliverable marked as submitted (simulated)", {
      description: "No files were uploaded — this is a frontend-only prototype.",
    });
  }, []);

  const messageClient = useCallback((client) => {
    toast.info(`Message to ${client} (simulated)`, {
      description: "Messaging requires a backend and is not wired up in this prototype.",
    });
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  }, []);

  const simulateWithdraw = useCallback(() => {
    toast.info("Simulated payout", {
      description: "This prototype cannot move real money — no withdrawal was made.",
    });
  }, []);

  const value = useMemo(
    () => ({
      view,
      setView,
      available,
      toggleAvailable,
      gigModal,
      openGig,
      closeGig,
      profileOpen,
      setProfileOpen,
      appliedIds,
      applyToGig,
      tasks,
      submitTask,
      messageClient,
      notifications,
      unreadCount,
      markNotificationRead,
      markAllNotificationsRead,
      activity,
      simulateWithdraw,
    }),
    [
      view,
      available,
      toggleAvailable,
      gigModal,
      openGig,
      closeGig,
      profileOpen,
      appliedIds,
      applyToGig,
      tasks,
      submitTask,
      messageClient,
      notifications,
      unreadCount,
      markNotificationRead,
      markAllNotificationsRead,
      activity,
      simulateWithdraw,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
