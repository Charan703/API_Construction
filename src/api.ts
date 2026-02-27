const API_BASE = 'http://localhost:8000/api';

export const api = {
  // Projects
  getProjects: () => fetch(`${API_BASE}/projects`).then(r => r.json()),
  createProject: (data: any) => fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  updateProgress: (id: string, progress: number) => fetch(`${API_BASE}/projects/${id}/progress?progress=${progress}`, {
    method: 'PUT'
  }).then(r => r.json()),
  deleteProject: (id: string) => fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Builders
  getBuilders: (status?: string) => fetch(`${API_BASE}/builders${status ? `?status=${status}` : ''}`).then(r => r.json()),
  createBuilder: (data: any) => fetch(`${API_BASE}/builders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  updateBuilderStatus: (id: number, status: string) => fetch(`${API_BASE}/builders/${id}/status?status=${status}`, {
    method: 'PUT'
  }).then(r => r.json()),
  deleteBuilder: (id: number) => fetch(`${API_BASE}/builders/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Clients
  getClients: () => fetch(`${API_BASE}/clients`).then(r => r.json()),
  createClient: (data: any) => fetch(`${API_BASE}/clients?name=${data.name}&email=${data.email}&phone=${data.phone}&project_id=${data.project_id}`, {
    method: 'POST'
  }).then(r => r.json()),

  // Tasks
  getTasks: () => fetch(`${API_BASE}/tasks`).then(r => r.json()),
  createTask: (data: any) => fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  toggleTask: (id: string) => fetch(`${API_BASE}/tasks/${id}/status`, { method: 'PUT' }).then(r => r.json()),
  deleteTask: (id: string) => fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Documents
  getDocuments: () => fetch(`${API_BASE}/documents`).then(r => r.json()),
  uploadDocument: (file: File, category: string, projectId: string) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${API_BASE}/documents/upload?category=${category}&project_id=${projectId}`, {
      method: 'POST',
      body: formData
    }).then(r => r.json());
  },
  deleteDocument: (id: number) => fetch(`${API_BASE}/documents/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Photos
  uploadPhoto: (projectId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${API_BASE}/photos/upload?project_id=${projectId}`, {
      method: 'POST',
      body: formData
    }).then(r => r.json());
  },
  getPhotos: (projectId: string) => fetch(`${API_BASE}/photos/${projectId}`).then(r => r.json()),

  // Support
  getSupportRequests: () => fetch(`${API_BASE}/support`).then(r => r.json()),
  createSupportRequest: (data: any) => fetch(`${API_BASE}/support`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  updateSupportStatus: (id: string, status: string) => fetch(`${API_BASE}/support/${id}/status?status=${status}`, {
    method: 'PUT'
  }).then(r => r.json()),

  // Events
  getEvents: () => fetch(`${API_BASE}/events`).then(r => r.json()),
  createEvent: (data: any) => fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  deleteEvent: (id: number) => fetch(`${API_BASE}/events/${id}`, { method: 'DELETE' }).then(r => r.json()),
};
