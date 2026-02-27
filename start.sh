#!/bin/bash

echo "🚀 Starting First Construction Management System..."
echo ""

# Check if database exists
if [ ! -f "construction.db" ]; then
    echo "📊 Initializing database..."
    python database.py
fi

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "🔨 Building frontend..."
    npm run build
fi

echo ""
echo "✅ Starting server at http://localhost:8000"
echo "   Press Ctrl+C to stop"
echo ""

python server.py
