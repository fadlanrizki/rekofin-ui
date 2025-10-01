import ManageRuleFormView from "@/components/views/ManageRule/ManageRuleFormView";
import React from "react";

type Props = {
  params: Promise<{ mode: string; id?: string[] }>
};


export default async function page({ params }: Props) {
  const { mode, id } = await params;

  return <ManageRuleFormView mode={mode} id={id?.[0]} />;
}
