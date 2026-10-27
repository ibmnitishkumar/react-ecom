export interface Book {
  id: number | string;
  title: string;
  author: string;
  description: string;
  format: 'Paperback' | 'Hardcover' | 'Hard Cover' | 'eBook' | 'Audiobook' | string;
  tags: string[];
  price: number;
  originalPrice?: number;
  deliveryDate: string;
  coverImage?: string;
  coverBgColor?: string;
  coverTextColor?: string;
  category: string;
  section?: 'recommended' | 'bestsellers' | 'new-launches' | string;
  rating?: number;
  language?: string;
  stockQuantity?: number;
}

export interface Category {
  id: number | string;
  name: string;
  slug: string;
  count?: number;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  language: string;
  format: string;
  priceRange: string;
  sortBy: string;
  allCategoryClicked: boolean;
}
