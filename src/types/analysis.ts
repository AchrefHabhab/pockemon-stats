export interface Summary {
  total_characters: number;
  total_types: number;
  total_generations: number;
  legendary_count: number;
}

export interface Character {
  Name: string;
  Attack: number;
  Defense: number;
  HP: number;
  Speed: number;
  "Type 1": string;
}

export interface TypeDistribution {
  labels: string[];
  values: number[];
}

export interface StatsByType {
  types: string[];
  hp: number[];
  attack: number[];
  defense: number[];
  speed: number[];
}

export interface LegendaryComparison {
  categories: string[];
  regular: number[];
  legendary: number[];
}

export interface GenerationTrends {
  generations: number[];
  hp: number[];
  attack: number[];
  defense: number[];
  speed: number[];
}

export interface AnalysisData {
  summary: Summary;
  top_attackers: Character[];
  top_defenders: Character[];
  fastest: Character[];
  type_distribution: TypeDistribution;
  stats_by_type: StatsByType;
  legendary_comparison: LegendaryComparison;
  generation_trends: GenerationTrends;
}
