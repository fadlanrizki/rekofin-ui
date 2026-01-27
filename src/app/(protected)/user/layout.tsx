"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegUser, FaRegLightbulb } from "react-icons/fa6";
import { FaHistory, FaUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { GoDiscussionClosed } from "react-icons/go";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { JSX, useState } from "react";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { useRouter } from "next/navigation";
import { createTheme, ThemeProvider } from "@mui/material";

type MenuType = {
  name: string;
  path: string;
  icon: JSX.Element;
};

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
    path: ROUTE_PATHS.USER.CONSULTATION,
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
        className="h-screen w-full overflow-hidden flex flex-col bg-background-light text-gray-700"
        x-data="layout"
      >
        <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white py-3 px-10">
          <div className="flex items-center gap-5">
            <button
              type="button"
              className="text-3xl text-primary cursor-pointer"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <GiHamburgerMenu />
            </button>
            <Link href={"/user/dashboard"} className="text-primary">
              <Logo />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-5">
            <p className="text-textMain text-[1rem]">{username}</p>
            <FaUserCircle size={30} />
          </div>
        </header>

        <div className="flex flex-1 relative md:static">
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
          <div className="w-full px-4 pt-4 pb-6 h-[92vh] overflow-y-auto box-border">
            {children}
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default DashboardLayout;
