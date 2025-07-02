"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegUser, FaRegLightbulb } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { FaHistory, FaUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <main
      className="min-h-screen w-full flex flex-col bg-background-light text-gray-700"
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

        <div className="flex items-center gap-5">
          <p className="text-textMain text-[1rem]">Fadlan Rizki</p>
          <FaUserCircle size={30} />
        </div>
      </header>

      <div className="flex flex-1">
        <aside
          className={
            openSidebar
              ? "flex w-72 flex-col justify-between space-y-2 border-r-2 border-gray-200 bg-primary p-2 text-white font-medium"
              : "hidden"
          }
        >
          <div>
            <Link
              href="/user/dashboard"
              className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary"
            >
              <span className="text-2xl">
                <MdOutlineSpaceDashboard size={25} />
              </span>
              <span>Dashboard</span>
            </Link>

            <Link
              href="/user/profile"
              className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary"
            >
              <span className="text-2xl">
                <FaRegUser size={25} />
              </span>
              <span>Profile</span>
            </Link>

            <Link
              href="/user/finance"
              className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary"
            >
              <span className="text-2xl">
                <GrMoney size={25} />
              </span>
              <span>Input Keuangan</span>
            </Link>

            <Link
              href="/user/recommendation"
              className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary"
            >
              <span className="text-2xl">
                <FaRegLightbulb size={25} />
              </span>
              <span>Rekomendasi</span>
            </Link>

            <Link
              href="/user/history"
              className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary"
            >
              <span className="text-2xl">
                <FaHistory size={25} />
              </span>
              <span>Riwayat Rekomendasi</span>
            </Link>
          </div>
          <div>
            <Link
              href="/login"
              className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary"
            >
              <span className="text-2xl">
                <TbLogout2 size={25} />
              </span>
              <span>Keluar</span>
            </Link>
          </div>
        </aside>

        <div className="w-full p-4">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
