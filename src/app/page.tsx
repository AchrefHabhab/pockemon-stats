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
  const [selectedPokemon, setSelectedPokemon] = useState<AnalysisData["top_attackers"][0] | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [allPokemon, setAllPokemon] = useState<AnalysisData["top_attackers"]>([]);

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
        setAllPokemon(result.all_pokemon || []);
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
          <span className="text-sm font-normal text-gray-600 ml-2">
            👆 Click a bar to see all Pokemon of that type
          </span>
        </h2>
        <div className="cursor-pointer">
          <TypeDistributionChart 
            data={data.type_distribution} 
            onTypeClick={(type) => setSelectedType(type)}
          />
        </div>
      </div>

      {selectedType && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-lg p-6 mb-8 border-2 border-purple-300 animate-[slideDown_0.3s_ease-out]">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              🎮 {selectedType} Type Pokemon ({allPokemon.filter(p => p["Type 1"] === selectedType || p["Type 2"] === selectedType).length})
            </h2>
            <button
              onClick={() => setSelectedType(null)}
              className="text-gray-500 hover:text-red-600 text-3xl font-bold transition-colors hover:scale-110 transform"
            >
              ×
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allPokemon
                .filter(p => p["Type 1"] === selectedType || p["Type 2"] === selectedType)
                .map((pokemon, index) => (
                  <div
                    key={`${pokemon["#"]}-${pokemon.Name}-${index}`}
                    onClick={() => {
                      setSelectedPokemon(pokemon);
                      setSelectedType(null);
                    }}
                    className="bg-white rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition-all duration-200 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg hover:scale-105 transform active:scale-95"
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon["#"]}.png`}
                      alt={pokemon.Name}
                      className="w-20 h-20 mx-auto"
                    />
                    <h3 className="text-center font-semibold text-gray-900 mt-2 text-sm">
                      {pokemon.Name}
                    </h3>
                    <div className="flex gap-1 justify-center mt-2">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                        {pokemon["Type 1"]}
                      </span>
                      {pokemon["Type 2"] && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                          {pokemon["Type 2"]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Top 10 Attackers
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4 font-bold text-gray-900">Pokemon</th>
                <th className="text-left py-3 px-4 font-bold text-gray-900">Type</th>
                <th className="text-right py-3 px-4 font-bold text-red-600">Attack</th>
                <th className="text-right py-3 px-4 font-bold text-green-600">HP</th>
                <th className="text-right py-3 px-4 font-bold text-blue-600">Defense</th>
                <th className="text-right py-3 px-4 font-bold text-yellow-600">Speed</th>
              </tr>
            </thead>
            <tbody>
              {data.top_attackers.map((char, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedPokemon(char)}
                  className={`border-b cursor-pointer transition-colors ${
                    selectedPokemon?.["#"] === char["#"]
                      ? "bg-blue-50 border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${char["#"]}.png`}
                        alt={char.Name}
                        className="w-12 h-12"
                      />
                      <span className="font-semibold text-gray-900">{char.Name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-1">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {char["Type 1"]}
                      </span>
                      {char["Type 2"] && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {char["Type 2"]}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4 text-right font-bold text-red-600 text-lg">
                    {char.Attack}
                  </td>
                  <td className="py-2 px-4 text-right font-semibold text-green-600 text-base">
                    {char.HP}
                  </td>
                  <td className="py-2 px-4 text-right font-semibold text-blue-600 text-base">
                    {char.Defense}
                  </td>
                  <td className="py-2 px-4 text-right font-semibold text-yellow-600 text-base">
                    {char.Speed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPokemon && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-lg p-6 mt-8 border-2 border-blue-200">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Selected Pokemon Details
            </h2>
            <button
              onClick={() => setSelectedPokemon(null)}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon["#"]}.png`}
                alt={selectedPokemon.Name}
                className="w-48 h-48"
              />
              <h3 className="text-3xl font-bold text-gray-900 mt-4">
                {selectedPokemon.Name}
              </h3>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                  {selectedPokemon["Type 1"]}
                </span>
                {selectedPokemon["Type 2"] && (
                  <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full">
                    {selectedPokemon["Type 2"]}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">HP</span>
                  <span className="text-sm font-bold text-gray-900">{selectedPokemon.HP}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${(selectedPokemon.HP / 255) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Attack</span>
                  <span className="text-sm font-bold text-gray-900">{selectedPokemon.Attack}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full"
                    style={{ width: `${(selectedPokemon.Attack / 255) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Defense</span>
                  <span className="text-sm font-bold text-gray-900">{selectedPokemon.Defense}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${(selectedPokemon.Defense / 255) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Speed</span>
                  <span className="text-sm font-bold text-gray-900">{selectedPokemon.Speed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full"
                    style={{ width: `${(selectedPokemon.Speed / 255) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


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
