import { CategoryName } from './category';

export interface Review {
  id: number;
  comment?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  restaurantId: number;
  userId: number;
  images?: string[];
  createdAt: string;
}

export interface Restaurant {
  id: number;
  userId: number;
  name: string;
  cityId: number;
  city: string;
  address?: string;
  phone?: string;
  averageRating: number;
  imageUrl?: string;
  logoUrl?: string;
  description?: string;
  openingHours?: string;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryName[];
  reviews: Review[];
}

export interface RegisterRestaurant {
  [key: string]: string | File | string[] | number | null | number[];
  name: string;
  cityId: number;
  userId: number;
  description: string;
  category: number[];
  address: string;
  phone: string;
  openingHours: string;
  imageUrl: File | null;
  logoUrl: File | null;
}
