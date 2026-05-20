# 🎮 Pokemon Statistics Dashboard

An interactive full-stack data analysis dashboard that visualizes Pokemon statistics using Python (Pandas) for data processing and Next.js + TypeScript for a modern, responsive frontend.

![Pokemon Dashboard](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.14-yellow?style=flat-square&logo=python)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 📊 Data Visualization
- **Summary Statistics Cards**: Total characters, types, generations, and legendary count
- **Interactive Bar Chart**: Type distribution with clickable bars
- **Radar Chart**: Legendary vs Regular Pokemon comparison
- **Line Chart**: Stats trends across 6 generations
- **Top 10 Attackers Table**: Sortable table with Pokemon images

### 🎯 Interactive Features
- **Type Filtering**: Click any type bar to see all Pokemon of that type
- **Scrollable Pokemon Grid**: Browse through 800+ Pokemon
- **Pokemon Detail View**: Click any Pokemon to see detailed stats with progress bars
- **Smooth Animations**: Hover effects, click feedback, and slide-down animations
- **Responsive Design**: Works on desktop, tablet, and mobile

### 🎨 UI/UX
- Color-coded stats (Attack: Red, HP: Green, Defense: Blue, Speed: Yellow)
- Pokemon sprites from PokeAPI
- Type badges with dual-type support
- Gradient backgrounds and modern card designs
- Smooth transitions and hover effects

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Chart.js + react-chartjs-2** - Interactive charts

### Backend
- **Next.js API Routes** - Server-side endpoints
- **Python 3.14** - Data analysis
- **Pandas** - Data manipulation
- **NumPy** - Numerical computations

### Code Quality
- **ESLint** - JavaScript/TypeScript linting
- **TypeScript Compiler** - Type checking
- **flake8** - Python linting
- **black** - Python formatting

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **pnpm**
- **Python** 3.10+
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AchrefHabhab/pockemon-stats.git
cd pockemon-stats
```

2. **Install Node.js dependencies**
```bash
pnpm install
```

3. **Set up Python environment**
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate     # On Windows

# Install Python dependencies
pip install -r requirements.txt
```

4. **Download the Pokemon dataset**
```bash
source venv/bin/activate
python python-scripts/download-dataset.py
```

### Running the Application

1. **Start the development server**
```bash
pnpm dev
```

2. **Open your browser**
```
http://localhost:3000
```

The dashboard will load and automatically run the Python analysis on first request.

## 📁 Project Structure

```
pokemon-stats-dashboard/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts          # API endpoint for Python analysis
│   │   ├── page.tsx                  # Main dashboard page
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── type-distribution-chart.tsx
│   │   ├── legendary-comparison-chart.tsx
│   │   └── generation-trends-chart.tsx
│   └── types/
│       └── analysis.ts               # TypeScript interfaces
├── python-scripts/
│   ├── analyze.py                    # Main data analysis script
│   ├── explore-data.py               # Data exploration
│   └── download-dataset.py           # Dataset downloader
├── python-data/
│   ├── game_data.csv                 # Pokemon dataset (800 records)
│   └── analysis_results.json         # Analysis output
├── public/                           # Static assets
├── requirements.txt                  # Python dependencies
├── package.json                      # Node.js dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind CSS config
└── verify.sh                         # Python code quality script
```

## 🧪 Testing & Verification

### TypeScript & ESLint
```bash
pnpm type-check && pnpm lint
```

### Python Code Quality
```bash
./verify.sh
```

### Test API Endpoint
```bash
curl http://localhost:3000/api/analyze
```

## 🎯 How to Use

1. **View Summary Stats** - See total Pokemon, types, generations, and legendary count
2. **Explore Type Distribution** - Click any bar to filter Pokemon by type
3. **Browse Pokemon** - Scroll through the filtered list of Pokemon
4. **View Details** - Click any Pokemon card to see detailed stats
5. **Compare Stats** - Use the radar chart to compare legendary vs regular Pokemon
6. **Analyze Trends** - View how stats evolved across generations

## 📊 Data Source

- **Dataset**: Pokemon stats from Kaggle
- **Records**: 800 Pokemon
- **Attributes**: Name, Type, HP, Attack, Defense, Speed, Generation, Legendary status
- **Images**: Pokemon sprites from [PokeAPI](https://pokeapi.co/)

## 🎨 Color Scheme

- **Attack**: Red (#DC2626)
- **HP**: Green (#16A34A)
- **Defense**: Blue (#2563EB)
- **Speed**: Yellow (#CA8A04)
- **Type 1**: Blue badges
- **Type 2**: Purple badges

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `pnpm build`
   - **Install Command**: `pnpm install`
4. Add environment variables if needed
5. Deploy!

## 👤 Author

**Achraf Hebheb**
- GitHub: [@AchrefHabhab](https://github.com/AchrefHabhab)
- LinkedIn: [achraf-hebheb-98a763194](https://linkedin.com/in/achraf-hebheb-98a763194)
- Email: habhabachref@gmail.com

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Pokemon data from Kaggle
- Pokemon sprites from PokeAPI
- Built with Next.js, React, and Chart.js
- Styled with Tailwind CSS

---

**⭐ Star this repo if you find it helpful!**
