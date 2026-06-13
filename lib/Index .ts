export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  category: string;
  isNew: boolean;
  color: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  image: string;
  count: number;
  gradient: string;
  emoji: string;
}

export interface Testimonial {
  id: number;
  parentName: string;
  childName: string;
  childAge: number;
  review: string;
  rating: number;
  avatar: string;
  gradient: string;
}