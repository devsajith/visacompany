import React, { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { SuperHRProvider } from "@/context/SuperHRContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ToastContainer } from "@/components/common/ToastContainer";

export const metadata: Metadata = {
  title: "Super HR | Multi-Company Workforce Management System - Super Logistics KSA",
  description: "Enterprise HR and Workforce Management System for Saudi Arabia Logistics & Transport Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100/70 text-slate-900 antialiased font-sans">
        <SuperHRProvider>
          <div className="flex min-h-screen">
            <Suspense fallback={<div className="hidden lg:block w-64 bg-[#0b1728]" />}>
              <Sidebar />
            </Suspense>
            <div className="flex-1 flex flex-col min-w-0 w-full">
              <Header />
              <main className="flex-1 p-3 sm:p-5 lg:p-8 overflow-y-auto w-full min-w-0">
                <Suspense fallback={<div className="p-4 sm:p-8 text-slate-400">Loading...</div>}>
                  {children}
                </Suspense>
              </main>
            </div>
          </div>
          <ToastContainer />
        </SuperHRProvider>
      </body>
    </html>
  );
}
