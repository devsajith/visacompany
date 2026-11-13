"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSuperHR } from "@/context/SuperHRContext";
import { Employee } from "@/types";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmployeeEssentialDocumentsModal } from "@/components/employees/EmployeeEssentialDocumentsModal";
import { formatDate } from "@/lib/utils";
import {
  Users,
  CalendarClock,
  Activity,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Eye,
} from "lucide-react";

export function DashboardFeeds() {
  const { employees, expiryItems, auditLogs, selectedCompanyId } = useSuperHR();
  const [selectedEmpForDocs, setSelectedEmpForDocs] = useState<Employee | null>(null);

  const filteredEmployees =
    selectedCompanyId === "all"
      ? employees
      : employees.filter((e) => e.companyId === selectedCompanyId);

  const filteredExpiry =
    selectedCompanyId === "all"
      ? expiryItems
      : expiryItems.filter((e) => e.companyId === selectedCompanyId);

  const recentEmployees = [...filteredEmployees].slice(0, 5);
  const urgentExpiries = filteredExpiry
    .filter((e) => e.category === "expired" || e.category === "7days" || e.category === "30days")
    .slice(0, 5);

  const handleOpenEmployeeDocs = (empId: string) => {
    const emp = employees.find((e) => e.id === empId || e.employeeId === empId);
    if (emp) setSelectedEmpForDocs(emp);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* 1. Upcoming Expiry Alerts Radar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <CalendarClock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Urgent Document Radar</h3>
                <p className="text-[11px] text-slate-500">Iqama, Licenses & Insurance renewals</p>
              </div>
            </div>
            <Link
              href="/companies"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Inspect <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
            {urgentExpiries.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenEmployeeDocs(item.employeeId)}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-xl cursor-pointer transition"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate hover:text-blue-600">
                      {item.employeeName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">({item.employeeId})</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span className="font-medium text-slate-700">{item.documentType}</span>
                    <span>•</span>
                    <span className="text-red-600 font-semibold">Exp: {formatDate(item.expiryDate)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <StatusBadge type="expiry" value={item.category} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Recent Employee Additions */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Employee Additions</h3>
                <p className="text-[11px] text-slate-500">Click to view employee details & papers</p>
              </div>
            </div>
            <Link
              href="/companies"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Companies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
            {recentEmployees.map((emp) => (
              <div
                key={emp.id}
                onClick={() => setSelectedEmpForDocs(emp)}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-xl cursor-pointer transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-800 to-blue-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {emp.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 hover:text-blue-600 truncate">
                      {emp.fullName}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{emp.designation}</div>
                    <div className="text-[10px] text-blue-600 font-medium truncate">{emp.companyName}</div>
                  </div>
                </div>
                <StatusBadge type="employment" value={emp.employmentStatus} />
              </div>
            ))}
          </div>
        </div>

        {/* 3. System Audit Trail */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Live System Activities</h3>
                <p className="text-[11px] text-slate-500">Audit logs & administrative operations</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Feed
            </span>
          </div>

          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="py-3 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-900 truncate">{log.action}</span>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{log.timestamp.slice(11, 16)}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">{log.details}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                  <span>By: {log.actorName}</span>
                  <span>•</span>
                  <span className="font-mono">{log.ipAddress || "Internal"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Essential Documents Modal Triggered on Dashboard */}
      <EmployeeEssentialDocumentsModal
        employee={selectedEmpForDocs}
        onClose={() => setSelectedEmpForDocs(null)}
      />
    </>
  );
}
