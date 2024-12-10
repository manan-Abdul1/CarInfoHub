import Dashboard from "@/components/Dashboard/Dashboard";
import ProtectedRoute from "@/routes/ProtectedRoute";
import React from "react";

const dashboardPage = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default dashboardPage;
