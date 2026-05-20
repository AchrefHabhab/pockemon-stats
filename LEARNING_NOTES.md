# Learning Notes: Game Statistics Dashboard

## What I'm Learning

### Session 1: Project Setup
**Date**: May 20, 2026

**Concepts Covered**:
1. **Project Structure**: Organized folders for separation of concerns
   - `src/` for Python scripts
   - `static/` for frontend assets (CSS, JS)
   - `data/` for datasets (excluded from git)

2. **Git Best Practices**: 
   - `.gitignore` to exclude sensitive/large files
   - CLAUDE.md and AGENTS.md never committed (education files)
   - Keep datasets local, not in version control

3. **Python Virtual Environments**: Isolate project dependencies
   - Prevents conflicts between projects
   - Makes project reproducible

**What to Practice**:
- [ ] Create project structures for future projects
- [ ] Write comprehensive .gitignore files
- [ ] Set up Python virtual environments

**Next Steps**:
- Set up Python virtual environment ✅
- Install Pandas and NumPy ✅
- Learn about data analysis workflow

---

### Session 2: Python Environment & Dataset
**Date**: May 20, 2026

**Concepts Covered**:
1. **Virtual Environments**: 
   - Created isolated Python environment with `python3 -m venv venv`
   - Activated with `source venv/bin/activate`
   - Installed dependencies from `requirements.txt`
   - **Why**: Prevents dependency conflicts between projects

2. **Data Exploration with Pandas**:
   - `pd.read_csv()` - Load CSV files
   - `df.shape` - Get dimensions (rows × columns)
   - `df.head()` - View first rows
   - `df.describe()` - Statistical summary
   - `df.isnull().sum()` - Find missing values
   - `df.dtypes` - Check column data types

3. **Dataset Understanding**:
   - 800 Pokemon (game characters) with stats
   - Columns: Name, Type, HP, Attack, Defense, Speed, etc.
   - Missing data in "Type 2" (386 missing values)
   - Mix of numerical (HP, Attack) and categorical (Type) data

**What to Practice**:
- [ ] Create virtual environments for future projects
- [ ] Explore datasets before analyzing them
- [ ] Identify data types and missing values
- [ ] Use Pandas basic functions (head, describe, info)

**Next Steps**:
- Build data analysis script ✅
- Calculate top performers ✅
- Prepare data for visualization ✅

---

### Session 3: Code Quality & Verification
**Date**: May 20, 2026

**Concepts Covered**:
1. **Python Code Quality Tools** (like eslint for JavaScript):
   - **flake8**: Checks style, syntax errors, unused imports
   - **black**: Auto-formats code to be consistent
   - **pylint**: More comprehensive code analysis
   
2. **Why Code Quality Matters**:
   - Catches errors before running code
   - Enforces consistent style across team
   - Makes code easier to read and maintain
   - Prevents common bugs

3. **Verification Workflow**:
   ```bash
   # Check code style
   flake8 src/analyze.py --max-line-length=100
   
   # Auto-format code
   black src/analyze.py
   
   # Run the script to verify it works
   python src/analyze.py
   ```

4. **What We Fixed**:
   - Added proper spacing between functions (2 blank lines)
   - Removed unnecessary f-strings (no placeholders)
   - Fixed line length issues
   - Removed trailing whitespace

**What to Practice**:
- [ ] Run flake8 on your code before committing
- [ ] Use black to auto-format Python files
- [ ] Understand common Python style issues (PEP 8)
- [ ] Always verify code works after formatting

**Next Steps**:
- Create HTML dashboard structure ✅ (Converted to Next.js!)
- Add Chart.js library
- Build first visualization

---

### Session 4: Next.js Conversion
**Date**: May 20, 2026

**Concepts Covered**:
1. **Why Next.js Over Plain HTML**:
   - Modern, professional stack
   - Type safety with TypeScript
   - API routes for backend integration
   - Better for CV and portfolio
   - Easier to deploy (Vercel)
   - Component-based architecture

2. **Next.js Setup**:
   - Initialized with `pnpm create next-app`
   - TypeScript for type safety
   - Tailwind CSS for styling
   - ESLint for code quality
   - App Router (Next.js 14+)

3. **Project Structure**:
   - `src/app/` - Pages and API routes
   - `src/components/` - Reusable React components
   - `python-scripts/` - Python analysis scripts
   - `python-data/` - Dataset storage
   - `public/` - Static assets

4. **Verification Workflow**:
   ```bash
   # TypeScript type checking
   pnpm type-check
   
   # ESLint code quality
   pnpm lint
   
   # Python code quality
   ./verify.sh
   ```

**What to Practice**:
- [ ] Understand Next.js file-based routing
- [ ] Learn TypeScript basics (types, interfaces)
- [ ] Practice Tailwind CSS utility classes
- [ ] Understand API routes in Next.js

**Next Steps**:
- Create API route to run Python analysis ✅
- Build dashboard page with React components
- Implement Chart.js visualizations
- Style with Tailwind CSS

---

### Session 5: API Route Creation
**Date**: May 20, 2026

**Concepts Covered**:
1. **Next.js API Routes**:
   - Created in `src/app/api/[name]/route.ts`
   - Export HTTP method functions (GET, POST, etc.)
   - Return `NextResponse.json()` for JSON responses
   - Automatically become endpoints: `/api/[name]`

2. **Running Python from Node.js**:
   - Used `child_process.exec()` to run Python scripts
   - Promisified with `util.promisify()` for async/await
   - Quoted paths to handle spaces in directory names
   - Read JSON output with `fs/promises.readFile()`

3. **Error Handling**:
   - Try/catch blocks for robust error handling
   - Return 500 status code on errors
   - Log errors to console for debugging

4. **Path Issues Fixed**:
   - Updated Python scripts to use `python-data/` instead of `data/`
   - Quoted command paths to handle spaces
   - Used `path.join()` for cross-platform compatibility

**Code Example:**
```typescript
export async function GET() {
  try {
    const pythonScript = path.join(process.cwd(), "python-scripts", "analyze.py");
    const { stdout } = await execAsync(`"${venvPython}" "${pythonScript}"`);
    const data = await readFile(outputFile, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
```

**What to Practice**:
- [ ] Understand Next.js API route structure
- [ ] Practice async/await with child processes
- [ ] Learn error handling patterns
- [ ] Test API endpoints with curl or browser

**Verification:**
```bash
# TypeScript check
pnpm type-check ✅

# ESLint check
pnpm lint ✅

# Python check
./verify.sh ✅

# Test API
curl http://localhost:3000/api/analyze ✅
```

**Next Steps**:
- Build dashboard page component ✅
- Fetch data from API ✅
- Display summary statistics ✅
- Add Chart.js visualizations ✅

---

### Session 6: Chart.js Implementation
**Date**: May 20, 2026

**Concepts Covered**:
1. **Chart.js + React Integration**:
   - Installed `chart.js` and `react-chartjs-2`
   - Registered chart components (scales, elements, plugins)
   - Created reusable chart components with TypeScript

2. **Three Chart Types**:
   - **Bar Chart**: Type distribution (CategoryScale, BarElement)
   - **Radar Chart**: Legendary comparison (RadialLinearScale, PointElement)
   - **Line Chart**: Generation trends (LineElement, multiple datasets)

3. **Chart Configuration**:
   - Responsive charts with `maintainAspectRatio: false`
   - Custom colors and styling
   - Legend positioning
   - Axis configuration (beginAtZero, precision)

4. **Component Architecture**:
   - Each chart is a separate component
   - Props typed with TypeScript interfaces
   - Reusable and maintainable
   - Client components (`"use client"`)

**Code Pattern:**
```typescript
// 1. Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ...);

// 2. Define props interface
interface ChartProps {
  data: DataType;
}

// 3. Create chart component
export function MyChart({ data }: ChartProps) {
  const chartData = { labels: [...], datasets: [...] };
  const options = { responsive: true, ... };
  return <Bar data={chartData} options={options} />;
}
```

**What to Practice**:
- [ ] Understand different Chart.js chart types
- [ ] Practice configuring chart options
- [ ] Learn color schemes and styling
- [ ] Create responsive visualizations

**Verification:**
```bash
pnpm type-check ✅
pnpm lint ✅
./verify.sh ✅
Browser test ✅
```

**Dashboard Features:**
- ✅ 4 Summary statistics cards
- ✅ Type Distribution bar chart
- ✅ Top 10 Attackers table
- ✅ Legendary vs Regular radar chart
- ✅ Generation trends line chart
- ✅ Responsive layout with Tailwind CSS
- ✅ Loading and error states
- ✅ Full TypeScript type safety

---

### Session 7: Interactive Features & Animations
**Date**: May 20, 2026

**Concepts Covered:**
1. **Interactive Type Filtering**:
   - Made chart bars clickable with onClick handler
   - Filter 800+ Pokemon by type
   - Display filtered results in scrollable grid
   - Close functionality with × button

2. **React State Management**:
   - `selectedType` state for active filter
   - `allPokemon` state for complete dataset
   - Conditional rendering based on state
   - State updates trigger re-renders

3. **CSS Animations & Transitions**:
   - Hover effects: `hover:scale-105`, `hover:shadow-lg`
   - Click feedback: `active:scale-95`
   - Slide-down animation: `animate-[slideDown_0.3s_ease-out]`
   - Smooth transitions: `transition-all duration-200`

4. **UI/UX Improvements**:
   - Color-coded table headers (Red, Green, Blue, Yellow)
   - Gradient backgrounds for visual hierarchy
   - Emoji indicators (👆, 🎮)
   - Better scrollbar styling
   - Positioned filter list directly under chart

5. **React Keys & Performance**:
   - Fixed duplicate key errors
   - Used unique composite keys: `${id}-${name}-${index}`
   - Prevents React reconciliation issues

**Code Patterns:**
```typescript
// Clickable chart with callback
<TypeDistributionChart 
  data={data.type_distribution} 
  onTypeClick={(type) => setSelectedType(type)}
/>

// Conditional rendering with animation
{selectedType && (
  <div className="animate-[slideDown_0.3s_ease-out]">
    {/* Filtered content */}
  </div>
)}

// Hover and click animations
className="hover:scale-105 active:scale-95 transition-all"
```

**What to Practice**:
- [ ] Understand React state and conditional rendering
- [ ] Practice CSS animations and transitions
- [ ] Learn Tailwind utility classes for animations
- [ ] Implement click handlers and callbacks
- [ ] Master component composition

**Verification:**
```bash
pnpm type-check ✅
pnpm lint ✅
./verify.sh ✅
Browser test ✅
```

**Final Features:**
- ✅ Clickable type distribution chart
- ✅ Scrollable Pokemon grid (800+ Pokemon)
- ✅ Pokemon detail cards with images
- ✅ Smooth hover and click animations
- ✅ Color-coded stats throughout
- ✅ Gradient backgrounds
- ✅ Responsive design
- ✅ Complete README documentation

**Project Complete!** 🎉

---

## Resources
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [Kaggle Datasets](https://www.kaggle.com/datasets)
