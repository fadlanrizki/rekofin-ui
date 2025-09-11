import ProtectedRoute from "@/components/ProtectedRoute";
import FinanceView from "@/components/views/Finance/FinanceView";

const FinancePage = () => {
  return (
    <ProtectedRoute>
      <FinanceView />
    </ProtectedRoute>
  );
};

export default FinancePage;
