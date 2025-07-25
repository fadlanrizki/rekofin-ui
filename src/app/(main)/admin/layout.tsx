"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { IoTrailSignSharp } from "react-icons/io5";
import { VscLightbulbSparkle } from "react-icons/vsc";

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
              ? "flex w-82 flex-col justify-between space-y-2 border-r-2 border-gray-200 bg-primary p-2 text-white font-medium"
              : "hidden"
          }
        >
          <div>
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary"
            >
              <span className="text-2xl">
                <MdOutlineSpaceDashboard size={25} />
              </span>
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/manage-user"
              className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary"
            >
              <span className="text-2xl">
                <MdManageAccounts size={25} />
              </span>
              <span>Kelola User</span>
            </Link>

            <Link
              href="/admin/manage-rule"
              className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary"
            >
              <span className="text-2xl">
                <IoTrailSignSharp size={25} />
              </span>
              <span>Kelola Aturan</span>
            </Link>

            <Link
              href="/admin/manage-recommendation"
              className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary"
            >
              <span className="text-2xl">
                <VscLightbulbSparkle size={25} />
              </span>
              <span>Kelola Rekomendasi</span>
            </Link>
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
