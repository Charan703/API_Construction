#!/bin/bash

echo "Checking database..."
if [ ! -f "construction.db" ]; then
    echo "Database not found. Initializing..."
    python database.py
fi

echo "Testing database connection..."
python -c "from database import get_db; conn = get_db(); print('✓ Database connected'); conn.close()" || exit 1

echo "Building frontend..."
npm run build

echo "Starting server..."
python server.py
