"use client";

import React, { useState } from "react";
import { useSuperHR } from "@/context/SuperHRContext";
import {
  Settings as SettingsIcon,
  UserCheck,
  Building2,
  Bell,
  Clock,
  Shield,
  RotateCcw,
  Save,
  Check,
  Smartphone,
  Mail,
  Sliders,
  DollarSign,
} from "lucide-react";

export default function SettingsPage() {
  const { settings, updateSettings, resetToDemoData, showToast } = useSuperHR();

  const [activeTab, setActiveTab] = useState<"profile" | "reminders" | "channels" | "roles">("reminders");

  // Local state for reminder thresholds
  const [firstNotice, setFirstNotice] = useState(settings.reminderThresholds.firstNoticeDays);
  const [secondNotice, setSecondNotice] = useState(settings.reminderThresholds.secondNoticeDays);
  const [finalNotice, setFinalNotice] = useState(settings.reminderThresholds.finalNoticeDays);

  // Channels state
  const [whatsappEnabled, setWhatsappEnabled] = useState(settings.channels.whatsappEnabled);
  const [emailEnabled, setEmailEnabled] = useState(settings.channels.emailEnabled);
  const [smsEnabled, setSmsEnabled] = useState(settings.channels.smsEnabled);

  // WhatsApp bot config
  const [botNumber, setBotNumber] = useState(settings.whatsappConfig.senderNumber);
  const [autoSend, setAutoSend] = useState(settings.whatsappConfig.autoSend);

  // Admin Profile state
  const [adminName, setAdminName] = useState("Abdulrahman Al-Rasheed");
  const [adminEmail, setAdminEmail] = useState("superadmin@superlogistics.sa");
  const [adminPhone, setAdminPhone] = useState("+966 50 112 9900");

  const handleSaveReminders = () => {
    updateSettings({
      reminderThresholds: {
        firstNoticeDays: Number(firstNotice),
        secondNoticeDays: Number(secondNotice),
        finalNoticeDays: Number(finalNotice),
      },
    });
  };

  const handleSaveChannels = () => {
    updateSettings({
      channels: {
        whatsappEnabled,
        emailEnabled,
        smsEnabled,
      },
      whatsappConfig: {
        ...settings.whatsappConfig,
        senderNumber: botNumber,
        autoSend,
      },
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: "success",
      title: "Profile Saved",
      message: "Administrator profile details updated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <SettingsIcon className="w-7 h-7 text-blue-600" />
            System Configuration & Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure expiry reminder thresholds, automated WhatsApp dispatch, multi-tenant roles & permissions.
          </p>
        </div>

        <button
          onClick={resetToDemoData}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition shadow-2xs"
        >
          <RotateCcw className="w-4 h-4 text-amber-600" />
          <span>Reset All Demo Data</span>
        </button>
      </div>

      {/* Main Settings Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex items-center gap-2 overflow-x-auto">
          {[
            { id: "reminders", label: "Expiry Reminder Thresholds", icon: Sliders },
            { id: "channels", label: "WhatsApp & Delivery Gateways", icon: Bell },
            { id: "profile", label: "Administrator Profile", icon: UserCheck },
            { id: "roles", label: "Roles & Permissions", icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Expiry Reminder Thresholds */}
        {activeTab === "reminders" && (
          <div className="p-6 space-y-6 max-w-2xl">
            <div>
              <h3 className="text-base font-bold text-slate-900">Custom Reminder Timing Engine</h3>
              <p className="text-xs text-slate-500 mt-1">
                Adjust how many days in advance the automated notification system alerts drivers, employees and HR managers.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-900 block">First Reminder (Advance Notice)</label>
                    <span className="text-[11px] text-slate-500">
                      Standard corporate alert for renewal preparations
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={firstNotice}
                      onChange={(e) => setFirstNotice(Number(e.target.value))}
                      className="w-20 px-3 py-1.5 text-xs font-bold text-center rounded-xl border border-slate-300 bg-white"
                    />
                    <span className="text-xs font-bold text-slate-600">Days</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-900 block">Second Reminder (Critical Window)</label>
                    <span className="text-[11px] text-slate-500">
                      High priority alert flagged to operations & compliance managers
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={secondNotice}
                      onChange={(e) => setSecondNotice(Number(e.target.value))}
                      className="w-20 px-3 py-1.5 text-xs font-bold text-center rounded-xl border border-slate-300 bg-white"
                    />
                    <span className="text-xs font-bold text-slate-600">Days</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-900 block">Expiration Day Escalation</label>
                    <span className="text-[11px] text-slate-500">
                      Immediate trigger when document reaches zero days remaining
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={finalNotice}
                      onChange={(e) => setFinalNotice(Number(e.target.value))}
                      className="w-20 px-3 py-1.5 text-xs font-bold text-center rounded-xl border border-slate-300 bg-white"
                    />
                    <span className="text-xs font-bold text-slate-600">Days</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveReminders}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Reminder Configuration</span>
            </button>
          </div>
        )}

        {/* Tab 2: WhatsApp & Delivery Gateways */}
        {activeTab === "channels" && (
          <div className="p-6 space-y-6 max-w-2xl">
            <div>
              <h3 className="text-base font-bold text-slate-900">Communication Gateway Preferences</h3>
              <p className="text-xs text-slate-500 mt-1">
                Control which channels are enabled for automated Super HR system notifications.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">WhatsApp Automated Bot Channel</h4>
                    <p className="text-[11px] text-slate-500">Official business messaging with interactive chat previews</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappEnabled}
                  onChange={(e) => setWhatsappEnabled(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Corporate Email (SMTP Relay)</h4>
                    <p className="text-[11px] text-slate-500">Official letters and payslip notifications via email</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailEnabled}
                  onChange={(e) => setEmailEnabled(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Saudi SMS Gateway (STC / Mobily)</h4>
                    <p className="text-[11px] text-slate-500">Direct urgent SMS delivery to registered Saudi numbers</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={smsEnabled}
                  onChange={(e) => setSmsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Super Logistics Official WhatsApp Number
                </label>
                <input
                  type="text"
                  value={botNumber}
                  onChange={(e) => setBotNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleSaveChannels}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Gateway Settings</span>
            </button>
          </div>
        )}

        {/* Tab 3: Admin Profile */}
        {activeTab === "profile" && (
          <form onSubmit={handleSaveProfile} className="p-6 space-y-4 max-w-lg">
            <div>
              <h3 className="text-base font-bold text-slate-900">Administrator Profile</h3>
              <p className="text-xs text-slate-500 mt-1">Super Logistics Central Group Administrator</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
              <input
                type="text"
                value={adminPhone}
                onChange={(e) => setAdminPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/20"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 4: Roles & Permissions */}
        {activeTab === "roles" && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Role-Based Access Control (RBAC)</h3>
              <p className="text-xs text-slate-500 mt-1">
                Multi-tenant security hierarchy designed for PostgreSQL & Prisma row-level security (RLS).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-2">
                <span className="font-bold text-blue-900 text-sm block">Super Administrator</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Full unrestricted access across all 12 group entities, WPS banking disbursement authorization, and system configuration.
                </p>
                <span className="inline-block px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded">
                  All 12 Companies
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="font-bold text-slate-900 text-sm block">Company HR Manager</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Tenant-scoped management for specific subsidiary employees, document uploads, and insurance renewal filings.
                </p>
                <span className="inline-block px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">
                  Single Entity
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="font-bold text-slate-900 text-sm block">Operations Dispatch Auditor</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Read-only clearance verification for heavy vehicle operators, driver permits, and active duty status.
                </p>
                <span className="inline-block px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">
                  Operations Level
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
