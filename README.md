# First Construction - Management System

A comprehensive construction management system with three dashboards: Admin, Client, and Worker views.

## Features

- **Admin Dashboard**: Manage builders, clients, projects, verifications, and support requests
- **Client Dashboard**: Track project progress, documents, team members, and resources
- **Worker Dashboard**: Log daily tasks, site photos, and track project progress with AI analysis

## Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- npm or yarn

## Setup Instructions

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
This will start the Vite development server at http://localhost:5173

#### Production Mode (FastAPI Server)
```bash
python server.py
```
This will start the FastAPI server at http://localhost:8000

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
- `npm run preview` - Preview production build
- `python server.py` - Run FastAPI server

## Dashboard Switching

The application includes a dashboard switcher in the top-right corner allowing you to switch between:
- **Admin**: Full administrative control
- **Client**: Client project view
- **Worker**: Field worker interface

## Notes

- All import errors have been fixed (motion/react → framer-motion)
- Figma-specific imports have been removed
- File naming issues resolved (main,tsx → main.tsx)
- All dependencies are properly configured
