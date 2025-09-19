import ManageUserFormView from "@/components/views/ManageUser/ManageUserFormView";

type Props = {
  params: Promise<{ mode: string; id?: string[] }>
};

export default async function ManageUserFormPage({ params }: Props) {
  const { mode, id } = await params;

  return <ManageUserFormView mode={mode} id={id?.[0]} />;
}
