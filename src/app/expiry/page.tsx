"use client";

import React, { useState, useMemo } from "react";
import { useSuperHR } from "@/context/SuperHRContext";
import { ExpiryCategory, ExpiryItem } from "@/types";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate, exportToCSV } from "@/lib/utils";
import {
  CalendarClock,
  Search,
  Building2,
  Filter,
  Download,
  Mail,
  AlertTriangle,
  Clock,
  CheckCircle2,
  AlertOctagon,
  Calendar,
  Send,
} from "lucide-react";

export default function ExpiryManagementPage() {
  const {
    expiryItems,
    companies,
    selectedCompanyId,
    setSelectedCompanyId,
    dispatchNotification,
    showToast,
  } = useSuperHR();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [docTypeFilter, setDocTypeFilter] = useState<string>("ALL");

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Filtered expiry records
  const filtered = useMemo(() => {
    return expiryItems.filter((item) => {
      const matchComp = selectedCompanyId === "all" || item.companyId === selectedCompanyId;
      const matchCategory = categoryFilter === "ALL" || item.category === categoryFilter;
      const matchType = docTypeFilter === "ALL" || item.documentType === docTypeFilter;
      const matchSearch =
        item.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        item.documentNumber.toLowerCase().includes(search.toLowerCase()) ||
        item.companyName.toLowerCase().includes(search.toLowerCase());

      return matchComp && matchCategory && matchType && matchSearch;
    });
  }, [expiryItems, selectedCompanyId, categoryFilter, docTypeFilter, search]);

  const expiredCount = expiryItems.filter((i) => i.category === "expired").length;
  const sevenDaysCount = expiryItems.filter((i) => i.category === "7days").length;
  const thirtyDaysCount = expiryItems.filter((i) => i.category === "30days").length;
  const sixtyDaysCount = expiryItems.filter((i) => i.category === "60days").length;
  const validCount = expiryItems.filter((i) => i.category === "valid").length;

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleExportCSV = () => {
    const data = filtered.map((i) => ({
      EmployeeID: i.employeeId,
      EmployeeName: i.employeeName,
      Company: i.companyName,
      DocumentType: i.documentType,
      DocumentNumber: i.documentNumber,
      ExpiryDate: i.expiryDate,
      DaysRemaining: i.daysRemaining,
      Category: i.category,
      Phone: i.phone,
      Email: i.email,
    }));
    exportToCSV("Super_HR_Expiry_Radar_Report", data);
  };

  const handleSendReminder = (item: ExpiryItem) => {
    dispatchNotification({
      employeeId: item.employeeId,
      employeeName: item.employeeName,
      companyId: item.companyId,
      companyName: item.companyName,
      notificationType: item.category === "expired" ? "OVERDUE_ALERT" : "7_DAYS_BEFORE",
      documentType: item.documentType,
      expiryDate: item.expiryDate,
      channel: "EMAIL",
      messagePreview: `Renewal reminder logged for ${item.employeeName}: ${item.documentType} expires on ${formatDate(item.expiryDate)}.`,
      status: "DELIVERED",
    });
    showToast({
      type: "success",
      title: "Notice Dispatched",
      message: `System expiry notification queued for ${item.employeeName}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <CalendarClock className="w-7 h-7 text-rose-600" />
            Centralized Expiry Radar
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Automated monitoring for Iqamas, heavy driver permits, commercial licenses, medical insurance and contracts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Expiry List</span>
          </button>
        </div>
      </div>

      {/* Visual Timeline / Countdown Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Expired */}
        <div
          onClick={() => {
            setCategoryFilter("expired");
            setPage(1);
          }}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            categoryFilter === "expired"
              ? "bg-red-500 text-white border-red-600 shadow-md shadow-red-500/20"
              : "bg-white border-red-200 text-slate-800 hover:bg-red-50/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider">Expired</span>
            <AlertOctagon className={`w-4 h-4 ${categoryFilter === "expired" ? "text-white" : "text-red-500"}`} />
          </div>
          <p className="text-2xl font-black mt-2">{expiredCount}</p>
          <span className="text-[10px] opacity-80 block mt-1">Immediate action required</span>
        </div>

        {/* 7 Days */}
        <div
          onClick={() => {
            setCategoryFilter("7days");
            setPage(1);
          }}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            categoryFilter === "7days"
              ? "bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/20"
              : "bg-white border-rose-200 text-slate-800 hover:bg-rose-50/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider">&le; 7 Days</span>
            <AlertTriangle className={`w-4 h-4 ${categoryFilter === "7days" ? "text-white" : "text-rose-500"}`} />
          </div>
          <p className="text-2xl font-black mt-2">{sevenDaysCount}</p>
          <span className="text-[10px] opacity-80 block mt-1">Critical renewal window</span>
        </div>

        {/* 30 Days */}
        <div
          onClick={() => {
            setCategoryFilter("30days");
            setPage(1);
          }}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            categoryFilter === "30days"
              ? "bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20"
              : "bg-white border-amber-200 text-slate-800 hover:bg-amber-50/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider">&le; 30 Days</span>
            <Clock className={`w-4 h-4 ${categoryFilter === "30days" ? "text-white" : "text-amber-500"}`} />
          </div>
          <p className="text-2xl font-black mt-2">{thirtyDaysCount}</p>
          <span className="text-[10px] opacity-80 block mt-1">Early notice sent</span>
        </div>

        {/* 60 Days */}
        <div
          onClick={() => {
            setCategoryFilter("60days");
            setPage(1);
          }}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            categoryFilter === "60days"
              ? "bg-yellow-500 text-white border-yellow-600 shadow-md shadow-yellow-500/20"
              : "bg-white border-yellow-200 text-slate-800 hover:bg-yellow-50/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider">&le; 60 Days</span>
            <Calendar className={`w-4 h-4 ${categoryFilter === "60days" ? "text-white" : "text-yellow-600"}`} />
          </div>
          <p className="text-2xl font-black mt-2">{sixtyDaysCount}</p>
          <span className="text-[10px] opacity-80 block mt-1">Scheduled for review</span>
        </div>

        {/* Valid */}
        <div
          onClick={() => {
            setCategoryFilter("valid");
            setPage(1);
          }}
          className={`p-4 rounded-2xl border transition cursor-pointer col-span-2 md:col-span-1 ${
            categoryFilter === "valid"
              ? "bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/20"
              : "bg-white border-emerald-200 text-slate-800 hover:bg-emerald-50/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider">Valid (&gt;60d)</span>
            <CheckCircle2 className={`w-4 h-4 ${categoryFilter === "valid" ? "text-white" : "text-emerald-500"}`} />
          </div>
          <p className="text-2xl font-black mt-2">{validCount}</p>
          <span className="text-[10px] opacity-80 block mt-1">Fully compliant</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col lg:flex-row gap-3 items-center justify-between">
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search employee, ID, doc number..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Company Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCompanyId}
              onChange={(e) => {
                setSelectedCompanyId(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="all">All Companies</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doc Type Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={docTypeFilter}
              onChange={(e) => {
                setDocTypeFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Documents</option>
              <option value="Iqama / National ID">Iqama / National ID</option>
              <option value="Heavy Driving License">Heavy Driving License</option>
              <option value="Medical Insurance">Medical Insurance</option>
              <option value="Passport">Passport</option>
              <option value="Employment Contract">Employment Contract</option>
            </select>
          </div>

          {/* Reset Filter Button */}
          {categoryFilter !== "ALL" && (
            <button
              onClick={() => setCategoryFilter("ALL")}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Clear Category Filter
            </button>
          )}
        </div>
      </div>

      {/* Expiry Items Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Document Type</th>
                <th className="py-3.5 px-4">Document Number</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4">Days Left</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No documents matching this expiry status criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition group">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{item.employeeName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.employeeId}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block truncate max-w-[170px]">
                        {item.companyName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800">{item.documentType}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{item.documentNumber}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{formatDate(item.expiryDate)}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-mono font-bold ${
                          item.daysRemaining < 0
                            ? "text-red-600"
                            : item.daysRemaining <= 7
                            ? "text-rose-600"
                            : item.daysRemaining <= 30
                            ? "text-amber-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {item.daysRemaining < 0
                          ? `-${Math.abs(item.daysRemaining)} days`
                          : `+${item.daysRemaining} days`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge type="expiry" value={item.category} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleSendReminder(item)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
                          title="Dispatch Expiry Notice"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch Notice</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-50/60 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} monitored records
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded-lg border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
            >
              Previous
            </button>
            <span className="font-semibold text-slate-800">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded-lg border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
