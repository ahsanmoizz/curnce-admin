// src/layouts/DashboardLayout.tsx
import React from "react";
import { Link } from "react-router-dom";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col border-r border-gray-800">
        {/* Logo + Brand */}
        <div className="p-6 flex items-center gap-2 border-b border-gray-800">
          <img
            src="/clario.png"
            alt="Logo"
            className="h-25 w-40 object-contain mx-auto"
          />
        </div>

        {/* Sidebar Title */}
        <div className="px-6 py-3 text-gray-400 text-sm font-semibold uppercase tracking-wider border-b border-gray-800">
          Super Admin
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/plans"
            className="block p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Plans
          </Link>
      
          
          <Link
            to="/tenants"
            className="block p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
           Tenants
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-gray-800 flex items-center px-4 justify-between border-b border-gray-700">
          <span className="font-semibold text-gray-100">
            Super Admin Dashboard
          </span>
        </header>
        <main className="flex-1 p-6 bg-gray-950">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
