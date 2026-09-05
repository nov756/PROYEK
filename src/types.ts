export interface Freelancer {
  id: string;
  name: string;
  degree: string;
  avatarUrl?: string;
  specialties: string[];
  tools: string[];
  rating: number;
  reviewCount: number;
  completedProjects: number;
  pricePerProject: number;
  priceDisplay: string;
  bio: string;
  turnaroundTime: string;
  verified: boolean;
  online: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recommendedTools?: string[];
}

export interface Order {
  id: string;
  freelancerId: string;
  freelancerName: string;
  freelancerPrice: number;
  clientName: string;
  clientEmail: string;
  clientWhatsapp: string;
  researchTitle: string;
  researchField: string;
  software: string;
  notes: string;
  deadlineDays: number;
  hasDataset: boolean;
  datasetName?: string;
  status: 'Menunggu Konfirmasi' | 'Sedang Dikerjakan' | 'Revisi / Evaluasi' | 'Selesai';
  createdAt: string;
  totalPrice: number;
  adminFee?: number;
  freelancerNet?: number;
}

export interface ServicePackage {
  id: string;
  name: string;
  tools: string;
  description: string;
  turnaround: string;
  startingPrice: number;
  popular?: boolean;
  deliverables: string[];
}

export type ActivePage = 'home' | 'portfolio' | 'order';
