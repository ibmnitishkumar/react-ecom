import React, { useState } from 'react';
import type { Book } from '../types/Book';
import {
  ShoppingCart,
  Bookmark,
  Star,
  ChevronRight,
  ArrowLeft,
  Target,
  Lightbulb,
  Compass,
  Moon,
  Heart,
  Rocket,
  Smile,
  Home,
  Cat,
} from 'lucide-react';

interface BookDetailPageProps {
  book: Book;
  allBooks: Book[];
  onBack: () => void;
  onBookSelect: (book: Book) => void;
  onAddToCart: (book: Book) => void;
}

/* ── Inline cover illustration (same logic as BookCard) ── */
const CoverIllustration: React.FC<{ book: Book; size?: 'sm' | 'lg' }> = ({ book, size = 'lg' }) => {
  const isLg = size === 'lg';

  switch (book.title) {
    case 'The Art of Focus':
      return (
        <div className="w-full h-full bg-[#f4f4f4] text-[#111827] flex flex-col justify-between p-4 select-none text-center rounded-sm">
          <div className="pt-2">
            <span className={`${isLg ? 'text-sm' : 'text-[9px]'} font-black tracking-widest block uppercase`}>THE ART OF</span>
            <span className={`${isLg ? 'text-3xl' : 'text-base'} font-extrabold tracking-tight block`}>FOCUS</span>
          </div>
          <div className="flex justify-center my-auto">
            <div className={`${isLg ? 'w-20 h-20' : 'w-10 h-10'} rounded-full border-4 border-red-500 flex items-center justify-center`}>
              <Target className={`${isLg ? 'w-10 h-10' : 'w-5 h-5'} text-red-500`} />
            </div>
          </div>
          <div className="pb-2">
            <p className={`${isLg ? 'text-[10px]' : 'text-[7px]'} text-gray-500 leading-tight mb-1`}>How to Prioritize Your Life for Maximum Productivity</p>
            <span className={`${isLg ? 'text-xs' : 'text-[9px]'} font-bold tracking-wider uppercase block`}>{book.author}</span>
          </div>
        </div>
      );
    case 'The Art of Learning':
      return (
        <div className="w-full h-full bg-[#dc2626] text-white flex flex-col justify-between p-4 select-none text-center rounded-sm">
          <div className="pt-2">
            <span className={`${isLg ? 'text-sm' : 'text-[9px]'} font-black tracking-widest block uppercase`}>THE ART OF</span>
            <span className={`${isLg ? 'text-2xl' : 'text-base'} font-extrabold tracking-tight block`}>LEARNING</span>
          </div>
          <div className="flex justify-center my-auto">
            <Lightbulb className={`${isLg ? 'w-12 h-12' : 'w-6 h-6'} text-amber-300`} />
          </div>
          <div className="pb-2">
            <span className={`${isLg ? 'text-xs' : 'text-[9px]'} font-bold tracking-wider uppercase block`}>{book.author}</span>
          </div>
        </div>
      );
    case 'The Path to Success':
      return (
        <div className="w-full h-full bg-[#0284c7] text-white flex flex-col justify-between p-4 select-none text-center rounded-sm">
          <div className="pt-2">
            <span className={`${isLg ? 'text-sm' : 'text-[9px]'} font-semibold tracking-wider block`}>THE PATH TO</span>
            <span className={`${isLg ? 'text-2xl' : 'text-base'} font-black tracking-tight block`}>SUCCESS</span>
          </div>
          <div className="flex justify-center my-auto">
            <Compass className={`${isLg ? 'w-12 h-12' : 'w-8 h-8'} text-yellow-300`} />
          </div>
          <div className="pb-2">
            <span className={`${isLg ? 'text-xs' : 'text-[9px]'} font-bold tracking-wider uppercase block`}>{book.author}</span>
          </div>
        </div>
      );
    case 'The Midnight Hour':
      return (
        <div className="w-full h-full bg-[#0c1322] text-[#38bdf8] flex flex-col justify-between p-4 select-none text-center rounded-sm border border-[#1e293b]">
          <div className="pt-1">
            <span className={`${isLg ? 'text-xs' : 'text-[8px]'} text-gray-400 tracking-widest block uppercase`}>A NOVEL</span>
            <span className={`${isLg ? 'text-2xl' : 'text-base'} font-extrabold tracking-tight text-cyan-400 block`}>MIDNIGHT</span>
            <span className={`${isLg ? 'text-base' : 'text-xs'} font-bold tracking-widest text-cyan-300 block`}>HOUR</span>
          </div>
          <div className="flex justify-center my-auto">
            <Moon className={`${isLg ? 'w-12 h-12' : 'w-7 h-7'} text-cyan-400`} />
          </div>
          <div className="pb-2">
            <span className={`${isLg ? 'text-xs' : 'text-[9px]'} font-medium text-gray-300 tracking-wider block`}>{book.author}</span>
          </div>
        </div>
      );
    case 'Beneath the Stars':
      return (
        <div className="w-full h-full bg-[#3b0764] text-pink-200 flex flex-col justify-between p-4 select-none text-center rounded-sm border border-purple-900">
          <div className="pt-2">
            <span className={`${isLg ? 'text-xl' : 'text-sm'} font-serif italic block`}>Beneath</span>
            <span className={`${isLg ? 'text-sm' : 'text-[9px]'} text-pink-300 block`}>the</span>
            <span className={`${isLg ? 'text-xl' : 'text-sm'} font-serif uppercase tracking-widest text-pink-300 block`}>STARS</span>
          </div>
          <div className="flex justify-center my-auto">
            <Heart className={`${isLg ? 'w-12 h-12' : 'w-6 h-6'} text-pink-400 fill-pink-500/30`} />
          </div>
          <div className="pb-2">
            <span className={`${isLg ? 'text-xs' : 'text-[8px]'} tracking-wider uppercase text-purple-300 block`}>{book.author}</span>
          </div>
        </div>
      );
    case 'The Final Frontier':
      return (
        <div className="w-full h-full bg-[#030712] text-white flex flex-col justify-between p-4 select-none text-center rounded-sm border border-[#1f2937]">
          <div className="pt-2">
            <span className={`${isLg ? 'text-sm' : 'text-[9px]'} tracking-wider text-orange-400 block`}>THE FINAL</span>
            <span className={`${isLg ? 'text-2xl' : 'text-xs'} font-black tracking-tight text-orange-400 block`}>FRONTIER</span>
          </div>
          <div className="flex justify-center my-auto">
            <Rocket className={`${isLg ? 'w-12 h-12' : 'w-7 h-7'} text-orange-400`} />
          </div>
          <div className="pb-2">
            <span className={`${isLg ? 'text-xs' : 'text-[8px]'} font-medium text-gray-400 block`}>{book.author}</span>
          </div>
        </div>
      );
    case 'Joy of Minimalism':
      return (
        <div className="w-full h-full bg-[#fbbf24] text-[#1e293b] flex flex-col justify-between p-4 select-none text-center rounded-sm">
          <div className="pt-2">
            <span className={`${isLg ? 'text-sm' : 'text-[10px]'} font-bold tracking-widest block uppercase`}>THE JOY OF</span>
            <span className={`${isLg ? 'text-2xl' : 'text-xs'} font-extrabold tracking-tight block`}>MINIMALISM</span>
          </div>
          <div className="flex justify-center my-auto">
            <Smile className={`${isLg ? 'w-12 h-12' : 'w-7 h-7'} text-amber-900`} />
          </div>
          <div className="pb-2">
            <span className={`${isLg ? 'text-xs' : 'text-[9px]'} font-bold tracking-wider uppercase block`}>{book.author}</span>
          </div>
        </div>
      );
    case 'The Vanishing House':
      return (
        <div className="w-full h-full bg-[#06201b] text-[#2dd4bf] flex flex-col justify-between p-4 select-none text-center rounded-sm border border-emerald-950">
          <div className="pt-2">
            <span className={`${isLg ? 'text-sm' : 'text-[9px]'} text-teal-400 tracking-widest block`}>THE VANISHING</span>
            <span className={`${isLg ? 'text-2xl' : 'text-xs'} font-bold tracking-wide block`}>HOUSE</span>
          </div>
          <div className="flex justify-center my-auto">
            <Home className={`${isLg ? 'w-12 h-12' : 'w-6 h-6'} text-teal-400`} />
          </div>
          <div className="pb-2">
            <span className={`${isLg ? 'text-xs' : 'text-[8px]'} text-teal-300 block`}>{book.author}</span>
          </div>
        </div>
      );
    case 'The Lost Kitten':
      return (
        <div className="w-full h-full bg-[#f97316] text-white flex flex-col justify-between p-4 select-none text-center rounded-sm">
          <div className="pt-2">
            <span className={`${isLg ? 'text-xl' : 'text-xs'} font-serif font-bold block`}>The Lost</span>
            <span className={`${isLg ? 'text-xl' : 'text-xs'} font-serif font-bold block`}>Kitten</span>
          </div>
          <div className="flex justify-center my-auto">
            <Cat className={`${isLg ? 'w-12 h-12' : 'w-7 h-7'} text-amber-100`} />
          </div>
          <div className="pb-2">
            <span className={`${isLg ? 'text-xs' : 'text-[8px]'} tracking-wider block`}>{book.author}</span>
          </div>
        </div>
      );
    default:
      return (
        <div
          className="w-full h-full flex flex-col justify-between p-4 select-none text-center rounded-sm"
          style={{ backgroundColor: book.coverBgColor || '#1e293b', color: book.coverTextColor || '#f8fafc' }}
        >
          <div className="pt-2">
            <span className={`${isLg ? 'text-xl' : 'text-xs'} font-bold tracking-tight block leading-snug`}>{book.title}</span>
          </div>
          <div className="flex justify-center my-auto">
            <Target className={`${isLg ? 'w-10 h-10' : 'w-6 h-6'} opacity-70`} />
          </div>
          <div className="pb-2">
            <span className={`${isLg ? 'text-xs' : 'text-[9px]'} opacity-80 block`}>{book.author}</span>
          </div>
        </div>
      );
  }
};

/* ── Star rating display ── */
const StarRating: React.FC<{ rating: number; max?: number }> = ({ rating, max = 5 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-600 fill-gray-600'}`}
      />
    ))}
  </div>
);

/* ── Interactive star selector ── */
const StarSelector: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <button key={i} type="button" onClick={() => onChange(i + 1)}>
        <Star
          className={`w-5 h-5 transition-colors ${i < value ? 'text-amber-400 fill-amber-400' : 'text-gray-600 fill-gray-600'}`}
        />
      </button>
    ))}
  </div>
);

/* ── Main Detail Page ── */
export const BookDetailPage: React.FC<BookDetailPageProps> = ({
  book,
  allBooks,
  onBack,
  onBookSelect,
  onAddToCart,
}) => {
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  /* Related reads: same category, excluding current book */
  const relatedBooks = allBooks
    .filter((b) => b.id !== book.id && (b.category === book.category || b.tags.some((t) => book.tags.includes(t))))
    .slice(0, 3);

  const handleAddToCart = () => {
    onAddToCart(book);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = () => {
    setAddedToWishlist((prev) => !prev);
  };

  const breadcrumbCategory = book.tags[0] || book.category;

  return (
    <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex flex-col">
      {/* Breadcrumb */}
      <div className="px-8 pt-5 pb-2 flex items-center gap-1.5 text-xs text-gray-400">
        <button onClick={onBack} className="hover:text-blue-400 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-gray-600" />
        <span className="hover:text-blue-400 cursor-pointer transition-colors">{breadcrumbCategory}</span>
        <ChevronRight className="w-3 h-3 text-gray-600" />
        <span className="text-gray-200">{book.title}</span>
      </div>

      {/* Content Row */}
      <div className="flex flex-1 gap-0 px-8 pt-4 pb-10">
        {/* ── Left: Book covers (front + back) ── */}
        <div className="flex gap-3 shrink-0 mr-8">
          {/* Front cover */}
          <div className="w-44 h-64 rounded-md overflow-hidden shadow-xl shadow-black/50">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
            ) : (
              <CoverIllustration book={book} size="lg" />
            )}
          </div>
          {/* Back cover / preview panel */}
          <div
            className="w-44 h-64 rounded-md overflow-hidden shadow-xl shadow-black/50 flex flex-col p-4 text-[10px] leading-relaxed"
            style={{
              backgroundColor: book.coverBgColor || '#1e1e2a',
              color: book.coverTextColor || '#e2e8f0',
            }}
          >
            <p className="italic font-semibold text-[11px] mb-2 leading-snug opacity-90">
              "An {book.title.toLowerCase()} — a path to clarity in a cluttered world."
            </p>
            <p className="opacity-75 text-[9.5px] leading-relaxed line-clamp-6">
              In <em>{book.title}</em>, {book.author} guides you through practical strategies to help you declutter your mind and uncover what truly matters. Whether you're overwhelmed or just over it — this book offers a calm, mindful approach to building a simpler, more fulfilling life.
            </p>
            <div className="mt-auto">
              <p className="text-[8px] opacity-60 font-semibold tracking-wide mt-2">About the Author</p>
              <p className="text-[9px] opacity-60 leading-tight mt-0.5 line-clamp-3">
                {book.author} is a writer and productivity coach. Their work has helped thousands embrace simpler living as a lifestyle for clarity, freedom, and focus.
              </p>
            </div>
          </div>
        </div>

        {/* ── Centre: Book details ── */}
        <div className="flex-1 min-w-0 max-w-xl">
          <h1 className="text-2xl font-bold text-gray-100 leading-tight">{book.title}</h1>
          <p className="text-sm text-gray-400 mt-1">
            by <span className="text-blue-400 hover:underline cursor-pointer">{book.author}</span>
          </p>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">{book.description}</p>

          <p className="text-xs text-gray-500 mt-3">
            Published by:{' '}
            <span className="text-blue-400 hover:underline cursor-pointer">
              {book.category} Publishers
            </span>
          </p>

          <p className="text-xs text-gray-400 mt-3 font-normal">{book.format}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-1">
            {book.tags.map((tag, idx) => (
              <span key={idx} className="text-xs text-blue-400 hover:underline cursor-pointer">
                {tag}{idx < book.tags.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-3xl font-bold text-gray-100">₹{book.price}</span>
            {book.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{book.originalPrice}</span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">{book.deliveryDate}</p>

          {/* Action buttons */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold transition-all ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {addedToCart ? 'Added!' : 'Add to Cart'}
            </button>
            <button
              onClick={handleWishlist}
              className={`flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold border transition-all ${
                addedToWishlist
                  ? 'bg-purple-700 border-purple-600 text-white'
                  : 'bg-[#1a1b23] border-[#2d2f3a] text-gray-300 hover:border-gray-400'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${addedToWishlist ? 'fill-white' : ''}`} />
              {addedToWishlist ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Meta row */}
          <div className="flex items-start gap-8 mt-6 pt-5 border-t border-[#21242d]">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="text-gray-500 text-[11px]">🌐 Language</span>
              </div>
              <span className="text-sm font-medium text-gray-100">{book.language || 'English'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 text-[11px]">☆ Rating</span>
              <StarRating rating={book.rating ?? 4} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 text-[11px]">$ Sells</span>
              <span className="text-sm font-medium text-gray-100">
                {book.stockQuantity ? `${book.stockQuantity * 3} copies sold` : '145 copies sold'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Right: Related Reads ── */}
        {relatedBooks.length > 0 && (
          <aside className="ml-10 w-64 shrink-0">
            <h3 className="text-sm font-semibold text-gray-100 mb-4">Related Reads</h3>
            <div className="flex flex-col gap-5">
              {relatedBooks.map((rb) => (
                <div
                  key={rb.id}
                  className="flex gap-3 cursor-pointer group"
                  onClick={() => onBookSelect(rb)}
                >
                  <div className="w-20 h-28 shrink-0 rounded overflow-hidden shadow-md">
                    {rb.coverImage ? (
                      <img src={rb.coverImage} alt={rb.title} className="w-full h-full object-cover" />
                    ) : (
                      <CoverIllustration book={rb} size="sm" />
                    )}
                  </div>
                  <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-200 group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
                        {rb.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        by <span className="text-blue-400">{rb.author}</span>
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1 leading-snug line-clamp-2">{rb.description}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{rb.format}</p>
                      <div className="flex flex-wrap gap-0.5 mt-0.5">
                        {rb.tags.slice(0, 2).map((t, i) => (
                          <span key={i} className="text-[9px] text-blue-400">
                            {t}{i < Math.min(rb.tags.length, 2) - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-100">₹{rb.price}</span>
                      <p className="text-[9px] text-gray-500 mt-0.5">{rb.deliveryDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* ── About the Writer ── */}
      <section className="px-8 pb-8 border-t border-[#21242d] pt-8">
        <h2 className="text-base font-semibold text-gray-100 mb-5">About the writer</h2>
        <div className="flex gap-5 max-w-4xl">
          {/* Realistic avatar using SVG portrait illustration */}
          <div className="w-20 h-20 rounded-full shrink-0 overflow-hidden border-2 border-[#2d2f3a]">
            <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Background */}
              <rect width="80" height="80" fill="#3b3f4a"/>
              {/* Torso / shirt */}
              <ellipse cx="40" cy="90" rx="28" ry="22" fill="#2563eb"/>
              {/* Neck */}
              <rect x="35" y="52" width="10" height="10" rx="3" fill="#c8a882"/>
              {/* Head */}
              <ellipse cx="40" cy="44" rx="17" ry="19" fill="#c8a882"/>
              {/* Hair */}
              <ellipse cx="40" cy="27" rx="17" ry="10" fill="#3b2a1a"/>
              <rect x="23" y="27" width="34" height="8" fill="#3b2a1a"/>
              {/* Ears */}
              <ellipse cx="23" cy="44" rx="3.5" ry="4.5" fill="#c8a882"/>
              <ellipse cx="57" cy="44" rx="3.5" ry="4.5" fill="#c8a882"/>
              {/* Eyes */}
              <ellipse cx="33" cy="43" rx="3.5" ry="3" fill="white"/>
              <ellipse cx="47" cy="43" rx="3.5" ry="3" fill="white"/>
              <circle cx="33.8" cy="43.5" r="2" fill="#3b2a1a"/>
              <circle cx="47.8" cy="43.5" r="2" fill="#3b2a1a"/>
              <circle cx="34.4" cy="42.8" r="0.6" fill="white"/>
              <circle cx="48.4" cy="42.8" r="0.6" fill="white"/>
              {/* Eyebrows */}
              <path d="M29.5 39 Q33 37.5 36.5 39" stroke="#3b2a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M43.5 39 Q47 37.5 50.5 39" stroke="#3b2a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              {/* Nose */}
              <path d="M38.5 46 Q40 49 41.5 46" stroke="#b8946a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              {/* Mouth / smile */}
              <path d="M35 52 Q40 56 45 52" stroke="#a0522d" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              {/* Glasses */}
              <rect x="28" y="40.5" width="9" height="6" rx="2.5" stroke="#444" strokeWidth="1.2" fill="none"/>
              <rect x="43" y="40.5" width="9" height="6" rx="2.5" stroke="#444" strokeWidth="1.2" fill="none"/>
              <line x1="37" y1="43.5" x2="43" y2="43.5" stroke="#444" strokeWidth="1.2"/>
              <line x1="24.5" y1="43.5" x2="28" y2="43.5" stroke="#444" strokeWidth="1.2"/>
              <line x1="52" y1="43.5" x2="55.5" y2="43.5" stroke="#444" strokeWidth="1.2"/>
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-100">{book.author}</h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              {book.author} is a writer, minimalist, and productivity coach based in San Francisco. With a passion
              for intentional living, {book.author.split(' ')[0]} has dedicated their career to helping individuals
              simplify their lives — one habit, one space, and one thought at a time.
            </p>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              They are the author of <em className="text-gray-300">{book.title}</em>, an acclaimed guide to
              decluttering both physically and mentally. Other works include <em className="text-gray-300">Less, But
              Better</em> and <em className="text-gray-300">The Focus Reset</em>, which have helped thousands rethink
              consumerism, prioritize what truly matters, and build sustainable systems for personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="px-8 pb-12 border-t border-[#21242d] pt-8">
        <h2 className="text-base font-semibold text-gray-100 mb-5">Reviews</h2>
        <div className="flex gap-10 max-w-4xl flex-wrap items-start">

          {/* Left: Review submission form */}
          <div className="w-72 shrink-0">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Leave Your Review</span>
              <span className="text-[10px] text-gray-600">{reviewText.length}/100</span>
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value.slice(0, 100))}
              placeholder="Placeholder text"
              className="w-full h-32 bg-[#111217] border border-[#21242d] rounded p-3 text-xs text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-blue-500 transition-colors"
            />
            {/* Stars row + Submit button below the textarea */}
            <div className="flex items-center justify-between mt-3">
              <StarSelector value={reviewRating} onChange={setReviewRating} />
              <button
                onClick={() => { setReviewText(''); setReviewRating(0); }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-5 py-2 rounded transition-colors"
              >
                Submit →
              </button>
            </div>
          </div>

          {/* Right: Existing review */}
          <div className="flex-1 min-w-0 pt-1">
            <h4 className="text-sm font-semibold text-gray-100">John Smith</h4>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              The accordion component delivers large amounts of content in a small space through progressive
              disclosure. The user gets key details about the underlying content and can choose to expand that
              content within the constraints of the accordion.
            </p>
            <div className="mt-3">
              <StarRating rating={4} />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
