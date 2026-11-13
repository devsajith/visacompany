"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  Building2,
  RotateCcw,
  UserCheck,
  LogOut,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { useSuperHR } from "@/context/SuperHRContext";
import Link from "next/link";

export function Header() {
  const {
    companies,
    selectedCompanyId,
    setSelectedCompanyId,
    globalSearchQuery,
    setGlobalSearchQuery,
    notifications,
    resetToDemoData,
  } = useSuperHR();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.length;

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-6 flex items-center justify-between shadow-xs">
      {/* Left: Global Search & Active Company Filter */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            placeholder="Search employees, Iqama, CR, documents... (Ctrl + /)"
            className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 transition-all outline-hidden"
          />
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="bg-transparent text-slate-800 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All Associated Companies</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Right: Actions, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Reset Demo Data Pill */}
        <button
          onClick={resetToDemoData}
          title="Reset demo data to initial sample state"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Notifications & Alerts</h4>
                  <p className="text-xs text-slate-500">{notifications.length} automated alerts</p>
                </div>
                <Link
                  href="/notifications"
                  onClick={() => setIsNotifOpen(false)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.slice(0, 4).map((notif) => (
                  <div key={notif.id} className="p-3.5 hover:bg-slate-50 transition cursor-pointer">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-900">{notif.employeeName}</span>
                      <span className="text-[10px] text-slate-400">{notif.channel}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">{notif.messagePreview}</p>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100/60">
                      <span className="text-[10px] text-slate-400">{notif.dateSent}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{notif.documentType}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 text-center">
                <Link
                  href="/companies"
                  onClick={() => setIsNotifOpen(false)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Inspect Companies & Workforce Expiries →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Administrator Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-2 pr-3 py-1 rounded-xl hover:bg-slate-100 transition"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-blue-900 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              AR
            </div>
            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-slate-900">Abdulrahman Al-Rasheed</span>
              <span className="text-[11px] text-slate-500 font-medium">Central HR Administrator</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900">Abdulrahman Al-Rasheed</p>
                <p className="text-xs text-slate-500">superadmin@superlogistics.sa</p>
                <span className="mt-2 inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold text-[10px] rounded-md border border-blue-200">
                  Super Logistics Central Admin
                </span>
              </div>

              <div className="py-1">
                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <UserCheck className="w-4 h-4 text-slate-400" />
                  Admin Profile & Roles
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <Building2 className="w-4 h-4 text-slate-400" />
                  Company Preferences
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    resetToDemoData();
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-amber-700 hover:bg-amber-50"
                >
                  <RotateCcw className="w-4 h-4 text-amber-500" />
                  Reload Demo Workspace
                </button>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  Sign Out (Simulated)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
