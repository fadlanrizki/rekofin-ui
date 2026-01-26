"use client";

import React, { useEffect, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import {
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineProfile,
  AiOutlineAppstore,
} from "react-icons/ai";
import {
  FaUserCog,
  FaPlusCircle,
  FaClipboardList,
  FaDownload,
} from "react-icons/fa";
import { DashboardService } from "@/service/dashboardService";
import { GoDiscussionClosed } from "react-icons/go";
import { Box } from "@mui/material";

type TDashboardData = {
  count: {
    user: number;
    rule: number;
    fact: number;
    consultation: number;
    complete_consultation: number;
    inprogress_consultation: number;
  };
  number_of_weekly_consultation_chart: {
    data: {
      label: string;
      value: number;
    }[];
  };
  consultation_result_chart: {
    data: {
      label: string;
      value: number;
    }[];
  };
  fulfilled_rule_chart: {
    data: {
      label: string;
      value: number;
    }[];
  };
  // last_consultation_list: [];
};

const AdminDashboardView = () => {
  const [data, setData] = React.useState<TDashboardData>({
    count: {
      user: 0,
      rule: 0,
      fact: 0,
      consultation: 0,
      complete_consultation: 0,
      inprogress_consultation: 0,
    },
    number_of_weekly_consultation_chart: {
      data: [],
    },
    consultation_result_chart: {
      data: [],
    },
    fulfilled_rule_chart: {
      data: [],
    },
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchDasboardData = async () => {
    setLoading(true);
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

  const statData = useMemo(() => {
    const list = [
      {
        label: "Pengguna",
        value: data?.count?.user ?? 0,
        icon: <AiOutlineUser className="text-primary text-3xl" />,
      },
      {
        label: "Aturan",
        value: data?.count?.rule ?? 0,
        icon: <AiOutlineProfile className="text-primary text-3xl" />,
      },
      {
        label: "Fakta / Pertanyaan",
        value: data?.count?.fact ?? 0,
        icon: <AiOutlineBook className="text-primary text-3xl" />,
      },
      {
        label: "Konsultasi",
        value: data?.count?.consultation ?? 0,
        icon: <GoDiscussionClosed className="text-primary text-3xl" />,
      },
    ];
    return list;
  }, [data.count]);

  const chartOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: 0,
    },
    series: [
      {
        name: "Users",
        type: "pie",
        radius: "60%",
        data: [
          { value: 38, name: "Emergency Fund" },
          { value: 52, name: "Saving" },
          { value: 35, name: "Investment" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {statData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-4 flex items-center gap-4 border border-gray-100"
          >
            <div className="p-3 rounded-full bg-gray-100">{item.icon}</div>
            <div className="w-full">
              <p className="text-lg text-primary font-medium text-ellipsis">
                {item.label}
              </p>
              <h2 className="text-md font-semibold text-gray-600">
                {item.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Chart & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Category Analytics
          </h3>
          <ReactECharts option={chartOption} style={{ height: 350 }} />
        </div>

        {/* Weekly Consultation line chart*/}
        <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Weekly Consultation
          </h3>

          {/* <Box></Box> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
