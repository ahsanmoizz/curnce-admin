import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import SuperAdminGate from "./SuperAdminGate";
import { apiGet } from "../lib/api";
import { useParams } from "react-router-dom";

const TenantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tenant, setTenant] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet(`/tenants/${id}`)
      .then((data) => setTenant(data))
      .catch((err) => console.error("Failed to fetch tenant:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <SuperAdminGate>
        <DashboardLayout>
          <p>Loading...</p>
        </DashboardLayout>
      </SuperAdminGate>
    );
  }

  if (!tenant) {
    return (
      <SuperAdminGate>
        <DashboardLayout>
          <p>Tenant not found</p>
        </DashboardLayout>
      </SuperAdminGate>
    );
  }

  return (
    <SuperAdminGate>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">{tenant.name}</h1>

        <div className="bg-gray-800 p-6 rounded-lg space-y-4">
          <p>
            <strong>Owner:</strong> {tenant.owner?.email || "—"}
          </p>
          <p>
            <strong>Status:</strong> {tenant.status}
          </p>
          <p>
            <strong>Trial Ends At:</strong>{" "}
            {tenant.trialEndsAt
              ? new Date(tenant.trialEndsAt).toLocaleString()
              : "N/A"}
          </p>
          <p>
  <strong>Current Plan:</strong> {tenant.subscriptions[0]?.plan?.name || "N/A"}
</p>
<p>
  <strong>Active Subscription:</strong>{" "}
  {tenant.subscriptions[0]?.status || "None"}
</p>
          <p>
            <strong>Active Subscription:</strong>{" "}
            {tenant.subscription?.status || "None"}
          </p>
        </div>
      </DashboardLayout>
    </SuperAdminGate>
  );
};

export default TenantDetails;
