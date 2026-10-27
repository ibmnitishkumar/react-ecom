import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import type { FilterState } from '../types/Book';

interface BookFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export const BookFilters: React.FC<BookFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="w-full bg-[#111217] border-b border-[#1f222b] px-6 py-3.5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search Bar */}
        <div className="md:col-span-4 relative bg-[#171922] border border-[#262a36] rounded-md px-3.5 py-2 flex flex-col justify-center">
          <label className="text-[10px] text-gray-400 leading-tight select-none">
            Search you want to read here
          </label>
          <div className="flex items-center justify-between mt-0.5">
            <input
              type="text"
              placeholder="Search"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange('searchQuery', e.target.value)}
              className="bg-transparent border-none text-xs text-gray-200 placeholder-gray-500 focus:outline-none w-full pr-2"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </div>
        </div>

        {/* Language Filter */}
        <div className="md:col-span-2 relative bg-[#171922] border border-[#262a36] rounded-md px-3.5 py-2">
          <label className="text-[10px] text-gray-400 block leading-tight select-none">
            Language
          </label>
          <div className="relative mt-0.5">
            <select
              value={filters.language}
              onChange={(e) => onFilterChange('language', e.target.value)}
              className="w-full bg-transparent text-xs text-gray-200 appearance-none focus:outline-none cursor-pointer pr-4"
            >
              <option value="All" className="bg-[#171922] text-gray-200">All</option>
              <option value="English" className="bg-[#171922] text-gray-200">English</option>
              <option value="Hindi" className="bg-[#171922] text-gray-200">Hindi</option>
              <option value="Spanish" className="bg-[#171922] text-gray-200">Spanish</option>
              <option value="French" className="bg-[#171922] text-gray-200">French</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Format Filter */}
        <div className="md:col-span-2 relative bg-[#171922] border border-[#262a36] rounded-md px-3.5 py-2">
          <label className="text-[10px] text-gray-400 block leading-tight select-none">
            Format (Paperback, ebook etc)
          </label>
          <div className="relative mt-0.5">
            <select
              value={filters.format}
              onChange={(e) => onFilterChange('format', e.target.value)}
              className="w-full bg-transparent text-xs text-gray-200 appearance-none focus:outline-none cursor-pointer pr-4"
            >
              <option value="All" className="bg-[#171922] text-gray-200">All</option>
              <option value="Paperback" className="bg-[#171922] text-gray-200">Paperback</option>
              <option value="Hardcover" className="bg-[#171922] text-gray-200">Hard Cover</option>
              <option value="eBook" className="bg-[#171922] text-gray-200">eBook</option>
              <option value="Audiobook" className="bg-[#171922] text-gray-200">Audiobook</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="md:col-span-2 relative bg-[#171922] border border-[#262a36] rounded-md px-3.5 py-2">
          <label className="text-[10px] text-gray-400 block leading-tight select-none">
            Price Range
          </label>
          <div className="relative mt-0.5">
            <select
              value={filters.priceRange}
              onChange={(e) => onFilterChange('priceRange', e.target.value)}
              className="w-full bg-transparent text-xs text-gray-200 appearance-none focus:outline-none cursor-pointer pr-4"
            >
              <option value="All" className="bg-[#171922] text-gray-200">All</option>
              <option value="under-200" className="bg-[#171922] text-gray-200">Under ₹200</option>
              <option value="200-400" className="bg-[#171922] text-gray-200">₹200 - ₹400</option>
              <option value="above-400" className="bg-[#171922] text-gray-200">Above ₹400</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Sort by Filter */}
        <div className="md:col-span-2 relative bg-[#171922] border border-[#262a36] rounded-md px-3.5 py-2">
          <label className="text-[10px] text-gray-400 block leading-tight select-none">
            Sort by
          </label>
          <div className="relative mt-0.5">
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="w-full bg-transparent text-xs text-gray-200 appearance-none focus:outline-none cursor-pointer pr-4"
            >
              <option value="relevance" className="bg-[#171922] text-gray-200">Relevance</option>
              <option value="price-low" className="bg-[#171922] text-gray-200">Price: Low to High</option>
              <option value="price-high" className="bg-[#171922] text-gray-200">Price: High to Low</option>
              <option value="title" className="bg-[#171922] text-gray-200">Title</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
