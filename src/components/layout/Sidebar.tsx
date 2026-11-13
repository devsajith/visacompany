"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Bell,
  ChevronLeft,
  ChevronRight,
  Truck,
  Sparkles,
} from "lucide-react";
import { useSuperHR } from "@/context/SuperHRContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: "expired" | "notifications";
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Companies", href: "/companies", icon: Building2 },
  { label: "Notifications", href: "/notifications", icon: Bell, badge: "notifications" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { expiryItems, notifications, companies, selectedCompanyId, setSelectedCompanyId } = useSuperHR();

  const expiredCount = expiryItems.filter((i) => i.category === "expired" || i.category === "7days").length;
  const unreadNotifsCount = notifications.slice(0, 5).length;

  return (
    <aside
      className={`relative z-30 flex flex-col bg-[#0b1728] text-slate-300 transition-all duration-300 ease-in-out border-r border-slate-800/80 shadow-2xl select-none ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800/80">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 flex-shrink-0">
            <Truck className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col leading-tight truncate">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                Super HR
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.2 rounded">
                  KSA
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium truncate">
                Super Logistics Holding
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                  isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200 group-hover:scale-105"
                }`}
              />
              {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}

              {/* Badges */}
              {item.badge === "expired" && expiredCount > 0 && (
                <span
                  className={`inline-flex items-center justify-center text-[10px] font-bold rounded-full px-2 py-0.5 shadow-sm ${
                    isActive ? "bg-white text-red-600" : "bg-red-500/90 text-white"
                  } ${isCollapsed ? "absolute top-1 right-1 px-1.5 py-0.2 text-[9px]" : ""}`}
                >
                  {expiredCount}
                </span>
              )}

              {item.badge === "notifications" && unreadNotifsCount > 0 && (
                <span
                  className={`inline-flex items-center justify-center text-[10px] font-bold rounded-full px-2 py-0.5 shadow-sm ${
                    isActive ? "bg-white text-blue-700" : "bg-blue-500/80 text-white"
                  } ${isCollapsed ? "absolute top-1 right-1 px-1.5 py-0.2 text-[9px]" : ""}`}
                >
                  {unreadNotifsCount}
                </span>
              )}

              {/* Collapsed Tooltip */}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Company Context Pill */}
      {!isCollapsed ? (
        <div className="p-3 mx-3 mb-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5 font-medium">
            <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-400">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Active Company View
            </span>
          </div>
          <select
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
          >
            <option value="all">🏢 All 12 Companies</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="p-3 flex justify-center border-t border-slate-800/80">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" title="System Online (KSA Server)" />
        </div>
      )}
    </aside>
  );
}
