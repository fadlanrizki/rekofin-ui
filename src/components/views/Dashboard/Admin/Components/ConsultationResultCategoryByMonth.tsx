"use client";

import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { useTheme } from "@mui/material";

type TConsultationResultCategoryByMonth = {
  data:
    | {
        category: string;
        value: number[];
      }[]
    | [];
  height?: number | string;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const ConsultationResultCategoryByMonth = ({
  data,
  height = 350,
}: TConsultationResultCategoryByMonth) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const option = useMemo(() => {
    if (!data || data.length === 0) {
      return {};
    }

    return {
      tooltip: {
        trigger: "axis",
        backgroundColor: isDark ? "#111827" : "#ffffff",
        borderColor: isDark ? "#243041" : "#e5e7eb",
        textStyle: {
          color: isDark ? "#e5e7eb" : "#1f2937",
        },
      },

      legend: {
        show: true,
        top: 0,
        data: (data ?? []).map((item) => item.category),
        textStyle: {
          color: isDark ? "#e5e7eb" : "#1f2937",
        },
      },

      grid: {
        top: "20%",
        left: "3%",
        right: "4%",
        bottom: "15%",
        containLabel: true,
      },

      xAxis: {
        type: "category",
        boundaryGap: false,
        data: MONTHS,
        axisLabel: {
          color: theme.palette.text.secondary,
        },
        axisLine: {
          lineStyle: {
            color: isDark ? "#374151" : "#d1d5db",
          },
        },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          color: theme.palette.text.secondary,
        },
        splitLine: {
          lineStyle: {
            color: isDark ? "#1f2937" : "#e5e7eb",
          },
        },
      },

      series: (data ?? []).map((item) => {
        return {
          name: item.category,
          type: "line",
          smooth: true,
          data: item.value,
        };
      }),
    };
  }, [isDark, theme.palette.text.secondary, data]);

  return (
    <ReactECharts
      option={option}
      style={{ height, width: "100%" }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};

export default ConsultationResultCategoryByMonth;
