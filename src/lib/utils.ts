import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ExpiryCategory } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSAR(amount: number): string {
  return new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(amount).replace("SAR", "SAR ");
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "—";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function calculateDaysRemaining(expiryDateStr: string, baseDateStr = "2026-11-13"): number {
  if (!expiryDateStr) return 999;
  const expiry = new Date(expiryDateStr).getTime();
  const current = new Date(baseDateStr).getTime();
  const diffDays = Math.ceil((expiry - current) / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getExpiryCategory(days: number): ExpiryCategory {
  if (days < 0) return "expired";
  if (days <= 7) return "7days";
  if (days <= 30) return "30days";
  if (days <= 60) return "60days";
  return "valid";
}

export function getExpiryBadgeProps(category: ExpiryCategory) {
  switch (category) {
    case "expired":
      return {
        label: "Expired",
        className: "bg-red-50 text-red-700 border-red-200 ring-1 ring-red-600/20",
        dotColor: "bg-red-500",
      };
    case "7days":
      return {
        label: "Expires < 7 Days",
        className: "bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-600/20",
        dotColor: "bg-rose-500",
      };
    case "30days":
      return {
        label: "Expires < 30 Days",
        className: "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-600/20",
        dotColor: "bg-amber-500",
      };
    case "60days":
      return {
        label: "Expires < 60 Days",
        className: "bg-yellow-50 text-yellow-800 border-yellow-200 ring-1 ring-yellow-600/20",
        dotColor: "bg-yellow-500",
      };
    case "valid":
    default:
      return {
        label: "Valid",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-600/20",
        dotColor: "bg-emerald-500",
      };
  }
}

export function exportToCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(","),
    ...rows.map(row =>
      headers
        .map(header => {
          const val = row[header] === undefined || row[header] === null ? "" : String(row[header]);
          const escaped = val.replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(",")
    ),
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
