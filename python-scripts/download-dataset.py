import urllib.request
import os


def download_dataset():
    url = "https://raw.githubusercontent.com/KeithGalli/pandas/master/pokemon_data.csv"

    data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    output_path = os.path.join(data_dir, "game_data.csv")

    print(f"Downloading dataset from {url}...")
    print(f"Saving to {output_path}...")

    try:
        urllib.request.urlretrieve(url, output_path)
        print("✅ Dataset downloaded successfully!")
        print(f"📁 Location: {output_path}")

        file_size = os.path.getsize(output_path)
        print(f"📊 File size: {file_size / 1024:.2f} KB")

    except Exception as e:
        print(f"❌ Error downloading dataset: {e}")
        return False

    return True


if __name__ == "__main__":
    download_dataset()
