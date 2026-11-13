import { InsuranceRecord, InsuranceStatus } from "@/types";
import { initialEmployees } from "./employees";
import { calculateDaysRemaining } from "@/lib/utils";

const providers = [
  "Bupa Arabia",
  "Tawuniya",
  "Medgulf",
  "Malath Insurance",
  "Al Rajhi Takaful",
] as const;

const categories = [
  "VIP Executive",
  "Class A",
  "Class B",
  "Class C",
] as const;

export const initialInsurances: InsuranceRecord[] = initialEmployees.slice(0, 60).map((emp, idx) => {
  const provider = providers[idx % providers.length];
  const category = idx < 5 ? "VIP Executive" : idx < 20 ? "Class A" : idx < 40 ? "Class B" : "Class C";
  const days = calculateDaysRemaining(emp.insuranceExpiry);

  let status: InsuranceStatus = "ACTIVE";
  if (days < 0) {
    status = "EXPIRED";
  } else if (days <= 30) {
    status = "EXPIRING_SOON";
  }

  return {
    id: `ins-${idx + 1}`,
    employeeId: emp.employeeId,
    employeeName: emp.fullName,
    companyId: emp.companyId,
    companyName: emp.companyName,
    provider,
    policyNumber: `POL-${provider.slice(0, 3).toUpperCase()}-${849200 + idx}`,
    memberId: `MBR-${109283 + idx}`,
    category,
    startDate: "2025-11-01",
    expiryDate: emp.insuranceExpiry,
    status,
    premiumSAR: category === "VIP Executive" ? 7500 : category === "Class A" ? 4200 : category === "Class B" ? 2800 : 1800,
    documentUrl: `/documents/insurance-policy-${idx + 1}.pdf`,
  };
});
