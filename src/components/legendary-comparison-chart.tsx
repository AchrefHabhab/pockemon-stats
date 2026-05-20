"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { LegendaryComparison } from "@/types/analysis";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface LegendaryComparisonChartProps {
  data: LegendaryComparison;
}

export function LegendaryComparisonChart({ data }: LegendaryComparisonChartProps) {
  const chartData = {
    labels: data.categories,
    datasets: [
      {
        label: "Regular Pokemon",
        data: data.regular,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
      {
        label: "Legendary Pokemon",
        data: data.legendary,
        backgroundColor: "rgba(234, 179, 8, 0.2)",
        borderColor: "rgba(234, 179, 8, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(234, 179, 8, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="h-96">
      <Radar data={chartData} options={options} />
    </div>
  );
}
