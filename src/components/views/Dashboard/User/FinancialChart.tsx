"use client";

import { Card } from "@mui/material";
import ReactECharts from "echarts-for-react";
import SummaryCard from "./SummaryCard";

const pieOption = {
  title: {
    text: "Distribusi Keuangan",
    left: "center"
  },
  tooltip: {
    trigger: "item"
  },
  legend: {
    orient: "vertical",
    bottom: "bottom"
  },
  series: [
    {
      name: "Finance",
      type: "pie",
      radius: "50%",
      data: [
        { value: 3000000, name: "Tabungan" },
        { value: 1500000, name: "Dana Darurat" },
        { value: 2000000, name: "Investasi" },
        { value: 3500000, name: "Lainnya" }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
};

const lineOption = {
  title: {
    text: "Tren Pendapatan & Tabungan"
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data: ["Income", "Savings"],
    bottom: "bottom"
  },
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "Income",
      type: "line",
      data: [5000000, 5200000, 5100000, 5300000],
      smooth: true
    },
    {
      name: "Savings",
      type: "line",
      data: [2000000, 2100000, 1900000, 2200000],
      smooth: true
    }
  ]
};

export default function FinancialChart() {
  return (
    <div className="md:p-6 grid gap-6">
      <h1 className="text-2xl font-bold">Selamat Datang, Fadlan 👋</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <ReactECharts option={lineOption} style={{ height: 300, width: "100%" }} />
        </Card>

        <Card className="p-4">
          <ReactECharts option={pieOption} style={{ height: 300, width: "100%" }} />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Pendapatan" value="Rp 7.500.000" icon="💰" />
        <SummaryCard title="Tabungan" value="Rp 1.000.000" icon="🏦" />
        <SummaryCard title="Dana Darurat" value="Rp 2.000.000" icon="🚨" />
        <SummaryCard title="Investasi" value="Rp 1.500.000" icon="📈" />
      </div>
    </div>
  );
}