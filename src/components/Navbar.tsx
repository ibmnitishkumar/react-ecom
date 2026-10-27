import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, ShoppingCart, User, LogOut } from 'lucide-react';

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
  userName?: string;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount = 0, onCartClick, userName, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="w-full bg-[#111217] border-b border-[#21242d] text-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3.5">
        {/* Left section: Brand and Top Nav Links */}
        <div className="flex items-center space-x-8">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center space-x-2.5 group">
            <div className="text-white">
              <BookOpen className="w-5 h-5 text-gray-200 transition-colors group-hover:text-blue-400" />
            </div>
            <span className="font-semibold text-base text-gray-100 tracking-tight">
              Book Worm
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs text-gray-400 font-normal">
            <a href="#orders" className="hover:text-gray-100 transition-colors">
              My Orders
            </a>
            <a href="#wishlist" className="hover:text-gray-100 transition-colors">
              My Wishlist
            </a>
            <a href="#writers" className="hover:text-gray-100 transition-colors">
              My Writers
            </a>
          </nav>
        </div>

        {/* Right Section: Shopping Cart & Profile Icons */}
        <div className="flex items-center space-x-5 text-gray-300">
          <button
            type="button"
            className="relative p-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label="Shopping Cart"
            onClick={onCartClick}
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile icon with dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              className="p-1.5 hover:text-white transition-colors cursor-pointer"
              aria-label="User Account"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              <User className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-[#1a1c24] border border-[#2d3045] rounded-lg shadow-xl overflow-hidden">
                {/* User name */}
                <div className="px-4 py-3 border-b border-[#2d3045]">
                  <p className="text-[11px] text-gray-500 leading-none mb-1">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-100 truncate">{userName || 'User'}</p>
                </div>
                {/* Logout */}
                <button
                  type="button"
                  onClick={() => { setDropdownOpen(false); onLogout?.(); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
