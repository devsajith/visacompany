"use client";

import React, { useState, useEffect } from "react";
import { Employee } from "@/types";
import { useSuperHR } from "@/context/SuperHRContext";
import { X, UserPlus, UserCheck } from "lucide-react";

interface EmployeeModalProps {
  isOpen: boolean;
  employeeToEdit?: Employee | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function EmployeeModal({ isOpen, employeeToEdit, onClose, onSave }: EmployeeModalProps) {
  const { companies } = useSuperHR();

  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    arabicName: "",
    gender: "MALE" as "MALE" | "FEMALE",
    nationality: "Saudi",
    dateOfBirth: "1990-01-01",
    phone: "+966 50 ",
    email: "",
    nationalId: "",
    companyId: companies[0]?.id || "",
    companyName: companies[0]?.name || "",
    designation: "Heavy Transport Fleet Captain",
    department: "Transport Operations",
    joiningDate: new Date().toISOString().substring(0, 10),
    employmentType: "FULL_TIME" as "FULL_TIME" | "CONTRACT" | "TEMPORARY",
    employmentStatus: "ACTIVE" as "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "PROBATION",
    iqamaExpiry: "2027-11-13",
    passportExpiry: "2028-06-15",
    licenseExpiry: "2027-10-20",
    contractExpiry: "2027-12-31",
    insuranceExpiry: "2027-05-30",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        employeeId: employeeToEdit.employeeId,
        fullName: employeeToEdit.fullName,
        arabicName: employeeToEdit.arabicName || "",
        gender: employeeToEdit.gender,
        nationality: employeeToEdit.nationality,
        dateOfBirth: employeeToEdit.dateOfBirth,
        phone: employeeToEdit.phone,
        email: employeeToEdit.email,
        nationalId: employeeToEdit.nationalId,
        companyId: employeeToEdit.companyId,
        companyName: employeeToEdit.companyName,
        designation: employeeToEdit.designation,
        department: employeeToEdit.department,
        joiningDate: employeeToEdit.joiningDate,
        employmentType: employeeToEdit.employmentType,
        employmentStatus: employeeToEdit.employmentStatus,
        iqamaExpiry: employeeToEdit.iqamaExpiry,
        passportExpiry: employeeToEdit.passportExpiry,
        licenseExpiry: employeeToEdit.licenseExpiry,
        contractExpiry: employeeToEdit.contractExpiry,
        insuranceExpiry: employeeToEdit.insuranceExpiry,
      });
    } else {
      const defaultComp = companies[0] || { id: "comp-1", name: "Super Logistics KSA (Holding)" };
      setFormData({
        employeeId: `SL-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: "",
        arabicName: "",
        gender: "MALE",
        nationality: "Saudi",
        dateOfBirth: "1992-05-15",
        phone: "+966 50 ",
        email: "",
        nationalId: "10" + Math.floor(10000000 + Math.random() * 90000000),
        companyId: defaultComp.id,
        companyName: defaultComp.name,
        designation: "Heavy Transport Fleet Captain",
        department: "Transport Operations",
        joiningDate: new Date().toISOString().substring(0, 10),
        employmentType: "FULL_TIME",
        employmentStatus: "ACTIVE",
        iqamaExpiry: "2027-11-13",
        passportExpiry: "2028-06-15",
        licenseExpiry: "2027-10-20",
        contractExpiry: "2027-12-31",
        insuranceExpiry: "2027-05-30",
      });
    }
    setErrors({});
  }, [employeeToEdit, isOpen, companies]);

  if (!isOpen) return null;

  const handleCompanyChange = (compId: string) => {
    const comp = companies.find((c) => c.id === compId);
    setFormData({
      ...formData,
      companyId: compId,
      companyName: comp?.name || "",
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.employeeId.trim()) errs.employeeId = "Employee ID is required";
    if (!formData.nationalId.trim()) errs.nationalId = "National ID / Iqama is required (10 digits)";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-900 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              {employeeToEdit ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold">
                {employeeToEdit ? `Edit Profile: ${employeeToEdit.fullName}` : "Onboard New Employee"}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Logistics & transport personnel registration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          {/* Section 1: Personal & Identification */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3 border-b border-slate-100 pb-1">
              1. Personal & National ID Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full English Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Khalid Mansour Al-Ghamdi"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Employee ID *</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">National ID / Iqama (10 Digits) *</label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                  placeholder="10XXXXXXXX / 24XXXXXXXX"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.nationalId && <p className="text-[11px] text-red-500 mt-1">{errors.nationalId}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nationality *</label>
                <select
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Saudi">Saudi Arabia</option>
                  <option value="Egyptian">Egypt</option>
                  <option value="Pakistani">Pakistan</option>
                  <option value="Indian">India</option>
                  <option value="Filipino">Philippines</option>
                  <option value="Jordanian">Jordan</option>
                  <option value="Sudanese">Sudan</option>
                  <option value="Bangladeshi">Bangladesh</option>
                  <option value="Yemeni">Yemen</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Contact Number *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+966 5X XXX XXXX"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="employee@superlogistics.sa"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Deployment & Designation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3 border-b border-slate-100 pb-1">
              2. Company & Designation
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Company *</label>
                <select
                  value={formData.companyId}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Status</label>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="ON_LEAVE">ON_LEAVE</option>
                  <option value="PROBATION">PROBATION</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Designation / Role *</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. Heavy Rig Driver, Customs Officer"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department *</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Transport Operations">Transport Operations</option>
                  <option value="Cold Chain Operations">Cold Chain Operations</option>
                  <option value="Warehousing & Staging">Warehousing & Staging</option>
                  <option value="Customs & Port Operations">Customs & Port Operations</option>
                  <option value="Fleet Maintenance">Fleet Maintenance</option>
                  <option value="Health & Safety (HSE)">Health & Safety (HSE)</option>
                  <option value="Logistics Control & Routing">Logistics Control & Routing</option>
                  <option value="Finance & Accounts">Finance & Accounts</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Joining Date</label>
                <input
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Critical Expiry Dates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3 border-b border-slate-100 pb-1">
              3. Document & License Expiry Dates
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Iqama / National ID Expiry *</label>
                <input
                  type="date"
                  value={formData.iqamaExpiry}
                  onChange={(e) => setFormData({ ...formData, iqamaExpiry: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Heavy Driving License Expiry</label>
                <input
                  type="date"
                  value={formData.licenseExpiry}
                  onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Medical Insurance Expiry</label>
                <input
                  type="date"
                  value={formData.insuranceExpiry}
                  onChange={(e) => setFormData({ ...formData, insuranceExpiry: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition text-center"
            >
              {employeeToEdit ? "Save Profile" : "Onboard Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
