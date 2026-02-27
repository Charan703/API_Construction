import sqlite3
from datetime import datetime
import json

def get_db():
    conn = sqlite3.connect('construction.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    c = conn.cursor()
    
    # Projects table
    c.execute('''CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT,
        progress INTEGER DEFAULT 0,
        status TEXT,
        health TEXT,
        due_date TEXT,
        supervisor TEXT,
        crew_size INTEGER,
        next_milestone TEXT,
        image TEXT,
        client_name TEXT,
        budget REAL,
        created_at TEXT
    )''')
    
    # Builders table
    c.execute('''CREATE TABLE IF NOT EXISTS builders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        business TEXT,
        specialty TEXT,
        projects INTEGER DEFAULT 0,
        rating REAL DEFAULT 0,
        reviews INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Pending',
        email TEXT,
        phone TEXT,
        avatar TEXT,
        applied_date TEXT,
        docs_status TEXT
    )''')
    
    # Clients table
    c.execute('''CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        project_id TEXT,
        status TEXT DEFAULT 'Active',
        joined_date TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id)
    )''')
    
    # Tasks table
    c.execute('''CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        project_id TEXT,
        priority TEXT,
        status TEXT DEFAULT 'Pending',
        due_date TEXT,
        assigned_to TEXT,
        created_at TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id)
    )''')
    
    # Documents table
    c.execute('''CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT,
        size TEXT,
        category TEXT,
        project_id TEXT,
        uploaded_date TEXT,
        file_path TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id)
    )''')
    
    # Site photos table
    c.execute('''CREATE TABLE IF NOT EXISTS site_photos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id TEXT NOT NULL,
        photo_url TEXT NOT NULL,
        uploaded_at TEXT,
        uploaded_by TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id)
    )''')
    
    # Support requests table
    c.execute('''CREATE TABLE IF NOT EXISTS support_requests (
        id TEXT PRIMARY KEY,
        client_name TEXT,
        subject TEXT,
        priority TEXT,
        status TEXT DEFAULT 'Open',
        created_at TEXT,
        description TEXT
    )''')
    
    # Events table
    c.execute('''CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        project_id TEXT,
        event_type TEXT,
        event_date TEXT,
        event_time TEXT,
        created_at TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id)
    )''')
    
    # Insert sample data
    c.execute("SELECT COUNT(*) FROM projects")
    if c.fetchone()[0] == 0:
        sample_projects = [
            ('1', 'Skyline Residences', 'Downtown District, Chicago', 72, 'Framing', 'On Track', 
             '2026-08-15', 'Mike Conners', 24, 'Roof Deck Completion', 
             'https://images.unsplash.com/photo-1762889597634-264f0907820b?w=800', 'Sarah Connor', 4500000, datetime.now().isoformat()),
            ('2', 'Green Valley Office Hub', 'North Sector, Evanston', 35, 'Foundation', 'Delayed',
             '2027-01-10', 'Sarah Jenkins', 18, 'Plumbing Rough-in',
             'https://images.unsplash.com/photo-1765378025255-5c2ff04563f4?w=800', 'Tony Rogers', 3200000, datetime.now().isoformat()),
            ('3', 'The Harbor Lofts', 'Waterfront Zone, Chicago', 95, 'Finishing', 'On Track',
             '2026-03-20', 'David Chen', 12, 'Interior Paint',
             'https://images.unsplash.com/photo-1612725118809-0bebfb71a551?w=800', 'Bruce Wayne', 2800000, datetime.now().isoformat()),
        ]
        c.executemany('INSERT INTO projects VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', sample_projects)
    
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized successfully!")
