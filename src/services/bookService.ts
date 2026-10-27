import type { Book, Category } from '../types/Book';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 1, name: 'All', slug: 'all' },
  { id: 2, name: 'Romance', slug: 'romance' },
  { id: 3, name: 'Mystery', slug: 'mystery' },
  { id: 4, name: 'Science Fiction', slug: 'science-fiction' },
  { id: 5, name: 'Fantasy', slug: 'fantasy' },
  { id: 6, name: 'Historical', slug: 'historical' },
  { id: 7, name: 'Biography', slug: 'biography' },
  { id: 8, name: 'Self-help', slug: 'self-help' },
  { id: 9, name: 'Memoir', slug: 'memoir' },
  { id: 10, name: 'Travel', slug: 'travel' },
  { id: 11, name: 'Cooking', slug: 'cooking' },
  { id: 12, name: "Children's", slug: 'childrens' },
  { id: 13, name: 'Young Adult', slug: 'young-adult' },
  { id: 14, name: 'Comics & Graphic Novels', slug: 'comics' },
  { id: 15, name: 'Poetry', slug: 'poetry' },
  { id: 16, name: 'Drama', slug: 'drama' },
  { id: 17, name: 'Science', slug: 'science' },
  { id: 18, name: 'Philosophy', slug: 'philosophy' },
  { id: 19, name: 'Religion', slug: 'religion' },
  { id: 20, name: 'Language Learning', slug: 'language-learning' },
];

export const INITIAL_BOOKS: Book[] = [
  // Recommended for You
  {
    id: 1,
    title: 'The Art of Focus',
    author: 'Arjun Patel',
    description: 'Practical guide to mastering focus & boosting productivity every day.',
    format: 'Paperback',
    tags: ['Non-fiction', 'Self Help'],
    price: 399,
    deliveryDate: 'Delivery by Mon, 21 Jul',
    category: 'Self-help',
    section: 'recommended',
    language: 'English',
    stockQuantity: 45,
    coverBgColor: '#f8fafc',
    coverTextColor: '#0f172a',
  },
  {
    id: 2,
    title: 'The Art of Learning',
    author: 'Raj Patel',
    description: 'Master the mindset and methods for effective lifelong learning.',
    format: 'Paperback',
    tags: ['Non-fiction', 'Self Help'],
    price: 259,
    deliveryDate: 'Delivery by Mon, 21 Jul',
    category: 'Self-help',
    section: 'recommended',
    language: 'English',
    stockQuantity: 30,
    coverBgColor: '#e11d48',
    coverTextColor: '#ffffff',
  },
  {
    id: 3,
    title: 'The Path to Success',
    author: 'James Wright',
    description: 'A practical guide to achieving goals with clarity and confidence.',
    format: 'Paperback',
    tags: ['Non-fiction', 'Self Help'],
    price: 359,
    deliveryDate: 'Delivery by Mon, 21 Jul',
    category: 'Self-help',
    section: 'recommended',
    language: 'English',
    stockQuantity: 18,
    coverBgColor: '#0284c7',
    coverTextColor: '#ffffff',
  },

  // Bestsellers this Month
  {
    id: 4,
    title: 'The Midnight Hour',
    author: 'James Adams',
    description: "Haunting tale of a man's journey & the shadows of a forgotten past.",
    format: 'Paperback',
    tags: ['Fiction', 'Thriller', 'Horror'],
    price: 299,
    deliveryDate: 'Delivery by Mon, 21 Jul',
    category: 'Mystery',
    section: 'bestsellers',
    language: 'English',
    stockQuantity: 25,
    coverBgColor: '#0f172a',
    coverTextColor: '#38bdf8',
  },
  {
    id: 5,
    title: 'Beneath the Stars',
    author: 'Jessica Martin',
    description: 'A heartwarming tale, where two souls discover who you need.',
    format: 'Hard Cover',
    tags: ['Fiction', 'Love', 'Drama'],
    price: 499,
    deliveryDate: 'Delivery by Mon, 21 Jul',
    category: 'Romance',
    section: 'bestsellers',
    language: 'English',
    stockQuantity: 12,
    coverBgColor: '#311042',
    coverTextColor: '#f472b6',
  },
  {
    id: 6,
    title: 'The Final Frontier',
    author: 'Laura Mitchell',
    description: 'A mission to space secrets to change humanity forever.',
    format: 'Paperback',
    tags: ['Fiction', 'Thriller'],
    price: 359,
    deliveryDate: 'Delivery by Mon, 21 Jul',
    category: 'Science Fiction',
    section: 'bestsellers',
    language: 'English',
    stockQuantity: 40,
    coverBgColor: '#0b192c',
    coverTextColor: '#f97316',
  },

  // New Launches
  {
    id: 7,
    title: 'Joy of Minimalism',
    author: 'Daniel Reed',
    description: 'Declutter your life to uncover peace, clarity, and joy.',
    format: 'Paperback',
    tags: ['Non-fiction', 'Self Help'],
    price: 149,
    deliveryDate: 'Delivery by Mon, 21 Jul',
    category: 'Self-help',
    section: 'new-launches',
    language: 'English',
    stockQuantity: 60,
    coverBgColor: '#fbbf24',
    coverTextColor: '#1e293b',
  },
  {
    id: 8,
    title: 'The Vanishing House',
    author: 'Clara Nelson',
    description: 'A chilling mystery unfolds within a house that disappears.',
    format: 'eBook',
    tags: ['Fiction', 'Horror'],
    price: 99,
    deliveryDate: 'Delivery by Mon, 21 Jul',
    category: 'Mystery',
    section: 'new-launches',
    language: 'English',
    stockQuantity: 100,
    coverBgColor: '#132a26',
    coverTextColor: '#2dd4bf',
  },
  {
    id: 9,
    title: 'The Lost Kitten',
    author: 'Emily Parker',
    description: 'A heartwarming tale of courage, friendship, and feline adventure.',
    format: 'Hardcover',
    tags: ['Fiction', 'Children'],
    price: 339,
    deliveryDate: 'Delivery by Mon, 21 Jul',
    category: "Children's",
    section: 'new-launches',
    language: 'English',
    stockQuantity: 22,
    coverBgColor: '#f97316',
    coverTextColor: '#ffffff',
  },
];

const API_BASE_URL = '/api';

export const bookService = {
  async getBooks(): Promise<Book[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      
      // Map API product to Book format if backend is running
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          title: item.name || 'Untitled Book',
          author: item.author || 'Author',
          description: item.description || '',
          format: item.format || 'Paperback',
          tags: item.tags || [item.category?.name || 'General'],
          price: Number(item.price) || 299,
          deliveryDate: 'Delivery by Mon, 21 Jul',
          category: item.category?.name || 'All',
          section: item.section || 'recommended',
          language: item.language || 'English',
          stockQuantity: item.stockQuantity || 10,
        }));
      }
      return INITIAL_BOOKS;
    } catch (error) {
      console.warn('Backend API unavailable, falling back to local book data:', error);
      return INITIAL_BOOKS;
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return [{ id: 0, name: 'All', slug: 'all' }, ...data];
      }
      return INITIAL_CATEGORIES;
    } catch (error) {
      return INITIAL_CATEGORIES;
    }
  },
};
