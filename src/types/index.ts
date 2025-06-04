export interface User {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  bio?: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  description: string;
  category: string;
  origin: string;
  imageUrl: string;
  modelImageUrl?: string;
  price: number;
  affiliateLink: string;
  sizes: Size[];
  colors: string[];
}

export interface Size {
  id: string;
  region: string;
  value: string;
  usEquivalent: string;
}

export interface FashionPost {
  id: string;
  userId: string;
  user?: User;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  createdAt: Date;
  items?: ClothingItem[];
}

export interface TryOnSession {
  userId: string;
  itemId: string;
  userPhotoUrl?: string;
  resultImageUrl?: string;
  createdAt: Date;
}

export type ClothingCategory = 
  | 'saree' 
  | 'agbada' 
  | 'hanfu' 
  | 'kimono' 
  | 'kurta' 
  | 'cheongsam'
  | 'kente'
  | 'dirndl'
  | 'other';

export type Region = 
  | 'South Asia' 
  | 'West Africa' 
  | 'East Asia' 
  | 'Southeast Asia' 
  | 'Middle East'
  | 'Europe'
  | 'Latin America'
  | 'Oceania'
  | 'Other';