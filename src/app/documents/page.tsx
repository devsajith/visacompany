"use client";

import React, { useState, useMemo } from "react";
import { useSuperHR } from "@/context/SuperHRContext";
import { DocumentRecord, DocumentType } from "@/types";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate, exportToCSV, calculateDaysRemaining, getExpiryCategory } from "@/lib/utils";
import {
  FolderArchive,
  Search,
  Building2,
  Filter,
  Download,
  Upload,
  FileText,
  Eye,
  Trash2,
  X,
  FileCheck,
  ShieldAlert,
} from "lucide-react";

export default function DocumentsPage() {
  const { documents, companies, employees, selectedCompanyId, setSelectedCompanyId, addDocument, deleteDocument, showToast } =
    useSuperHR();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentRecord | null>(null);

  // New Document Upload State
  const [newDoc, setNewDoc] = useState({
    employeeId: employees[0]?.employeeId || "",
    employeeName: employees[0]?.fullName || "",
    companyId: companies[0]?.id || "",
    companyName: companies[0]?.name || "",
    documentType: "Iqama / National ID" as DocumentType,
    documentNumber: "1092837461",
    issueDate: "2024-01-10",
    expiryDate: "2027-01-10",
    fileName: "Scanned_Document.pdf",
    fileSize: "1.8 MB",
  });

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      const matchComp = selectedCompanyId === "all" || d.companyId === selectedCompanyId;
      const matchType = typeFilter === "ALL" || d.documentType === typeFilter;
      const matchSearch =
        d.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        d.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        d.documentNumber.toLowerCase().includes(search.toLowerCase()) ||
        d.fileName.toLowerCase().includes(search.toLowerCase());

      return matchComp && matchType && matchSearch;
    });
  }, [documents, selectedCompanyId, typeFilter, search]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleExportCSV = () => {
    const data = filtered.map((d) => ({
      EmployeeID: d.employeeId,
      EmployeeName: d.employeeName,
      Company: d.companyName,
      DocumentType: d.documentType,
      DocumentNumber: d.documentNumber,
      IssueDate: d.issueDate,
      ExpiryDate: d.expiryDate,
      Status: d.status,
      FileName: d.fileName,
      UploadedAt: d.uploadedAt,
    }));
    exportToCSV("Super_HR_Document_Registry", data);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const days = calculateDaysRemaining(newDoc.expiryDate);
    addDocument({
      ...newDoc,
      status: getExpiryCategory(days),
    });
    setIsUploadOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <FolderArchive className="w-7 h-7 text-blue-600" />
            Document Management Repository
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Central repository of Iqamas, passports, driver permits, Qiwa employment contracts & Aramco safety passes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md shadow-blue-600/20"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col lg:flex-row gap-3 items-center justify-between">
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search employee, doc no, filename..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Company Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCompanyId}
              onChange={(e) => {
                setSelectedCompanyId(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="all">All Companies</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doc Type Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Document Types</option>
              <option value="Iqama / National ID">Iqama / National ID</option>
              <option value="Heavy Driving License">Heavy Driving License</option>
              <option value="Passport">Passport</option>
              <option value="Employment Contract">Employment Contract</option>
              <option value="Insurance Card">Insurance Card</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid / Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Document / File</th>
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Document Type</th>
                <th className="py-3.5 px-4">Document No.</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No documents found.
                  </td>
                </tr>
              ) : (
                paginated.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/60 transition group">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <span
                            onClick={() => setPreviewDoc(doc)}
                            className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer block"
                          >
                            {doc.fileName}
                          </span>
                          <span className="text-[10px] text-slate-400">{doc.fileSize} • Added {doc.uploadedAt}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{doc.employeeName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{doc.employeeId}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-800">{doc.documentType}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-700">{doc.documentNumber}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{formatDate(doc.expiryDate)}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge type="expiry" value={doc.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                          title="Preview Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            showToast({
                              type: "success",
                              title: "Download Started",
                              message: `Downloading ${doc.fileName}...`,
                            });
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition"
                          title="Download File"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-50/60 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} documents
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded-lg border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
            >
              Previous
            </button>
            <span className="font-semibold text-slate-800">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded-lg border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Upload Modal with Dropzone */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-bold">Upload Employee Document</h3>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 text-xs">
              {/* Simulated Dropzone */}
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-blue-500 transition cursor-pointer bg-slate-50/50">
                <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2 animate-bounce" />
                <p className="font-bold text-slate-800">Drag & Drop PDF or Scan Image</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Maximum file size 10MB (PDF, PNG, JPG)</p>
                <div className="mt-3 inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 shadow-2xs">
                  Selected: {newDoc.fileName}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Employee *</label>
                <select
                  value={newDoc.employeeId}
                  onChange={(e) => {
                    const emp = employees.find((emp) => emp.employeeId === e.target.value);
                    if (emp) {
                      setNewDoc({
                        ...newDoc,
                        employeeId: emp.employeeId,
                        employeeName: emp.fullName,
                        companyId: emp.companyId,
                        companyName: emp.companyName,
                      });
                    }
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {employees.slice(0, 30).map((emp) => (
                    <option key={emp.id} value={emp.employeeId}>
                      {emp.fullName} ({emp.employeeId}) — {emp.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Document Type *</label>
                  <select
                    value={newDoc.documentType}
                    onChange={(e) => setNewDoc({ ...newDoc, documentType: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Iqama / National ID">Iqama / National ID</option>
                    <option value="Heavy Driving License">Heavy Driving License</option>
                    <option value="Commercial Driver Permit">Commercial Driver Permit</option>
                    <option value="Passport">Passport</option>
                    <option value="Employment Contract">Employment Contract</option>
                    <option value="Aramco Safety Passport">Aramco Safety Passport</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Document Number *</label>
                  <input
                    type="text"
                    value={newDoc.documentNumber}
                    onChange={(e) => setNewDoc({ ...newDoc, documentNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={newDoc.issueDate}
                    onChange={(e) => setNewDoc({ ...newDoc, issueDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    value={newDoc.expiryDate}
                    onChange={(e) => setNewDoc({ ...newDoc, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
                >
                  Save & Index Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  Document Preview
                </span>
                <h3 className="text-base font-bold">{previewDoc.fileName}</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {/* Document Mock View */}
              <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200 text-center flex flex-col items-center justify-center min-h-[180px]">
                <FileCheck className="w-12 h-12 text-emerald-600 mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">{previewDoc.documentType}</h4>
                <p className="font-mono text-slate-500 mt-1">Doc #: {previewDoc.documentNumber}</p>
                <div className="mt-3">
                  <StatusBadge type="expiry" value={previewDoc.status} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 text-[10px] block">EMPLOYEE</span>
                  <span className="font-bold text-slate-800">{previewDoc.employeeName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">COMPANY</span>
                  <span className="font-bold text-slate-800">{previewDoc.companyName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">EXPIRY DATE</span>
                  <span className="font-bold text-slate-800">{formatDate(previewDoc.expiryDate)}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">FILE SIZE</span>
                  <span className="font-bold text-slate-800">{previewDoc.fileSize}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  showToast({
                    type: "success",
                    title: "Downloaded",
                    message: `Downloaded ${previewDoc.fileName}.`,
                  });
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
