import { SHARED_PROJECTS } from '../Worker/data/projects';

const DEFAULT_API_BASE = 'http://localhost:8000/api';
const STORAGE_KEY = 'first-construction-demo-store';
const DEFAULT_PROJECT_IMAGE =
  'https://images.unsplash.com/photo-1503387762-592dea58ef23?w=800&h=400&fit=crop';
const configuredApiBase = (import.meta.env.VITE_API_BASE_URL ?? '').trim();
const STATIC_DEMO_MODE = import.meta.env.VITE_STATIC_DEMO === 'true';
const API_BASE = configuredApiBase || (STATIC_DEMO_MODE ? '' : DEFAULT_API_BASE);

let forceMockApi = STATIC_DEMO_MODE;

type UserRole = 'home' | 'client' | 'worker';

interface DemoAccount {
  email: string;
  label: string;
  password: string;
  role: UserRole;
}

interface DemoStore {
  builders: any[];
  clients: any[];
  documents: any[];
  events: any[];
  projects: any[];
  supportRequests: any[];
  tasks: any[];
  users: any[];
}

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'admin@firstconstruction.demo',
    label: 'Admin demo',
    password: 'demo123',
    role: 'home',
  },
  {
    email: 'client@firstconstruction.demo',
    label: 'Client demo',
    password: 'demo123',
    role: 'client',
  },
  {
    email: 'worker@firstconstruction.demo',
    label: 'Worker demo',
    password: 'demo123',
    role: 'worker',
  },
];

export const isStaticDemoMode = STATIC_DEMO_MODE;

function nowIso() {
  return new Date().toISOString();
}

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function toDisplayDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (size >= 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${size} B`;
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function seedProjects() {
  return SHARED_PROJECTS.map((project, index) => {
    const dueDate = project.due_date ?? project.dueDate ?? nowIso().split('T')[0];
    const crewSize = project.crew_size ?? project.crewSize ?? 0;
    const nextMilestone = project.next_milestone ?? project.nextMilestone ?? 'TBD';

    return {
      ...project,
      budget: [4500000, 3200000, 2800000, 1750000][index] ?? 1000000,
      client_name: ['Sarah Connor', 'Tony Rogers', 'Bruce Wayne', 'Olivia Reed'][index] ?? 'Client',
      created_at: nowIso(),
      crewSize,
      crew_size: crewSize,
      dueDate,
      due_date: dueDate,
      image: project.image || DEFAULT_PROJECT_IMAGE,
      nextMilestone,
      next_milestone: nextMilestone,
      sitePhotos: project.sitePhotos ?? [],
    };
  });
}

function createSeedStore(): DemoStore {
  const createdAt = nowIso();
  const projects = seedProjects();

  return {
    users: DEMO_ACCOUNTS.map((account, index) => {
      const [firstName, lastName] =
        account.role === 'home'
          ? ['Alex', 'Johnson']
          : account.role === 'client'
            ? ['Marcus', 'Chen']
            : ['Mike', 'Conners'];

      return {
        created_at: createdAt,
        email: account.email,
        first_name: firstName,
        id: index + 1,
        last_name: lastName,
        password: account.password,
        role: account.role,
      };
    }),
    projects,
    builders: [
      {
        applied_date: '2026-03-08',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        business: 'Modern Frame Works',
        docs_status: 'Verified',
        email: 'jordan@frameworks.example',
        id: 1,
        name: 'Jordan Blake',
        phone: '+1 (312) 555-0148',
        projects: 6,
        rating: 4.8,
        reviews: 31,
        specialty: 'Framing',
        status: 'Approved',
      },
      {
        applied_date: '2026-03-12',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        docs_status: '3/3 Uploaded',
        business: 'Precision Masonry',
        email: 'nina@masonry.example',
        id: 2,
        name: 'Nina Patel',
        phone: '+1 (773) 555-0119',
        projects: 0,
        rating: 0,
        reviews: 0,
        specialty: 'Masonry',
        status: 'Pending',
      },
    ],
    clients: [
      {
        email: 'marcus.chen@example.com',
        id: 1,
        joined_date: '2026-01-12',
        name: 'Marcus Chen',
        phone: '+1 (312) 555-0192',
        project_id: projects[0]?.id ?? '1',
        status: 'Active',
      },
      {
        email: 'olivia.reed@example.com',
        id: 2,
        joined_date: '2026-02-01',
        name: 'Olivia Reed',
        phone: '+1 (847) 555-0172',
        project_id: projects[1]?.id ?? '2',
        status: 'Active',
      },
    ],
    tasks: [
      {
        created_at: createdAt,
        dueDate: '09:00 AM',
        due_date: '09:00 AM',
        id: 't1',
        priority: 'High',
        project: 'Skyline Residences',
        project_id: projects[0]?.id ?? '1',
        status: 'Pending',
        title: 'Safety Perimeter Inspection',
      },
      {
        created_at: createdAt,
        dueDate: '10:30 AM',
        due_date: '10:30 AM',
        id: 't2',
        priority: 'High',
        project: 'Green Valley Office Hub',
        project_id: projects[1]?.id ?? '2',
        status: 'Completed',
        title: 'Verify Concrete Slump Test Results',
      },
      {
        created_at: createdAt,
        dueDate: '01:30 PM',
        due_date: '01:30 PM',
        id: 't3',
        priority: 'Medium',
        project: 'The Harbor Lofts',
        project_id: projects[2]?.id ?? '3',
        status: 'Pending',
        title: 'Coordinate Framing Subcontractors',
      },
    ],
    documents: [
      {
        category: 'Blueprints',
        date: 'Mar 10, 2026',
        id: 1,
        name: 'skyline-foundation-plan.pdf',
        project_id: projects[0]?.id ?? '1',
        size: '2.4 MB',
        type: 'application/pdf',
        uploaded_date: '2026-03-10T10:00:00.000Z',
      },
      {
        category: 'Permits',
        date: 'Mar 9, 2026',
        id: 2,
        name: 'evanston-site-permit.pdf',
        project_id: projects[1]?.id ?? '2',
        size: '640 KB',
        type: 'application/pdf',
        uploaded_date: '2026-03-09T09:30:00.000Z',
      },
    ],
    supportRequests: [
      {
        client_name: 'Marcus Chen',
        created_at: '2026-03-13T09:00:00.000Z',
        description: 'Need a revised timeline after material delivery changes.',
        id: 'SR-1001',
        priority: 'High',
        status: 'Open',
        subject: 'Timeline update request',
      },
    ],
    events: [
      {
        created_at: '2026-03-18T08:00:00.000Z',
        event_date: '2026-03-18',
        event_time: '09:30',
        event_type: 'Inspection',
        id: 1,
        project_id: projects[0]?.id ?? '1',
        title: 'Framing inspection',
      },
    ],
  };
}

function readStore() {
  const fallbackStore = createSeedStore();

  if (typeof window === 'undefined') {
    return fallbackStore;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackStore));
    return fallbackStore;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<DemoStore>;
    return {
      builders: parsed.builders ?? fallbackStore.builders,
      clients: parsed.clients ?? fallbackStore.clients,
      documents: parsed.documents ?? fallbackStore.documents,
      events: parsed.events ?? fallbackStore.events,
      projects: parsed.projects ?? fallbackStore.projects,
      supportRequests: parsed.supportRequests ?? fallbackStore.supportRequests,
      tasks: parsed.tasks ?? fallbackStore.tasks,
      users: parsed.users ?? fallbackStore.users,
    };
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackStore));
    return fallbackStore;
  }
}

function writeStore(store: DemoStore) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  return store;
}

function updateStore(mutator: (store: DemoStore) => DemoStore) {
  const current = cloneValue(readStore());
  return writeStore(mutator(current));
}

function normalizeProject(project: any) {
  const dueDate = project.dueDate ?? project.due_date ?? '';
  const crewSize = project.crewSize ?? project.crew_size ?? 0;
  const nextMilestone = project.nextMilestone ?? project.next_milestone ?? 'TBD';

  return {
    ...project,
    client_name: project.client_name ?? 'Client',
    crewSize,
    crew_size: crewSize,
    dueDate,
    due_date: dueDate,
    image: project.image ?? DEFAULT_PROJECT_IMAGE,
    nextMilestone,
    next_milestone: nextMilestone,
    progress: Number(project.progress ?? 0),
    sitePhotos: project.sitePhotos ?? [],
  };
}

function resolveProjectName(projectId: string, fallbackName?: string) {
  if (fallbackName) {
    return fallbackName;
  }

  const project = readStore().projects.find((item) => item.id === projectId);
  return project?.name ?? projectId ?? 'General';
}

function normalizeTask(task: any) {
  const dueDate = task.dueDate ?? task.due_date ?? '';

  return {
    ...task,
    dueDate,
    due_date: dueDate,
    project: task.project ?? resolveProjectName(task.project_id, task.project),
  };
}

function normalizeDocument(document: any) {
  const uploadedDate = document.uploaded_date ?? document.date ?? nowIso();

  return {
    ...document,
    date: document.date ?? toDisplayDate(uploadedDate),
    uploaded_date: uploadedDate,
  };
}

async function readResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function request<T>(path: string, init: RequestInit, fallback: () => Promise<T>) {
  if (!API_BASE || forceMockApi) {
    return fallback();
  }

  try {
    const response = await fetch(`${API_BASE}${path}`, init);
    const payload = await readResponse(response);

    if (!response.ok) {
      const message =
        typeof payload === 'object' && payload && 'detail' in payload
          ? String((payload as Record<string, unknown>).detail)
          : `Request failed with status ${response.status}`;

      throw new ApiError(response.status, message);
    }

    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    forceMockApi = true;
    return fallback();
  }
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Unable to read file'));
    reader.readAsDataURL(file);
  });
}

const mockApi = {
  async login(email: string, password: string) {
    const user = readStore().users.find((item) => item.email === email && item.password === password);

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const { password: _password, ...safeUser } = user;
    return { role: user.role, success: true, user: safeUser };
  },

  async signup(data: any) {
    const store = readStore();
    const existingUser = store.users.find((item) => item.email === data.email);

    if (existingUser) {
      throw new ApiError(400, 'Email already exists');
    }

    const newUser = {
      created_at: nowIso(),
      email: data.email,
      first_name: data.first_name,
      id: store.users.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
      last_name: data.last_name,
      password: data.password,
      role: 'client' as UserRole,
    };

    updateStore((current) => ({
      ...current,
      users: [...current.users, newUser],
    }));

    const { password: _password, ...safeUser } = newUser;
    return { role: 'client', success: true, user: safeUser };
  },

  async builderRequest(data: any, files: any) {
    const store = readStore();
    const existingUser = store.users.find((item) => item.email === data.email);

    if (existingUser) {
      throw new ApiError(400, 'Email already exists');
    }

    const userId = store.users.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1;
    const uploadedDocs = [files.id_proof, files.address_proof, files.certificate].filter(Boolean).length;

    const newUser = {
      company: data.company,
      created_at: nowIso(),
      email: data.email,
      experience: data.experience,
      first_name: data.first_name,
      id: userId,
      last_name: data.last_name,
      password: 'demo123',
      phone: data.phone,
      portfolio_url: data.portfolio_url,
      role: 'worker' as UserRole,
    };

    const newBuilder = {
      applied_date: nowIso().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      business: data.company || 'Independent Builder',
      docs_status: `${uploadedDocs}/3 Uploaded`,
      email: data.email,
      id: store.builders.reduce((max, builder) => Math.max(max, Number(builder.id) || 0), 0) + 1,
      name: `${data.first_name} ${data.last_name}`.trim(),
      phone: data.phone,
      projects: 0,
      rating: 0,
      reviews: 0,
      specialty: data.experience || 'General Construction',
      status: 'Pending',
    };

    updateStore((current) => ({
      ...current,
      builders: [...current.builders, newBuilder],
      users: [...current.users, newUser],
    }));

    return { message: 'Builder request submitted', success: true };
  },

  async getProjects() {
    return readStore().projects.map(normalizeProject);
  },

  async createProject(data: any) {
    const project = normalizeProject({
      ...data,
      budget: Number(data.budget ?? 0),
      client_name: data.client_name,
      created_at: nowIso(),
      id: createId('project'),
      image: DEFAULT_PROJECT_IMAGE,
      progress: 0,
      sitePhotos: [],
    });

    updateStore((current) => ({
      ...current,
      projects: [...current.projects, project],
    }));

    return { id: project.id, message: 'Project created' };
  },

  async updateProgress(id: string, progress: number) {
    updateStore((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === id ? { ...project, progress } : project,
      ),
    }));

    return { message: 'Progress updated' };
  },

  async deleteProject(id: string) {
    updateStore((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== id),
    }));

    return { message: 'Project deleted' };
  },

  async getBuilders(status?: string) {
    const builders = readStore().builders;
    return status ? builders.filter((builder) => builder.status === status) : builders;
  },

  async createBuilder(data: any) {
    const builder = {
      applied_date: nowIso().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      docs_status: 'Verified',
      id: readStore().builders.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1,
      projects: 0,
      rating: 0,
      reviews: 0,
      status: 'Pending',
      ...data,
    };

    updateStore((current) => ({
      ...current,
      builders: [...current.builders, builder],
    }));

    return { message: 'Builder added' };
  },

  async updateBuilderStatus(id: number, status: string) {
    updateStore((current) => ({
      ...current,
      builders: current.builders.map((builder) =>
        Number(builder.id) === id ? { ...builder, status } : builder,
      ),
    }));

    return { message: 'Builder status updated' };
  },

  async deleteBuilder(id: number) {
    updateStore((current) => ({
      ...current,
      builders: current.builders.filter((builder) => Number(builder.id) !== id),
    }));

    return { message: 'Builder deleted' };
  },

  async getClients() {
    return readStore().clients;
  },

  async createClient(data: any) {
    const client = {
      ...data,
      id: readStore().clients.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1,
      joined_date: nowIso().split('T')[0],
      status: 'Active',
    };

    updateStore((current) => ({
      ...current,
      clients: [...current.clients, client],
    }));

    return { message: 'Client added' };
  },

  async getTasks() {
    return readStore().tasks.map(normalizeTask);
  },

  async createTask(data: any) {
    const task = normalizeTask({
      ...data,
      created_at: nowIso(),
      due_date: data.due_date,
      id: createId('task'),
      project: resolveProjectName(data.project_id),
      status: 'Pending',
    });

    updateStore((current) => ({
      ...current,
      tasks: [...current.tasks, task],
    }));

    return { id: task.id, message: 'Task created' };
  },

  async toggleTask(id: string) {
    updateStore((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
          : task,
      ),
    }));

    return { message: 'Task updated' };
  },

  async deleteTask(id: string) {
    updateStore((current) => ({
      ...current,
      tasks: current.tasks.filter((task) => task.id !== id),
    }));

    return { message: 'Task deleted' };
  },

  async getDocuments() {
    return readStore().documents.map(normalizeDocument);
  },

  async uploadDocument(file: File, category: string, projectId: string) {
    const uploadedDate = nowIso();
    const document = normalizeDocument({
      category,
      id: readStore().documents.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1,
      name: file.name,
      project_id: projectId,
      size: formatFileSize(file.size),
      type: file.type || 'application/octet-stream',
      uploaded_date: uploadedDate,
    });

    updateStore((current) => ({
      ...current,
      documents: [document, ...current.documents],
    }));

    return { message: 'Document uploaded' };
  },

  async deleteDocument(id: number) {
    updateStore((current) => ({
      ...current,
      documents: current.documents.filter((document) => Number(document.id) !== id),
    }));

    return { message: 'Document deleted' };
  },

  async uploadPhoto(projectId: string, file: File) {
    const photoUrl = await fileToDataUrl(file);

    updateStore((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === projectId
          ? { ...project, sitePhotos: [photoUrl, ...(project.sitePhotos ?? [])] }
          : project,
      ),
    }));

    return { photo_url: photoUrl };
  },

  async getPhotos(projectId: string) {
    const project = readStore().projects.find((item) => item.id === projectId);

    return (project?.sitePhotos ?? []).map((photoUrl: string, index: number) => ({
      id: index + 1,
      photo_url: photoUrl,
      project_id: projectId,
      uploaded_at: nowIso(),
      uploaded_by: 'Demo Worker',
    }));
  },

  async getSupportRequests() {
    return readStore().supportRequests;
  },

  async createSupportRequest(data: any) {
    const requestRecord = {
      ...data,
      created_at: nowIso(),
      id: `SR-${Date.now()}`,
      status: 'Open',
    };

    updateStore((current) => ({
      ...current,
      supportRequests: [requestRecord, ...current.supportRequests],
    }));

    return { id: requestRecord.id, message: 'Support request created' };
  },

  async updateSupportStatus(id: string, status: string) {
    updateStore((current) => ({
      ...current,
      supportRequests: current.supportRequests.map((requestRecord) =>
        requestRecord.id === id ? { ...requestRecord, status } : requestRecord,
      ),
    }));

    return { message: 'Status updated' };
  },

  async getEvents() {
    return readStore().events;
  },

  async createEvent(data: any) {
    const eventRecord = {
      ...data,
      created_at: nowIso(),
      id: readStore().events.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1,
    };

    updateStore((current) => ({
      ...current,
      events: [...current.events, eventRecord],
    }));

    return { message: 'Event created' };
  },

  async deleteEvent(id: number) {
    updateStore((current) => ({
      ...current,
      events: current.events.filter((eventRecord) => Number(eventRecord.id) !== id),
    }));

    return { message: 'Event deleted' };
  },
};

export const api = {
  async login(email: string, password: string) {
    return request('/auth/login', {
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }, () => mockApi.login(email, password));
  },

  async signup(data: any) {
    return request('/auth/signup', {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }, () => mockApi.signup(data));
  },

  async builderRequest(data: any, files: any) {
    return request('/auth/builder-request', {
      body: (() => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        if (files.id_proof) formData.append('id_proof', files.id_proof);
        if (files.address_proof) formData.append('address_proof', files.address_proof);
        if (files.certificate) formData.append('certificate', files.certificate);
        return formData;
      })(),
      method: 'POST',
    }, () => mockApi.builderRequest(data, files));
  },

  async getProjects() {
    const projects = await request<any[]>('/projects', { method: 'GET' }, () => mockApi.getProjects());
    return projects.map(normalizeProject);
  },

  async createProject(data: any) {
    return request('/projects', {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }, () => mockApi.createProject(data));
  },

  async updateProgress(id: string, progress: number) {
    return request(`/projects/${id}/progress?progress=${progress}`, {
      method: 'PUT',
    }, () => mockApi.updateProgress(id, progress));
  },

  async deleteProject(id: string) {
    return request(`/projects/${id}`, { method: 'DELETE' }, () => mockApi.deleteProject(id));
  },

  async getBuilders(status?: string) {
    return request<any[]>(
      `/builders${status ? `?status=${status}` : ''}`,
      { method: 'GET' },
      () => mockApi.getBuilders(status),
    );
  },

  async createBuilder(data: any) {
    return request('/builders', {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }, () => mockApi.createBuilder(data));
  },

  async updateBuilderStatus(id: number, status: string) {
    return request(`/builders/${id}/status?status=${status}`, {
      method: 'PUT',
    }, () => mockApi.updateBuilderStatus(id, status));
  },

  async deleteBuilder(id: number) {
    return request(`/builders/${id}`, { method: 'DELETE' }, () => mockApi.deleteBuilder(id));
  },

  async getClients() {
    return request('/clients', { method: 'GET' }, () => mockApi.getClients());
  },

  async createClient(data: any) {
    return request(
      `/clients?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&project_id=${encodeURIComponent(data.project_id)}`,
      { method: 'POST' },
      () => mockApi.createClient(data),
    );
  },

  async getTasks() {
    const tasks = await request<any[]>('/tasks', { method: 'GET' }, () => mockApi.getTasks());
    return tasks.map(normalizeTask);
  },

  async createTask(data: any) {
    return request('/tasks', {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }, () => mockApi.createTask(data));
  },

  async toggleTask(id: string) {
    return request(`/tasks/${id}/status`, { method: 'PUT' }, () => mockApi.toggleTask(id));
  },

  async deleteTask(id: string) {
    return request(`/tasks/${id}`, { method: 'DELETE' }, () => mockApi.deleteTask(id));
  },

  async getDocuments() {
    const documents = await request<any[]>('/documents', { method: 'GET' }, () => mockApi.getDocuments());
    return documents.map(normalizeDocument);
  },

  async uploadDocument(file: File, category: string, projectId: string) {
    return request(`/documents/upload?category=${encodeURIComponent(category)}&project_id=${encodeURIComponent(projectId)}`, {
      body: (() => {
        const formData = new FormData();
        formData.append('file', file);
        return formData;
      })(),
      method: 'POST',
    }, () => mockApi.uploadDocument(file, category, projectId));
  },

  async deleteDocument(id: number) {
    return request(`/documents/${id}`, { method: 'DELETE' }, () => mockApi.deleteDocument(id));
  },

  async uploadPhoto(projectId: string, file: File) {
    return request(`/photos/upload?project_id=${encodeURIComponent(projectId)}`, {
      body: (() => {
        const formData = new FormData();
        formData.append('file', file);
        return formData;
      })(),
      method: 'POST',
    }, () => mockApi.uploadPhoto(projectId, file));
  },

  async getPhotos(projectId: string) {
    return request(`/photos/${projectId}`, { method: 'GET' }, () => mockApi.getPhotos(projectId));
  },

  async getSupportRequests() {
    return request('/support', { method: 'GET' }, () => mockApi.getSupportRequests());
  },

  async createSupportRequest(data: any) {
    return request('/support', {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }, () => mockApi.createSupportRequest(data));
  },

  async updateSupportStatus(id: string, status: string) {
    return request(`/support/${id}/status?status=${status}`, {
      method: 'PUT',
    }, () => mockApi.updateSupportStatus(id, status));
  },

  async getEvents() {
    return request('/events', { method: 'GET' }, () => mockApi.getEvents());
  },

  async createEvent(data: any) {
    return request('/events', {
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }, () => mockApi.createEvent(data));
  },

  async deleteEvent(id: number) {
    return request(`/events/${id}`, { method: 'DELETE' }, () => mockApi.deleteEvent(id));
  },
};
