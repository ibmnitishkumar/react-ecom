import React from 'react';
import type { Category } from '../types/Book';

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <aside className="w-56 shrink-0 bg-[#121318] border-r border-[#1e2129] min-h-[calc(100vh-53px)] py-4 flex flex-col">
      <div className="flex flex-col space-y-1">
        {categories.map((cat) => {
          const isSelected =
            selectedCategory.toLowerCase() === cat.name.toLowerCase() ||
            (selectedCategory === 'All' && cat.name === 'All');

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`w-full text-left px-5 py-2 text-[13px] font-normal transition-colors relative flex items-center cursor-pointer ${
                isSelected
                  ? 'text-white bg-[#1b1e28] font-medium'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#161820]'
              }`}
            >
              {isSelected && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r" />
              )}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
