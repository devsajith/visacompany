"use client";

import React from "react";
import { Company } from "@/types";
import { useSuperHR } from "@/context/SuperHRContext";
import {
  X,
  Building2,
  Users,
  MapPin,
  Phone,
  Mail,
  FileText,
  Calendar,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface CompanyDetailModalProps {
  company: Company | null;
  onClose: () => void;
  onEdit: (company: Company) => void;
}

export function CompanyDetailModal({ company, onClose, onEdit }: CompanyDetailModalProps) {
  const { employees } = useSuperHR();

  if (!company) return null;

  const companyEmployees = employees.filter((e) => e.companyId === company.id);
  const activeEmployees = companyEmployees.filter((e) => e.employmentStatus === "ACTIVE");
  const onLeaveEmployees = companyEmployees.filter((e) => e.employmentStatus === "ON_LEAVE");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-6 text-white flex items-start justify-between gap-3 flex-shrink-0">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0 shadow-lg">
              {company.code}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    company.status === "ACTIVE" ? "bg-emerald-500 text-white" : "bg-slate-500 text-white"
                  }`}
                >
                  {company.status}
                </span>
                <span className="text-xs text-blue-300 font-mono">CR: {company.crNumber}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight mt-1 truncate">{company.name}</h2>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>{company.city}, Saudi Arabia</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details Grid */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-slate-50 border border-slate-200/80 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl text-center">
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Total Staff</span>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{companyEmployees.length}</p>
            </div>
            <div className="bg-emerald-50/60 border border-emerald-200/80 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl text-center">
              <span className="text-[11px] sm:text-xs text-emerald-700 font-medium">Active Staff</span>
              <p className="text-lg sm:text-xl font-bold text-emerald-700 mt-1">{activeEmployees.length}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl text-center">
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Established</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1.5 sm:mt-2 truncate">{company.createdAt}</p>
            </div>
          </div>

          {/* Contact & Registration Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Corporate & Legal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                <Users className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-slate-500 block text-[10px]">Managing Director / Contact</span>
                  <span className="font-semibold text-slate-800">{company.contactPerson}</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-slate-500 block text-[10px]">Official Phone</span>
                  <span className="font-semibold text-slate-800 font-mono">{company.phone}</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-slate-500 block text-[10px]">Email Address</span>
                  <span className="font-semibold text-slate-800">{company.email}</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
                <FileText className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-slate-500 block text-[10px]">ZATCA Tax Identification</span>
                  <span className="font-semibold text-slate-800 font-mono">{company.taxNumber || "—"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Workforce Overview */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Workforce Department Distribution</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Array.from(new Set(companyEmployees.map((e) => e.department))).map((dept) => {
                const count = companyEmployees.filter((e) => e.department === dept).length;
                return (
                  <div
                    key={dept}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                  >
                    <span className="text-xs font-semibold text-slate-700 truncate pr-2">{dept}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-900">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={() => {
              onClose();
              onEdit(company);
            }}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition text-center"
          >
            Edit Company
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition text-center"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
