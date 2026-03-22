"use client";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { GoDiscussionClosed } from "react-icons/go";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import ProtectedDashboardShell from "@/components/layout/ProtectedDashboardShell";

const listMenu = [
  {
    name: "Dashboard",
    path: ROUTE_PATHS.USER.DASHBOARD,
    icon: <MdOutlineSpaceDashboard size={25} />,
  },
  {
    name: "Profile",
    path: ROUTE_PATHS.USER.PROFILE,
    icon: <FaRegUser size={25} />,
  },
  {
    name: "Konsultasi",
    path: ROUTE_PATHS.USER.CONSULTATION.BASE,
    icon: <GoDiscussionClosed size={25} />,
  },
  {
    name: "Riwayat Konsultasi",
    path: ROUTE_PATHS.USER.HISTORY,
    icon: <FaHistory size={25} />,
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
      homePath={ROUTE_PATHS.USER.DASHBOARD}
    >
      {children}
    </ProtectedDashboardShell>
  );
};

export default DashboardLayout;
