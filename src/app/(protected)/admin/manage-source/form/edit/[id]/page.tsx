"use client";
import ManageSourceFormView from "@/components/views/ManageSource/ManageSourceFormView";
import { PAGE_ACTION } from "@/utils/constants/page-action";
import { useParams } from "next/navigation";

export default function ManageSourceEditPage() {
  const params = useParams();
  return (
    <ManageSourceFormView mode={PAGE_ACTION.EDIT} id={params.id as string} />
  );
}
