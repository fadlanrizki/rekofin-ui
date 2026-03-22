"use client";
import ManageSourceFormView from "@/components/views/ManageSource/ManageSourceFormView";
import { PAGE_ACTION } from "@/utils/constants/page-action";

export default function ManageSourceAddPage() {
  return <ManageSourceFormView mode={PAGE_ACTION.ADD} />;
}
