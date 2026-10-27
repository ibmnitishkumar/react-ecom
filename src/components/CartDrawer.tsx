import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import type { Book } from '../types/Book';

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (bookId: number | string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  items,
  onClose,
  onRemove,
  onCheckout,
}) => {
  const total = items.reduce((sum, i) => sum + i.book.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#111217] border-l border-[#21242d] z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#21242d]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-100">
              Basket
              {totalItems > 0 && (
                <span className="ml-2 text-xs font-normal text-gray-400">
                  ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </span>
              )}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
              <ShoppingBag className="w-10 h-10 opacity-30" />
              <p className="text-sm">Your basket is empty</p>
            </div>
          ) : (
            items.map(({ book, quantity }) => (
              <div key={book.id} className="flex gap-3 items-start">
                {/* Mini cover swatch */}
                <div
                  className="w-10 h-14 rounded shrink-0"
                  style={{ backgroundColor: book.coverBgColor || '#1e293b' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-100 leading-snug line-clamp-2">
                    {book.title}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{book.author}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs font-bold text-gray-100">
                      ₹{book.price}
                      {quantity > 1 && (
                        <span className="text-[10px] text-gray-500 font-normal ml-1">
                          × {quantity}
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => onRemove(book.id)}
                      className="text-gray-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-[#21242d] space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total</span>
              <span className="font-bold text-gray-100">₹{total}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};
