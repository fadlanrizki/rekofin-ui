"use client";
import {
  MdOutlineSpaceDashboard,
  MdFactCheck,
  MdOutlineSource,
} from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { MdManageAccounts } from "react-icons/md";
import { IoTrailSignSharp } from "react-icons/io5";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { FaFileCircleCheck } from "react-icons/fa6";
import ProtectedDashboardShell from "@/components/layout/ProtectedDashboardShell";

const listMenu = [
  {
    name: "Dashboard",
    path: ROUTE_PATHS.ADMIN.DASHBOARD,
    icon: <MdOutlineSpaceDashboard size={25} />,
  },
  {
    name: "Kelola User",
    path: ROUTE_PATHS.ADMIN.MANAGE_USER.LIST,
    icon: <MdManageAccounts size={25} />,
  },
  {
    name: "Kelola Fakta",
    path: ROUTE_PATHS.ADMIN.MANAGE_FACT.LIST,
    icon: <MdFactCheck size={25} />,
  },
  {
    name: "Kelola Sumber",
    path: ROUTE_PATHS.ADMIN.MANAGE_SOURCE.LIST,
    icon: <MdOutlineSource size={25} />,
  },
  {
    name: "Kelola Kesimpulan",
    path: ROUTE_PATHS.ADMIN.MANAGE_CONCLUSION.LIST,
    icon: <FaFileCircleCheck size={25} />,
  },
  {
    name: "Kelola Rekomendasi",
    path: ROUTE_PATHS.ADMIN.MANAGE_RECOMMENDATION.LIST,
    icon: <VscLightbulbSparkle size={25} />,
  },
  {
    name: "Kelola Aturan",
    path: ROUTE_PATHS.ADMIN.MANAGE_RULE.LIST,
    icon: <IoTrailSignSharp size={25} />,
  },
  {
    name: "Keluar",
    path: ROUTE_PATHS.LOGIN,
    icon: <TbLogout2 size={25} />,
    isLogout: true,
  },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedDashboardShell
      menus={listMenu}
      homePath={ROUTE_PATHS.ADMIN.DASHBOARD}
    >
      {children}
    </ProtectedDashboardShell>
  );
};

export default DashboardLayout;
