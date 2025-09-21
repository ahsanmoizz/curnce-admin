import React, { useState } from "react";

const SuperAdminGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("superadmin-auth") === "true"
  );
  const [input, setInput] = useState("");

  const correctPassword = import.meta.env.VITE_SUPERADMIN_PASSWORD;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === correctPassword) {
      localStorage.setItem("superadmin-auth", "true");
      setAuthenticated(true);
    } else {
      alert(" Wrong password");
    }
  }

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded shadow-md"
        >
          <h1 className="text-xl mb-4 font-bold">SuperAdmin Login</h1>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter password"
            className="px-3 py-2 w-full mb-4 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-brand px-4 py-2 rounded hover:bg-brand/80"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

export default SuperAdminGate;
