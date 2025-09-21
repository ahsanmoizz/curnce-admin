// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Plans from "./pages/Plans";
import Tenants from "./pages/Tenants";
import TenantDetails from "./pages/TenantDetails"; // ✅ new page
import DashboardLayout from "./layouts/DashboardLayout";
import SuperAdminGate from "./pages/SuperAdminGate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Home */}
        <Route
          path="/"
          element={
            <SuperAdminGate>
              <DashboardLayout>Welcome Super Admin</DashboardLayout>
            </SuperAdminGate>
          }
        />

        {/* Plans */}
        <Route
          path="/plans"
          element={
            <SuperAdminGate>
              <Plans />
            </SuperAdminGate>
          }
        />

        {/* Tenants List */}
        <Route
          path="/tenants"
          element={
            <SuperAdminGate>
              <Tenants />
            </SuperAdminGate>
          }
        />

        {/* Tenant Details */}
        <Route
          path="/tenants/:id"
          element={
            <SuperAdminGate>
              <TenantDetails />
            </SuperAdminGate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
