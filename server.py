from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
import sqlite3
from datetime import datetime
import shutil
import os
from database import init_db, get_db

app = FastAPI(title="First Construction API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()

# Create uploads directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# Pydantic models
class Project(BaseModel):
    name: str
    location: str
    status: str
    health: str
    due_date: str
    supervisor: str
    crew_size: int
    client_name: str
    budget: float

class Builder(BaseModel):
    name: str
    business: str
    specialty: str
    email: str
    phone: str

class Task(BaseModel):
    title: str
    project_id: str
    priority: str
    due_date: str

class SupportRequest(BaseModel):
    client_name: str
    subject: str
    priority: str
    description: str

class Event(BaseModel):
    title: str
    project_id: str
    event_type: str
    event_date: str
    event_time: str

# Projects endpoints
@app.get("/api/projects")
def get_projects():
    conn = get_db()
    projects = conn.execute("SELECT * FROM projects").fetchall()
    conn.close()
    return [dict(p) for p in projects]

@app.post("/api/projects")
def create_project(project: Project):
    conn = get_db()
    project_id = f"p{int(datetime.now().timestamp())}"
    conn.execute("""INSERT INTO projects 
        (id, name, location, status, health, due_date, supervisor, crew_size, client_name, budget, progress, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)""",
        (project_id, project.name, project.location, project.status, project.health, 
         project.due_date, project.supervisor, project.crew_size, project.client_name, 
         project.budget, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    return {"id": project_id, "message": "Project created"}

@app.put("/api/projects/{project_id}/progress")
def update_progress(project_id: str, progress: int):
    conn = get_db()
    conn.execute("UPDATE projects SET progress = ? WHERE id = ?", (progress, project_id))
    conn.commit()
    conn.close()
    return {"message": "Progress updated"}

@app.delete("/api/projects/{project_id}")
def delete_project(project_id: str):
    conn = get_db()
    conn.execute("DELETE FROM projects WHERE id = ?", (project_id,))
    conn.commit()
    conn.close()
    return {"message": "Project deleted"}

# Builders endpoints
@app.get("/api/builders")
def get_builders(status: Optional[str] = None):
    conn = get_db()
    if status:
        builders = conn.execute("SELECT * FROM builders WHERE status = ?", (status,)).fetchall()
    else:
        builders = conn.execute("SELECT * FROM builders").fetchall()
    conn.close()
    return [dict(b) for b in builders]

@app.post("/api/builders")
def create_builder(builder: Builder):
    conn = get_db()
    conn.execute("""INSERT INTO builders 
        (name, business, specialty, email, phone, status, applied_date)
        VALUES (?, ?, ?, ?, ?, 'Pending', ?)""",
        (builder.name, builder.business, builder.specialty, builder.email, 
         builder.phone, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    return {"message": "Builder added"}

@app.put("/api/builders/{builder_id}/status")
def update_builder_status(builder_id: int, status: str):
    conn = get_db()
    conn.execute("UPDATE builders SET status = ? WHERE id = ?", (status, builder_id))
    conn.commit()
    conn.close()
    return {"message": "Builder status updated"}

@app.delete("/api/builders/{builder_id}")
def delete_builder(builder_id: int):
    conn = get_db()
    conn.execute("DELETE FROM builders WHERE id = ?", (builder_id,))
    conn.commit()
    conn.close()
    return {"message": "Builder deleted"}

# Clients endpoints
@app.get("/api/clients")
def get_clients():
    conn = get_db()
    clients = conn.execute("SELECT * FROM clients").fetchall()
    conn.close()
    return [dict(c) for c in clients]

@app.post("/api/clients")
def create_client(name: str, email: str, phone: str, project_id: str):
    conn = get_db()
    conn.execute("""INSERT INTO clients (name, email, phone, project_id, joined_date)
        VALUES (?, ?, ?, ?, ?)""",
        (name, email, phone, project_id, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    return {"message": "Client added"}

# Tasks endpoints
@app.get("/api/tasks")
def get_tasks():
    conn = get_db()
    tasks = conn.execute("SELECT * FROM tasks ORDER BY due_date").fetchall()
    conn.close()
    return [dict(t) for t in tasks]

@app.post("/api/tasks")
def create_task(task: Task):
    conn = get_db()
    task_id = f"t{int(datetime.now().timestamp())}"
    conn.execute("""INSERT INTO tasks (id, title, project_id, priority, due_date, created_at)
        VALUES (?, ?, ?, ?, ?, ?)""",
        (task_id, task.title, task.project_id, task.priority, task.due_date, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    return {"id": task_id, "message": "Task created"}

@app.put("/api/tasks/{task_id}/status")
def toggle_task(task_id: str):
    conn = get_db()
    task = conn.execute("SELECT status FROM tasks WHERE id = ?", (task_id,)).fetchone()
    new_status = "Completed" if task["status"] == "Pending" else "Pending"
    conn.execute("UPDATE tasks SET status = ? WHERE id = ?", (new_status, task_id))
    conn.commit()
    conn.close()
    return {"message": "Task updated"}

@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: str):
    conn = get_db()
    conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return {"message": "Task deleted"}

# Documents endpoints
@app.get("/api/documents")
def get_documents():
    conn = get_db()
    docs = conn.execute("SELECT * FROM documents ORDER BY uploaded_date DESC").fetchall()
    conn.close()
    return [dict(d) for d in docs]

@app.post("/api/documents/upload")
async def upload_document(file: UploadFile = File(...), category: str = "General", project_id: str = ""):
    file_path = UPLOAD_DIR / file.filename
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    conn = get_db()
    conn.execute("""INSERT INTO documents (name, type, size, category, project_id, uploaded_date, file_path)
        VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (file.filename, file.content_type, str(file.size), category, project_id, 
         datetime.now().isoformat(), str(file_path)))
    conn.commit()
    conn.close()
    return {"message": "Document uploaded"}

@app.delete("/api/documents/{doc_id}")
def delete_document(doc_id: int):
    conn = get_db()
    doc = conn.execute("SELECT file_path FROM documents WHERE id = ?", (doc_id,)).fetchone()
    if doc and os.path.exists(doc["file_path"]):
        os.remove(doc["file_path"])
    conn.execute("DELETE FROM documents WHERE id = ?", (doc_id,))
    conn.commit()
    conn.close()
    return {"message": "Document deleted"}

# Site photos endpoints
@app.post("/api/photos/upload")
async def upload_photo(project_id: str, file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / f"{project_id}_{int(datetime.now().timestamp())}_{file.filename}"
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    conn = get_db()
    conn.execute("""INSERT INTO site_photos (project_id, photo_url, uploaded_at, uploaded_by)
        VALUES (?, ?, ?, ?)""",
        (project_id, str(file_path), datetime.now().isoformat(), "Mike Conners"))
    conn.commit()
    conn.close()
    return {"photo_url": str(file_path)}

@app.get("/api/photos/{project_id}")
def get_photos(project_id: str):
    conn = get_db()
    photos = conn.execute("SELECT * FROM site_photos WHERE project_id = ? ORDER BY uploaded_at DESC", 
                         (project_id,)).fetchall()
    conn.close()
    return [dict(p) for p in photos]

# Support requests endpoints
@app.get("/api/support")
def get_support_requests():
    conn = get_db()
    requests = conn.execute("SELECT * FROM support_requests ORDER BY created_at DESC").fetchall()
    conn.close()
    return [dict(r) for r in requests]

@app.post("/api/support")
def create_support_request(request: SupportRequest):
    conn = get_db()
    request_id = f"SR-{int(datetime.now().timestamp())}"
    conn.execute("""INSERT INTO support_requests (id, client_name, subject, priority, description, created_at)
        VALUES (?, ?, ?, ?, ?, ?)""",
        (request_id, request.client_name, request.subject, request.priority, 
         request.description, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    return {"id": request_id, "message": "Support request created"}

@app.put("/api/support/{request_id}/status")
def update_support_status(request_id: str, status: str):
    conn = get_db()
    conn.execute("UPDATE support_requests SET status = ? WHERE id = ?", (status, request_id))
    conn.commit()
    conn.close()
    return {"message": "Status updated"}

# Events endpoints
@app.get("/api/events")
def get_events():
    conn = get_db()
    events = conn.execute("SELECT * FROM events ORDER BY event_date, event_time").fetchall()
    conn.close()
    return [dict(e) for e in events]

@app.post("/api/events")
def create_event(event: Event):
    conn = get_db()
    conn.execute("""INSERT INTO events (title, project_id, event_type, event_date, event_time, created_at)
        VALUES (?, ?, ?, ?, ?, ?)""",
        (event.title, event.project_id, event.event_type, event.event_date, 
         event.event_time, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    return {"message": "Event created"}

@app.delete("/api/events/{event_id}")
def delete_event(event_id: int):
    conn = get_db()
    conn.execute("DELETE FROM events WHERE id = ?", (event_id,))
    conn.commit()
    conn.close()
    return {"message": "Event deleted"}

# Health check
@app.get("/api/health")
def health_check():
    return {"status": "healthy", "message": "API is running"}

# Serve static files
dist_path = Path(__file__).parent / "dist"
if dist_path.exists():
    app.mount("/assets", StaticFiles(directory=dist_path / "assets"), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = dist_path / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(dist_path / "index.html")
else:
    @app.get("/")
    async def root():
        return {"message": "Build the frontend first using 'npm run build'"}

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
