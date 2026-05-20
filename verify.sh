#!/bin/bash

echo "🔍 Running code quality checks..."
echo ""

echo "1️⃣ Checking code style with flake8..."
source venv/bin/activate && flake8 python-scripts/ --max-line-length=100 --exclude=venv

if [ $? -eq 0 ]; then
    echo "✅ flake8: No issues found"
else
    echo "❌ flake8: Issues found (see above)"
    exit 1
fi

echo ""
echo "2️⃣ Running analysis script..."
source venv/bin/activate && python python-scripts/analyze.py > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ analyze.py: Runs successfully"
else
    echo "❌ analyze.py: Failed to run"
    exit 1
fi

echo ""
echo "✅ All checks passed!"
