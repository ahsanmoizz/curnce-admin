import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import SuperAdminGate from "./SuperAdminGate";
import { apiGet } from "../lib/api";
import { Link } from "react-router-dom";

const Tenants: React.FC = () => {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/tenants")
      .then((data) => setTenants(data))
      .catch((err) => console.error("Failed to fetch tenants:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SuperAdminGate>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">Tenants</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Owner</th>
                <th className="px-4 py-2 text-left">Plan</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} className="border-t border-gray-700">
                 <td className="px-4 py-2">
  <Link to={`/tenants/${t.id}`} className="text-blue-400 hover:underline">
    {t.name}
  </Link>
</td>
                  <td className="px-4 py-2">{t.owner?.email || "—"}</td>
                  <td className="px-4 py-2">{t.plan?.name || "N/A"}</td>
                  <td className="px-4 py-2">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DashboardLayout>
    </SuperAdminGate>
  );
};

export default Tenants;
