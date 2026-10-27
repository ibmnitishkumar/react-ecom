import React from 'react';
import type { Book } from '../types/Book';
import { BookCard } from './BookCard';

interface BookSectionProps {
  title: string;
  books: Book[];
  onAddToCart?: (book: Book) => void;
  onBookClick?: (book: Book) => void;
}

export const BookSection: React.FC<BookSectionProps> = ({
  title,
  books,
  onAddToCart,
  onBookClick,
}) => {
  if (books.length === 0) {
    return null;
  }

  return (
    <section className="mb-10">
      <h2 className="text-base font-medium text-gray-100 mb-4 tracking-tight">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onAddToCart={onAddToCart} onBookClick={onBookClick} />
        ))}
      </div>
    </section>
  );
};
