"use client";

import React from "react";
import { useSuperHR } from "@/context/SuperHRContext";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, dismissToast } = useSuperHR();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let colorClasses = "bg-white border-emerald-500 text-emerald-800";
        let iconColor = "text-emerald-500";

        if (toast.type === "error") {
          Icon = AlertCircle;
          colorClasses = "bg-white border-red-500 text-red-800";
          iconColor = "text-red-500";
        } else if (toast.type === "warning") {
          Icon = AlertTriangle;
          colorClasses = "bg-white border-amber-500 text-amber-800";
          iconColor = "text-amber-500";
        } else if (toast.type === "info") {
          Icon = Info;
          colorClasses = "bg-white border-blue-500 text-blue-800";
          iconColor = "text-blue-500";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border-l-4 border transition-all duration-300 animate-in slide-in-from-right ${colorClasses}`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-sm">
              <h4 className="font-semibold text-slate-900 leading-tight">{toast.title}</h4>
              {toast.message && <p className="text-slate-600 mt-0.5 text-xs">{toast.message}</p>}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
