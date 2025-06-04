import { create } from 'zustand';
import type { ClothingItem, FashionPost, User, TryOnSession } from '../types';
import { mockClothingItems } from '../data/mockData';

interface GlobalStore {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  
  // Clothing items
  clothingItems: ClothingItem[];
  selectedItem: ClothingItem | null;
  filterItems: (category: string, region: string) => void;
  selectItem: (id: string) => void;
  
  // Try-on session
  tryOnSessions: TryOnSession[];
  currentSession: TryOnSession | null;
  startTryOnSession: (userId: string, itemId: string) => void;
  saveTryOnResult: (resultImageUrl: string) => void;
  
  // Community posts
  fashionPosts: FashionPost[];
  addFashionPost: (post: Omit<FashionPost, 'id' | 'createdAt' | 'likes'>) => void;
  likePost: (id: string) => void;
  
  // Favorites
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
}

export const useStore = create<GlobalStore>((set, get) => ({
  // User state
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  
  // Clothing items
  clothingItems: mockClothingItems,
  selectedItem: null,
  filterItems: (category, region) => {
    const allItems = mockClothingItems;
    const filtered = allItems.filter(item => 
      (category ? item.category === category : true) && 
      (region ? item.origin === region : true)
    );
    set({ clothingItems: filtered });
  },
  selectItem: (id) => {
    const item = get().clothingItems.find(item => item.id === id) || null;
    set({ selectedItem: item });
  },
  
  // Try-on session
  tryOnSessions: [],
  currentSession: null,
  startTryOnSession: (userId, itemId) => {
    const newSession = {
      userId,
      itemId,
      createdAt: new Date()
    };
    set({ 
      currentSession: newSession,
      tryOnSessions: [newSession, ...get().tryOnSessions]
    });
  },
  saveTryOnResult: (resultImageUrl) => {
    if (!get().currentSession) return;
    
    const updatedSession = {
      ...get().currentSession,
      resultImageUrl
    };
    
    set({ 
      currentSession: updatedSession,
      tryOnSessions: get().tryOnSessions.map(session => 
        session === get().currentSession ? updatedSession : session
      )
    });
  },
  
  // Community posts
  fashionPosts: [],
  addFashionPost: (postData) => {
    const newPost = {
      ...postData,
      id: `post-${Date.now()}`,
      createdAt: new Date(),
      likes: 0
    };
    
    set({ fashionPosts: [newPost, ...get().fashionPosts] });
  },
  likePost: (id) => {
    set({
      fashionPosts: get().fashionPosts.map(post =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    });
  },
  
  // Favorites
  favorites: [],
  toggleFavorite: (itemId) => {
    const favorites = get().favorites;
    if (favorites.includes(itemId)) {
      set({ favorites: favorites.filter(id => id !== itemId) });
    } else {
      set({ favorites: [...favorites, itemId] });
    }
  }
}));