"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  Company,
  Employee,
  InsuranceRecord,
  InsuranceStatus,
  DocumentRecord,
  NotificationLog,
  AuditLog,
  ExpiryItem,
  SystemSettings,
} from "@/types";
import { initialCompanies } from "@/lib/mockData/companies";
import { initialEmployees } from "@/lib/mockData/employees";
import { initialInsurances } from "@/lib/mockData/insurances";
import { initialDocuments } from "@/lib/mockData/documents";
import { initialNotifications } from "@/lib/mockData/notifications";
import { initialAuditLogs } from "@/lib/mockData/auditLogs";
import { calculateDaysRemaining, getExpiryCategory } from "@/lib/utils";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
}

interface SuperHRContextType {
  // Data
  companies: Company[];
  employees: Employee[];
  insurances: InsuranceRecord[];
  documents: DocumentRecord[];
  notifications: NotificationLog[];
  auditLogs: AuditLog[];
  expiryItems: ExpiryItem[];
  settings: SystemSettings;

  // Global filters & search
  selectedCompanyId: string;
  setSelectedCompanyId: (id: string) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;

  // Actions - Companies
  addCompany: (comp: Omit<Company, "id" | "createdAt" | "employeeCount">) => void;
  updateCompany: (comp: Company) => void;
  toggleCompanyStatus: (id: string) => void;

  // Actions - Employees
  addEmployee: (emp: Omit<Employee, "id">) => void;
  updateEmployee: (emp: Employee) => void;
  toggleEmployeeStatus: (id: string) => void;

  // Actions - Insurance
  addInsurance: (ins: Omit<InsuranceRecord, "id">) => void;
  renewInsurance: (insuranceId: string, newExpiry: string, newProvider?: string) => void;

  // Actions - Documents
  addDocument: (doc: Omit<DocumentRecord, "id" | "uploadedAt">) => void;
  deleteDocument: (id: string) => void;

  // Actions - Notifications
  dispatchNotification: (notif: Omit<NotificationLog, "id" | "dateSent">) => void;

  // Settings
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  resetToDemoData: () => void;

  // Mobile navigation drawer
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  // UI / Toasts
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: (id: string) => void;

  // Active WhatsApp Preview State
  whatsAppPreviewData: {
    isOpen: boolean;
    recipientPhone: string;
    recipientName: string;
    messageText: string;
    documentType: string;
  } | null;
  openWhatsAppPreview: (data: { recipientPhone: string; recipientName: string; messageText: string; documentType: string }) => void;
  closeWhatsAppPreview: () => void;
}

const SuperHRContext = createContext<SuperHRContextType | undefined>(undefined);

const STORAGE_KEY = "SUPER_HR_DATA_V2";

const defaultSettings: SystemSettings = {
  reminderThresholds: {
    firstNoticeDays: 30,
    secondNoticeDays: 7,
    finalNoticeDays: 0,
  },
  channels: {
    whatsappEnabled: true,
    emailEnabled: true,
    smsEnabled: true,
  },
  whatsappConfig: {
    senderNumber: "+966 50 000 8899",
    templateLanguage: "BOTH",
    autoSend: true,
  },
  systemLanguage: "en",
  currency: "SAR",
  fiscalYear: "2026-2027",
};

export function SuperHRProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [insurances, setInsurances] = useState<InsuranceRecord[]>(initialInsurances);
  const [documents, setDocuments] = useState<DocumentRecord[]>(initialDocuments);
  const [notifications, setNotifications] = useState<NotificationLog[]>(initialNotifications);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("all");
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>("");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [whatsAppPreviewData, setWhatsAppPreviewData] = useState<{
    isOpen: boolean;
    recipientPhone: string;
    recipientName: string;
    messageText: string;
    documentType: string;
  } | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.companies) setCompanies(parsed.companies);
        if (parsed.employees) setEmployees(parsed.employees);
        if (parsed.insurances) setInsurances(parsed.insurances);
        if (parsed.documents) setDocuments(parsed.documents);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
        if (parsed.settings) setSettings(parsed.settings);
      }
    } catch (e) {
      console.warn("Could not parse saved HR data from localStorage", e);
    }
    setMounted(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      const payload = {
        companies,
        employees,
        insurances,
        documents,
        notifications,
        auditLogs,
        settings,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [mounted, companies, employees, insurances, documents, notifications, auditLogs, settings]);

  const showToast = (toast: Omit<ToastMessage, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addAudit = (action: string, target: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      actorName: "Central Admin (Abdulrahman)",
      actorRole: "Super Administrator",
      action,
      target,
      details,
      ipAddress: "10.14.22.8",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Expiry Items computed dynamically from employee documents & credentials
  const expiryItems = useMemo<ExpiryItem[]>(() => {
    const list: ExpiryItem[] = [];

    employees.forEach((emp) => {
      // 1. Iqama
      const iqamaDays = calculateDaysRemaining(emp.iqamaExpiry);
      list.push({
        id: `${emp.id}-iqama`,
        employeeId: emp.employeeId,
        employeeName: emp.fullName,
        companyId: emp.companyId,
        companyName: emp.companyName,
        documentType: "Iqama / National ID",
        documentNumber: emp.nationalId,
        expiryDate: emp.iqamaExpiry,
        daysRemaining: iqamaDays,
        category: getExpiryCategory(iqamaDays),
        phone: emp.phone,
        email: emp.email,
      });

      // 2. Heavy Driving License
      const licDays = calculateDaysRemaining(emp.licenseExpiry);
      list.push({
        id: `${emp.id}-lic`,
        employeeId: emp.employeeId,
        employeeName: emp.fullName,
        companyId: emp.companyId,
        companyName: emp.companyName,
        documentType: "Heavy Driving License",
        documentNumber: `DL-${emp.nationalId.slice(4)}`,
        expiryDate: emp.licenseExpiry,
        daysRemaining: licDays,
        category: getExpiryCategory(licDays),
        phone: emp.phone,
        email: emp.email,
      });

      // 3. Insurance
      const insDays = calculateDaysRemaining(emp.insuranceExpiry);
      list.push({
        id: `${emp.id}-ins`,
        employeeId: emp.employeeId,
        employeeName: emp.fullName,
        companyId: emp.companyId,
        companyName: emp.companyName,
        documentType: "Medical Insurance",
        documentNumber: `POL-${emp.employeeId}`,
        expiryDate: emp.insuranceExpiry,
        daysRemaining: insDays,
        category: getExpiryCategory(insDays),
        phone: emp.phone,
        email: emp.email,
      });

      // 4. Passport
      const passDays = calculateDaysRemaining(emp.passportExpiry);
      list.push({
        id: `${emp.id}-pass`,
        employeeId: emp.employeeId,
        employeeName: emp.fullName,
        companyId: emp.companyId,
        companyName: emp.companyName,
        documentType: "Passport",
        documentNumber: `P${emp.nationalId.slice(2, 9)}`,
        expiryDate: emp.passportExpiry,
        daysRemaining: passDays,
        category: getExpiryCategory(passDays),
        phone: emp.phone,
        email: emp.email,
      });

      // 5. Contract
      const conDays = calculateDaysRemaining(emp.contractExpiry);
      list.push({
        id: `${emp.id}-con`,
        employeeId: emp.employeeId,
        employeeName: emp.fullName,
        companyId: emp.companyId,
        companyName: emp.companyName,
        documentType: "Employment Contract",
        documentNumber: `QIWA-${emp.employeeId}`,
        expiryDate: emp.contractExpiry,
        daysRemaining: conDays,
        category: getExpiryCategory(conDays),
        phone: emp.phone,
        email: emp.email,
      });
    });

    return list.sort((a, b) => a.daysRemaining - b.daysRemaining);
  }, [employees]);

  // Company Actions
  const addCompany = (comp: Omit<Company, "id" | "createdAt" | "employeeCount">) => {
    const id = `comp-${Date.now()}`;
    const newCompany: Company = {
      ...comp,
      id,
      createdAt: new Date().toISOString().substring(0, 10),
      employeeCount: 0,
    };
    setCompanies((prev) => [newCompany, ...prev]);
    addAudit("COMPANY_CREATED", comp.name, `New logistics entity ${comp.name} (${comp.code}) created.`);
    showToast({
      type: "success",
      title: "Company Added",
      message: `${comp.name} has been added successfully.`,
    });
  };

  const updateCompany = (comp: Company) => {
    setCompanies((prev) => prev.map((c) => (c.id === comp.id ? comp : c)));
    addAudit("COMPANY_UPDATED", comp.name, `Company details updated for ${comp.name}.`);
    showToast({
      type: "success",
      title: "Company Updated",
      message: `${comp.name} details saved.`,
    });
  };

  const toggleCompanyStatus = (id: string) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newStatus = c.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
          addAudit("COMPANY_STATUS_CHANGED", c.name, `Company status switched to ${newStatus}.`);
          showToast({
            type: "info",
            title: "Company Status Changed",
            message: `${c.name} is now ${newStatus}.`,
          });
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
  };

  // Employee Actions
  const addEmployee = (emp: Omit<Employee, "id">) => {
    const id = `emp-${Date.now()}`;
    const newEmp: Employee = { ...emp, id };
    setEmployees((prev) => [newEmp, ...prev]);
    setCompanies((prev) =>
      prev.map((c) => (c.id === emp.companyId ? { ...c, employeeCount: (c.employeeCount || 0) + 1 } : c))
    );
    addAudit("EMPLOYEE_ONBOARDED", emp.fullName, `Enrolled ${emp.fullName} (${emp.employeeId}) into ${emp.companyName}.`);
    showToast({
      type: "success",
      title: "Employee Added",
      message: `${emp.fullName} has been registered successfully.`,
    });
  };

  const updateEmployee = (emp: Employee) => {
    setEmployees((prev) => prev.map((e) => (e.id === emp.id ? emp : e)));
    addAudit("EMPLOYEE_UPDATED", emp.fullName, `Profile updated for ${emp.fullName} (${emp.employeeId}).`);
    showToast({
      type: "success",
      title: "Employee Profile Saved",
      message: `${emp.fullName}'s information has been updated.`,
    });
  };

  const toggleEmployeeStatus = (id: string) => {
    setEmployees((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const newStatus = e.employmentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
          addAudit("EMPLOYEE_STATUS_CHANGED", e.fullName, `Employment status updated to ${newStatus}.`);
          showToast({
            type: "info",
            title: "Employee Status Changed",
            message: `${e.fullName} marked as ${newStatus}.`,
          });
          return { ...e, employmentStatus: newStatus };
        }
        return e;
      })
    );
  };

  // Insurance Actions
  const addInsurance = (ins: Omit<InsuranceRecord, "id">) => {
    const id = `ins-${Date.now()}`;
    const newIns: InsuranceRecord = { ...ins, id };
    setInsurances((prev) => [newIns, ...prev]);
    addAudit("INSURANCE_ADDED", ins.policyNumber, `Added policy for ${ins.employeeName} with ${ins.provider}.`);
    showToast({
      type: "success",
      title: "Insurance Policy Added",
      message: `Policy ${ins.policyNumber} registered with ${ins.provider}.`,
    });
  };

  const renewInsurance = (insuranceId: string, newExpiry: string, newProvider?: string) => {
    setInsurances((prev) =>
      prev.map((ins) => {
        if (ins.id === insuranceId) {
          const days = calculateDaysRemaining(newExpiry);
          const newStatus: InsuranceStatus = days < 0 ? "EXPIRED" : days <= 30 ? "EXPIRING_SOON" : "ACTIVE";
          const updated = {
            ...ins,
            expiryDate: newExpiry,
            provider: (newProvider as any) || ins.provider,
            status: newStatus,
          };
          addAudit("INSURANCE_RENEWED", ins.policyNumber, `Renewed policy for ${ins.employeeName}. New expiry: ${newExpiry}.`);
          showToast({
            type: "success",
            title: "Insurance Renewed",
            message: `Policy renewed until ${newExpiry}.`,
          });
          return updated;
        }
        return ins;
      })
    );
  };

  // Document Actions
  const addDocument = (doc: Omit<DocumentRecord, "id" | "uploadedAt">) => {
    const id = `doc-${Date.now()}`;
    const newDoc: DocumentRecord = {
      ...doc,
      id,
      uploadedAt: new Date().toISOString().substring(0, 10),
    };
    setDocuments((prev) => [newDoc, ...prev]);
    addAudit("DOCUMENT_UPLOADED", doc.documentType, `Uploaded ${doc.documentType} for ${doc.employeeName}.`);
    showToast({
      type: "success",
      title: "Document Uploaded",
      message: `${doc.documentType} (${doc.fileName}) saved.`,
    });
  };

  const deleteDocument = (id: string) => {
    const target = documents.find((d) => d.id === id);
    if (!target) return;
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    addAudit("DOCUMENT_DELETED", target.fileName, `Removed document ${target.fileName} for ${target.employeeName}.`);
    showToast({
      type: "warning",
      title: "Document Removed",
      message: `${target.fileName} has been deleted.`,
    });
  };

  // Notification Actions
  const dispatchNotification = (notif: Omit<NotificationLog, "id" | "dateSent">) => {
    const id = `notif-${Date.now()}`;
    const newNotif: NotificationLog = {
      ...notif,
      id,
      dateSent: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "DELIVERED",
    };
    setNotifications((prev) => [newNotif, ...prev]);
    addAudit("NOTIFICATION_SENT", notif.employeeName, `Sent ${notif.channel} notification for ${notif.documentType}.`);
    showToast({
      type: "success",
      title: `${notif.channel} Notification Sent`,
      message: `Delivered to ${notif.employeeName} (${notif.recipientPhone || notif.recipientEmail}).`,
    });
  };

  // WhatsApp Preview Modal control
  const openWhatsAppPreview = (data: {
    recipientPhone: string;
    recipientName: string;
    messageText: string;
    documentType: string;
  }) => {
    setWhatsAppPreviewData({
      isOpen: true,
      ...data,
    });
  };

  const closeWhatsAppPreview = () => {
    setWhatsAppPreviewData(null);
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast({
      type: "success",
      title: "Settings Saved",
      message: "System configuration updated successfully.",
    });
  };

  const resetToDemoData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setCompanies(initialCompanies);
    setEmployees(initialEmployees);
    setInsurances(initialInsurances);
    setDocuments(initialDocuments);
    setNotifications(initialNotifications);
    setAuditLogs(initialAuditLogs);
    setSettings(defaultSettings);
    setSelectedCompanyId("all");
    setGlobalSearchQuery("");
    showToast({
      type: "info",
      title: "Demo Reset",
      message: "Initial dataset restored to default state.",
    });
  };

  return (
    <SuperHRContext.Provider
      value={{
        companies,
        employees,
        insurances,
        documents,
        notifications,
        auditLogs,
        expiryItems,
        settings,
        selectedCompanyId,
        setSelectedCompanyId,
        globalSearchQuery,
        setGlobalSearchQuery,
        addCompany,
        updateCompany,
        toggleCompanyStatus,
        addEmployee,
        updateEmployee,
        toggleEmployeeStatus,
        addInsurance,
        renewInsurance,
        addDocument,
        deleteDocument,
        dispatchNotification,
        updateSettings,
        resetToDemoData,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toasts,
        showToast,
        dismissToast,
        whatsAppPreviewData,
        openWhatsAppPreview,
        closeWhatsAppPreview,
      }}
    >
      {children}
    </SuperHRContext.Provider>
  );
}

export function useSuperHR() {
  const context = useContext(SuperHRContext);
  if (!context) {
    throw new Error("useSuperHR must be used within a SuperHRProvider");
  }
  return context;
}
