"use client";

import React from "react";
import { EmploymentStatus, InsuranceStatus, ExpiryCategory } from "@/types";
import { getExpiryBadgeProps } from "@/lib/utils";

interface StatusBadgeProps {
  type: "employment" | "insurance" | "expiry" | "generic";
  value: string;
}

export function StatusBadge({ type, value }: StatusBadgeProps) {
  if (type === "expiry") {
    const props = getExpiryBadgeProps(value as ExpiryCategory);
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${props.className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${props.dotColor}`} />
        {props.label}
      </span>
    );
  }

  if (type === "employment") {
    const val = value as EmploymentStatus;
    let colorClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
    let label = "Active";

    if (val === "INACTIVE") {
      colorClass = "bg-slate-100 text-slate-700 border-slate-300";
      label = "Inactive";
    } else if (val === "ON_LEAVE") {
      colorClass = "bg-amber-50 text-amber-700 border-amber-200";
      label = "On Leave";
    } else if (val === "PROBATION") {
      colorClass = "bg-blue-50 text-blue-700 border-blue-200";
      label = "Probation";
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.8 rounded-full text-xs font-semibold border ${colorClass}`}>
        {label}
      </span>
    );
  }

  if (type === "insurance") {
    const val = value as InsuranceStatus;
    let colorClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
    let label = "Active";

    if (val === "EXPIRING_SOON") {
      colorClass = "bg-amber-50 text-amber-700 border-amber-200";
      label = "Expiring Soon";
    } else if (val === "EXPIRED") {
      colorClass = "bg-red-50 text-red-700 border-red-200";
      label = "Expired";
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.8 rounded-full text-xs font-semibold border ${colorClass}`}>
        {label}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.8 rounded-full text-xs font-semibold border bg-slate-100 text-slate-700 border-slate-200">
      {value}
    </span>
  );
}
