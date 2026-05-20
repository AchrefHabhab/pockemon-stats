import pandas as pd
import os


def explore_dataset():
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", "game_data.csv")

    print("=" * 60)
    print("📊 DATASET EXPLORATION")
    print("=" * 60)

    df = pd.read_csv(data_path)

    print(f"\n📁 Dataset shape: {df.shape[0]} rows × {df.shape[1]} columns")

    print("\n📋 Column names and types:")
    print(df.dtypes)

    print("\n👀 First 5 rows:")
    print(df.head())

    print("\n📈 Statistical summary:")
    print(df.describe())

    print("\n🔍 Missing values:")
    print(df.isnull().sum())

    print("\n✅ Dataset exploration complete!")


if __name__ == "__main__":
    explore_dataset()
