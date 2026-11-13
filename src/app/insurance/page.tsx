"use client";

import React, { useState, useMemo } from "react";
import { useSuperHR } from "@/context/SuperHRContext";
import { InsuranceRecord, InsuranceStatus } from "@/types";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate, formatSAR, exportToCSV } from "@/lib/utils";
import {
  ShieldCheck,
  Search,
  Building2,
  Filter,
  Download,
  Plus,
  RefreshCw,
  FileText,
  X,
  AlertTriangle,
} from "lucide-react";

export default function InsurancePage() {
  const {
    insurances,
    companies,
    employees,
    selectedCompanyId,
    setSelectedCompanyId,
    addInsurance,
    renewInsurance,
    showToast,
  } = useSuperHR();

  const [search, setSearch] = useState("");
  const [providerFilter, setProviderFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [renewTarget, setRenewTarget] = useState<InsuranceRecord | null>(null);
  const [renewDate, setRenewDate] = useState("2027-11-13");

  // New insurance form state
  const [newIns, setNewIns] = useState({
    employeeId: employees[0]?.employeeId || "",
    employeeName: employees[0]?.fullName || "",
    companyId: companies[0]?.id || "",
    companyName: companies[0]?.name || "",
    provider: "Bupa Arabia" as const,
    policyNumber: `POL-BUP-${Math.floor(100000 + Math.random() * 900000)}`,
    memberId: `MBR-${Math.floor(100000 + Math.random() * 900000)}`,
    category: "Class A" as const,
    startDate: "2026-11-01",
    expiryDate: "2027-11-01",
    status: "ACTIVE" as InsuranceStatus,
    premiumSAR: 4200,
  });

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return insurances.filter((i) => {
      const matchComp = selectedCompanyId === "all" || i.companyId === selectedCompanyId;
      const matchProvider = providerFilter === "ALL" || i.provider === providerFilter;
      const matchStatus = statusFilter === "ALL" || i.status === statusFilter;
      const matchSearch =
        i.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        i.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        i.policyNumber.toLowerCase().includes(search.toLowerCase()) ||
        i.provider.toLowerCase().includes(search.toLowerCase());

      return matchComp && matchProvider && matchStatus && matchSearch;
    });
  }, [insurances, selectedCompanyId, providerFilter, statusFilter, search]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleExportCSV = () => {
    const data = filtered.map((i) => ({
      EmployeeID: i.employeeId,
      EmployeeName: i.employeeName,
      Company: i.companyName,
      Provider: i.provider,
      PolicyNumber: i.policyNumber,
      MemberID: i.memberId,
      Category: i.category,
      StartDate: i.startDate,
      ExpiryDate: i.expiryDate,
      Status: i.status,
      AnnualPremiumSAR: i.premiumSAR,
    }));
    exportToCSV("Super_HR_Insurance_Policies", data);
  };

  const handleCreateInsurance = (e: React.FormEvent) => {
    e.preventDefault();
    addInsurance(newIns);
    setIsAddOpen(false);
  };

  const handleConfirmRenew = () => {
    if (renewTarget) {
      renewInsurance(renewTarget.id, renewDate);
      setRenewTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-blue-600" />
            Medical & Healthcare Insurance
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Council of Cooperative Health Insurance (CCHI) coverage across Bupa Arabia, Tawuniya & Medgulf.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Policy</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Valid Policies</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {insurances.filter((i) => i.status === "ACTIVE").length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expiring &lt; 30 Days</p>
            <p className="text-2xl font-black text-amber-500 mt-1">
              {insurances.filter((i) => i.status === "EXPIRING_SOON").length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expired Policies</p>
            <p className="text-2xl font-black text-rose-600 mt-1">
              {insurances.filter((i) => i.status === "EXPIRED").length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <X className="w-5 h-5" />
          </div>
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
            placeholder="Search employee, policy, provider..."
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

          {/* Provider Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>Provider:</span>
            <select
              value={providerFilter}
              onChange={(e) => {
                setProviderFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Providers</option>
              <option value="Bupa Arabia">Bupa Arabia</option>
              <option value="Tawuniya">Tawuniya</option>
              <option value="Medgulf">Medgulf</option>
              <option value="Malath Insurance">Malath Insurance</option>
              <option value="Al Rajhi Takaful">Al Rajhi Takaful</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="EXPIRING_SOON">Expiring Soon</option>
              <option value="EXPIRED">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Insurance Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Provider & Policy</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Company Entity</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No insurance policy records match the selected filters.
                  </td>
                </tr>
              ) : (
                paginated.map((ins) => (
                  <tr key={ins.id} className="hover:bg-slate-50/60 transition group">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{ins.employeeName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{ins.employeeId}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{ins.provider}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{ins.policyNumber}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.8 rounded-md">
                        {ins.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800 block truncate max-w-[170px]">
                        {ins.companyName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900">{formatDate(ins.expiryDate)}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge type="insurance" value={ins.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setRenewTarget(ins)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Renew</span>
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
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} policies
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

      {/* Add Insurance Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">Register Corporate Insurance Policy</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInsurance} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Employee *</label>
                <select
                  value={newIns.employeeId}
                  onChange={(e) => {
                    const emp = employees.find((emp) => emp.employeeId === e.target.value);
                    if (emp) {
                      setNewIns({
                        ...newIns,
                        employeeId: emp.employeeId,
                        employeeName: emp.fullName,
                        companyId: emp.companyId,
                        companyName: emp.companyName,
                      });
                    }
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {employees.slice(0, 30).map((emp) => (
                    <option key={emp.id} value={emp.employeeId}>
                      {emp.fullName} ({emp.employeeId}) — {emp.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Insurance Provider *</label>
                  <select
                    value={newIns.provider}
                    onChange={(e) => setNewIns({ ...newIns, provider: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Bupa Arabia">Bupa Arabia</option>
                    <option value="Tawuniya">Tawuniya</option>
                    <option value="Medgulf">Medgulf</option>
                    <option value="Malath Insurance">Malath Insurance</option>
                    <option value="Al Rajhi Takaful">Al Rajhi Takaful</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category / Tier</label>
                  <select
                    value={newIns.category}
                    onChange={(e) => setNewIns({ ...newIns, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Class A">Class A</option>
                    <option value="VIP Executive">VIP Executive</option>
                    <option value="Class B">Class B</option>
                    <option value="Class C">Class C</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Policy Number</label>
                  <input
                    type="text"
                    value={newIns.policyNumber}
                    onChange={(e) => setNewIns({ ...newIns, policyNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    value={newIns.expiryDate}
                    onChange={(e) => setNewIns({ ...newIns, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
                >
                  Register Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Renew Policy Modal */}
      {renewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">Renew Insurance Policy</h3>
              <button
                onClick={() => setRenewTarget(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] block">EMPLOYEE</span>
                <span className="font-bold text-slate-900 text-sm">{renewTarget.employeeName}</span>
                <span className="text-slate-500 block font-mono">
                  {renewTarget.provider} • {renewTarget.policyNumber}
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Set New Expiry Date *</label>
                <input
                  type="date"
                  value={renewDate}
                  onChange={(e) => setRenewDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRenewTarget(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmRenew}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
                >
                  Confirm Renewal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
