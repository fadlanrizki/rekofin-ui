export default function SummaryCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-semibold text-gray-700">{value}</p>
      </div>
    </div>
  );
}