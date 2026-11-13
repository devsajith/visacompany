"use client";

import React from "react";
import { useSuperHR } from "@/context/SuperHRContext";
import { StatCard } from "@/components/common/StatCard";
import {
  Building2,
  Users,
  UserCheck,
  UserX,
  AlertOctagon,
  CalendarClock,
  ShieldCheck,
  FileCheck2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function KPIOverview() {
  const router = useRouter();
  const { companies, employees, expiryItems, insurances, selectedCompanyId } = useSuperHR();

  const filteredEmployees =
    selectedCompanyId === "all"
      ? employees
      : employees.filter((e) => e.companyId === selectedCompanyId);

  const filteredExpiry =
    selectedCompanyId === "all"
      ? expiryItems
      : expiryItems.filter((e) => e.companyId === selectedCompanyId);

  const filteredInsurances =
    selectedCompanyId === "all"
      ? insurances
      : insurances.filter((i) => i.companyId === selectedCompanyId);

  const totalEmployees = filteredEmployees.length;
  const activeEmployees = filteredEmployees.filter((e) => e.employmentStatus === "ACTIVE").length;
  const inactiveEmployees = filteredEmployees.filter((e) => e.employmentStatus === "INACTIVE" || e.employmentStatus === "ON_LEAVE").length;

  const expiredDocsCount = filteredExpiry.filter((e) => e.category === "expired").length;
  const upcomingExpiryCount = filteredExpiry.filter(
    (e) => e.category === "7days" || e.category === "30days"
  ).length;
  const validDocsCount = filteredExpiry.filter((e) => e.category === "valid").length;
  const activeInsuranceCount = filteredInsurances.filter((i) => i.status === "ACTIVE").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Companies"
        value={selectedCompanyId === "all" ? companies.length : "1 Active"}
        subtitle="Associated logistics entities"
        icon={Building2}
        colorScheme="blue"
        trend={{ value: "+2 Q3", isPositive: true }}
        onClick={() => router.push("/companies")}
      />
      <StatCard
        title="Total Workforce"
        value={totalEmployees}
        subtitle={`${activeEmployees} Active • ${inactiveEmployees} Inactive/Leave`}
        icon={Users}
        colorScheme="purple"
        trend={{ value: "+12.4%", isPositive: true }}
        onClick={() => router.push("/companies")}
      />
      <StatCard
        title="Active On Duty"
        value={activeEmployees}
        subtitle="Operational across fleet & logistics"
        icon={UserCheck}
        colorScheme="emerald"
        onClick={() => router.push("/companies")}
      />
      <StatCard
        title="Health Insurance"
        value={activeInsuranceCount}
        subtitle="Active CCHI compliant policies"
        icon={ShieldCheck}
        colorScheme="emerald"
        trend={{ value: "Compliant", isPositive: true }}
        onClick={() => router.push("/companies")}
      />
      <StatCard
        title="Inactive / On Leave"
        value={inactiveEmployees}
        subtitle="Pending return or annual leave"
        icon={UserX}
        colorScheme="slate"
        onClick={() => router.push("/companies")}
      />
      <StatCard
        title="Valid Papers"
        value={validDocsCount}
        subtitle="Compliant Iqamas, licenses & contracts"
        icon={FileCheck2}
        colorScheme="emerald"
        onClick={() => router.push("/companies")}
      />
      <StatCard
        title="Upcoming Expirations"
        value={upcomingExpiryCount}
        subtitle="Expiring within 30 days"
        icon={CalendarClock}
        colorScheme="amber"
        trend={{ value: "Action Required", isPositive: false }}
        onClick={() => router.push("/notifications")}
      />
      <StatCard
        title="Expired Documents"
        value={expiredDocsCount}
        subtitle="Immediate renewal required"
        icon={AlertOctagon}
        colorScheme="rose"
        trend={{ value: "High Risk", isPositive: false }}
        onClick={() => router.push("/notifications")}
      />
    </div>
  );
}
