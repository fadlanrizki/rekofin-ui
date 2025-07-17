"use client";

import React from "react";
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

const AdminDashboardView = () => {
  const statData = [
    {
      label: "Total Users",
      value: 125,
      icon: <AiOutlineUser className="text-blue-600 text-3xl" />,
    },
    {
      label: "Total Rules",
      value: 35,
      icon: <AiOutlineProfile className="text-emerald-600 text-3xl" />,
    },
    {
      label: "Total Recommendations",
      value: 72,
      icon: <AiOutlineBook className="text-purple-600 text-3xl" />,
    },
    {
      label: "Categories",
      value: 3,
      icon: <AiOutlineAppstore className="text-orange-500 text-3xl" />,
    },
  ];

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
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <h2 className="text-2xl font-semibold text-gray-800">
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

        {/* Activity Log */}
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full box-border">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="h-4/5 grid grid-cols-2 gap-4 box-border">
            <div className="w-full h-full">
              <button className="w-full h-full flex flex-col items-center justify-center bg-blue-100 text-blue-700 rounded-xl p-4 hover:bg-blue-200 transition">
                <FaUserCog size={28} />
                <span className="mt-2 text-sm font-medium text-center">
                  Manage Users
                </span>
              </button>
            </div>

            <div className="w-full h-full">
              <button className="w-full h-full flex flex-col items-center justify-center bg-green-100 text-green-700 rounded-xl p-4 hover:bg-green-200 transition">
                <FaPlusCircle size={28} />
                <span className="mt-2 text-sm font-medium text-center">
                  Add Rule
                </span>
              </button>
            </div>

            <div className="w-full h-full">
              <button className="w-full h-full flex flex-col items-center justify-center bg-yellow-100 text-yellow-700 rounded-xl p-4 hover:bg-yellow-200 transition">
                <FaClipboardList size={28} />
                <span className="mt-2 text-sm font-medium text-center">
                  Manage Recs
                </span>
              </button>
            </div>

            <div className="w-full h-full">
              <button className="w-full h-full flex flex-col items-center justify-center bg-purple-100 text-purple-700 rounded-xl p-4 hover:bg-purple-200 transition">
                <FaDownload size={28} />
                <span className="mt-2 text-sm font-medium text-center">
                  Export Data
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
