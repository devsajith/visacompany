"use client";

import React from "react";
import { Employee } from "@/types";
import { useSuperHR } from "@/context/SuperHRContext";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate, calculateDaysRemaining, getExpiryCategory } from "@/lib/utils";
import {
  X,
  CreditCard,
  FileText,
  ShieldCheck,
  Calendar,
  Download,
  ExternalLink,
  Building2,
  Phone,
  Mail,
  User,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Award,
} from "lucide-react";

interface EmployeeEssentialDocumentsModalProps {
  employee: Employee | null;
  onClose: () => void;
  onEdit?: (emp: Employee) => void;
}

export function EmployeeEssentialDocumentsModal({
  employee,
  onClose,
  onEdit,
}: EmployeeEssentialDocumentsModalProps) {
  const { showToast, renewInsurance } = useSuperHR();

  if (!employee) return null;

  const iqamaDays = calculateDaysRemaining(employee.iqamaExpiry);
  const passportDays = calculateDaysRemaining(employee.passportExpiry);
  const licenseDays = calculateDaysRemaining(employee.licenseExpiry);
  const insuranceDays = calculateDaysRemaining(employee.insuranceExpiry);
  const contractDays = calculateDaysRemaining(employee.contractExpiry);

  const documents = [
    {
      title: "Saudi Iqama / Residence Visa",
      category: "Residence & Visa",
      number: employee.nationalId,
      issueDate: "2024-03-10",
      expiryDate: employee.iqamaExpiry,
      days: iqamaDays,
      status: getExpiryCategory(iqamaDays),
      authority: "Ministry of Interior / Jawazat",
      fileName: `${employee.employeeId}_Iqama_Card.pdf`,
      badgeLabel: employee.nationality === "Saudi" ? "National ID (Citizen)" : "Muqeem Iqama (Resident)",
      isPrimaryVisa: true,
    },
    {
      title: "International Passport",
      category: "Identity & Travel",
      number: `P${employee.nationalId.slice(2, 9)}`,
      issueDate: "2022-05-15",
      expiryDate: employee.passportExpiry,
      days: passportDays,
      status: getExpiryCategory(passportDays),
      authority: `Govt. of ${employee.nationality}`,
      fileName: `${employee.employeeId}_Passport_Scan.pdf`,
      badgeLabel: "Passport",
    },
    {
      title: "Saudi Heavy Driving License",
      category: "Transport Permit",
      number: `DL-${employee.nationalId.slice(4)}`,
      issueDate: "2023-02-01",
      expiryDate: employee.licenseExpiry,
      days: licenseDays,
      status: getExpiryCategory(licenseDays),
      authority: "General Directorate of Traffic (Muroor)",
      fileName: `${employee.employeeId}_Heavy_License.pdf`,
      badgeLabel: "Class 1 Heavy Vehicle",
    },
    {
      title: "Corporate Medical Insurance Card",
      category: "Healthcare (CCHI)",
      number: `POL-BUP-${employee.employeeId}`,
      issueDate: "2025-11-01",
      expiryDate: employee.insuranceExpiry,
      days: insuranceDays,
      status: getExpiryCategory(insuranceDays),
      authority: "Bupa Arabia / Tawuniya (CCHI)",
      fileName: `${employee.employeeId}_Insurance_Card.pdf`,
      badgeLabel: "Class A Medical Network",
      canRenew: true,
    },
    {
      title: "Qiwa Authenticated Contract",
      category: "Labor & Employment",
      number: `QIWA-${employee.employeeId}`,
      issueDate: employee.joiningDate,
      expiryDate: employee.contractExpiry,
      days: contractDays,
      status: getExpiryCategory(contractDays),
      authority: "Ministry of Human Resources (Qiwa)",
      fileName: `${employee.employeeId}_Qiwa_Contract.pdf`,
      badgeLabel: employee.employmentType,
    },
  ];

  const hasExpired = documents.some((d) => d.status === "expired");
  const hasUrgent = documents.some((d) => d.status === "7days" || d.status === "30days");

  const handleDownload = (fileName: string) => {
    showToast({
      type: "success",
      title: "Document Downloaded",
      message: `Downloaded ${fileName} for ${employee.fullName}.`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 md:p-6 animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Modal Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 text-white flex-shrink-0 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white font-black text-2xl flex items-center justify-center border-2 border-white/20 shadow-xl flex-shrink-0">
              {employee.fullName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                  {employee.employeeId}
                </span>
                <StatusBadge type="employment" value={employee.employmentStatus} />
                {hasExpired ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-red-500/90 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                    <AlertOctagon className="w-3 h-3" />
                    Has Expired Papers
                  </span>
                ) : hasUrgent ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-500/90 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                    <AlertTriangle className="w-3 h-3" />
                    Papers Expiring Soon
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-500/90 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    All Papers Valid
                  </span>
                )}
              </div>

              <h2 className="text-xl md:text-2xl font-black tracking-tight mt-1">
                {employee.fullName}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
                <span className="font-semibold text-blue-300">{employee.designation}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  {employee.companyName}
                </span>
                <span>•</span>
                <span>{employee.nationality}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Top Quick Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">National ID / Iqama</span>
              <span className="font-mono font-bold text-slate-900 text-sm mt-0.5 block">{employee.nationalId}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Mobile Number</span>
              <span className="font-mono font-bold text-slate-900 text-sm mt-0.5 block">{employee.phone}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Department</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 block">{employee.department}</span>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl">
              <span className="text-blue-800 block text-[10px] font-bold uppercase">Joining Date</span>
              <span className="font-bold text-blue-900 text-sm mt-0.5 block">{formatDate(employee.joiningDate)}</span>
            </div>
          </div>

          {/* Section: Essential Documents & Paper Expiries */}
          <div>
            <div className="mb-3 border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Essential Documents & Paper Expiry Status
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Real-time status for Visa, Iqama, Driving license, Passport, CCHI Insurance, and Qiwa contract.
              </p>
            </div>

            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all duration-200 ${
                    doc.status === "expired"
                      ? "bg-red-50/50 border-red-200 ring-1 ring-red-400/20"
                      : doc.status === "7days"
                      ? "bg-rose-50/50 border-rose-200 ring-1 ring-rose-400/20"
                      : doc.status === "30days"
                      ? "bg-amber-50/50 border-amber-200 ring-1 ring-amber-400/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-3 rounded-2xl flex-shrink-0 ${
                          doc.status === "expired"
                            ? "bg-red-100 text-red-700"
                            : doc.status === "7days"
                            ? "bg-rose-100 text-rose-700"
                            : doc.status === "30days"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        <FileText className="w-5 h-5" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{doc.title}</h4>
                          <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                            {doc.badgeLabel}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-slate-500 text-xs">
                          <span>
                            Document / Visa #: <strong className="font-mono text-slate-800">{doc.number}</strong>
                          </span>
                          <span>•</span>
                          <span>Issuing Authority: {doc.authority}</span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span>File: {doc.fileName}</span>
                          <span>•</span>
                          <span>Issue Date: {doc.issueDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-2 md:pt-0">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">Expiry Date</span>
                        <span className="font-black text-slate-900 text-sm block">{formatDate(doc.expiryDate)}</span>
                        <span
                          className={`font-mono font-bold text-xs ${
                            doc.days < 0
                              ? "text-red-600"
                              : doc.days <= 7
                              ? "text-rose-600"
                              : doc.days <= 30
                              ? "text-amber-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {doc.days < 0
                            ? `EXPIRED (${Math.abs(doc.days)} days ago)`
                            : doc.days === 0
                            ? "EXPIRES TODAY"
                            : `${doc.days} days remaining`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <StatusBadge type="expiry" value={doc.status} />

                        <button
                          onClick={() => handleDownload(doc.fileName)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition"
                          title="Download Document Copy"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        {doc.canRenew && (
                          <button
                            onClick={() => {
                              renewInsurance(employee.id, "2027-11-13");
                              showToast({
                                type: "success",
                                title: "Insurance Renewed",
                                message: `Medical policy renewed for ${employee.fullName}.`,
                              });
                            }}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
                          >
                            Renew
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>Assigned to {employee.companyName}</span>
          </div>

          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(employee);
                }}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition"
              >
                Edit Employee
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
