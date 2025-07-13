import FinancialChart from "./FinancialChart";
import RecommendationCard from "./RecommendationCard";

const UserDashboardView = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <FinancialChart />
      </div>

      {/* Recommendation */}
      <div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Rekomendasi Keuangan Utama
          </h2>
          <RecommendationCard
            category="Menabung"
            title="Mulailah dengan 10% dari Penghasilan"
            description="Menurut pakar keuangan, menyisihkan 10% penghasilan bulanan untuk tabungan adalah langkah awal yang baik."
            source="Buku Finansial ABC"
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardView;
