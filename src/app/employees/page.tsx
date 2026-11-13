"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSuperHR } from "@/context/SuperHRContext";
import { Employee } from "@/types";
import { EmployeeModal } from "@/components/employees/EmployeeModal";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate, exportToCSV } from "@/lib/utils";
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Building2,
  Eye,
  Edit2,
  Power,
  ExternalLink,
} from "lucide-react";

export default function EmployeesPage() {
  const {
    employees,
    companies,
    selectedCompanyId,
    setSelectedCompanyId,
    addEmployee,
    updateEmployee,
    toggleEmployeeStatus,
  } = useSuperHR();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deptFilter, setDeptFilter] = useState("ALL");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [employeeToToggle, setEmployeeToToggle] = useState<Employee | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filtered dataset
  const filtered = useMemo(() => {
    return employees.filter((emp) => {
      const matchComp = selectedCompanyId === "all" || emp.companyId === selectedCompanyId;
      const matchStatus = statusFilter === "ALL" || emp.employmentStatus === statusFilter;
      const matchDept = deptFilter === "ALL" || emp.department === deptFilter;
      const matchSearch =
        emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        emp.nationalId.includes(search) ||
        emp.designation.toLowerCase().includes(search.toLowerCase());

      return matchComp && matchStatus && matchDept && matchSearch;
    });
  }, [employees, selectedCompanyId, statusFilter, deptFilter, search]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleExportCSV = () => {
    const data = filtered.map((e) => ({
      ID: e.employeeId,
      FullName: e.fullName,
      NationalID: e.nationalId,
      Nationality: e.nationality,
      Company: e.companyName,
      Department: e.department,
      Designation: e.designation,
      JoiningDate: e.joiningDate,
      Status: e.employmentStatus,
      IqamaExpiry: e.iqamaExpiry,
      LicenseExpiry: e.licenseExpiry,
      InsuranceExpiry: e.insuranceExpiry,
      Phone: e.phone,
      Email: e.email,
    }));
    exportToCSV("Super_HR_Employees_Master_List", data);
  };

  const handleSave = (data: any) => {
    if (employeeToEdit) {
      updateEmployee({ ...employeeToEdit, ...data });
      setEmployeeToEdit(null);
    } else {
      addEmployee(data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-blue-600" />
            Workforce Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Total of {employees.length} personnel registered across fleet, warehouse hubs, customs & administrative departments.
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
            <span>Onboard Employee</span>
          </button>
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
            placeholder="Search name, ID, Iqama, role..."
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

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
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
              <option value="ON_LEAVE">On Leave</option>
              <option value="PROBATION">Probation</option>
            </select>
          </div>

          {/* Page size */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-600"
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">National ID / Iqama</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Designation</th>
                <th className="py-3.5 px-4">Joining Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No workforce records found.
                  </td>
                </tr>
              ) : (
                paginated.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/60 transition group">
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
                          <Link
                            href={`/employees/${emp.id}`}
                            className="font-bold text-slate-900 hover:text-blue-600 block transition"
                          >
                            {emp.fullName}
                          </Link>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <span className="font-mono text-blue-600 font-semibold">{emp.employeeId}</span>
                            <span>•</span>
                            <span>{emp.nationality}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-semibold text-slate-800">{emp.nationalId}</div>
                      <div className="text-[10px] text-slate-400">Exp: {formatDate(emp.iqamaExpiry)}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block truncate max-w-[170px]">
                        {emp.companyName}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800 block">{emp.designation}</span>
                      <span className="text-[10px] text-slate-500">{emp.department}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-semibold text-slate-800">{formatDate(emp.joiningDate)}</span>
                      <span className="text-[10px] text-slate-400 block">{emp.employmentType}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge type="employment" value={emp.employmentStatus} />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/employees/${emp.id}`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                          title="View Full Employee Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setEmployeeToEdit(emp)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition"
                          title="Edit Employee"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEmployeeToToggle(emp)}
                          className={`p-1.5 rounded-lg transition ${
                            emp.employmentStatus === "ACTIVE"
                              ? "text-slate-400 hover:text-red-600 hover:bg-red-50"
                              : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                          }`}
                          title={emp.employmentStatus === "ACTIVE" ? "Deactivate Employee" : "Reactivate Employee"}
                        >
                          <Power className="w-4 h-4" />
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
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} employees
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

      {/* Add / Edit Modal */}
      <EmployeeModal
        isOpen={isAddOpen || !!employeeToEdit}
        employeeToEdit={employeeToEdit}
        onClose={() => {
          setIsAddOpen(false);
          setEmployeeToEdit(null);
        }}
        onSave={handleSave}
      />

      {/* Deactivate / Status Confirmation */}
      <ConfirmDialog
        isOpen={!!employeeToToggle}
        title={employeeToToggle?.employmentStatus === "ACTIVE" ? "Deactivate Employee?" : "Reactivate Employee?"}
        message={
          employeeToToggle?.employmentStatus === "ACTIVE"
            ? `Are you sure you want to mark ${employeeToToggle?.fullName} (${employeeToToggle?.employeeId}) as INACTIVE? This will flag their credentials in operations dispatch.`
            : `Are you sure you want to reactivate ${employeeToToggle?.fullName}?`
        }
        confirmLabel={employeeToToggle?.employmentStatus === "ACTIVE" ? "Deactivate" : "Activate"}
        isDestructive={employeeToToggle?.employmentStatus === "ACTIVE"}
        onConfirm={() => {
          if (employeeToToggle) {
            toggleEmployeeStatus(employeeToToggle.id);
            setEmployeeToToggle(null);
          }
        }}
        onCancel={() => setEmployeeToToggle(null)}
      />
    </div>
  );
}
