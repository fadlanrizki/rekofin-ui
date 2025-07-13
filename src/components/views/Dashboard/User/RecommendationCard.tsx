type RecommendationCardType = {
  category: string;
  title: string;
  description: string;
  source: string;
};

export default function RecommendationCard({
  category,
  title,
  description,
  source,
}: RecommendationCardType) {
  return (
    <div className="bg-white border-l-4 border-blue-500 rounded-xl shadow-sm p-5 mb-4">
      <div className="text-sm uppercase tracking-wide text-blue-600 font-semibold mb-1">
        {category}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <p className="text-xs text-gray-400 italic">Sumber: {source}</p>
    </div>
  )
}
