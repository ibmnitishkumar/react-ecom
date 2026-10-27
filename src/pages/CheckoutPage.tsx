import React, { useState } from 'react';
import { ChevronRight, Minus, Plus, CreditCard } from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';
import { PurchaseSuccessModal } from '../components/PurchaseSuccessModal';
import type { CartItem } from '../components/CartDrawer';
import type { Book } from '../types/Book';
import {
  Target, Lightbulb, Compass, Moon, Heart, Rocket, Smile, Home, Cat,
} from 'lucide-react';

/* ─────────────────────────────────────────
   Inline cover (same palette as BookCard)
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
          className={`${base}`}
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
   Types
───────────────────────────────────────── */
interface AddressForm {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  city: string;
  pin: string;
  phone: string;
  state: string;
  country: string;
}

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (bookId: number | string, delta: number) => void;
  onRemove: (bookId: number | string) => void;
  onPlaceOrder: (address: AddressForm) => void;
}

const TAX_RATE = 0.12; // 12%
const VALID_COUPONS: Record<string, number> = {
  SAVE100: 100,
  BOOK50: 50,
  READ200: 200,
};
const COUNTRY_CODES = ['+91', '+1', '+44', '+61', '+81', '+49', '+33'];

/* ─────────────────────────────────────────
   CheckoutPage
───────────────────────────────────────── */
export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onBack,
  onUpdateQuantity,
  onRemove,
  onPlaceOrder,
}) => {
  /* ── Address form ── */
  const [form, setForm] = useState<AddressForm>({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    city: '',
    pin: '',
    phone: '',
    state: '',
    country: 'India',
  });
  const [countryCode, setCountryCode] = useState('+91');
  const [useSaved, setUseSaved] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<AddressForm>>({});

  /* ── Coupon ── */
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  /* ── Payment modal & order placed ── */
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  // Snapshot of cart items at moment of purchase (cart clears after onPlaceOrder)
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);

  /* ── Saved address (mock) ── */
  const SAVED_ADDRESS: AddressForm = {
    firstName: 'Daniel',
    lastName: 'Reed',
    address: '42 Minimalist Lane, Apt 3B',
    email: 'daniel.reed@email.com',
    city: 'San Francisco',
    pin: '94102',
    phone: '9876543210',
    state: 'California',
    country: 'India',
  };

  const handleUseSaved = (checked: boolean) => {
    setUseSaved(checked);
    if (checked) {
      setForm(SAVED_ADDRESS);
      setFormErrors({});
    } else {
      setForm({ firstName:'', lastName:'', address:'', email:'', city:'', pin:'', phone:'', state:'', country:'India' });
    }
  };

  const setField = (key: keyof AddressForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (formErrors[key]) setFormErrors((prev) => ({ ...prev, [key]: '' }));
  };

  /* ── Pricing ── */
  const subtotal = items.reduce((s, i) => s + i.book.price * i.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const discount = appliedCoupon ? (VALID_COUPONS[appliedCoupon] ?? 0) : 0;
  const total = Math.max(0, subtotal + tax - discount);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  /* ── Coupon logic ── */
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) { setCouponError('Enter a coupon code'); setCouponSuccess(''); return; }
    if (VALID_COUPONS[code] !== undefined) {
      setAppliedCoupon(code);
      setCouponSuccess(`Coupon applied! You save ₹${VALID_COUPONS[code]}`);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponSuccess('');
      setAppliedCoupon(null);
    }
  };

  /* ── Validation ── */
  const validate = (): boolean => {
    const errors: Partial<AddressForm> = {};
    if (!form.firstName.trim()) errors.firstName = 'Required';
    if (!form.lastName.trim()) errors.lastName = 'Required';
    if (!form.address.trim()) errors.address = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Valid email required';
    if (!form.city.trim()) errors.city = 'Required';
    if (!form.pin.trim() || !/^\d{5,6}$/.test(form.pin)) errors.pin = 'Valid PIN required';
    if (!form.phone.trim() || !/^\d{7,12}$/.test(form.phone)) errors.phone = 'Valid number required';
    if (!form.state.trim()) errors.state = 'Required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayNow = () => {
    if (items.length === 0) return;
    if (!validate()) return;
    // Address valid — open payment modal
    setPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setPurchasedItems([...items]); // snapshot before cart clears
    setPaymentOpen(false);
    onPlaceOrder(form);
    setOrderPlaced(true);
  };

  /* ─── Breadcrumb helpers ─── */
  const firstBook = items[0]?.book;
  const breadcrumbTag = firstBook?.tags?.[0] || firstBook?.category || 'Books';

  return (
    <div className="min-h-screen bg-[#0d0e12] text-gray-100">

      {/* ── Breadcrumb ── */}
      <div className="px-8 pt-5 pb-3 flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
        <button onClick={onBack} className="hover:text-blue-400 transition-colors">Home</button>
        <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />
        <span className="hover:text-blue-400 cursor-pointer transition-colors">{breadcrumbTag}</span>
        {firstBook && (
          <>
            <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />
            <span className="hover:text-blue-400 cursor-pointer transition-colors">{firstBook.title}</span>
          </>
        )}
        <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />
        <span className="text-gray-200">Checkout</span>
        <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />
      </div>

      <div className="px-8 pb-12">
        <h1 className="text-lg font-semibold text-gray-100 mb-5">Shopping Cart</h1>

        {/* ── Cart items row ── */}
        {items.length === 0 ? (
          <div className="bg-[#111217] border border-[#21242d] rounded-xl p-10 text-center text-gray-500 mb-6">
            <p className="text-sm">Your cart is empty.</p>
            <button onClick={onBack} className="mt-3 text-xs text-blue-400 hover:underline">← Back to browsing</button>
          </div>
        ) : (
          <div className="bg-[#111217] border border-[#21242d] rounded-xl p-5 mb-6">
            <div className="flex flex-wrap gap-8">
              {items.map(({ book, quantity }) => (
                <div key={book.id} className="flex gap-4 min-w-[260px] flex-1">
                  {/* Cover thumbnail */}
                  <div className="w-28 h-40 shrink-0 rounded overflow-hidden shadow-lg shadow-black/40">
                    {book.coverImage ? (
                      <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                      <CoverThumb book={book} />
                    )}
                  </div>

                  {/* Book info */}
                  <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-100 leading-snug">{book.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        by <span className="text-blue-400 hover:underline cursor-pointer">{book.author}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{book.description}</p>
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
                      <div className="flex items-baseline gap-1.5 mt-2">
                        <span className="text-base font-bold text-gray-100">₹{book.price}</span>
                        {book.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">₹{book.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500">{book.deliveryDate}</p>

                      {/* Qty stepper */}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">{quantity}</span>
                        <button
                          onClick={() => quantity > 1 ? onUpdateQuantity(book.id, -1) : onRemove(book.id)}
                          className="w-6 h-6 rounded bg-[#1a1b23] border border-[#2d2f3a] flex items-center justify-center text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onUpdateQuantity(book.id, 1)}
                          className="w-6 h-6 rounded bg-[#1a1b23] border border-[#2d2f3a] flex items-center justify-center text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom two-column: Address + Order Summary ── */}
        <div className="flex gap-5 flex-wrap lg:flex-nowrap items-start">

          {/* ── Left: Address form ── */}
          <div className="flex-1 min-w-0 bg-[#111217] border border-[#21242d] rounded-xl p-6">
            <h2 className="text-sm font-semibold text-gray-100 mb-4">Address</h2>

            {/* Use saved address toggle */}
            <label className="flex items-center gap-2 cursor-pointer mb-5">
              <div
                onClick={() => handleUseSaved(!useSaved)}
                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                  useSaved ? 'bg-blue-600 border-blue-600' : 'border-[#3d4050] bg-[#1a1b23]'
                }`}
              >
                {useSaved && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-gray-300">Use Saved Address</span>
            </label>

            {/* Row 1: First Name, Last Name, Address */}
            <div className="flex gap-3 mb-3 flex-wrap">
              <div className="flex-1 min-w-[120px]">
                <label className="text-[10px] text-gray-500 block mb-1">First Name</label>
                <input
                  value={form.firstName}
                  onChange={(e) => setField('firstName', e.target.value)}
                  placeholder="First Name"
                  className={`w-full bg-[#0d0e12] border rounded px-3 py-2 text-xs text-gray-200 placeholder-gray-600 focus:outline-none transition-colors ${formErrors.firstName ? 'border-red-500' : 'border-[#21242d] focus:border-blue-500'}`}
                />
                {formErrors.firstName && <p className="text-[10px] text-red-400 mt-0.5">{formErrors.firstName}</p>}
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="text-[10px] text-gray-500 block mb-1">Last Name</label>
                <input
                  value={form.lastName}
                  onChange={(e) => setField('lastName', e.target.value)}
                  placeholder="Last Name"
                  className={`w-full bg-[#0d0e12] border rounded px-3 py-2 text-xs text-gray-200 placeholder-gray-600 focus:outline-none transition-colors ${formErrors.lastName ? 'border-red-500' : 'border-[#21242d] focus:border-blue-500'}`}
                />
                {formErrors.lastName && <p className="text-[10px] text-red-400 mt-0.5">{formErrors.lastName}</p>}
              </div>
              <div className="flex-[2] min-w-[200px]">
                <label className="text-[10px] text-gray-500 block mb-1">Address</label>
                <input
                  value={form.address}
                  onChange={(e) => setField('address', e.target.value)}
                  placeholder="Address Line 2"
                  className={`w-full bg-[#0d0e12] border rounded px-3 py-2 text-xs text-gray-200 placeholder-gray-600 focus:outline-none transition-colors ${formErrors.address ? 'border-red-500' : 'border-[#21242d] focus:border-blue-500'}`}
                />
                {formErrors.address && <p className="text-[10px] text-red-400 mt-0.5">{formErrors.address}</p>}
              </div>
            </div>

            {/* Row 2: Email, City, Pin */}
            <div className="flex gap-3 mb-3 flex-wrap">
              <div className="flex-[2] min-w-[180px]">
                <label className="text-[10px] text-gray-500 block mb-1">e-mail</label>
                <input
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  placeholder="e-mail"
                  type="email"
                  className={`w-full bg-[#0d0e12] border rounded px-3 py-2 text-xs text-gray-200 placeholder-gray-600 focus:outline-none transition-colors ${formErrors.email ? 'border-red-500' : 'border-[#21242d] focus:border-blue-500'}`}
                />
                {formErrors.email && <p className="text-[10px] text-red-400 mt-0.5">{formErrors.email}</p>}
              </div>
              <div className="flex-1 min-w-[110px]">
                <label className="text-[10px] text-gray-500 block mb-1">City</label>
                <input
                  value={form.city}
                  onChange={(e) => setField('city', e.target.value)}
                  placeholder="City"
                  className={`w-full bg-[#0d0e12] border rounded px-3 py-2 text-xs text-gray-200 placeholder-gray-600 focus:outline-none transition-colors ${formErrors.city ? 'border-red-500' : 'border-[#21242d] focus:border-blue-500'}`}
                />
                {formErrors.city && <p className="text-[10px] text-red-400 mt-0.5">{formErrors.city}</p>}
              </div>
              <div className="flex-1 min-w-[90px]">
                <label className="text-[10px] text-gray-500 block mb-1">Pin</label>
                <input
                  value={form.pin}
                  onChange={(e) => setField('pin', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className={`w-full bg-[#0d0e12] border rounded px-3 py-2 text-xs text-gray-200 placeholder-gray-600 focus:outline-none transition-colors ${formErrors.pin ? 'border-red-500' : 'border-[#21242d] focus:border-blue-500'}`}
                />
                {formErrors.pin && <p className="text-[10px] text-red-400 mt-0.5">{formErrors.pin}</p>}
              </div>
            </div>

            {/* Row 3: Phone, State, Country */}
            <div className="flex gap-3 flex-wrap">
              <div className="flex-[2] min-w-[180px]">
                <label className="text-[10px] text-gray-500 block mb-1">Phone Number</label>
                <div className="flex gap-1.5">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-[#0d0e12] border border-[#21242d] rounded px-2 py-2 text-xs text-gray-300 focus:outline-none focus:border-blue-500 shrink-0"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <input
                    value={form.phone}
                    onChange={(e) => setField('phone', e.target.value.replace(/\D/g, '').slice(0, 12))}
                    placeholder="12345567890"
                    className={`flex-1 bg-[#0d0e12] border rounded px-3 py-2 text-xs text-gray-200 placeholder-gray-600 focus:outline-none transition-colors ${formErrors.phone ? 'border-red-500' : 'border-[#21242d] focus:border-blue-500'}`}
                  />
                </div>
                {formErrors.phone && <p className="text-[10px] text-red-400 mt-0.5">{formErrors.phone}</p>}
              </div>
              <div className="flex-1 min-w-[110px]">
                <label className="text-[10px] text-gray-500 block mb-1">State</label>
                <input
                  value={form.state}
                  onChange={(e) => setField('state', e.target.value)}
                  placeholder="State"
                  className={`w-full bg-[#0d0e12] border rounded px-3 py-2 text-xs text-gray-200 placeholder-gray-600 focus:outline-none transition-colors ${formErrors.state ? 'border-red-500' : 'border-[#21242d] focus:border-blue-500'}`}
                />
                {formErrors.state && <p className="text-[10px] text-red-400 mt-0.5">{formErrors.state}</p>}
              </div>
              <div className="flex-1 min-w-[110px]">
                <label className="text-[10px] text-gray-500 block mb-1">Country</label>
                <select
                  value={form.country}
                  onChange={(e) => setField('country', e.target.value)}
                  className="w-full bg-[#0d0e12] border border-[#21242d] rounded px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  {['India', 'United States', 'United Kingdom', 'Australia', 'Canada', 'Germany', 'France'].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ── Right: Grand Total panel ── */}
          <div className="w-72 shrink-0 bg-[#111217] border border-[#21242d] rounded-xl overflow-hidden">
            {/* Decorative books illustration banner */}
            <div className="h-28 bg-gradient-to-br from-[#0f3460] via-[#1a1a3e] to-[#0a0a1a] relative overflow-hidden flex items-end justify-start p-3">
              {/* Simple stacked-books SVG decoration */}
              <svg viewBox="0 0 200 90" className="absolute inset-0 w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
                {/* Background stars */}
                <circle cx="20" cy="15" r="1.2" fill="#fbbf24" opacity="0.7"/>
                <circle cx="60" cy="8" r="0.8" fill="#fbbf24" opacity="0.5"/>
                <circle cx="100" cy="20" r="1" fill="#fbbf24" opacity="0.6"/>
                <circle cx="140" cy="10" r="1.2" fill="#fbbf24" opacity="0.4"/>
                <circle cx="170" cy="25" r="0.9" fill="#fbbf24" opacity="0.7"/>
                <circle cx="185" cy="8" r="1.1" fill="#f97316" opacity="0.5"/>
                <circle cx="45" cy="30" r="0.7" fill="#60a5fa" opacity="0.6"/>
                <circle cx="120" cy="5" r="0.9" fill="#a78bfa" opacity="0.5"/>
                {/* Decorative curved lines */}
                <path d="M10 70 Q50 40 90 65 Q130 85 170 55" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.3"/>
                <path d="M30 80 Q70 55 110 72 Q150 88 190 62" stroke="#8b5cf6" strokeWidth="0.8" fill="none" opacity="0.25"/>
                {/* Book stack left */}
                <rect x="15" y="50" width="32" height="42" rx="2" fill="#dc2626"/>
                <rect x="17" y="52" width="28" height="38" rx="1" fill="#ef4444"/>
                <line x1="19" y1="60" x2="43" y2="60" stroke="#fca5a5" strokeWidth="0.8" opacity="0.5"/>
                <line x1="19" y1="65" x2="43" y2="65" stroke="#fca5a5" strokeWidth="0.8" opacity="0.5"/>
                <line x1="19" y1="70" x2="43" y2="70" stroke="#fca5a5" strokeWidth="0.8" opacity="0.3"/>
                {/* Book middle */}
                <rect x="55" y="42" width="28" height="46" rx="2" fill="#fbbf24"/>
                <rect x="57" y="44" width="24" height="42" rx="1" fill="#fcd34d"/>
                <line x1="59" y1="52" x2="79" y2="52" stroke="#92400e" strokeWidth="0.8" opacity="0.5"/>
                <line x1="59" y1="57" x2="79" y2="57" stroke="#92400e" strokeWidth="0.8" opacity="0.5"/>
                {/* Book right */}
                <rect x="92" y="48" width="30" height="44" rx="2" fill="#0284c7"/>
                <rect x="94" y="50" width="26" height="40" rx="1" fill="#0ea5e9"/>
                <line x1="96" y1="58" x2="118" y2="58" stroke="#bae6fd" strokeWidth="0.8" opacity="0.5"/>
                <line x1="96" y1="63" x2="118" y2="63" stroke="#bae6fd" strokeWidth="0.8" opacity="0.5"/>
                <line x1="96" y1="68" x2="118" y2="68" stroke="#bae6fd" strokeWidth="0.8" opacity="0.3"/>
                {/* Open book foreground */}
                <path d="M135 75 L155 60 L175 75 L175 92 L155 80 L135 92 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.8"/>
                <path d="M135 75 L155 60 L155 80 L135 92 Z" fill="#0f172a"/>
                <path d="M155 60 L175 75 L175 92 L155 80 Z" fill="#1e293b"/>
                <line x1="140" y1="80" x2="152" y2="73" stroke="#60a5fa" strokeWidth="0.6" opacity="0.6"/>
                <line x1="140" y1="84" x2="152" y2="77" stroke="#60a5fa" strokeWidth="0.6" opacity="0.4"/>
                <line x1="158" y1="73" x2="170" y2="80" stroke="#60a5fa" strokeWidth="0.6" opacity="0.6"/>
                <line x1="158" y1="77" x2="170" y2="84" stroke="#60a5fa" strokeWidth="0.6" opacity="0.4"/>
              </svg>
            </div>

            {/* Summary rows */}
            <div className="p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-100">Grand Total</h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Price ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span className="text-gray-200">₹{subtotal}.00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span className="text-gray-200">₹{tax}.00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Charges</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
              </div>

              {/* Coupon input */}
              <div className="pt-1">
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value); setCouponError(''); setCouponSuccess(''); }}
                    placeholder="Apply Coupon"
                    className="flex-1 bg-[#0d0e12] border border-[#21242d] rounded px-3 py-1.5 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[10px] text-red-400 mt-1">{couponError}</p>}
                {couponSuccess && <p className="text-[10px] text-green-400 mt-1">{couponSuccess}</p>}
                <p className="text-[9px] text-gray-600 mt-1">Try: SAVE100 · BOOK50 · READ200</p>
              </div>

              {/* Discount row (visible only when coupon applied) */}
              {discount > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Discount</span>
                  <span className="text-green-400">-₹{discount}</span>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-[#21242d] pt-2">
                <div className="flex justify-between">
                  <span className="text-sm font-bold text-gray-100">Total Amount</span>
                  <span className="text-sm font-bold text-gray-100">₹{total}</span>
                </div>
              </div>

              {/* Pay Now button */}
              <button
                onClick={handlePayNow}
                disabled={items.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded transition-colors mt-1"
              >
                Pay Now
                <CreditCard className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Payment Modal ── */}
      <PaymentModal
        open={paymentOpen}
        payableAmount={total}
        onClose={() => setPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* ── Purchase Success Modal ── */}
      <PurchaseSuccessModal
        open={orderPlaced}
        items={purchasedItems}
        onContinue={onBack}
      />
    </div>
  );
};
