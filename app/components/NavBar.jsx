"use client";

import { useCallback, useRef, useState } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import {
  FiActivity,
  FiBell,
  FiCheckSquare,
  FiChevronDown,
  FiClock,
  FiCreditCard,
  FiHome,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { FaWallet } from "react-icons/fa6";
import Avatar from "./Avatar";
import useDismiss from "./useDismiss";
import { useApp } from "./AppContext";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", view: "Dashboard" },
  { label: "Find Gigs", view: "Gigs" },
  { label: "My Tasks", view: "Tasks" },
  { label: "Earnings", view: "Earnings" },
  { label: "Activity", view: "Activity" },
];

const notificationIcons = {
  zap: <FiSearch className="text-purple-500" />,
  payment: <FaWallet className="text-sky-500" />,
  clock: <FiClock className="text-amber-500" />,
  check: <FiCheckSquare className="text-green-500" />,
};

export default function NavBar() {
  const {
    view,
    setView,
    available,
    toggleAvailable,
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    setProfileOpen,
  } = useApp();

  const [bellOpen, setBellOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const bellRef = useRef(null);
  const menuRef = useRef(null);

  const closeBell = useCallback(() => setBellOpen(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useDismiss(bellRef, bellOpen, closeBell);
  useDismiss(menuRef, menuOpen, closeMenu);

  const go = (target) => {
    setView(target);
    setBellOpen(false);
    setMenuOpen(false);
  };

  const openProfile = () => {
    setMenuOpen(false);
    setProfileOpen(true);
  };

  return (
    <>
      <header className="bg-white/95 border-b border-slate-200/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => go("Dashboard")}
              aria-label="SwiftGig home"
              className="bg-black rounded-xl p-2 flex w-fit items-center justify-center cursor-pointer"
            >
              <AiOutlineThunderbolt className="text-sky-400 text-xl" />
            </button>

            <h1 className="relative text-lg font-bold tracking-tight">
              SwiftGig
              <small className="hidden sm:inline-flex absolute text-[10px] text-slate-500 font-light border border-slate-400/50 py-0.5 items-center px-1 rounded bottom-0 left-full ml-1.5">
                PARTNER
              </small>
            </h1>
          </div>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                type="button"
                onClick={() => go(item.view)}
                aria-current={view === item.view ? "page" : undefined}
                className={`text-slate-950 tracking-tight text-sm cursor-pointer rounded-lg px-3 py-1.5 transition-all duration-200 ${
                  view === item.view
                    ? "bg-slate-200/60 font-semibold"
                    : "hover:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => go("Gigs")}
              aria-label="Find a Gig"
              className="bg-black text-white rounded-xl px-3 sm:px-4 py-2 flex items-center justify-center gap-1.5 text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <FiSearch className="text-sky-400" />
              <span className="hidden sm:inline">Find a Gig</span>
            </button>

            <div className="relative" ref={bellRef}>
              <button
                type="button"
                aria-label={
                  unreadCount > 0
                    ? `Notifications, ${unreadCount} unread`
                    : "Notifications"
                }
                aria-expanded={bellOpen}
                aria-haspopup="true"
                onClick={() => {
                  setBellOpen((prev) => !prev);
                  setMenuOpen(false);
                }}
                className="flex relative items-center justify-center rounded-xl hover:bg-slate-100 h-10 w-10 transition-colors cursor-pointer"
              >
                <FiBell size={20} className="text-slate-700" />
                {unreadCount > 0 ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500 border-2 border-white absolute top-2 right-2" />
                ) : null}
              </button>

              {bellOpen ? (
                <div
                  role="menu"
                  aria-label="Notifications"
                  className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 bg-white border border-slate-200/80 rounded-xl shadow-lg overflow-hidden z-50"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/80">
                    <p className="font-bold text-sm tracking-tight">Notifications</p>
                    <button
                      type="button"
                      onClick={markAllNotificationsRead}
                      disabled={unreadCount === 0}
                      className={`text-xs font-semibold ${
                        unreadCount === 0
                          ? "text-slate-300 cursor-not-allowed"
                          : "text-sky-600 hover:text-sky-700 cursor-pointer"
                      }`}
                    >
                      Mark all read
                    </button>
                  </div>
                  <ul className="max-h-80 overflow-y-auto divide-y divide-slate-200/80">
                    {notifications.map((n) => (
                      <li key={n.id}>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => markNotificationRead(n.id)}
                          className={`w-full text-left flex gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                            n.read ? "" : "bg-sky-50/50"
                          }`}
                        >
                          <span className="h-8 w-8 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center">
                            {notificationIcons[n.icon] ?? <FiBell className="text-slate-500" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center justify-between gap-2">
                              <span className="text-sm font-semibold">{n.title}</span>
                              {!n.read ? (
                                <span
                                  className="h-2 w-2 rounded-full bg-sky-500 shrink-0"
                                  aria-label="Unread"
                                />
                              ) : null}
                            </span>
                            <span className="block text-xs text-slate-500 mt-0.5">
                              {n.desc}
                            </span>
                            <span className="block text-xs text-slate-400 mt-1">
                              {n.timestamp}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-2.5 border-t border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => go("Activity")}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
                    >
                      View all activity →
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-label="Account menu"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                onClick={() => {
                  setMenuOpen((prev) => !prev);
                  setBellOpen(false);
                }}
                className="flex items-center gap-2.5 border border-slate-200/80 p-1.5 pr-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Avatar name="Alex Morgan" available={available} />
                <span className="hidden md:block text-slate-600 font-semibold tracking-tight text-sm">
                  Alex Morgan
                </span>
                <FiChevronDown
                  className={`hidden md:block text-slate-500 transition-transform ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {menuOpen ? (
                <div
                  role="menu"
                  aria-label="Account"
                  className="absolute right-0 mt-2 w-64 bg-white border border-slate-200/80 rounded-xl shadow-lg overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-slate-200/80">
                    <p className="text-sm font-bold tracking-tight">Alex Morgan</p>
                    <p className="text-xs text-slate-500">Verified Task Partner</p>
                  </div>
                  <div className="p-1.5">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={openProfile}
                      className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <FiUser className="text-slate-400" /> View profile
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => go("Gigs")}
                      className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <FiSearch className="text-slate-400" /> Find a Gig
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => go("Earnings")}
                      className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <FaWallet className="text-slate-400" /> Earnings
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={toggleAvailable}
                      className="w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <FiActivity className="text-slate-400" /> Availability
                      </span>
                      <span
                        role="switch"
                        aria-checked={available}
                        className={`relative h-5 w-9 rounded-full transition-colors ${
                          available ? "bg-green-500" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                            available ? "left-[18px]" : "left-0.5"
                          }`}
                        />
                      </span>
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        toast.info("Settings (simulated)", {
                          description: "Settings aren't part of this prototype.",
                        });
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <FiCreditCard className="text-slate-400" /> Payout settings
                    </button>
                  </div>
                  <div className="p-1.5 border-t border-slate-200/80">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        toast.info("Signed out (simulated)", {
                          description: "This prototype has no real authentication.",
                        });
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <nav
        aria-label="Mobile primary"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 border-t border-slate-200/80 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="grid grid-cols-5">
          {navItems.map((item) => {
            const active = view === item.view;
            const prominent = item.view === "Gigs";
            return (
              <li key={item.view}>
                <button
                  type="button"
                  onClick={() => go(item.view)}
                  aria-current={active ? "page" : undefined}
                  className={`w-full flex flex-col items-center justify-center gap-1 py-2.5 px-1 min-h-14 text-[10px] font-semibold transition-colors cursor-pointer ${
                    prominent
                      ? "text-sky-600"
                      : active
                        ? "text-slate-900"
                        : "text-slate-400"
                  }`}
                >
                  <span
                    className={`h-7 w-12 rounded-full flex items-center justify-center transition-colors ${
                      prominent
                        ? "bg-slate-900 text-sky-400"
                        : active
                          ? "bg-slate-200/70 text-slate-900"
                          : "text-slate-400"
                    }`}
                  >
                    {item.view === "Dashboard" ? (
                      <FiHome size={15} />
                    ) : item.view === "Gigs" ? (
                      <FiSearch size={15} />
                    ) : item.view === "Tasks" ? (
                      <FiCheckSquare size={15} />
                    ) : item.view === "Earnings" ? (
                      <FaWallet size={14} />
                    ) : (
                      <FiActivity size={15} />
                    )}
                  </span>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
