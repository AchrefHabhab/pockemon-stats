# Game Statistics Dashboard

## Project Overview
A full-stack data analysis and visualization dashboard that analyzes Pokemon game statistics using Python (Pandas) for data processing and Next.js + TypeScript for the frontend.

## Purpose
Portfolio project to demonstrate:
- Data analysis with Pandas (Python)
- Full-stack development with Next.js + TypeScript
- API routes for backend integration
- Data visualization with Chart.js
- Modern UI with Tailwind CSS
- Type-safe development (no `any` types!)

## Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes + Python integration
- **Data Analysis**: Python 3.x, Pandas, NumPy
- **Visualization**: Chart.js (react-chartjs-2)
- **Package Manager**: pnpm
- **Code Quality**: ESLint, TypeScript, flake8 (Python), black (Python)

## Project Structure
```
game-stats-dashboard/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts      # API endpoint for Python analysis
│   │   ├── page.tsx              # Main dashboard page
│   │   └── layout.tsx            # Root layout
│   └── components/               # React components
├── python-scripts/
│   ├── analyze.py                # Main data analysis script
│   ├── explore-data.py           # Data exploration
│   └── download-dataset.py       # Dataset downloader
├── python-data/
│   ├── game_data.csv             # Pokemon dataset (not committed)
│   └── analysis_results.json     # Analysis output (not committed)
├── public/                       # Static assets
├── requirements.txt              # Python dependencies
├── package.json                  # Node.js dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind CSS config
├── CLAUDE.md                     # Project docs (not committed)
├── LEARNING_NOTES.md             # Learning journal (not committed)
└── .gitignore                    # Git ignore rules
```

## Development Guidelines
- Follow claude-code-education rules: ONE step at a time
- Verify after each change
- No `any` types in TypeScript (if used)
- Kebab-case for files, PascalCase for components
- No comments unless explaining WHY

## Current Status
- [x] Project structure created
- [x] Python environment set up (venv)
- [x] Python dependencies installed (pandas, numpy, flake8, black)
- [x] Dataset downloaded (800 Pokemon)
- [x] Data analysis implemented and verified
- [x] Next.js + TypeScript + Tailwind CSS installed
- [ ] API route for Python integration
- [ ] Dashboard page created
- [ ] Chart components implemented
- [ ] Styling with Tailwind CSS
- [ ] Testing completed

## Learning Goals
1. Master Pandas for data manipulation
2. Learn Chart.js for interactive visualizations
3. Understand data cleaning and preprocessing
4. Build responsive dashboard UI
5. Practice data storytelling

## Next Steps
1. Set up Python virtual environment
2. Install dependencies (pandas, numpy)
3. Download game dataset
4. Explore and clean data
5. Build analysis script
6. Create HTML dashboard
7. Implement Chart.js visualizations
