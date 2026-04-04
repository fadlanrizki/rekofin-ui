"use client";

import { DashboardService } from "@/service/dashboardService";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import { useTheme } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { AiOutlineBook, AiOutlineProfile, AiOutlineUser } from "react-icons/ai";
import { FaFileCircleCheck } from "react-icons/fa6";
import { GoDiscussionClosed } from "react-icons/go";
import { IoTrailSignSharp } from "react-icons/io5";
import { MdFactCheck, MdManageAccounts, MdOutlineSource } from "react-icons/md";
import { VscLightbulbSparkle } from "react-icons/vsc";
import ConsultationResultCategoryByMonth from "./Components/ConsultationResultCategoryByMonth";
import ConsultationResultCategoryChart from "./Components/ConsultationResultCategoryChart";

type TDashboardData = {
  dashboard: {
    total_user: number;
    total_rule: number;
    total_fact: number;
    total_consultation: number;
  };
  chart: {
    consultation_result_categories:
      | {
          category: string;
          value: number;
        }[]
      | [];
    consultation_result_by_month:
      | {
          category: string;
          value: number[];
        }[]
      | [];
  };
};

const AdminDashboardView = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [adminName, setAdminName] = React.useState("Admin");
  const [data, setData] = React.useState<TDashboardData>({
    dashboard: {
      total_user: 0,
      total_rule: 0,
      total_fact: 0,
      total_consultation: 0,
    },
    chart: {
      consultation_result_categories: [],
      consultation_result_by_month: [],
    },
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchDasboardData = async () => {
    setLoading(true);
    console.log(loading);

    try {
      const response = await DashboardService.getAdminDashboardData();
      setData(response.data);

      console.log("response > ", response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDasboardData();
  }, []);

  useEffect(() => {
    setAdminName(localStorage.getItem("username") || "Admin");
  }, []);

  const statData = useMemo(() => {
    const list = [
      {
        label: "Pengguna",
        value: data?.dashboard?.total_user ?? 0,
        icon: <AiOutlineUser className="text-primary text-3xl" />,
      },
      {
        label: "Aturan",
        value: data?.dashboard?.total_rule ?? 0,
        icon: <AiOutlineProfile className="text-primary text-3xl" />,
      },
      {
        label: "Fakta / Pertanyaan",
        value: data?.dashboard?.total_fact ?? 0,
        icon: <AiOutlineBook className="text-primary text-3xl" />,
      },
      {
        label: "Konsultasi",
        value: data?.dashboard?.total_consultation ?? 0,
        icon: <GoDiscussionClosed className="text-primary text-3xl" />,
      },
    ];
    return list;
  }, [data.dashboard]);

  return (
    <div className="p-6 space-y-6">
      <div
        className="rounded-3xl border px-5 py-5 shadow-md md:px-6"
        style={{
          backgroundColor: "var(--app-surface)",
          borderColor: "var(--app-border)",
        }}
      >
        <div className="space-y-2">
          <div className="space-y-1">
            <h1
              className="text-2xl font-semibold leading-tight md:text-3xl"
              style={{ color: "var(--app-text)" }}
            >
              Selamat datang kembali 👋, {adminName}
            </h1>
            <p
              className="w-full text-sm leading-6 md:text-base"
              style={{ color: "var(--app-text-muted)" }}
            >
              Pantau statistik utama, hasil konsultasi, dan akses cepat ke
              seluruh menu pengelolaan dari satu halaman.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {statData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-2xl border p-3 shadow-md md:p-4"
            style={{
              backgroundColor: "var(--app-surface)",
              borderColor: "var(--app-border)",
            }}
          >
            <div
              className="p-3 rounded-full"
              style={{
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.06)"
                  : "#f3f4f6",
              }}
            >
              {item.icon}
            </div>
            <div className="w-full">
              <p className="text-lg text-primary font-medium text-ellipsis">
                {item.label}
              </p>
              <h2
                className="text-md font-semibold"
                style={{ color: "var(--app-text)" }}
              >
                {item.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Chart & Activity */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Pie Chart */}
        <div
          className="rounded-2xl border p-4 shadow-md"
          style={{
            backgroundColor: "var(--app-surface)",
            borderColor: "var(--app-border)",
          }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--app-text)" }}
          >
            Category Analytics
          </h3>
          <ConsultationResultCategoryChart
            data={data?.chart?.consultation_result_categories}
          />
        </div>

        {/* consultation_result_by_month*/}
        <div
          className="rounded-2xl border p-4 shadow-md"
          style={{
            backgroundColor: "var(--app-surface)",
            borderColor: "var(--app-border)",
          }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--app-text)" }}
          >
            Hasil Konsultasi per Bulan
          </h3>
          <ConsultationResultCategoryByMonth
            data={data?.chart?.consultation_result_by_month}
          />
        </div>
      </div>

      {/* Shortcut Buttons */}
      <div>
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--app-text)" }}
        >
          Menu Pintasan
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {[
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
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="group flex flex-col items-center gap-2 rounded-2xl border bg-[var(--app-surface)] p-3 text-primary shadow-md transition-colors hover:bg-primary hover:text-white"
              style={{ borderColor: "var(--app-border)" }}
            >
              <div
                className={`rounded-full p-3 transition-colors group-hover:bg-white/15 ${
                  isDark ? "bg-white/10" : "bg-slate-100"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-center text-sm font-medium">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
