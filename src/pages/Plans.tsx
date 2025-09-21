import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { apiGet, apiPost } from "../lib/api";
import SuperAdminGate from "./SuperAdminGate";

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/plans")
      .then((data) => setPlans(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  async function createPlan() {
    const name = prompt("Plan name?");
    const price = parseFloat(prompt("Price?") || "0");
    const interval = prompt("Interval (month/year)?") || "month";
    const currency = prompt("Currency (USD/INR)?") || "USD";

    if (!name) return;

    try {
      const newPlan = await apiPost("/plans", {
        name,
        price,
        interval,
        currency,
      });
      setPlans([...plans, newPlan]);
    } catch (err) {
      console.error(err);
      alert("Failed to create plan");
    }
  }

  return (
    <SuperAdminGate>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6 text-gray-100">Plans</h1>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-100">
                  {plan.name}
                </h2>
                <p className="text-gray-400 mt-1">{plan.description}</p>
                <p className="mt-4 text-2xl font-bold text-blue-400">
                  {plan.currency === "INR" ? "₹" : "$"}
                  {plan.price}
                  <span className="text-sm text-gray-500">/{plan.interval}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={createPlan}
          className="mt-6 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          + New Plan
        </button>
      </DashboardLayout>
    </SuperAdminGate>
  );
};

export default Plans;
