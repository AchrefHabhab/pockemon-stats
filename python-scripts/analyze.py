import pandas as pd
import json
import os


def load_data():
    data_path = os.path.join(os.path.dirname(__file__), "..", "python-data", "game_data.csv")
    df = pd.read_csv(data_path)
    return df


def analyze_top_performers(df, stat_column="Attack", top_n=10):
    top_performers = df.nlargest(top_n, stat_column)[
        ["#", "Name", stat_column, "Type 1", "Type 2", "HP", "Defense", "Speed"]
    ]
    return top_performers.to_dict("records")


def analyze_type_distribution(df):
    type_counts = df["Type 1"].value_counts()
    return {"labels": type_counts.index.tolist(), "values": type_counts.values.tolist()}


def analyze_stats_by_type(df):
    stats_by_type = (
        df.groupby("Type 1")[["HP", "Attack", "Defense", "Speed"]].mean().round(2)
    )

    result = {
        "types": stats_by_type.index.tolist(),
        "hp": stats_by_type["HP"].tolist(),
        "attack": stats_by_type["Attack"].tolist(),
        "defense": stats_by_type["Defense"].tolist(),
        "speed": stats_by_type["Speed"].tolist(),
    }
    return result


def analyze_legendary_comparison(df):
    legendary_stats = (
        df.groupby("Legendary")[["HP", "Attack", "Defense", "Speed"]].mean().round(2)
    )

    result = {
        "categories": ["HP", "Attack", "Defense", "Speed"],
        "regular": legendary_stats.loc[False].tolist(),
        "legendary": legendary_stats.loc[True].tolist(),
    }
    return result


def analyze_generation_trends(df):
    gen_stats = (
        df.groupby("Generation")[["HP", "Attack", "Defense", "Speed"]].mean().round(2)
    )

    result = {
        "generations": gen_stats.index.tolist(),
        "hp": gen_stats["HP"].tolist(),
        "attack": gen_stats["Attack"].tolist(),
        "defense": gen_stats["Defense"].tolist(),
        "speed": gen_stats["Speed"].tolist(),
    }
    return result


def export_analysis_results(results, output_filename="analysis_results.json"):
    output_path = os.path.join(os.path.dirname(__file__), "..", "python-data", output_filename)

    def clean_data(obj):
        if isinstance(obj, dict):
            return {k: clean_data(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [clean_data(item) for item in obj]
        elif pd.isna(obj):
            return None
        else:
            return obj

    cleaned_results = clean_data(results)

    with open(output_path, "w") as f:
        json.dump(cleaned_results, f, indent=2)

    print(f"✅ Analysis results exported to: {output_path}")
    return output_path


def main():
    print("=" * 60)
    print("🎮 GAME STATISTICS ANALYSIS")
    print("=" * 60)

    print("\n📊 Loading data...")
    df = load_data()
    print(f"✅ Loaded {len(df)} records")

    print("\n🔍 Analyzing data...")

    all_pokemon_data = df[
        ["#", "Name", "Type 1", "Type 2", "HP", "Attack", "Defense", "Speed"]
    ].to_dict("records")

    results = {
        "summary": {
            "total_characters": int(len(df)),
            "total_types": int(df["Type 1"].nunique()),
            "total_generations": int(df["Generation"].nunique()),
            "legendary_count": int(df["Legendary"].sum()),
        },
        "all_pokemon": all_pokemon_data,
        "top_attackers": analyze_top_performers(df, "Attack", 10),
        "top_defenders": analyze_top_performers(df, "Defense", 10),
        "fastest": analyze_top_performers(df, "Speed", 10),
        "type_distribution": analyze_type_distribution(df),
        "stats_by_type": analyze_stats_by_type(df),
        "legendary_comparison": analyze_legendary_comparison(df),
        "generation_trends": analyze_generation_trends(df),
    }

    print("\n📈 Analysis complete!")
    print("   - Top performers identified")
    print("   - Type distribution calculated")
    print("   - Stats by type analyzed")
    print("   - Legendary vs Regular comparison done")
    print("   - Generation trends analyzed")

    print("\n💾 Exporting results...")
    export_analysis_results(results)

    print("\n✅ All done! Results ready for visualization.")
    print("=" * 60)


if __name__ == "__main__":
    main()
