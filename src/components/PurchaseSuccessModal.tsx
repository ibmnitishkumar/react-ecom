import React from 'react';
import { LayoutGrid } from 'lucide-react';
import type { CartItem } from './CartDrawer';
import type { Book } from '../types/Book';
import {
  Target, Lightbulb, Compass, Moon, Heart, Rocket, Smile, Home, Cat,
} from 'lucide-react';

/* ─────────────────────────────────────────
   Shared illustrated background SVG
   (same scene used in PaymentModal)
───────────────────────────────────────── */
export const BooksBg: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg
      viewBox="0 0 1200 750"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="bgGrad2" cx="30%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#1d4e7a"/>
          <stop offset="100%" stopColor="#0d1f35"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="750" fill="url(#bgGrad2)"/>

      {/* Blobs */}
      <ellipse cx="980" cy="120" rx="220" ry="160" fill="#0f6b7a" opacity="0.55"/>
      <ellipse cx="80"  cy="280" rx="180" ry="260" fill="#0a4a5e" opacity="0.45"/>

      {/* Diamonds / dots */}
      <rect x="540" y="90"  width="14" height="14" rx="2" fill="#c8832a" transform="rotate(45 547 97)"/>
      <rect x="770" y="200" width="10" height="10" rx="1" fill="#c8832a" transform="rotate(45 775 205)"/>
      <rect x="310" y="480" width="12" height="12" rx="2" fill="#c8832a" transform="rotate(45 316 486)"/>
      <rect x="900" y="430" width="14" height="14" rx="2" fill="#c8832a" transform="rotate(45 907 437)"/>
      <rect x="1060" y="330" width="10" height="10" rx="1" fill="#c8832a" transform="rotate(45 1065 335)"/>
      <rect x="420" y="155" width="10" height="10" rx="1" fill="#c8832a" transform="rotate(45 425 160)"/>
      <circle cx="690"  cy="140" r="5"  fill="#e8a42a" opacity="0.7"/>
      <circle cx="1080" cy="220" r="18" fill="#c8631a" opacity="0.75"/>
      <circle cx="870"  cy="350" r="8"  fill="#e8a42a" opacity="0.5"/>

      {/* Curvy lines */}
      <path d="M0 420 Q200 360 400 410 Q600 460 800 390 Q1000 320 1200 380"
            stroke="#c8831a" strokeWidth="2.5" fill="none" opacity="0.35" strokeLinecap="round"/>
      <path d="M0 480 Q300 430 550 470 Q750 510 1000 450 Q1100 430 1200 445"
            stroke="#b07020" strokeWidth="1.5" fill="none" opacity="0.25" strokeLinecap="round"/>

      {/* Top-left floating orange hardcover */}
      <g transform="translate(160,60) rotate(-15)">
        <rect x="0" y="30" width="180" height="220" rx="4" fill="#e8d5a0"/>
        <rect x="4" y="34" width="172" height="212" rx="2" fill="#f0e0b0"/>
        <rect x="-8" y="20" width="180" height="225" rx="6" fill="#c8631a"/>
        <rect x="-4" y="24" width="172" height="217" rx="4" fill="#d97020"/>
        <rect x="-8" y="20" width="22"  height="225" rx="4" fill="#b05010"/>
        <rect x="20" y="70" width="120" height="80"  rx="3" fill="#b84010" opacity="0.7"/>
        <line x1="20" y1="170" x2="140" y2="170" stroke="#e89050" strokeWidth="1.5" opacity="0.5"/>
        <line x1="20" y1="182" x2="130" y2="182" stroke="#e89050" strokeWidth="1.2" opacity="0.4"/>
        <line x1="20" y1="194" x2="120" y2="194" stroke="#e89050" strokeWidth="1"   opacity="0.3"/>
      </g>

      {/* Top-right teal spine */}
      <g transform="translate(950,40) rotate(8)">
        <rect x="0" y="0" width="90" height="280" rx="5" fill="#0f7080"/>
        <rect x="6" y="6" width="78" height="268" rx="3" fill="#1a8090"/>
        <rect x="0" y="0" width="18" height="280" rx="4" fill="#0a5060"/>
        <line x1="24" y1="60" x2="82" y2="60" stroke="#60c0d0" strokeWidth="1.2" opacity="0.4"/>
        <line x1="24" y1="74" x2="82" y2="74" stroke="#60c0d0" strokeWidth="1.2" opacity="0.3"/>
        <line x1="24" y1="88" x2="78" y2="88" stroke="#60c0d0" strokeWidth="1"   opacity="0.25"/>
      </g>

      {/* Bottom-left stacked books */}
      <g transform="translate(80,580) rotate(-3)">
        <rect x="0" y="0" width="210" height="55" rx="4" fill="#1a5c8a"/>
        <rect x="0" y="0" width="20"  height="55" rx="3" fill="#0f3a5a"/>
        <line x1="28" y1="15" x2="200" y2="15" stroke="#60a0d0" strokeWidth="1" opacity="0.4"/>
        <line x1="28" y1="25" x2="190" y2="25" stroke="#60a0d0" strokeWidth="1" opacity="0.3"/>
      </g>
      <g transform="translate(70,528) rotate(-3)">
        <rect x="0" y="0" width="220" height="60" rx="4" fill="#c8922a"/>
        <rect x="0" y="0" width="22"  height="60" rx="3" fill="#a07018"/>
        <line x1="30" y1="18" x2="210" y2="18" stroke="#f0c060" strokeWidth="1" opacity="0.4"/>
        <line x1="30" y1="30" x2="200" y2="30" stroke="#f0c060" strokeWidth="1" opacity="0.3"/>
      </g>
      <g transform="translate(75,476) rotate(-3)">
        <rect x="0" y="0" width="215" height="58" rx="4" fill="#8a2010"/>
        <rect x="0" y="0" width="21"  height="58" rx="3" fill="#601008"/>
        <line x1="29" y1="16" x2="205" y2="16" stroke="#e06040" strokeWidth="1" opacity="0.4"/>
        <line x1="29" y1="28" x2="195" y2="28" stroke="#e06040" strokeWidth="1" opacity="0.3"/>
      </g>

      {/* Bottom-right open book */}
      <g transform="translate(640,580) rotate(10)">
        <path d="M0 20 Q80 0 160 15 L160 140 Q80 155 0 140 Z"   fill="#e8d5a0"/>
        <path d="M10 35 Q80 18 150 30"  stroke="#c0a060" strokeWidth="1"   opacity="0.5"/>
        <path d="M10 50 Q80 34 150 45"  stroke="#c0a060" strokeWidth="0.9" opacity="0.4"/>
        <path d="M10 65 Q80 50 145 60"  stroke="#c0a060" strokeWidth="0.8" opacity="0.35"/>
        <path d="M10 80 Q80 65 140 75"  stroke="#c0a060" strokeWidth="0.7" opacity="0.3"/>
        <path d="M160 15 Q240 0 320 20 L320 140 Q240 155 160 140 Z" fill="#f0e2b5"/>
        <path d="M170 30 Q240 18 310 35" stroke="#c0a060" strokeWidth="1"   opacity="0.5"/>
        <path d="M170 45 Q240 34 310 50" stroke="#c0a060" strokeWidth="0.9" opacity="0.4"/>
        <path d="M170 60 Q240 50 310 65" stroke="#c0a060" strokeWidth="0.8" opacity="0.35"/>
        <path d="M170 75 Q240 65 305 80" stroke="#c0a060" strokeWidth="0.7" opacity="0.3"/>
        <line x1="160" y1="15" x2="160" y2="140" stroke="#a08040" strokeWidth="3" opacity="0.6"/>
      </g>
    </svg>
  </div>
);

/* ─────────────────────────────────────────
   Mini cover thumb (same palette as BookCard)
───────────────────────────────────────── */
const CoverThumb: React.FC<{ book: Book }> = ({ book }) => {
  const base = 'w-full h-full flex flex-col justify-between p-2 select-none text-center rounded-sm';
  switch (book.title) {
    case 'The Art of Focus':
      return (
        <div className={`${base} bg-[#f4f4f4] text-[#111827]`}>
          <span className="text-[7px] font-black tracking-widest block uppercase">THE ART OF</span>
          <div className="flex justify-center my-auto">
            <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center">
              <Target className="w-4 h-4 text-red-500" />
            </div>
          </div>
          <span className="text-[7px] font-bold tracking-wider uppercase block">{book.author}</span>
        </div>
      );
    case 'The Art of Learning':
      return (
        <div className={`${base} bg-[#dc2626] text-white`}>
          <span className="text-[7px] font-black tracking-widest block uppercase">THE ART OF</span>
          <Lightbulb className="w-5 h-5 text-amber-300 mx-auto my-auto" />
          <span className="text-[7px] font-bold block">{book.author}</span>
        </div>
      );
    case 'The Path to Success':
      return (
        <div className={`${base} bg-[#0284c7] text-white`}>
          <span className="text-[7px] font-semibold block">THE PATH TO SUCCESS</span>
          <Compass className="w-5 h-5 text-yellow-300 mx-auto my-auto" />
          <span className="text-[7px] font-bold block">{book.author}</span>
        </div>
      );
    case 'The Midnight Hour':
      return (
        <div className={`${base} bg-[#0c1322] text-cyan-400 border border-[#1e293b]`}>
          <span className="text-[7px] font-extrabold block">MIDNIGHT HOUR</span>
          <Moon className="w-5 h-5 text-cyan-400 mx-auto my-auto" />
          <span className="text-[7px] text-gray-400 block">{book.author}</span>
        </div>
      );
    case 'Beneath the Stars':
      return (
        <div className={`${base} bg-[#3b0764] text-pink-200 border border-purple-900`}>
          <span className="text-[7px] italic font-serif block">Beneath the Stars</span>
          <Heart className="w-5 h-5 text-pink-400 fill-pink-500/30 mx-auto my-auto" />
          <span className="text-[7px] text-purple-300 block">{book.author}</span>
        </div>
      );
    case 'The Final Frontier':
      return (
        <div className={`${base} bg-[#030712] text-white border border-[#1f2937]`}>
          <span className="text-[7px] text-orange-400 font-black block">FINAL FRONTIER</span>
          <Rocket className="w-5 h-5 text-orange-400 mx-auto my-auto" />
          <span className="text-[7px] text-gray-400 block">{book.author}</span>
        </div>
      );
    case 'Joy of Minimalism':
      return (
        <div className={`${base} bg-[#fbbf24] text-[#1e293b]`}>
          <span className="text-[7px] font-bold block uppercase">JOY OF MINIMALISM</span>
          <Smile className="w-5 h-5 text-amber-900 mx-auto my-auto" />
          <span className="text-[7px] font-bold block">{book.author}</span>
        </div>
      );
    case 'The Vanishing House':
      return (
        <div className={`${base} bg-[#06201b] text-[#2dd4bf] border border-emerald-950`}>
          <span className="text-[7px] font-bold block">VANISHING HOUSE</span>
          <Home className="w-5 h-5 text-teal-400 mx-auto my-auto" />
          <span className="text-[7px] text-teal-300 block">{book.author}</span>
        </div>
      );
    case 'The Lost Kitten':
      return (
        <div className={`${base} bg-[#f97316] text-white`}>
          <span className="text-[7px] font-serif font-bold block">The Lost Kitten</span>
          <Cat className="w-5 h-5 text-amber-100 mx-auto my-auto" />
          <span className="text-[7px] block">{book.author}</span>
        </div>
      );
    default:
      return (
        <div
          className={base}
          style={{ backgroundColor: book.coverBgColor || '#1e293b', color: book.coverTextColor || '#f8fafc' }}
        >
          <span className="text-[7px] font-bold block line-clamp-2">{book.title}</span>
          <Target className="w-4 h-4 opacity-60 mx-auto my-auto" />
          <span className="text-[7px] opacity-70 block">{book.author}</span>
        </div>
      );
  }
};

/* ─────────────────────────────────────────
   Single purchased book card
───────────────────────────────────────── */
const PurchasedBookCard: React.FC<{ item: CartItem }> = ({ item }) => {
  const { book, quantity } = item;
  return (
    <div className="flex gap-3 min-w-0">
      {/* Cover */}
      <div className="w-28 h-40 shrink-0 rounded overflow-hidden shadow-lg shadow-black/40">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <CoverThumb book={book} />
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col justify-between py-0.5 min-w-0">
        <div>
          <h3 className="text-sm font-semibold text-gray-100 leading-snug line-clamp-2">
            {book.title}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            by <span className="text-blue-400 cursor-pointer hover:underline">{book.author}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
            {book.description}
          </p>
          <p className="text-xs text-gray-500 mt-1.5">{book.format}</p>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {book.tags.map((tag, i) => (
              <span key={i} className="text-[10px] text-blue-400 hover:underline cursor-pointer">
                {tag}{i < book.tags.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-base font-bold text-gray-100 mt-2">
            ₹{book.price}
            {quantity > 1 && (
              <span className="text-xs text-gray-500 font-normal ml-1">× {quantity}</span>
            )}
          </p>
          <p className="text-[10px] text-gray-500 mt-0.5">
            Delivery by <span className="font-semibold text-gray-300">
              {book.deliveryDate.replace('Delivery by ', '')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   PurchaseSuccessModal
───────────────────────────────────────── */
interface PurchaseSuccessModalProps {
  open: boolean;
  items: CartItem[];
  onContinue: () => void;
}

export const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({
  open,
  items,
  onContinue,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Illustrated background */}
      <BooksBg />

      {/* Modal card */}
      <div className="relative z-10 bg-[#1e2130]/95 backdrop-blur-sm border border-[#2d3045] rounded-xl shadow-2xl px-8 pt-8 pb-7 w-full max-w-2xl mx-4">

        {/* ── Green tick ── */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
            <svg
              className="w-6 h-6 text-white"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* ── Heading ── */}
        <p className="text-center text-sm text-gray-300 leading-relaxed mb-6">
          Your purchase of the<br />
          <span className="font-semibold text-gray-100">following reads is successful</span>
        </p>

        {/* ── Purchased book cards ── */}
        <div className="flex flex-wrap gap-8 justify-center mb-7">
          {items.map(({ book, quantity }) => (
            <PurchasedBookCard key={book.id} item={{ book, quantity }} />
          ))}
        </div>

        {/* ── Continue button ── */}
        <div className="flex justify-center">
          <button
            onClick={onContinue}
            className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-8 py-2.5 rounded transition-colors"
          >
            Continue your Shopping
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
