"use client";

import React, { useState, useMemo } from "react";
import { useSuperHR } from "@/context/SuperHRContext";
import { NotificationLog } from "@/types";
import { exportToCSV } from "@/lib/utils";
import {
  Bell,
  Search,
  Building2,
  Filter,
  Download,
  MessageCircle,
  Mail,
  Smartphone,
  CheckCheck,
  Check,
  Clock,
  ShieldCheck,
  Zap,
  ExternalLink,
} from "lucide-react";

export default function NotificationsPage() {
  const { notifications, companies, selectedCompanyId, setSelectedCompanyId, showToast } =
    useSuperHR();

  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return notifications.filter((notif) => {
      const matchComp = selectedCompanyId === "all" || notif.companyId === selectedCompanyId;
      const matchChannel = channelFilter === "ALL" || notif.channel === channelFilter;
      const matchType = typeFilter === "ALL" || notif.notificationType === typeFilter;
      const matchSearch =
        notif.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        notif.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        notif.documentType.toLowerCase().includes(search.toLowerCase()) ||
        notif.messagePreview.toLowerCase().includes(search.toLowerCase());

      return matchComp && matchChannel && matchType && matchSearch;
    });
  }, [notifications, selectedCompanyId, channelFilter, typeFilter, search]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleExportCSV = () => {
    const data = filtered.map((n) => ({
      ID: n.id,
      EmployeeID: n.employeeId,
      EmployeeName: n.employeeName,
      Company: n.companyName,
      NotificationType: n.notificationType,
      DocumentType: n.documentType,
      DateSent: n.dateSent,
      Channel: n.channel,
      Status: n.status,
      Message: n.messagePreview,
    }));
    exportToCSV("Super_HR_Notification_Delivery_Log", data);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 sm:gap-2.5">
            <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            Automated Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dispatch rules engine, SMS gateways, Email alerts and multi-channel compliance audit trail.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Delivery Log</span>
          </button>
        </div>
      </div>

      {/* 4 Active Notification Rules Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Rule 1 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Rule #1
            </span>
            <span className="text-xs font-bold text-slate-700">T - 30 Days</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Early Warning Notice</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Dispatches automated SMS & Email alerts with renewal checklist and CCHI portal status.
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
            <Zap className="w-3.5 h-3.5" />
            <span>Automated Cron Active</span>
          </div>
        </div>

        {/* Rule 2 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              Rule #2
            </span>
            <span className="text-xs font-bold text-slate-700">T - 7 Days</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Critical Window Alert</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            High-priority dispatch sent to employee & fleet operations manager alerting Jawazat renewal queue.
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
            <Zap className="w-3.5 h-3.5" />
            <span>Automated Cron Active</span>
          </div>
        </div>

        {/* Rule 3 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              Rule #3
            </span>
            <span className="text-xs font-bold text-slate-700">T - 0 Days</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Expiration Day Notice</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Automated escalation notification to Central Operations. Fleet driving clearance flagged for pause.
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
            <Zap className="w-3.5 h-3.5" />
            <span>Automated Cron Active</span>
          </div>
        </div>

        {/* Rule 4 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
              Rule #4
            </span>
            <span className="text-xs font-bold text-slate-700">Post Expiry</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Overdue Suspension Escalation</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Repeated daily alerts dispatched with direct administrative escalation to Legal and General HR.
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
            <Zap className="w-3.5 h-3.5" />
            <span>Automated Cron Active</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search notifications, employee, text..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
          {/* Company Filter */}
          <div className="flex-1 sm:flex-none flex items-center gap-1.5 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <select
              value={selectedCompanyId}
              onChange={(e) => {
                setSelectedCompanyId(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="all">All Companies</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Channel Filter */}
          <div className="flex-1 sm:flex-none flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <select
              value={channelFilter}
              onChange={(e) => {
                setChannelFilter(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Channels</option>
              <option value="SMS">SMS Gateway</option>
              <option value="EMAIL">Email</option>
              <option value="WHATSAPP">WhatsApp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Mobile Swipe Notice */}
        <div className="md:hidden px-4 py-2 bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500 font-medium text-center flex items-center justify-center gap-1.5">
          <span>←</span>
          <span>Swipe horizontally to view full delivery log</span>
          <span>→</span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[780px] text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Recipient Employee</th>
                <th className="py-3.5 px-4">Entity</th>
                <th className="py-3.5 px-4">Channel</th>
                <th className="py-3.5 px-4">Trigger / Notice Type</th>
                <th className="py-3.5 px-4">Message Snippet</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No notification history matches the current filters.
                  </td>
                </tr>
              ) : (
                paginated.map((notif) => {
                  let ChannelIcon = MessageCircle;
                  let channelClass = "text-emerald-600 bg-emerald-50";
                  if (notif.channel === "EMAIL") {
                    ChannelIcon = Mail;
                    channelClass = "text-blue-600 bg-blue-50";
                  } else if (notif.channel === "SMS") {
                    ChannelIcon = Smartphone;
                    channelClass = "text-purple-600 bg-purple-50";
                  }

                  return (
                    <tr key={notif.id} className="hover:bg-slate-50/60 transition group">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{notif.employeeName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{notif.employeeId}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 block truncate max-w-[150px]">
                          {notif.companyName}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold ${channelClass}`}
                        >
                          <ChannelIcon className="w-3.5 h-3.5" />
                          {notif.channel}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block">{notif.documentType}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{notif.notificationType}</span>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="text-slate-600 line-clamp-2 leading-relaxed">{notif.messagePreview}</p>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{notif.dateSent}</td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCheck className="w-3 h-3 text-emerald-600" />
                          {notif.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            showToast({
                              type: "info",
                              title: "Notification Log Verified",
                              message: `Delivered to ${notif.employeeName} via ${notif.channel} (${notif.status}).`,
                            });
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                        >
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50/60 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} logs
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded-lg border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition"
            >
              Previous
            </button>
            <span className="font-semibold text-slate-800">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded-lg border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
