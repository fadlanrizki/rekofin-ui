import ManageRecommendationFormView from "@/components/views/ManageRecommendation/ManageRecommendationFormVIew";

type Props = {
  params: Promise<{ mode: string; id?: string[] }>;
};

export default async function page({ params }: Props) {
  const { mode, id } = await params;

  return <ManageRecommendationFormView mode={mode} id={id?.[0]} />;
}
