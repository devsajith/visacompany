export type ExpiryCategory = 'expired' | '7days' | '30days' | '60days' | 'valid';

export type EmploymentStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'PROBATION';

export type InsuranceStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED';

export type DocumentType = 
  | 'Iqama / National ID'
  | 'Passport'
  | 'Heavy Driving License'
  | 'Commercial Driver Permit'
  | 'Medical Fitness Certificate'
  | 'Employment Contract'
  | 'Insurance Card'
  | 'Aramco Safety Passport';

export interface Company {
  id: string;
  name: string;
  code: string;
  crNumber: string; // Commercial Registration
  taxNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  status: 'ACTIVE' | 'INACTIVE';
  employeeCount?: number;
  createdAt: string;
}

export interface Employee {
  id: string;
  employeeId: string; // e.g. "SL-1042"
  fullName: string;
  arabicName?: string;
  avatarUrl?: string;
  gender: 'MALE' | 'FEMALE';
  nationality: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  nationalId: string; // Saudi ID or Iqama (10 digits)
  companyId: string;
  companyName: string;
  designation: string;
  department: string;
  joiningDate: string;
  employmentType: 'FULL_TIME' | 'CONTRACT' | 'TEMPORARY';
  employmentStatus: EmploymentStatus;
  // Primary Document Expiry Dates for Fast Access
  iqamaExpiry: string;
  passportExpiry: string;
  licenseExpiry: string;
  contractExpiry: string;
  insuranceExpiry: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface InsuranceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  companyId: string;
  companyName: string;
  provider: 'Bupa Arabia' | 'Tawuniya' | 'Medgulf' | 'Malath Insurance' | 'Al Rajhi Takaful';
  policyNumber: string;
  category: 'VIP Executive' | 'Class A' | 'Class B' | 'Class C';
  startDate: string;
  expiryDate: string;
  status: InsuranceStatus;
  premiumSAR: number;
  documentUrl?: string;
  memberId: string;
}

export interface DocumentRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  companyId: string;
  companyName: string;
  documentType: DocumentType;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  status: ExpiryCategory;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  notes?: string;
}

export interface ExpiryItem {
  id: string;
  employeeId: string;
  employeeName: string;
  companyId: string;
  companyName: string;
  documentType: string;
  documentNumber: string;
  expiryDate: string;
  daysRemaining: number;
  category: ExpiryCategory;
  phone: string;
  email: string;
}

export interface NotificationLog {
  id: string;
  employeeId: string;
  employeeName: string;
  companyId: string;
  companyName: string;
  notificationType: '30_DAYS_BEFORE' | '7_DAYS_BEFORE' | 'ON_EXPIRY' | 'OVERDUE_ALERT' | 'RENEWAL_CONFIRMED';
  documentType: string;
  expiryDate: string;
  dateSent: string;
  channel: 'WHATSAPP' | 'EMAIL' | 'SMS';
  status: 'DELIVERED' | 'SENT' | 'FAILED' | 'READ';
  messagePreview: string;
  recipientPhone?: string;
  recipientEmail?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  target: string;
  details: string;
  ipAddress?: string;
}

export interface SystemSettings {
  reminderThresholds: {
    firstNoticeDays: number;
    secondNoticeDays: number;
    finalNoticeDays: number;
  };
  channels: {
    whatsappEnabled: boolean;
    emailEnabled: boolean;
    smsEnabled: boolean;
  };
  whatsappConfig: {
    senderNumber: string;
    templateLanguage: 'AR' | 'EN' | 'BOTH';
    autoSend: boolean;
  };
  systemLanguage: 'en' | 'ar';
  currency: string;
  fiscalYear: string;
}
