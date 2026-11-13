"use client";

import React from "react";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  colorScheme?: "blue" | "emerald" | "amber" | "rose" | "purple" | "slate";
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorScheme = "blue",
  onClick,
}: StatCardProps) {
  const schemeStyles = {
    blue: {
      bg: "bg-blue-50/50 hover:bg-blue-50",
      border: "border-blue-100",
      iconBg: "bg-blue-600 text-white shadow-blue-500/20",
      ring: "group-hover:border-blue-300",
    },
    emerald: {
      bg: "bg-emerald-50/50 hover:bg-emerald-50",
      border: "border-emerald-100",
      iconBg: "bg-emerald-600 text-white shadow-emerald-500/20",
      ring: "group-hover:border-emerald-300",
    },
    amber: {
      bg: "bg-amber-50/50 hover:bg-amber-50",
      border: "border-amber-100",
      iconBg: "bg-amber-500 text-white shadow-amber-500/20",
      ring: "group-hover:border-amber-300",
    },
    rose: {
      bg: "bg-rose-50/50 hover:bg-rose-50",
      border: "border-rose-100",
      iconBg: "bg-rose-600 text-white shadow-rose-500/20",
      ring: "group-hover:border-rose-300",
    },
    purple: {
      bg: "bg-purple-50/50 hover:bg-purple-50",
      border: "border-purple-100",
      iconBg: "bg-purple-600 text-white shadow-purple-500/20",
      ring: "group-hover:border-purple-300",
    },
    slate: {
      bg: "bg-slate-50/60 hover:bg-slate-100/60",
      border: "border-slate-200",
      iconBg: "bg-slate-800 text-white shadow-slate-500/20",
      ring: "group-hover:border-slate-300",
    },
  }[colorScheme];

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-2xl p-5 shadow-xs border transition-all duration-200 ${
        schemeStyles.border
      } ${schemeStyles.ring} ${onClick ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900">{value}</span>
            {trend && (
              <span
                className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                  trend.isPositive ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                }`}
              >
                {trend.isPositive ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                )}
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>}
        </div>

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${schemeStyles.iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
