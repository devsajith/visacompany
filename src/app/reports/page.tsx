"use client";

import React, { useState } from "react";
import { useSuperHR } from "@/context/SuperHRContext";
import { exportToCSV, calculateDaysRemaining, getExpiryCategory } from "@/lib/utils";
import {
  FileBarChart2,
  Download,
  Building2,
  Calendar,
  Users,
  FileCheck,
  ShieldCheck,
  CalendarClock,
  TrendingUp,
} from "lucide-react";

export default function ReportsPage() {
  const { companies, employees, insurances, expiryItems, selectedCompanyId, setSelectedCompanyId } =
    useSuperHR();

  const [dateRange, setDateRange] = useState("2026-Q4");

  const filteredEmployees =
    selectedCompanyId === "all"
      ? employees
      : employees.filter((e) => e.companyId === selectedCompanyId);

  // 1. Employee Count by Company
  const exportCompanyReport = () => {
    const data = companies.map((c) => ({
      CompanyCode: c.code,
      CompanyName: c.name,
      CRNumber: c.crNumber,
      HQCity: c.city,
      TotalEmployees: employees.filter((e) => e.companyId === c.id).length,
      ActiveEmployees: employees.filter((e) => e.companyId === c.id && e.employmentStatus === "ACTIVE").length,
      InactiveEmployees: employees.filter((e) => e.companyId === c.id && e.employmentStatus !== "ACTIVE").length,
    }));
    exportToCSV("Super_HR_Report_Employees_By_Company", data);
  };

  // 2. Department & Role Distribution Audit
  const exportDepartmentReport = () => {
    const data = filteredEmployees.map((e) => ({
      EmployeeID: e.employeeId,
      FullName: e.fullName,
      Nationality: e.nationality,
      Company: e.companyName,
      Department: e.department,
      Designation: e.designation,
      EmploymentStatus: e.employmentStatus,
      JoiningDate: e.joiningDate,
    }));
    exportToCSV("Super_HR_Report_Department_Distribution", data);
  };

  // 3. Iqama & Residence Visa Compliance Audit
  const exportVisaComplianceReport = () => {
    const data = filteredEmployees.map((e) => ({
      EmployeeID: e.employeeId,
      FullName: e.fullName,
      Nationality: e.nationality,
      Company: e.companyName,
      IqamaNumber: e.nationalId,
      IqamaExpiry: e.iqamaExpiry,
      DaysRemaining: calculateDaysRemaining(e.iqamaExpiry),
      Status: getExpiryCategory(calculateDaysRemaining(e.iqamaExpiry)),
    }));
    exportToCSV("Super_HR_Report_Visa_Compliance_Audit", data);
  };

  // 4. Insurance Status Report
  const exportInsuranceReport = () => {
    const data = insurances.map((i) => ({
      PolicyNumber: i.policyNumber,
      Provider: i.provider,
      Category: i.category,
      Employee: i.employeeName,
      Company: i.companyName,
      ExpiryDate: i.expiryDate,
      Status: i.status,
      AnnualPremiumSAR: i.premiumSAR,
    }));
    exportToCSV("Super_HR_Report_Corporate_Insurance", data);
  };

  // 5. Document Expiry Risk Matrix
  const exportExpiryReport = () => {
    const data = expiryItems.map((e) => ({
      EmployeeID: e.employeeId,
      EmployeeName: e.employeeName,
      Company: e.companyName,
      DocumentType: e.documentType,
      DocumentNumber: e.documentNumber,
      ExpiryDate: e.expiryDate,
      DaysRemaining: e.daysRemaining,
      Category: e.category,
    }));
    exportToCSV("Super_HR_Report_Expiry_Risk_Audit", data);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <FileBarChart2 className="w-7 h-7 text-blue-600" />
            Executive Reports & Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Export official government and board reporting datasets for Saudi Arabia logistics workforce compliance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Company Filter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="all">All 12 Companies</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date range filter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="2026-Q4">Q4 2026 (Current)</option>
              <option value="2026-Q3">Q3 2026</option>
              <option value="2026-FY">Full Year 2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Report 1: Employee Count by Company */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Workforce by Company Entity</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Breakdown of 100+ personnel across all 12 operating subsidiaries with active and inactive counts.
            </p>
          </div>
          <button
            onClick={exportCompanyReport}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>
        </div>

        {/* Report 2: Department & Role Distribution */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Department & Role Distribution</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Detailed headcount breakdown across fleet transport, logistics operations, warehousing, and customs clearance.
            </p>
          </div>
          <button
            onClick={exportDepartmentReport}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>
        </div>

        {/* Report 3: Iqama & Visa Compliance Audit */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Iqama & Residence Visa Audit</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Comprehensive compliance tracking for foreign and national workforce residence permits and validity countdowns.
            </p>
          </div>
          <button
            onClick={exportVisaComplianceReport}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>
        </div>

        {/* Report 4: Corporate Medical Insurance */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Medical Insurance & CCHI Status</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Provider breakdown across Bupa Arabia, Tawuniya, Medgulf, categories VIP/Class A/B, and expiry dates.
            </p>
          </div>
          <button
            onClick={exportInsuranceReport}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>
        </div>

        {/* Report 5: Document Expiry Risk Matrix */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <CalendarClock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Document Expiry Risk Matrix</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Full audit radar tracking expired documents, &le;7 days, &le;30 days, &le;60 days, and valid credentials.
            </p>
          </div>
          <button
            onClick={exportExpiryReport}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>
        </div>

        {/* Report 6: Retention & Growth Analytics */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Hiring & Retention Quarterly Trends</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Quarterly hiring trends, Saudi Saudization ratio calculations, and fleet capacity growth metrics.
            </p>
          </div>
          <button
            onClick={exportCompanyReport}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
