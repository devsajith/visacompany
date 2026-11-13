"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSuperHR } from "@/context/SuperHRContext";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmployeeModal } from "@/components/employees/EmployeeModal";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { formatDate, calculateDaysRemaining } from "@/lib/utils";
import {
  Users,
  Building2,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  ShieldCheck,
  FileText,
  Clock,
  ArrowLeft,
  Edit2,
  Power,
  Download,
  AlertTriangle,
  Upload,
  CheckCircle2,
} from "lucide-react";

export default function EmployeeProfilePage() {
  const router = useRouter();
  const routeParams = useParams();
  const employeeId = (routeParams?.id as string) || "";

  const {
    employees,
    insurances,
    documents,
    auditLogs,
    updateEmployee,
    toggleEmployeeStatus,
    showToast,
    renewInsurance,
  } = useSuperHR();

  const [activeTab, setActiveTab] = useState<
    "overview" | "employment" | "insurance" | "documents" | "activity"
  >("overview");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const employee = employees.find((e) => e.id === employeeId || e.employeeId === employeeId);

  if (!employee) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Employee Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm">
          No personnel record matched ID &quot;{employeeId}&quot;.
        </p>
        <Link
          href="/employees"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
      </div>
    );
  }

  // Related data
  const employeeInsurances = insurances.filter(
    (i) => i.employeeId === employee.employeeId || i.employeeName === employee.fullName
  );
  const employeeDocs = documents.filter(
    (d) => d.employeeId === employee.employeeId || d.employeeName === employee.fullName
  );
  const employeeLogs = auditLogs.filter(
    (l) => l.target.includes(employee.fullName) || l.target.includes(employee.employeeId)
  );

  const iqamaDays = calculateDaysRemaining(employee.iqamaExpiry);
  const licenseDays = calculateDaysRemaining(employee.licenseExpiry);
  const insuranceDays = calculateDaysRemaining(employee.insuranceExpiry);

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/employees"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workforce Directory</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsEditOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
          >
            <Edit2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => setIsToggleOpen(true)}
            className={`p-2 rounded-xl transition border ${
              employee.employmentStatus === "ACTIVE"
                ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                : "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
            }`}
            title={employee.employmentStatus === "ACTIVE" ? "Deactivate Employee" : "Reactivate Employee"}
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Banner with dark navy logistics gradient */}
        <div className="h-32 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 relative p-6 flex items-end">
          <div className="absolute top-4 right-6 flex items-center gap-2">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-mono font-semibold border border-white/10">
              ID: {employee.employeeId}
            </span>
            <StatusBadge type="employment" value={employee.employmentStatus} />
          </div>
        </div>

        {/* Profile Info Bar */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4 -mt-12">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-900 to-indigo-700 text-white font-black text-2xl flex items-center justify-center border-4 border-white shadow-xl flex-shrink-0">
              {employee.fullName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>

            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{employee.fullName}</h1>
                {employee.arabicName && (
                  <span className="text-slate-400 text-sm font-arabic font-medium">({employee.arabicName})</span>
                )}
              </div>
              <p className="text-sm font-semibold text-blue-600 mt-0.5">{employee.designation}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {employee.companyName}
                </span>
                <span>•</span>
                <span>{employee.department}</span>
                <span>•</span>
                <span>{employee.nationality}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-slate-400" />
              <span className="font-mono">{employee.phone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{employee.email}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-t border-slate-200/80 bg-slate-50/50 flex items-center gap-2 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: Users },
            { id: "employment", label: "Employment Details", icon: Briefcase },
            { id: "insurance", label: "Medical Insurance", icon: ShieldCheck },
            { id: "documents", label: "Documents & Files", icon: FileText },
            { id: "activity", label: "Activity History", icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                  isActive
                    ? "border-blue-600 text-blue-700 bg-white shadow-2xs rounded-t-xl"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Validity Radar Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Critical Expiry Radar
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Iqama */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Iqama / National ID</span>
                    <span className="font-mono text-[10px] text-slate-400">{employee.nationalId}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{formatDate(employee.iqamaExpiry)}</div>
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">Remaining</span>
                    <span
                      className={`font-bold ${
                        iqamaDays < 0 ? "text-red-600" : iqamaDays <= 30 ? "text-amber-600" : "text-emerald-600"
                      }`}
                    >
                      {iqamaDays < 0 ? `Expired (${Math.abs(iqamaDays)}d)` : `${iqamaDays} days`}
                    </span>
                  </div>
                </div>

                {/* Heavy Driving License */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Driving License</span>
                    <span className="font-mono text-[10px] text-slate-400">Class 1 Heavy</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{formatDate(employee.licenseExpiry)}</div>
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">Remaining</span>
                    <span
                      className={`font-bold ${
                        licenseDays < 0 ? "text-red-600" : licenseDays <= 30 ? "text-amber-600" : "text-emerald-600"
                      }`}
                    >
                      {licenseDays < 0 ? `Expired (${Math.abs(licenseDays)}d)` : `${licenseDays} days`}
                    </span>
                  </div>
                </div>

                {/* Medical Insurance */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Medical Insurance</span>
                    <span className="font-mono text-[10px] text-slate-400">CCHI Portal</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{formatDate(employee.insuranceExpiry)}</div>
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">Remaining</span>
                    <span
                      className={`font-bold ${
                        insuranceDays < 0 ? "text-red-600" : insuranceDays <= 30 ? "text-amber-600" : "text-emerald-600"
                      }`}
                    >
                      {insuranceDays < 0 ? `Expired (${Math.abs(insuranceDays)}d)` : `${insuranceDays} days`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Emergency contact & Quick stats */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Emergency Contact
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Contact Person</span>
                  <span className="font-bold text-slate-800">{employee.emergencyContact?.name || "Family Contact"}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Relationship</span>
                  <span className="font-bold text-slate-800">{employee.emergencyContact?.relationship || "Kin"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Emergency Phone</span>
                  <span className="font-mono font-bold text-slate-800">
                    {employee.emergencyContact?.phone || "+966 50 000 0000"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/60 p-6 rounded-3xl border border-blue-100 space-y-3">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Logistics Dispatch Status
              </h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                Employee is cleared for Saudi intercity heavy cargo routing. Qiwa contract authenticated and GOSI registration verified.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-800 pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Authorized Fleet Operator</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Employment Details */}
      {activeTab === "employment" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Operational & Contract Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Company Entity</span>
              <p className="font-bold text-slate-900 text-sm">{employee.companyName}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Operational Status</span>
              <p className="font-bold text-emerald-600 text-sm">{employee.employmentStatus}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Department</span>
              <p className="font-bold text-slate-900 text-sm">{employee.department}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Contract Joining Date</span>
              <p className="font-bold text-slate-900 text-sm">{formatDate(employee.joiningDate)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Employment Type</span>
              <p className="font-bold text-slate-900 text-sm">{employee.employmentType}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Contract Expiry Date</span>
              <p className="font-bold text-slate-900 text-sm">{formatDate(employee.contractExpiry)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Insurance */}
      {activeTab === "insurance" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Medical Insurance Details</h3>
              <p className="text-xs text-slate-500">Corporate healthcare coverage registered with CCHI</p>
            </div>
            <button
              onClick={() => {
                renewInsurance(employee.id, "2027-11-13");
                showToast({
                  type: "success",
                  title: "Insurance Policy Renewed",
                  message: `Renewed until Nov 13, 2027 for ${employee.fullName}.`,
                });
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Renew Policy 1 Year
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Insurance Provider</span>
              <p className="font-bold text-slate-900 text-sm mt-1">Bupa Arabia</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Policy Number</span>
              <p className="font-bold text-slate-900 text-sm mt-1 font-mono">POL-BUP-{employee.nationalId.slice(3)}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Network Category</span>
              <p className="font-bold text-slate-900 text-sm mt-1">Class A (Hospital & Outpatient)</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 uppercase text-[10px] font-bold">Policy Expiry</span>
              <p className="font-bold text-slate-900 text-sm mt-1">{formatDate(employee.insuranceExpiry)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Documents */}
      {activeTab === "documents" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Employee Documents</h3>
              <p className="text-xs text-slate-500">Iqama, Passport, Driving licenses, Qiwa Contract</p>
            </div>
            <button
              onClick={() => {
                showToast({
                  type: "info",
                  title: "Document Upload Interface",
                  message: "Drop or select PDF file to attach to employee profile.",
                });
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Document</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                type: "Iqama / National ID",
                file: `${employee.employeeId}_Iqama.pdf`,
                expiry: employee.iqamaExpiry,
                size: "1.2 MB",
              },
              {
                type: "Saudi Heavy Driving License",
                file: `${employee.employeeId}_Driving_License.pdf`,
                expiry: employee.licenseExpiry,
                size: "820 KB",
              },
              {
                type: "International Passport",
                file: `${employee.employeeId}_Passport.pdf`,
                expiry: employee.passportExpiry,
                size: "2.4 MB",
              },
              {
                type: "Qiwa Authenticated Contract",
                file: `${employee.employeeId}_Contract.pdf`,
                expiry: employee.contractExpiry,
                size: "3.1 MB",
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{doc.type}</h5>
                    <p className="text-[11px] text-slate-500">{doc.file}</p>
                    <span className="text-[10px] text-slate-400">Exp: {formatDate(doc.expiry)} • {doc.size}</span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    showToast({
                      type: "success",
                      title: "Document Downloaded",
                      message: `Downloaded ${doc.file} for ${employee.fullName}.`,
                    })
                  }
                  className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Activity History */}
      {activeTab === "activity" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Personnel Audit Trail</h3>
          <div className="space-y-3">
            {[
              {
                date: "2026-11-12 14:15",
                action: "COMPLIANCE_VERIFIED",
                detail: "Iqama and driving license records scanned by Jawazat Muqeem sync.",
              },
              {
                date: "2026-10-28 10:00",
                action: "SECURITY_CLEARANCE",
                detail: `Annual transport safety credentials and Aramco driving permit cleared for active dispatch.`,
              },
              {
                date: "2026-08-15 09:30",
                action: "CONTRACT_AUTHENTICATED",
                detail: `Qiwa authenticated digital contract verified with ${employee.companyName}.`,
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{item.action}</span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>
                  <p className="text-slate-600 mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <EmployeeModal
        isOpen={isEditOpen}
        employeeToEdit={employee}
        onClose={() => setIsEditOpen(false)}
        onSave={(updated) => updateEmployee({ ...employee, ...updated })}
      />

      {/* Confirmation Dialog for Status */}
      <ConfirmDialog
        isOpen={isToggleOpen}
        title={employee.employmentStatus === "ACTIVE" ? "Deactivate Employee?" : "Reactivate Employee?"}
        message={
          employee.employmentStatus === "ACTIVE"
            ? `Are you sure you want to mark ${employee.fullName} as INACTIVE? This will prevent dispatch scheduling.`
            : `Are you sure you want to reactivate ${employee.fullName}?`
        }
        confirmLabel={employee.employmentStatus === "ACTIVE" ? "Deactivate" : "Activate"}
        isDestructive={employee.employmentStatus === "ACTIVE"}
        onConfirm={() => {
          toggleEmployeeStatus(employee.id);
          setIsToggleOpen(false);
        }}
        onCancel={() => setIsToggleOpen(false)}
      />
    </div>
  );
}
