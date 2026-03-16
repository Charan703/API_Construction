# First Construction - Management System

A construction management application with three dashboards: Admin, Client, and Worker.

## Features

- **Admin Dashboard**: Manage builders, clients, projects, verifications, and support requests
- **Client Dashboard**: Track project progress, documents, team members, and resources
- **Worker Dashboard**: Log daily tasks, site photos, and track project progress with AI analysis

## Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- npm or yarn

## Local Setup

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
# Activate your virtual environment first
source "venv/bin/activate"

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Build the Frontend

```bash
npm run build
```

### 4. Run the Application

#### Development Mode (Frontend Only)
```bash
npm run dev
```
This starts the Vite development server at `http://localhost:5173`.

If the FastAPI server is unavailable, the frontend automatically falls back to local demo data so the UI still works.

#### Full-Stack Mode (FastAPI Server)
```bash
python server.py
```
This starts the FastAPI server at `http://localhost:8000`.

## GitHub Pages

GitHub Pages can only host the static frontend. It cannot run the FastAPI backend, SQLite database, or file uploads.

This repo is configured so a GitHub Pages build runs in static demo mode:

- The frontend uses local demo data stored in `localStorage`.
- Login works with demo accounts shown on the login screen.
- A GitHub Actions workflow builds and deploys `dist/` to Pages.

To publish with GitHub Pages:

1. Push the repository to GitHub.
2. Open `Settings > Pages`.
3. Set the source to `GitHub Actions`.
4. Push to `main` or run the `Deploy GitHub Pages` workflow manually.

If you later deploy the backend elsewhere, set `VITE_API_BASE_URL` to that API origin before building so the frontend talks to the live API instead of demo data.

## Project Structure

```
First Construction/
├── Client/              # Client dashboard components
├── Home/                # Admin dashboard components
├── Worker/              # Worker dashboard components
├── src/                 # Main React application
│   ├── App.tsx         # Main app with dashboard switcher
│   ├── main.tsx        # React entry point
│   └── index.css       # Global styles
├── server.py           # FastAPI backend server
├── package.json        # Node dependencies
├── requirements.txt    # Python dependencies
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: FastAPI, Uvicorn
- **Build Tool**: Vite

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run the TypeScript checker
- `npm run preview` - Preview production build
- `python server.py` - Run FastAPI server

## Dashboard Switching

The application includes a dashboard switcher in the top-right corner allowing you to switch between:
- **Admin**: Full administrative control
- **Client**: Client project view
- **Worker**: Field worker interface

## Repository Notes

- `construction.db`, `uploads/`, and other runtime artifacts should stay out of GitHub commits.
- The repo now ignores local runtime data, build output, and logs.
- For Linux-based CI and GitHub Actions builds, import path casing is now enforced in `tsconfig.json`.
