import React, { useState } from 'react';
import { CreditCard, X } from 'lucide-react';
import { BooksBg } from './PurchaseSuccessModal';

/* ─────────────────────────────────────────
   Payment method tabs
───────────────────────────────────────── */
type PaymentMethod = 'credit' | 'debit' | 'upi' | 'wallet';

const METHODS: { id: PaymentMethod; label: string }[] = [
  { id: 'credit', label: 'Credit Card' },
  { id: 'debit', label: 'Debit card' },
  { id: 'upi',   label: 'UPI' },
  { id: 'wallet', label: 'Wallet' },
];

/* ─────────────────────────────────────────
   Field helpers
───────────────────────────────────────── */
function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1-').replace(/-$/, '');
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 6);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

/* ─────────────────────────────────────────
   Props
───────────────────────────────────────── */
interface PaymentModalProps {
  open: boolean;
  payableAmount: number;
  onClose: () => void;
  onSuccess: () => void;
}

/* ─────────────────────────────────────────
   PaymentModal
───────────────────────────────────────── */
export const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  payableAmount,
  onClose,
  onSuccess,
}) => {
  const [method, setMethod] = useState<PaymentMethod>('credit');

  /* Card fields */
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');

  /* UPI */
  const [upiId, setUpiId] = useState('');

  /* Wallet */
  const [wallet, setWallet] = useState('Paytm');

  /* Errors */
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  if (!open) return null;

  /* ── Validation ── */
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (method === 'credit' || method === 'debit') {
      const rawDigits = cardNumber.replace(/\D/g, '');
      if (rawDigits.length !== 16) e.cardNumber = 'Enter a valid 16-digit card number';
      if (!nameOnCard.trim()) e.nameOnCard = 'Name is required';
      if (cvv.length < 3) e.cvv = 'Enter valid CVV';
      const [mm, yy] = expiry.split('/');
      if (!mm || !yy || Number(mm) < 1 || Number(mm) > 12 || yy.length < 4)
        e.expiry = 'Enter valid expiry MM/YYYY';
    }
    if (method === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) e.upiId = 'Enter valid UPI ID (e.g. name@upi)';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    setProcessing(true);
    // Simulate a brief processing delay
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 1200);
  };

  const inputCls = (field: string) =>
    `w-full bg-[#2a2d3a] border rounded px-3 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none transition-colors ${
      errors[field] ? 'border-red-500' : 'border-[#3d4050] focus:border-blue-500'
    }`;

  return (
    /* ── Full-screen backdrop with the books illustration ── */
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Illustrated background (shared component) */}
      <BooksBg />

      {/* ── Modal card ── */}
      <div className="relative z-10 w-[480px] max-w-[95vw] bg-[#1e2130]/95 backdrop-blur-sm border border-[#2d3045] rounded-xl shadow-2xl overflow-hidden">

        {/* Header row */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 className="text-sm font-semibold text-gray-100">Complete Payment</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-100">
              Payable Amount: <span className="text-white">₹{payableAmount}</span>
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-200 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body: left tabs + right form */}
        <div className="flex min-h-[240px]">

          {/* ── Left: payment method tabs ── */}
          <div className="w-36 shrink-0 border-r border-[#2d3045]">
            {METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => { setMethod(m.id); setErrors({}); }}
                className={`w-full text-left px-5 py-3.5 text-xs transition-colors border-l-2 ${
                  method === m.id
                    ? 'border-blue-500 bg-[#252840] text-gray-100 font-semibold'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-[#252840]/50'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* ── Right: form panel ── */}
          <div className="flex-1 px-6 pb-6 pt-2">

            {/* ────── Card (Credit / Debit) ────── */}
            {(method === 'credit' || method === 'debit') && (
              <div className="space-y-3">
                {/* Row 1: Card Number + Name */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 block mb-1">Card Number</label>
                    <input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      maxLength={19}
                      className={inputCls('cardNumber')}
                    />
                    {errors.cardNumber && <p className="text-[9px] text-red-400 mt-0.5">{errors.cardNumber}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 block mb-1">Name on Card</label>
                    <input
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      placeholder="Name"
                      className={inputCls('nameOnCard')}
                    />
                    {errors.nameOnCard && <p className="text-[9px] text-red-400 mt-0.5">{errors.nameOnCard}</p>}
                  </div>
                </div>

                {/* Row 2: CVV + Expiry */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 block mb-1">CVV</label>
                    <input
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="XXX"
                      className={inputCls('cvv')}
                    />
                    {errors.cvv && <p className="text-[9px] text-red-400 mt-0.5">{errors.cvv}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 block mb-1">Date of Expiry</label>
                    <input
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YYYY"
                      maxLength={7}
                      className={inputCls('expiry')}
                    />
                    {errors.expiry && <p className="text-[9px] text-red-400 mt-0.5">{errors.expiry}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ────── UPI ────── */}
            {method === 'upi' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-gray-500 block mb-1">UPI ID</label>
                  <input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className={inputCls('upiId')}
                  />
                  {errors.upiId && <p className="text-[9px] text-red-400 mt-0.5">{errors.upiId}</p>}
                </div>
                <p className="text-[10px] text-gray-500">
                  Enter your registered UPI ID to proceed with payment.
                </p>
              </div>
            )}

            {/* ────── Wallet ────── */}
            {method === 'wallet' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-gray-500 block mb-1">Select Wallet</label>
                  <select
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    className="w-full bg-[#2a2d3a] border border-[#3d4050] rounded px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {['Paytm', 'PhonePe', 'Amazon Pay', 'Mobikwik', 'Freecharge'].map((w) => (
                      <option key={w}>{w}</option>
                    ))}
                  </select>
                </div>
                <p className="text-[10px] text-gray-500">
                  You will be redirected to <span className="text-gray-300">{wallet}</span> to complete the payment.
                </p>
              </div>
            )}

            {/* ── Pay Now button ── */}
            <div className="flex justify-end mt-5">
              <button
                onClick={handlePay}
                disabled={processing}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-wait text-white text-xs font-semibold px-6 py-2.5 rounded transition-colors"
              >
                {processing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    Pay Now
                    <CreditCard className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
