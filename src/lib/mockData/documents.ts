import { DocumentRecord } from "@/types";
import { initialEmployees } from "./employees";
import { calculateDaysRemaining, getExpiryCategory } from "@/lib/utils";

export const initialDocuments: DocumentRecord[] = [];

initialEmployees.slice(0, 35).forEach((emp, idx) => {
  // Iqama / National ID
  const iqamaDays = calculateDaysRemaining(emp.iqamaExpiry);
  initialDocuments.push({
    id: `doc-iq-${idx + 1}`,
    employeeId: emp.employeeId,
    employeeName: emp.fullName,
    companyId: emp.companyId,
    companyName: emp.companyName,
    documentType: "Iqama / National ID",
    documentNumber: emp.nationalId,
    issueDate: "2024-05-10",
    expiryDate: emp.iqamaExpiry,
    status: getExpiryCategory(iqamaDays),
    fileName: `${emp.employeeId}_Iqama_Card.pdf`,
    fileSize: "1.4 MB",
    uploadedAt: "2024-05-12",
  });

  // Passport
  const passDays = calculateDaysRemaining(emp.passportExpiry);
  initialDocuments.push({
    id: `doc-pp-${idx + 1}`,
    employeeId: emp.employeeId,
    employeeName: emp.fullName,
    companyId: emp.companyId,
    companyName: emp.companyName,
    documentType: "Passport",
    documentNumber: `P${7829102 + idx}`,
    issueDate: "2022-03-15",
    expiryDate: emp.passportExpiry,
    status: getExpiryCategory(passDays),
    fileName: `${emp.employeeId}_Passport_Scan.pdf`,
    fileSize: "2.8 MB",
    uploadedAt: "2022-03-20",
  });

  // Driving License or Heavy Permit
  const licDays = calculateDaysRemaining(emp.licenseExpiry);
  initialDocuments.push({
    id: `doc-lic-${idx + 1}`,
    employeeId: emp.employeeId,
    employeeName: emp.fullName,
    companyId: emp.companyId,
    companyName: emp.companyName,
    documentType: "Heavy Driving License",
    documentNumber: `DL-${901823 + idx}`,
    issueDate: "2023-01-10",
    expiryDate: emp.licenseExpiry,
    status: getExpiryCategory(licDays),
    fileName: `${emp.employeeId}_KSA_Heavy_License.pdf`,
    fileSize: "890 KB",
    uploadedAt: "2023-01-14",
  });

  // Employment Contract
  const conDays = calculateDaysRemaining(emp.contractExpiry);
  initialDocuments.push({
    id: `doc-con-${idx + 1}`,
    employeeId: emp.employeeId,
    employeeName: emp.fullName,
    companyId: emp.companyId,
    companyName: emp.companyName,
    documentType: "Employment Contract",
    documentNumber: `CNT-QIWA-${554400 + idx}`,
    issueDate: "2023-07-01",
    expiryDate: emp.contractExpiry,
    status: getExpiryCategory(conDays),
    fileName: `${emp.employeeId}_Qiwa_Authenticated_Contract.pdf`,
    fileSize: "3.2 MB",
    uploadedAt: "2023-07-05",
  });
});
