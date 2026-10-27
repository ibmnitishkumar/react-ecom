import React from 'react';
import type { Book } from '../types/Book';
import { Target, Lightbulb, Compass, Moon, Heart, Rocket, Smile, Home, Cat } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
  onBookClick?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart, onBookClick }) => {
  // Render an authentic cover based on title if no coverImage URL is provided
  const renderCoverIllustration = () => {
    switch (book.title) {
      case 'The Art of Focus':
        return (
          <div className="w-full h-full bg-[#f4f4f4] text-[#111827] flex flex-col justify-between p-3 select-none text-center rounded-sm">
            <div className="pt-2">
              <span className="text-[11px] font-black tracking-widest block uppercase">THE ART OF</span>
              <span className="text-xl font-extrabold tracking-tight block">FOCUS</span>
            </div>
            <div className="flex justify-center my-auto">
              <div className="w-12 h-12 rounded-full border-4 border-red-500 flex items-center justify-center">
                <Target className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <div className="pb-1">
              <p className="text-[7px] text-gray-500 leading-tight mb-1">How to Prioritize Your Life for Maximum Productivity</p>
              <span className="text-[9px] font-bold tracking-wider uppercase block">{book.author}</span>
            </div>
          </div>
        );

      case 'The Art of Learning':
        return (
          <div className="w-full h-full bg-[#dc2626] text-white flex flex-col justify-between p-3 select-none text-center rounded-sm">
            <div className="pt-2">
              <span className="text-[11px] font-black tracking-widest block uppercase">THE ART</span>
              <span className="text-[9px] font-semibold tracking-wider block">OF</span>
              <span className="text-base font-extrabold tracking-tight block">LEARNING</span>
            </div>
            <div className="flex justify-center my-auto">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center border border-amber-300/40">
                <Lightbulb className="w-5 h-5 text-amber-300" />
              </div>
            </div>
            <div className="pb-1">
              <span className="text-[9px] font-bold tracking-wider uppercase block">{book.author}</span>
            </div>
          </div>
        );

      case 'The Path to Success':
        return (
          <div className="w-full h-full bg-[#0284c7] text-white flex flex-col justify-between p-3 select-none text-center rounded-sm">
            <div className="pt-2">
              <span className="text-[10px] font-semibold tracking-wider block">THE PATH TO</span>
              <span className="text-base font-black tracking-tight block">SUCCESS</span>
            </div>
            <div className="flex justify-center my-auto">
              <Compass className="w-8 h-8 text-yellow-300 animate-pulse" />
            </div>
            <div className="pb-1">
              <span className="text-[9px] font-bold tracking-wider uppercase block">{book.author}</span>
            </div>
          </div>
        );

      case 'The Midnight Hour':
        return (
          <div className="w-full h-full bg-[#0c1322] text-[#38bdf8] flex flex-col justify-between p-3 select-none text-center rounded-sm border border-[#1e293b]">
            <div className="pt-1">
              <span className="text-[8px] text-gray-400 tracking-widest block uppercase">A NOVEL</span>
              <span className="text-[10px] text-gray-300 font-bold tracking-widest block">THE</span>
              <span className="text-base font-extrabold tracking-tight text-cyan-400 block">MIDNIGHT</span>
              <span className="text-xs font-bold tracking-widest text-cyan-300 block">HOUR</span>
            </div>
            <div className="flex justify-center my-auto">
              <Moon className="w-7 h-7 text-cyan-400" />
            </div>
            <div className="pb-1">
              <span className="text-[9px] font-medium text-gray-300 tracking-wider block">{book.author}</span>
            </div>
          </div>
        );

      case 'Beneath the Stars':
        return (
          <div className="w-full h-full bg-[#3b0764] text-pink-200 flex flex-col justify-between p-3 select-none text-center rounded-sm border border-purple-900">
            <div className="pt-2">
              <span className="text-sm font-serif italic block">Beneath</span>
              <span className="text-[9px] text-pink-300 block">the</span>
              <span className="text-sm font-serif uppercase tracking-widest text-pink-300 block">STARS</span>
            </div>
            <div className="flex justify-center my-auto">
              <Heart className="w-6 h-6 text-pink-400 fill-pink-500/30" />
            </div>
            <div className="pb-1">
              <span className="text-[8px] tracking-wider uppercase text-purple-300 block">{book.author}</span>
            </div>
          </div>
        );

      case 'The Final Frontier':
        return (
          <div className="w-full h-full bg-[#030712] text-white flex flex-col justify-between p-3 select-none text-center rounded-sm border border-[#1f2937]">
            <div className="pt-2">
              <span className="text-[9px] tracking-wider text-orange-400 block">THE</span>
              <span className="text-xs font-black tracking-tight text-orange-400 block">FINAL</span>
              <span className="text-xs font-black tracking-tight text-orange-300 block">FRONTIER</span>
            </div>
            <div className="flex justify-center my-auto">
              <Rocket className="w-7 h-7 text-orange-400" />
            </div>
            <div className="pb-1">
              <span className="text-[8px] font-medium text-gray-400 block">{book.author}</span>
            </div>
          </div>
        );

      case 'Joy of Minimalism':
        return (
          <div className="w-full h-full bg-[#fbbf24] text-[#1e293b] flex flex-col justify-between p-3 select-none text-center rounded-sm">
            <div className="pt-2">
              <span className="text-[10px] font-bold tracking-widest block uppercase">THE JOY OF</span>
              <span className="text-xs font-extrabold tracking-tight block">MINIMALISM</span>
            </div>
            <div className="flex justify-center my-auto">
              <Smile className="w-7 h-7 text-amber-900" />
            </div>
            <div className="pb-1">
              <span className="text-[9px] font-bold tracking-wider uppercase block">{book.author}</span>
            </div>
          </div>
        );

      case 'The Vanishing House':
        return (
          <div className="w-full h-full bg-[#06201b] text-[#2dd4bf] flex flex-col justify-between p-3 select-none text-center rounded-sm border border-emerald-950">
            <div className="pt-2">
              <span className="text-[9px] text-teal-400 tracking-widest block">THE</span>
              <span className="text-xs font-bold tracking-wide block">VANISHING</span>
              <span className="text-xs font-bold tracking-wide block">HOUSE</span>
            </div>
            <div className="flex justify-center my-auto">
              <Home className="w-6 h-6 text-teal-400" />
            </div>
            <div className="pb-1">
              <span className="text-[8px] text-teal-300 block">{book.author}</span>
            </div>
          </div>
        );

      case 'The Lost Kitten':
        return (
          <div className="w-full h-full bg-[#f97316] text-white flex flex-col justify-between p-3 select-none text-center rounded-sm">
            <div className="pt-2">
              <span className="text-xs font-serif font-bold block">The Lost</span>
              <span className="text-xs font-serif font-bold block">Kitten</span>
            </div>
            <div className="flex justify-center my-auto">
              <Cat className="w-7 h-7 text-amber-100" />
            </div>
            <div className="pb-1">
              <span className="text-[8px] tracking-wider block">{book.author}</span>
            </div>
          </div>
        );

      default:
        return (
          <div
            className="w-full h-full flex flex-col justify-between p-3 select-none text-center rounded-sm"
            style={{
              backgroundColor: book.coverBgColor || '#1e293b',
              color: book.coverTextColor || '#f8fafc',
            }}
          >
            <div className="pt-2">
              <span className="text-xs font-bold tracking-tight block leading-snug line-clamp-2">
                {book.title}
              </span>
            </div>
            <div className="flex justify-center my-auto">
              <Target className="w-6 h-6 opacity-70" />
            </div>
            <div className="pb-1">
              <span className="text-[9px] opacity-80 block truncate">{book.author}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="flex flex-row items-start space-x-3.5 group cursor-pointer"
      onClick={() => onBookClick ? onBookClick(book) : onAddToCart && onAddToCart(book)}
    >
      {/* Book Cover Image / Styled Thumbnail */}
      <div className="w-28 h-40 shrink-0 rounded shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-102">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          renderCoverIllustration()
        )}
      </div>

      {/* Book Metadata & Info */}
      <div className="flex flex-col justify-between min-h-40 flex-1 py-0.5">
        <div>
          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-100 leading-tight group-hover:text-blue-400 transition-colors line-clamp-1">
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-[11px] text-gray-400 mt-0.5">
            by <span className="text-blue-400 hover:underline cursor-pointer">{book.author}</span>
          </p>

          {/* Description */}
          <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {book.description}
          </p>

          {/* Format */}
          <p className="text-[10px] text-gray-400 mt-1.5 font-normal">
            {book.format}
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-1 mt-0.5">
            {book.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] text-blue-400 hover:underline cursor-pointer"
              >
                {tag}{idx < book.tags.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Delivery Details */}
        <div className="mt-2 pt-1">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-sm font-bold text-gray-100">
              ₹{book.price}
            </span>
            {book.originalPrice && (
              <span className="text-[10px] text-gray-500 line-through">
                ₹{book.originalPrice}
              </span>
            )}
          </div>
          <p className="text-[10px] text-gray-400 leading-tight mt-0.5">
            {book.deliveryDate}
          </p>
        </div>
      </div>
    </div>
  );
};
