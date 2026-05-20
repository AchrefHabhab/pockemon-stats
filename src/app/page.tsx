"use client";

import { useEffect, useState } from "react";
import { AnalysisData } from "@/types/analysis";
import { TypeDistributionChart } from "@/components/type-distribution-chart";
import { LegendaryComparisonChart } from "@/components/legendary-comparison-chart";
import { GenerationTrendsChart } from "@/components/generation-trends-chart";

export default function DashboardPage() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/analyze");
        
        if (!response.ok) {
          throw new Error("Failed to fetch analysis data");
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Loading...</div>
          <div className="text-gray-600">Analyzing Pokemon data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">Error</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🎮 Game Statistics Dashboard
        </h1>
        <p className="text-gray-600">Pokemon Character Analysis</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Total Characters
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {data.summary.total_characters}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Total Types
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {data.summary.total_types}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Generations
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {data.summary.total_generations}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Legendary
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {data.summary.legendary_count}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Type Distribution
        </h2>
        <TypeDistributionChart data={data.type_distribution} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Top 10 Attackers
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Type</th>
                <th className="text-right py-2 px-4">Attack</th>
                <th className="text-right py-2 px-4">HP</th>
                <th className="text-right py-2 px-4">Defense</th>
                <th className="text-right py-2 px-4">Speed</th>
              </tr>
            </thead>
            <tbody>
              {data.top_attackers.map((char, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 font-medium">{char.Name}</td>
                  <td className="py-2 px-4">{char["Type 1"]}</td>
                  <td className="py-2 px-4 text-right font-bold text-red-600">
                    {char.Attack}
                  </td>
                  <td className="py-2 px-4 text-right">{char.HP}</td>
                  <td className="py-2 px-4 text-right">{char.Defense}</td>
                  <td className="py-2 px-4 text-right">{char.Speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Legendary vs Regular Comparison
          </h2>
          <LegendaryComparisonChart data={data.legendary_comparison} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stats Trends Across Generations
          </h2>
          <GenerationTrendsChart data={data.generation_trends} />
        </div>
      </div>
    </div>
  );
}
