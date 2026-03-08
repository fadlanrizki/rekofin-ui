"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdOutlineSpaceDashboard,
  MdFactCheck,
  MdOutlineSource,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { JSX, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { IoTrailSignSharp } from "react-icons/io5";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { useRouter } from "next/navigation";
import { FaFileCircleCheck } from "react-icons/fa6";
import { createTheme, ThemeProvider } from "@mui/material";

type MenuType = {
  name: string;
  path: string;
  icon: JSX.Element;
};

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
  },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const theme = createTheme({
    palette: {
      primary: { main: "#003366" },
    },
  });
  const [openSidebar, setOpenSidebar] = useState(true);

  const onLogout = (path: string) => {
    localStorage.clear();
    router.push(path);
  };

  const username = localStorage.getItem("username");

  return (
    <ThemeProvider theme={theme}>
      <main
        className="min-h-screen w-full flex flex-col bg-background-light text-gray-700"
        x-data="layout"
      >
        <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white px-10 h-[10vh]">
          <div className="flex items-center gap-5">
            <button
              type="button"
              className="text-3xl text-primary cursor-pointer"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <GiHamburgerMenu />
            </button>
            <Link href={"/admin/dashboard"} className="text-primary">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <p className="text-textMain text-[1rem]">{username || "-"}</p>
            <FaUserCircle size={30} />
          </div>
        </header>

        <div className="flex flex-1">
          <aside
            className={
              openSidebar
                ? "flex w-full md:w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-primary p-2 text-white font-medium absolute z-50 md:static"
                : "hidden"
            }
          >
            {listMenu.map((item: MenuType, index) => {
              if (item.name === "Keluar") {
                return (
                  <button
                    key={index}
                    onClick={() => onLogout(item.path)}
                    className="flex justify-center md:justify-start items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary cursor-pointer"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              } else {
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className="flex justify-center md:justify-start items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                );
              }
            })}
          </aside>

          <div className="w-full h-[90vh] overflow-auto">
            <div className="w-full p-4 ">{children}</div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default DashboardLayout;
