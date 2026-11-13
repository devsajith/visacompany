"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSuperHR } from "@/context/SuperHRContext";
import { Company, Employee } from "@/types";
import { CompanyModal } from "@/components/companies/CompanyModal";
import { CompanyDetailModal } from "@/components/companies/CompanyDetailModal";
import { EmployeeModal } from "@/components/employees/EmployeeModal";
import { EmployeeEssentialDocumentsModal } from "@/components/employees/EmployeeEssentialDocumentsModal";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { StatusBadge } from "@/components/common/StatusBadge";
import { exportToCSV, formatDate, calculateDaysRemaining, getExpiryCategory } from "@/lib/utils";
import {
  Building2,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  Power,
  Users,
  MapPin,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  AlertOctagon,
  AlertTriangle,
  Clock,
  FileText,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function CompaniesPage() {
  const {
    companies,
    employees,
    selectedCompanyId,
    setSelectedCompanyId,
    addCompany,
    updateCompany,
    toggleCompanyStatus,
    addEmployee,
    updateEmployee,
  } = useSuperHR();

  // Selected company state for viewing its employees
  const [activeCompany, setActiveCompany] = useState<Company | null>(null);

  // Search & Filters for Companies view
  const [companySearch, setCompanySearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [cityFilter, setCityFilter] = useState<string>("ALL");

  // Search & Filters for Employee List view
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [expiryStatusFilter, setExpiryStatusFilter] = useState<string>("ALL");

  // Modals state
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState<Company | null>(null);
  const [companyToViewInfo, setCompanyToViewInfo] = useState<Company | null>(null);
  const [companyToToggle, setCompanyToToggle] = useState<Company | null>(null);

  const [selectedEmployeeForDocs, setSelectedEmployeeForDocs] = useState<Employee | null>(null);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Auto-sync activeCompany if selectedCompanyId changes from global selector
  useEffect(() => {
    if (selectedCompanyId && selectedCompanyId !== "all") {
      const comp = companies.find((c) => c.id === selectedCompanyId);
      if (comp) setActiveCompany(comp);
    }
  }, [selectedCompanyId, companies]);

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(companySearch.toLowerCase()) ||
        c.code.toLowerCase().includes(companySearch.toLowerCase()) ||
        c.crNumber.includes(companySearch) ||
        c.contactPerson.toLowerCase().includes(companySearch.toLowerCase());

      const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
      const matchCity = cityFilter === "ALL" || c.city === cityFilter;

      return matchSearch && matchStatus && matchCity;
    });
  }, [companies, companySearch, statusFilter, cityFilter]);

  // Filtered employees for the active company
  const companyEmployees = useMemo(() => {
    if (!activeCompany) return [];

    return employees
      .filter((e) => e.companyId === activeCompany.id)
      .filter((emp) => {
        const matchSearch =
          emp.fullName.toLowerCase().includes(employeeSearch.toLowerCase()) ||
          emp.employeeId.toLowerCase().includes(employeeSearch.toLowerCase()) ||
          emp.nationalId.includes(employeeSearch) ||
          emp.designation.toLowerCase().includes(employeeSearch.toLowerCase()) ||
          emp.department.toLowerCase().includes(employeeSearch.toLowerCase());

        // Calculate overall expiry category for filtering
        const iqamaDays = calculateDaysRemaining(emp.iqamaExpiry);
        const licDays = calculateDaysRemaining(emp.licenseExpiry);
        const insDays = calculateDaysRemaining(emp.insuranceExpiry);
        const passDays = calculateDaysRemaining(emp.passportExpiry);

        const minDays = Math.min(iqamaDays, licDays, insDays, passDays);
        const overallCategory = getExpiryCategory(minDays);

        let matchExpiry = true;
        if (expiryStatusFilter === "EXPIRED") {
          matchExpiry = overallCategory === "expired";
        } else if (expiryStatusFilter === "7DAYS") {
          matchExpiry = overallCategory === "7days" || overallCategory === "expired";
        } else if (expiryStatusFilter === "30DAYS") {
          matchExpiry = overallCategory === "30days" || overallCategory === "7days" || overallCategory === "expired";
        } else if (expiryStatusFilter === "VALID") {
          matchExpiry = overallCategory === "valid";
        }

        return matchSearch && matchExpiry;
      });
  }, [activeCompany, employees, employeeSearch, expiryStatusFilter]);

  const totalPages = Math.ceil((activeCompany ? companyEmployees.length : filteredCompanies.length) / pageSize) || 1;
  const paginatedEmployees = companyEmployees.slice((page - 1) * pageSize, page * pageSize);
  const paginatedCompanies = filteredCompanies.slice((page - 1) * pageSize, page * pageSize);

  // Statistics for selected company
  const activeCompanyStats = useMemo(() => {
    if (!activeCompany) return { total: 0, expired: 0, urgent: 0, valid: 0 };
    const emps = employees.filter((e) => e.companyId === activeCompany.id);

    let expired = 0;
    let urgent = 0;
    let valid = 0;

    emps.forEach((emp) => {
      const iqamaDays = calculateDaysRemaining(emp.iqamaExpiry);
      const licDays = calculateDaysRemaining(emp.licenseExpiry);
      const insDays = calculateDaysRemaining(emp.insuranceExpiry);
      const minDays = Math.min(iqamaDays, licDays, insDays);
      const cat = getExpiryCategory(minDays);

      if (cat === "expired") expired++;
      else if (cat === "7days" || cat === "30days") urgent++;
      else valid++;
    });

    return { total: emps.length, expired, urgent, valid };
  }, [activeCompany, employees]);

  // Export functions
  const handleExportCompaniesCSV = () => {
    const data = filteredCompanies.map((c) => ({
      Code: c.code,
      Name: c.name,
      CRNumber: c.crNumber,
      City: c.city,
      Contact: c.contactPerson,
      Phone: c.phone,
      Email: c.email,
      Status: c.status,
      EmployeesCount: employees.filter((e) => e.companyId === c.id).length,
    }));
    exportToCSV("Super_HR_Associated_Companies", data);
  };

  const handleExportCompanyEmployeesCSV = () => {
    if (!activeCompany) return;
    const data = companyEmployees.map((e) => ({
      EmployeeID: e.employeeId,
      FullName: e.fullName,
      Nationality: e.nationality,
      IqamaNationalID: e.nationalId,
      Designation: e.designation,
      IqamaExpiry: e.iqamaExpiry,
      DrivingLicenseExpiry: e.licenseExpiry,
      PassportExpiry: e.passportExpiry,
      MedicalInsuranceExpiry: e.insuranceExpiry,
      ContractExpiry: e.contractExpiry,
      Phone: e.phone,
      Email: e.email,
    }));
    exportToCSV(`${activeCompany.code}_Employees_Visa_Paper_Expiries`, data);
  };

  return (
    <div className="space-y-6">
      {/* VIEW 1: WHEN A COMPANY IS SELECTED -> DISPLAY EMPLOYEES & VISA/PAPER EXPIRIES */}
      {activeCompany ? (
        <div className="space-y-6 animate-in fade-in">
          {/* Back Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              onClick={() => {
                setActiveCompany(null);
                setSelectedCompanyId("all");
                setPage(1);
              }}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition shadow-2xs w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 text-blue-600" />
              <span>Back to All 12 Companies</span>
            </button>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleExportCompanyEmployeesCSV}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition shadow-2xs"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setIsAddEmployeeOpen(true)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Employee</span>
              </button>
            </div>
          </div>

          {/* Company Context Header Card */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-white font-black text-lg sm:text-xl flex-shrink-0 shadow-lg">
                  {activeCompany.code}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                      {activeCompany.status}
                    </span>
                    <span className="text-xs text-blue-300 font-mono">CR: {activeCompany.crNumber}</span>
                    <span className="text-xs text-slate-400">• {activeCompany.city}, KSA</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">{activeCompany.name}</h1>
                  <p className="text-xs text-slate-300 mt-1">
                    Workforce directory with live Visa, Iqama, Driving license, Passport, and Insurance status.
                  </p>
                </div>
              </div>

              {/* Quick Summary Pill Counters */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
                <div className="px-3 sm:px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                  <span className="text-[10px] text-slate-300 block font-bold uppercase">Total Staff</span>
                  <span className="text-lg sm:text-xl font-black text-white">{activeCompanyStats.total}</span>
                </div>
                <div
                  onClick={() => setExpiryStatusFilter("EXPIRED")}
                  className="px-3 sm:px-4 py-2 rounded-2xl bg-red-500/20 backdrop-blur-md border border-red-500/30 text-center cursor-pointer hover:bg-red-500/30 transition"
                  title="Filter Expired"
                >
                  <span className="text-[10px] text-red-300 block font-bold uppercase">Expired Papers</span>
                  <span className="text-lg sm:text-xl font-black text-red-400">{activeCompanyStats.expired}</span>
                </div>
                <div
                  onClick={() => setExpiryStatusFilter("30DAYS")}
                  className="px-3 sm:px-4 py-2 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-center cursor-pointer hover:bg-amber-500/30 transition"
                  title="Filter Expiring Soon"
                >
                  <span className="text-[10px] text-amber-300 block font-bold uppercase">&le; 30d Warning</span>
                  <span className="text-lg sm:text-xl font-black text-amber-400">{activeCompanyStats.urgent}</span>
                </div>
                <div
                  onClick={() => setExpiryStatusFilter("VALID")}
                  className="px-3 sm:px-4 py-2 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-center cursor-pointer hover:bg-emerald-500/30 transition"
                  title="Filter Valid"
                >
                  <span className="text-[10px] text-emerald-300 block font-bold uppercase">Valid Papers</span>
                  <span className="text-xl font-black text-emerald-400">{activeCompanyStats.valid}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter and Search Bar for Company Employees */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col lg:flex-row gap-3 items-center justify-between">
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={employeeSearch}
                onChange={(e) => {
                  setEmployeeSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search staff name, ID, Iqama / Visa #..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Expiry Status Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Paper Status:</span>
                <select
                  value={expiryStatusFilter}
                  onChange={(e) => {
                    setExpiryStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="ALL">All Staff</option>
                  <option value="EXPIRED">Expired Papers Only</option>
                  <option value="30DAYS">Expiring in &le; 30 Days</option>
                  <option value="VALID">All Papers Valid</option>
                </select>
              </div>

              {expiryStatusFilter !== "ALL" && (
                <button
                  onClick={() => setExpiryStatusFilter("ALL")}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Clear Status Filter
                </button>
              )}
            </div>
          </div>

          {/* Company Employee Table with Visa and Paper Expiries Mentioned */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 text-[11px] text-slate-500 font-medium flex items-center justify-between lg:hidden">
              <span className="font-bold text-slate-700">Workforce List ({companyEmployees.length})</span>
              <span className="text-blue-600 font-semibold flex items-center gap-1">← Swipe to view expiries →</span>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left border-collapse text-xs min-w-[880px]">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Employee</th>
                    <th className="py-3.5 px-4">Iqama / Visa Expiry</th>
                    <th className="py-3.5 px-4">Passport Expiry</th>
                    <th className="py-3.5 px-4">Driving License</th>
                    <th className="py-3.5 px-4">Medical Insurance</th>
                    <th className="py-3.5 px-4">Qiwa Contract</th>
                    <th className="py-3.5 px-4">Overall Paper Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        No employees found matching the filters for {activeCompany.name}.
                      </td>
                    </tr>
                  ) : (
                    paginatedEmployees.map((emp) => {
                      const iqamaDays = calculateDaysRemaining(emp.iqamaExpiry);
                      const passDays = calculateDaysRemaining(emp.passportExpiry);
                      const licDays = calculateDaysRemaining(emp.licenseExpiry);
                      const insDays = calculateDaysRemaining(emp.insuranceExpiry);
                      const conDays = calculateDaysRemaining(emp.contractExpiry);

                      const minDays = Math.min(iqamaDays, licDays, insDays, passDays);
                      const overallCategory = getExpiryCategory(minDays);

                      return (
                        <tr
                          key={emp.id}
                          onClick={() => setSelectedEmployeeForDocs(emp)}
                          className="hover:bg-blue-50/40 transition group cursor-pointer"
                        >
                          {/* Employee Info */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-blue-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                                {emp.fullName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join("")}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 group-hover:text-blue-600 block transition">
                                  {emp.fullName}
                                </span>
                                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                  <span className="font-mono text-blue-600 font-semibold">{emp.employeeId}</span>
                                  <span>•</span>
                                  <span>{emp.designation}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* 1. Iqama / Visa Expiry */}
                          <td className="py-3.5 px-4 font-mono">
                            <div className="font-bold text-slate-900">{formatDate(emp.iqamaExpiry)}</div>
                            <span
                              className={`text-[10px] font-bold ${
                                iqamaDays < 0
                                  ? "text-red-600"
                                  : iqamaDays <= 7
                                  ? "text-rose-600"
                                  : iqamaDays <= 30
                                  ? "text-amber-600"
                                  : "text-emerald-600"
                              }`}
                            >
                              {iqamaDays < 0 ? `Expired (${Math.abs(iqamaDays)}d)` : `${iqamaDays}d left`}
                            </span>
                          </td>

                          {/* 2. Passport Expiry */}
                          <td className="py-3.5 px-4 font-mono">
                            <div className="font-medium text-slate-800">{formatDate(emp.passportExpiry)}</div>
                            <span
                              className={`text-[10px] ${
                                passDays < 0 ? "text-red-600 font-bold" : "text-slate-400"
                              }`}
                            >
                              {passDays < 0 ? `Expired (${Math.abs(passDays)}d)` : `${passDays}d left`}
                            </span>
                          </td>

                          {/* 3. Driving License */}
                          <td className="py-3.5 px-4 font-mono">
                            <div className="font-medium text-slate-800">{formatDate(emp.licenseExpiry)}</div>
                            <span
                              className={`text-[10px] font-bold ${
                                licDays < 0
                                  ? "text-red-600"
                                  : licDays <= 30
                                  ? "text-amber-600"
                                  : "text-emerald-600"
                              }`}
                            >
                              {licDays < 0 ? `Expired (${Math.abs(licDays)}d)` : `${licDays}d left`}
                            </span>
                          </td>

                          {/* 4. Medical Insurance */}
                          <td className="py-3.5 px-4 font-mono">
                            <div className="font-medium text-slate-800">{formatDate(emp.insuranceExpiry)}</div>
                            <span
                              className={`text-[10px] font-bold ${
                                insDays < 0
                                  ? "text-red-600"
                                  : insDays <= 30
                                  ? "text-amber-600"
                                  : "text-emerald-600"
                              }`}
                            >
                              {insDays < 0 ? `Expired (${Math.abs(insDays)}d)` : `${insDays}d left`}
                            </span>
                          </td>

                          {/* 5. Qiwa Contract */}
                          <td className="py-3.5 px-4 font-mono">
                            <div className="font-medium text-slate-800">{formatDate(emp.contractExpiry)}</div>
                            <span className="text-[10px] text-slate-400 font-sans">
                              {emp.employmentType}
                            </span>
                          </td>

                          {/* Overall Paper Status Badge */}
                          <td className="py-3.5 px-4">
                            <StatusBadge type="expiry" value={overallCategory} />
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center justify-end gap-1.5"
                            >
                              <button
                                onClick={() => setSelectedEmployeeForDocs(emp)}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition flex items-center gap-1"
                                title="Click to view details & essential documents"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Essential Docs</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 bg-slate-50/60 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div>
                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, companyEmployees.length)} of {companyEmployees.length} staff members in {activeCompany.code}
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
      ) : (
        /* VIEW 2: WHEN BROWSING ALL 12 COMPANIES -> CLICKING ANY COMPANY OPENS ITS EMPLOYEES & VISAS */
        <div className="space-y-6 animate-in fade-in">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <Building2 className="w-7 h-7 text-blue-600" />
                Company Entities & Subsidiaries
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Select any company below to inspect its dedicated employee workforce, visa expiries, and paper credentials.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleExportCompaniesCSV}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition shadow-2xs"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setIsAddCompanyOpen(true)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Company</span>
              </button>
            </div>
          </div>

          {/* Filter and Search Bar for Companies */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={companySearch}
                onChange={(e) => {
                  setCompanySearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search company name, code, CR number..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
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
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>City:</span>
                <select
                  value={cityFilter}
                  onChange={(e) => {
                    setCityFilter(e.target.value);
                    setPage(1);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="ALL">All Cities</option>
                  <option value="Riyadh">Riyadh</option>
                  <option value="Jeddah">Jeddah</option>
                  <option value="Dammam">Dammam</option>
                  <option value="Jubail">Jubail</option>
                  <option value="Yanbu">Yanbu</option>
                  <option value="Madinah">Madinah</option>
                  <option value="Khamis Mushait">Khamis Mushait</option>
                  <option value="Tabuk">Tabuk</option>
                </select>
              </div>
            </div>
          </div>

          {/* Companies Cards & Table Grid */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 text-[11px] text-slate-500 font-medium flex items-center justify-between lg:hidden">
              <span className="font-bold text-slate-700">All Entities ({filteredCompanies.length})</span>
              <span className="text-blue-600 font-semibold flex items-center gap-1">← Swipe to view details →</span>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left border-collapse text-xs min-w-[780px]">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Company Entity</th>
                    <th className="py-3.5 px-4">CR & Tax No.</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Workforce</th>
                    <th className="py-3.5 px-4">Visa & Paper Alerts</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Inspect Staff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedCompanies.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No company entities match your search.
                      </td>
                    </tr>
                  ) : (
                    paginatedCompanies.map((comp) => {
                      const compEmps = employees.filter((e) => e.companyId === comp.id);
                      let expiredCount = 0;
                      let urgentCount = 0;

                      compEmps.forEach((emp) => {
                        const iqamaDays = calculateDaysRemaining(emp.iqamaExpiry);
                        const licDays = calculateDaysRemaining(emp.licenseExpiry);
                        const insDays = calculateDaysRemaining(emp.insuranceExpiry);
                        const minDays = Math.min(iqamaDays, licDays, insDays);
                        const cat = getExpiryCategory(minDays);
                        if (cat === "expired") expiredCount++;
                        else if (cat === "7days" || cat === "30days") urgentCount++;
                      });

                      return (
                        <tr
                          key={comp.id}
                          onClick={() => {
                            setActiveCompany(comp);
                            setSelectedCompanyId(comp.id);
                            setPage(1);
                          }}
                          className="hover:bg-blue-50/50 transition group cursor-pointer"
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-blue-700 font-black text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                                {comp.code}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 group-hover:text-blue-600 block transition">
                                  {comp.name}
                                </span>
                                <span className="text-[11px] text-slate-400">{comp.email}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 font-mono">
                            <div className="font-semibold text-slate-800">CR: {comp.crNumber}</div>
                            <div className="text-[10px] text-slate-400">VAT: {comp.taxNumber || "—"}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{comp.city}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 truncate max-w-[140px] block">
                              {comp.address}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 font-bold text-slate-900 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg">
                              <Users className="w-3.5 h-3.5 text-blue-500" />
                              {compEmps.length} Employees
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              {expiredCount > 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-md">
                                  <AlertOctagon className="w-3 h-3 text-red-500" />
                                  {expiredCount} Expired
                                </span>
                              )}
                              {urgentCount > 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md">
                                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                                  {urgentCount} Soon
                                </span>
                              )}
                              {expiredCount === 0 && urgentCount === 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                  All Valid
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.8 rounded-full text-[11px] font-semibold border ${
                                comp.status === "ACTIVE"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-slate-100 text-slate-600 border-slate-300"
                              }`}
                            >
                              {comp.status === "ACTIVE" ? (
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              ) : (
                                <XCircle className="w-3 h-3 text-slate-400" />
                              )}
                              {comp.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveCompany(comp);
                                  setSelectedCompanyId(comp.id);
                                  setPage(1);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs"
                              >
                                <span>View Employees</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 bg-slate-50/60 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div>
                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredCompanies.length)} of {filteredCompanies.length} companies
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
      )}

      {/* MODAL 1: EMPLOYEE ESSENTIAL DOCUMENTS & FULL DETAILS MODAL */}
      <EmployeeEssentialDocumentsModal
        employee={selectedEmployeeForDocs}
        onClose={() => setSelectedEmployeeForDocs(null)}
        onEdit={(emp) => {
          setSelectedEmployeeForDocs(null);
          setEmployeeToEdit(emp);
        }}
      />

      {/* MODAL 2: ADD / EDIT COMPANY MODAL */}
      <CompanyModal
        isOpen={isAddCompanyOpen || !!companyToEdit}
        companyToEdit={companyToEdit}
        onClose={() => {
          setIsAddCompanyOpen(false);
          setCompanyToEdit(null);
        }}
        onSave={(data) => {
          if (companyToEdit) {
            updateCompany({ ...companyToEdit, ...data });
            setCompanyToEdit(null);
          } else {
            addCompany(data);
          }
        }}
      />

      {/* MODAL 3: ADD / EDIT EMPLOYEE MODAL */}
      <EmployeeModal
        isOpen={isAddEmployeeOpen || !!employeeToEdit}
        employeeToEdit={employeeToEdit}
        onClose={() => {
          setIsAddEmployeeOpen(false);
          setEmployeeToEdit(null);
        }}
        onSave={(data) => {
          if (employeeToEdit) {
            updateEmployee({ ...employeeToEdit, ...data });
            setEmployeeToEdit(null);
          } else {
            addEmployee({
              ...data,
              companyId: activeCompany ? activeCompany.id : data.companyId,
              companyName: activeCompany ? activeCompany.name : data.companyName,
            });
          }
        }}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!companyToToggle}
        title={companyToToggle?.status === "ACTIVE" ? "Deactivate Company Entity?" : "Reactivate Company Entity?"}
        message={
          companyToToggle?.status === "ACTIVE"
            ? `Are you sure you want to deactivate ${companyToToggle?.name}?`
            : `Are you sure you want to reactivate ${companyToToggle?.name}?`
        }
        confirmLabel={companyToToggle?.status === "ACTIVE" ? "Deactivate" : "Activate"}
        isDestructive={companyToToggle?.status === "ACTIVE"}
        onConfirm={() => {
          if (companyToToggle) {
            toggleCompanyStatus(companyToToggle.id);
            setCompanyToToggle(null);
          }
        }}
        onCancel={() => setCompanyToToggle(null)}
      />
    </div>
  );
}
