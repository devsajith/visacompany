"use client";

import React from "react";
import { useSuperHR } from "@/context/SuperHRContext";
import { KPIOverview } from "@/components/dashboard/KPIOverview";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { DashboardFeeds } from "@/components/dashboard/DashboardFeeds";
import { Building2, Sparkles, Download, Plus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { exportToCSV } from "@/lib/utils";

export default function DashboardPage() {
  const { companies, selectedCompanyId, setSelectedCompanyId, employees } = useSuperHR();

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  const handleExportDashboardSummary = () => {
    const summaryData = companies.map((c) => ({
      CompanyCode: c.code,
      CompanyName: c.name,
      CRNumber: c.crNumber,
      City: c.city,
      TotalEmployees: employees.filter((e) => e.companyId === c.id).length,
      ActiveEmployees: employees.filter((e) => e.companyId === c.id && e.employmentStatus === "ACTIVE").length,
      Status: c.status,
    }));
    exportToCSV("Super_Logistics_Group_Executive_Summary", summaryData);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-white shadow-xl relative overflow-hidden">
        {/* Background Decorative Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/20 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Central Command Center • Super Logistics KSA
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              WPS & Qiwa Integrated
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
            Workforce & Operations Management
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Centralized multi-tenant HR portal for 12 logistics entities and hundreds of transport & supply chain personnel across the Kingdom.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          <button
            onClick={handleExportDashboardSummary}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/10 transition w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export Group Report</span>
          </button>

          <Link
            href="/companies"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Companies & Workforce</span>
          </Link>
        </div>
      </div>

      {/* Filter notice if filtered by company */}
      {selectedCompanyId !== "all" && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Currently Filtered</p>
              <h4 className="text-sm font-bold text-slate-900">{selectedCompany?.name}</h4>
            </div>
          </div>
          <button
            onClick={() => setSelectedCompanyId("all")}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 bg-white px-3 py-1.5 rounded-xl border border-blue-200 transition"
          >
            Reset to All Companies
          </button>
        </div>
      )}

      {/* 1. KPI Cards */}
      <KPIOverview />

      {/* 2. Analytical Charts */}
      <DashboardCharts />

      {/* 3. Feeds: Urgent Expirations, Recent Hires, Audit Log */}
      <DashboardFeeds />
    </div>
  );
}
