import ManageFactFormView from "@/components/views/ManageFact/ManageFactFormVIew";

type Props = {
  params: Promise<{ mode: string; id?: string[] }>;
};

export default async function page({ params }: Props) {
  const { mode, id } = await params;

  return <ManageFactFormView mode={mode} id={id?.[0]} />;
}
