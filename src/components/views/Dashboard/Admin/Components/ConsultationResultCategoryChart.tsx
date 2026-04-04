"use client";

import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@mui/material";

type TConsultationResultCategoryChart = {
  data:
    | {
        category: string;
        value: number;
      }[]
    | [];
  height?: number | string;
};

const ConsultationResultCategoryChart = ({
  data,
  height = 350,
}: TConsultationResultCategoryChart) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const option = useMemo(() => {
    if (!data || data.length === 0) {
      return {};
    }

    return {
      tooltip: {
        trigger: "item",
        backgroundColor: isDark ? "#111827" : "#ffffff",
        borderColor: isDark ? "#243041" : "#e5e7eb",
        textStyle: {
          color: isDark ? "#e5e7eb" : "#1f2937",
        },
      },
      legend: {
        top: 0,
        textStyle: {
          color: theme.palette.text.primary,
        },
      },
      series: [
        {
          name: "Kategori",
          type: "pie",
          radius: "50%",
          avoidLabelOverlap: true,
          label: {
            show: true,
            formatter: "{d}%",
            color: theme.palette.text.primary,
            fontWeight: 600,
          },
          data: (data ?? []).map((item) => ({
            value: item.value,
            name: item.category,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: isDark
                ? "rgba(0, 0, 0, 0.7)"
                : "rgba(0, 0, 0, 0.25)",
            },
          },
        },
      ],
    };
  }, [isDark, theme.palette.text.primary, data]);

  return <ReactECharts option={option} style={{ height, width: "100%" }} />;
};

export default ConsultationResultCategoryChart;
