import ProtectedRoute from "@/components/ProtectedRoute";
import ManageRecommendationView from "@/components/views/ManageRecommendation/ManageRecommendationView";
import React from "react";

export default function ManageRecommendationPage() {
  return (
    <ProtectedRoute>
      <ManageRecommendationView />
    </ProtectedRoute>
  );
}
