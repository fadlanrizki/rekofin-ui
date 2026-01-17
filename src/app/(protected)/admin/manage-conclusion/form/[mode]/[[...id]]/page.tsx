import ManageConclusionFormView from "@/components/views/ManageConclusion/ManageConclusionFormVIew";

type Props = {
  params: Promise<{ mode: string; id?: string[] }>;
};

export default async function page({ params }: Props) {
  const { mode, id } = await params;

  return <ManageConclusionFormView mode={mode} id={id?.[0]} />;
}
