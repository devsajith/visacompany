# Super HR – Multi-Company Workforce Management System
### Enterprise SaaS Platform for Super Logistics KSA

Built for **Super Logistics**, a Saudi Arabia-based logistics and transport management group, to centralize workforce, subsidiary entities, branches, payroll, insurance, and document expiry management into a single, high-performance web platform.

---

## 🌟 Architecture & Highlights

- **Multi-Tenant Foundation**: Built with a clear tenant & subsidiary hierarchy ready for PostgreSQL and Prisma row-level security (RLS).
- **12 Associated Companies**: Realistic Saudi logistics entities (Refrigerated Cold Chain, Heavy Transport, Dry Port, Air Cargo, Customs Clearance, Fulfilment Hubs).
- **25 Operating Branches**: Spanning Riyadh, Jeddah, Dammam, Jubail, Yanbu, Madinah, Tabuk, NEOM, Khamis Mushait, and Jazan.
- **105+ Realistic Employee Records**: Complete with 10-digit Saudi IDs & Iqamas, SAR currency breakdowns, Qiwa contract authentications, and emergency contacts.
- **Centralized Expiry Radar**: Automatic real-time status calculation for Iqama, Heavy Driver Licenses, CCHI Medical Insurance, and Passport expiries with color-coded alerts (Expired, <7 Days, <30 Days, <60 Days, Valid).
- **Interactive WhatsApp Notification Simulator**: Authentic mobile WhatsApp chat interface with Saudi phone numbers (+966 5X XXX XXXX), bilingual Arabic/English message preview, and live dispatch simulation.
- **WPS Salary & Payroll Engine**: Wage Protection System compliant disbursements, payslip modal generator, and CSV exports in SAR.
- **Local Storage Persistence**: Real-time CRUD operations (add/edit/delete/status changes) persist automatically across reloads.
- **One-Click Demo Reset**: Easily reload initial seed data anytime.

---

## 🚀 Navigation & Modules

1. **Dashboard** (`/`):
   - Executive KPI cards with dynamic figures.
   - Analytical charts (Recharts): Workforce distribution by company, Monthly SAR payroll disbursement, Insurance expiry breakdown, and hiring vs. exit trends.
   - Urgent document expiry radar list with quick WhatsApp triggers.
   - Live system activity audit trail feed.

2. **Company Management** (`/companies`):
   - Full directory of 12 group entities with CR numbers, VAT numbers, cities, branch counts, and workforce sizes.
   - Add/Edit company modal, detailed company view drawer, and status toggle.

3. **Branch Management** (`/branches`):
   - 25 logistics terminals and transit bases.
   - Company-wise filtering, manager contact details, staff headcounts, and Add/Edit modals.

4. **Employee Directory** (`/employees`):
   - Multi-field search (by name, ID, Iqama, role).
   - Filter by company, branch, department, and employment status.
   - Add and Edit employee modal with auto-calculating Net SAR salary.
   - CSV export for HR reporting.

5. **Detailed Employee Profile** (`/employees/[id]`):
   - **Overview Tab**: Personal metrics, emergency contacts, critical document validity radar.
   - **Employment Details Tab**: Assigned subsidiary, branch, department, contract start & expiry.
   - **Salary History Tab**: Monthly payslips and WPS references in SAR.
   - **Medical Insurance Tab**: Bupa / Tawuniya policy details with 1-click renewal.
   - **Documents Tab**: PDF document cards with download simulation.
   - **Activity History Tab**: Comprehensive personnel audit trail.

6. **Salary & Payroll** (`/payroll`):
   - Monthly salary disbursement overview in SAR.
   - Payment status tracking (PAID, PENDING, PROCESSING).
   - Batch payment release for subsidiaries.
   - Official WPS-compliant payslip preview and print modal.

7. **Insurance Management** (`/insurance`):
   - Council of Cooperative Health Insurance (CCHI) corporate policy monitoring.
   - Providers: Bupa Arabia, Tawuniya, Medgulf, Malath, Al Rajhi Takaful.
   - Add policy and renew policy modal with dynamic expiry calculation.

8. **Document Management** (`/documents`):
   - Central document vault for Iqama, Passport, Heavy Driving Licenses, and Contracts.
   - Drag-and-drop file upload simulator with metadata indexing.
   - Document preview dialog and CSV export.

9. **Expiry Management Radar** (`/expiry`):
   - High-priority radar tracking expired and expiring documents.
   - Visual category cards: Expired, &le;7 Days, &le;30 Days, &le;60 Days, Valid.
   - Direct 1-click WhatsApp reminder trigger.

10. **Notification Center** (`/notifications`):
    - Multi-channel delivery history (WhatsApp, Email, SMS).
    - 4 automated notification rules (T-30d, T-7d, T-0d, Post-Expiry escalation).
    - WhatsApp preview modal with live delivery simulation.

11. **Executive Reports** (`/reports`):
    - Pre-built reports for companies, branches, monthly payroll, insurance status, and expiry risk audits.
    - Date range and company filters.
    - 1-click CSV download for all reports.

12. **Settings** (`/settings`):
    - Administrator profile.
    - Expiry reminder threshold configuration (custom days sliders).
    - Communication gateway toggles (WhatsApp, Email SMTP, SMS).
    - Multi-tenant role definitions (Super Admin, HR Manager, Fleet Auditor).
    - Reset Demo Data helper.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router & Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Visualizations**: Recharts
- **Database Schema**: Prisma Schema (`prisma/schema.prisma`) for future PostgreSQL production deployment

---

## 💻 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or build for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) (or the active port reported in terminal, e.g., `http://localhost:3001`) in your browser.
