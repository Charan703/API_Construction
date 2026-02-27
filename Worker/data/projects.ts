export interface Project {
    id: string;
    name: string;
    location: string;
    progress: number;
    status: 'Foundation' | 'Framing' | 'Finishing' | 'Planning';
    health: 'On Track' | 'Delayed' | 'Critical';
    dueDate?: string;
    due_date?: string;
    image: string;
    supervisor: string;
    crewSize?: number;
    crew_size?: number;
    nextMilestone?: string;
    next_milestone?: string;
    sitePhotos?: string[];
  }
  
  export const SHARED_PROJECTS: Project[] = [
    {
      id: '1',
      name: 'Skyline Residences',
      location: 'Downtown District, Chicago',
      progress: 72,
      status: 'Framing',
      health: 'On Track',
      dueDate: '2026-08-15',
      supervisor: 'Mike Conners (Foreman)',
      crewSize: 24,
      nextMilestone: 'Roof Deck Completion',
      image: 'https://images.unsplash.com/photo-1762889597634-264f0907820b?w=800&h=400&fit=crop',
      sitePhotos: [
        'https://images.unsplash.com/photo-1541913057-259c47ba6341?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1503387762-592dea58ef23?w=400&h=400&fit=crop'
      ]
    },
    {
      id: '2',
      name: 'Green Valley Office Hub',
      location: 'North Sector, Evanston',
      progress: 35,
      status: 'Foundation',
      health: 'Delayed',
      dueDate: '2027-01-10',
      supervisor: 'Sarah Jenkins',
      crewSize: 18,
      nextMilestone: 'Plumbing Rough-in',
      image: 'https://images.unsplash.com/photo-1765378025255-5c2ff04563f4?w=800&h=400&fit=crop',
      sitePhotos: []
    },
    {
      id: '3',
      name: 'The Harbor Lofts',
      location: 'Waterfront Zone, Chicago',
      progress: 95,
      status: 'Finishing',
      health: 'On Track',
      dueDate: '2026-03-20',
      supervisor: 'David Chen',
      crewSize: 12,
      nextMilestone: 'Interior Paint',
      image: 'https://images.unsplash.com/photo-1612725118809-0bebfb71a551?w=800&h=400&fit=crop',
      sitePhotos: [
        'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=400&h=400&fit=crop'
      ]
    },
    {
      id: '4',
      name: 'South Loop Plaza',
      location: 'South Loop, Chicago',
      progress: 5,
      status: 'Planning',
      health: 'On Track',
      dueDate: '2027-06-12',
      supervisor: 'Mike Conners (Foreman)',
      crewSize: 8,
      nextMilestone: 'Site Excavation',
      image: 'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?w=800&h=400&fit=crop',
      sitePhotos: []
    }
  ];
  