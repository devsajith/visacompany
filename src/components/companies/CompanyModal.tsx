"use client";

import React, { useState, useEffect } from "react";
import { Company } from "@/types";
import { X, Building2, Check, AlertCircle } from "lucide-react";

interface CompanyModalProps {
  isOpen: boolean;
  companyToEdit?: Company | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function CompanyModal({ isOpen, companyToEdit, onClose, onSave }: CompanyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    crNumber: "",
    taxNumber: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    city: "Riyadh",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (companyToEdit) {
      setFormData({
        name: companyToEdit.name,
        code: companyToEdit.code,
        crNumber: companyToEdit.crNumber,
        taxNumber: companyToEdit.taxNumber,
        contactPerson: companyToEdit.contactPerson,
        phone: companyToEdit.phone,
        email: companyToEdit.email,
        address: companyToEdit.address,
        city: companyToEdit.city,
        status: companyToEdit.status,
      });
    } else {
      setFormData({
        name: "",
        code: "",
        crNumber: "",
        taxNumber: "",
        contactPerson: "",
        phone: "+966 11 ",
        email: "",
        address: "",
        city: "Riyadh",
        status: "ACTIVE",
      });
    }
    setErrors({});
  }, [companyToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Company name is required";
    if (!formData.code.trim()) errs.code = "Company code is required";
    if (!formData.crNumber.trim()) errs.crNumber = "CR number is required (10 digits)";
    if (!formData.contactPerson.trim()) errs.contactPerson = "Contact person is required";
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
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-900 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold">
                {companyToEdit ? "Edit Company Entity" : "Add New Logistics Entity"}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Super Logistics multi-tenant group registry
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
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company Legal Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Super Logistics KSA (Holding)"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company Code (Prefix) *
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="e.g. SL-HQ"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.code && <p className="text-[11px] text-red-500 mt-1">{errors.code}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Commercial Reg. Number (CR) *
              </label>
              <input
                type="text"
                value={formData.crNumber}
                onChange={(e) => setFormData({ ...formData, crNumber: e.target.value })}
                placeholder="10-digit Saudi CR"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.crNumber && <p className="text-[11px] text-red-500 mt-1">{errors.crNumber}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                VAT / Tax Number
              </label>
              <input
                type="text"
                value={formData.taxNumber}
                onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                placeholder="15-digit ZATCA VAT number"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary City HQ *
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Authorized Contact Person *
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Manager / General Director"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.contactPerson && <p className="text-[11px] text-red-500 mt-1">{errors.contactPerson}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+966 11 482 9100"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Corporate Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="corporate@superlogistics.sa"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Registered Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Tower / Street, Industrial City, KSA"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Operating Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ACTIVE">ACTIVE (Operational)</option>
                <option value="INACTIVE">INACTIVE (Dormant)</option>
              </select>
            </div>
          </div>

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
              className="w-full sm:w-auto px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition text-center"
            >
              {companyToEdit ? "Save Changes" : "Create Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
