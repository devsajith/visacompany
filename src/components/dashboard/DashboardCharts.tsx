"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { useSuperHR } from "@/context/SuperHRContext";

const COLORS = ["#2563eb", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

export function DashboardCharts() {
  const { companies, employees, insurances, expiryItems, selectedCompanyId } = useSuperHR();

  // 1. Employee distribution by company
  const companyDistribution = companies.map((c) => {
    const count = employees.filter((e) => e.companyId === c.id).length;
    return {
      name: c.code,
      fullName: c.name,
      employees: count,
    };
  });

  // 2. Visa & Paper Expiry Overview
  const filteredExpiry = selectedCompanyId === "all" ? expiryItems : expiryItems.filter(i => i.companyId === selectedCompanyId);
  const paperExpiryData = [
    { category: "Expired", count: filteredExpiry.filter(i => i.category === "expired").length, fill: "#ef4444" },
    { category: "≤ 7 Days", count: filteredExpiry.filter(i => i.category === "7days").length, fill: "#f43f5e" },
    { category: "≤ 30 Days", count: filteredExpiry.filter(i => i.category === "30days").length, fill: "#f59e0b" },
    { category: "≤ 60 Days", count: filteredExpiry.filter(i => i.category === "60days").length, fill: "#3b82f6" },
    { category: "Valid (>60d)", count: filteredExpiry.filter(i => i.category === "valid").length, fill: "#10b981" },
  ];

  // 3. Insurance Expiry Status
  const activeIns = insurances.filter((i) => i.status === "ACTIVE").length;
  const expiringIns = insurances.filter((i) => i.status === "EXPIRING_SOON").length;
  const expiredIns = insurances.filter((i) => i.status === "EXPIRED").length;

  const insuranceData = [
    { name: "Valid Policies", value: activeIns, color: "#10b981" },
    { name: "Expiring (<30d)", value: expiringIns, color: "#f59e0b" },
    { name: "Expired", value: expiredIns, color: "#ef4444" },
  ];

  // 4. Employee Joining Trends (Past 6 Months)
  const joiningTrend = [
    { month: "Jun 2026", hires: 12, terminations: 2 },
    { month: "Jul 2026", hires: 19, terminations: 3 },
    { month: "Aug 2026", hires: 24, terminations: 1 },
    { month: "Sep 2026", hires: 16, terminations: 4 },
    { month: "Oct 2026", hires: 28, terminations: 2 },
    { month: "Nov 2026", hires: 15, terminations: 0 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Chart 1: Workforce Distribution */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Employee Distribution</h3>
            <p className="text-xs text-slate-500">Workforce headcounts across 12 associated logistics entities</p>
          </div>
          <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg">
            Live Metric
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={companyDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} interval={0} angle={-35} textAnchor="end" />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip
                formatter={(val: any) => [`${val} Employees`, "Headcount"]}
                labelFormatter={(label) => {
                  const comp = companyDistribution.find((c) => c.name === label);
                  return comp?.fullName || label;
                }}
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="employees" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Visa & Paper Expiry Status */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Paper & Visa Expiry Timeline</h3>
            <p className="text-xs text-slate-500">Iqamas, licenses, passports & Qiwa contracts radar</p>
          </div>
          <span className="text-xs font-semibold bg-red-50 text-red-700 px-2.5 py-1 rounded-lg">
            Compliance Radar
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paperExpiryData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="category" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip
                formatter={(val: any) => [`${val} Documents`, "Count"]}
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {paperExpiryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Insurance Expiry Distribution */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Insurance Expiry Breakdown</h3>
            <p className="text-xs text-slate-500">Medical policy status across Bupa, Tawuniya & Medgulf</p>
          </div>
          <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg">
            CCHI Portal
          </span>
        </div>
        <div className="h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={insuranceData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {insuranceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 4: Employee Joining & Retention Trends */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Workforce Growth Trends</h3>
            <p className="text-xs text-slate-500">Monthly new hires vs offboarding over past two quarters</p>
          </div>
          <span className="text-xs font-semibold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg">
            +18% Net
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={joiningTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="hiresGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="termGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
              <Area
                type="monotone"
                dataKey="hires"
                name="New Hires"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#hiresGradient)"
              />
              <Area
                type="monotone"
                dataKey="terminations"
                name="Exits / Terminations"
                stroke="#f43f5e"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#termGradient)"
              />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
