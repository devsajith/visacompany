"use client";

import React, { useState } from "react";
import { useSuperHR } from "@/context/SuperHRContext";
import { X, Send, CheckCheck, Phone, Video, MoreVertical, ShieldAlert } from "lucide-react";

export function WhatsAppPreviewModal() {
  const { whatsAppPreviewData, closeWhatsAppPreview, dispatchNotification, showToast } = useSuperHR();
  const [customReply, setCustomReply] = useState("");

  if (!whatsAppPreviewData || !whatsAppPreviewData.isOpen) return null;

  const handleSendLiveSimulated = () => {
    dispatchNotification({
      employeeId: "SIM-01",
      employeeName: whatsAppPreviewData.recipientName,
      companyId: "comp-1",
      companyName: "Super Logistics KSA",
      notificationType: "OVERDUE_ALERT",
      documentType: whatsAppPreviewData.documentType,
      expiryDate: "2026-11-20",
      channel: "WHATSAPP",
      recipientPhone: whatsAppPreviewData.recipientPhone,
      messagePreview: whatsAppPreviewData.messageText,
      status: "DELIVERED",
    });
    showToast({
      type: "success",
      title: "WhatsApp Dispatched",
      message: `Message pushed to ${whatsAppPreviewData.recipientPhone} via Super HR WhatsApp Gateway.`,
    });
    closeWhatsAppPreview();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
        {/* Modal Window Header */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
              Interactive WhatsApp Notification Simulator
            </span>
          </div>
          <button
            onClick={closeWhatsAppPreview}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Mobile App Bar */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700 border-2 border-emerald-400 flex items-center justify-center font-bold text-sm shadow-inner">
              {whatsAppPreviewData.recipientName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <div className="font-semibold text-sm leading-tight">{whatsAppPreviewData.recipientName}</div>
              <div className="text-[11px] text-emerald-200 flex items-center gap-1">
                <span>{whatsAppPreviewData.recipientPhone}</span>
                <span>• online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-emerald-100">
            <Video className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" />
            <Phone className="w-4 h-4 cursor-pointer opacity-80 hover:opacity-100" />
            <MoreVertical className="w-4 h-4 cursor-pointer opacity-80 hover:opacity-100" />
          </div>
        </div>

        {/* WhatsApp Chat Canvas */}
        <div className="bg-[#E5DDD5] p-4 min-h-[300px] max-h-[380px] overflow-y-auto space-y-3 flex flex-col justify-end">
          {/* Security Banner */}
          <div className="bg-amber-100 text-amber-800 text-[10px] text-center p-2 rounded-lg shadow-sm border border-amber-200 flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>Messages are end-to-end encrypted. Super Logistics Central HR automated verification channel.</span>
          </div>

          {/* System Date Pill */}
          <div className="flex justify-center">
            <span className="bg-white/80 backdrop-blur-xs text-slate-600 text-[10px] font-medium px-3 py-1 rounded-full shadow-xs">
              TODAY
            </span>
          </div>

          {/* Outgoing Message Bubble from Super HR */}
          <div className="self-end max-w-[88%] bg-[#DCF8C6] text-slate-900 rounded-2xl rounded-tr-xs p-3.5 shadow-sm space-y-1.5 border border-emerald-200/50">
            <div className="text-[11px] font-bold text-emerald-900 flex items-center justify-between border-b border-emerald-300/40 pb-1">
              <span>Super HR Automated Bot</span>
              <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-normal">Official</span>
            </div>
            <p className="text-xs leading-relaxed whitespace-pre-wrap">{whatsAppPreviewData.messageText}</p>
            <div className="flex items-center justify-end gap-1 text-[10px] text-slate-500 pt-0.5">
              <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
            </div>
          </div>

          {customReply && (
            <div className="self-start max-w-[85%] bg-white text-slate-900 rounded-2xl rounded-tl-xs p-3 shadow-sm border border-slate-200">
              <p className="text-xs">{customReply}</p>
              <div className="text-[10px] text-slate-400 text-right mt-1">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          )}
        </div>

        {/* Simulated Input / Action Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={customReply}
            onChange={(e) => setCustomReply(e.target.value)}
            placeholder="Simulate employee response..."
            className="flex-1 text-xs px-3 py-2 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleSendLiveSimulated}
            className="bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Now</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="bg-slate-100 px-4 py-2 text-[11px] text-slate-500 border-t border-slate-200 flex items-center justify-between">
          <span>Recipient: {whatsAppPreviewData.recipientName}</span>
          <span className="font-mono">{whatsAppPreviewData.recipientPhone}</span>
        </div>
      </div>
    </div>
  );
}
