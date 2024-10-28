import { CategoryName } from './category';
import { City } from './city';

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
  city: City;
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
