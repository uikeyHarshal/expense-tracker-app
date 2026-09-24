import React from 'react';
import {
  Search,
  Download,
  RotateCcw,
} from 'lucide-react';
import {
  CATEGORIES,
  PAYMENT_METHODS,
} from '../../utils/constants';

export const TransactionFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  onExportCSV,
}) => {
  const allCategories = Object.keys(CATEGORIES);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm space-y-4">
      {/* Top Row: Search & Action buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#6B7280] dark:text-[#9DA3AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, notes, category..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD] transition-all"
          />
        </div>

        {/* Buttons: Export CSV & Reset */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#6B7280] dark:text-[#9DA3AD] hover:text-[#0F1115] dark:hover:text-[#F4F1EA] hover:bg-[#F1F3F6] dark:hover:bg-[#22272F] border border-[#E2E8F0] dark:border-[#2C323A] transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#F8F9FA] hover:bg-[#F1F3F6] text-[#0F1115] dark:bg-[#15181D] dark:hover:bg-[#22272F] dark:text-[#F4F1EA] border border-[#E2E8F0] dark:border-[#2C323A] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280] dark:text-[#9DA3AD]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Chips & Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#E2E8F0] dark:border-[#2C323A]">
        {/* Type Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD]"
          >
            <option value="all">All Types</option>
            <option value="expense">Expenses Only</option>
            <option value="income">Income Only</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD]"
          >
            <option value="all">All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Method Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1">
            Payment Method
          </label>
          <select
            value={filters.paymentMethod}
            onChange={(e) => onFilterChange('paymentMethod', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD]"
          >
            <option value="all">All Methods</option>
            {PAYMENT_METHODS.map((pm) => (
              <option key={pm} value={pm}>
                {pm}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-[11px] font-semibold text-[#6B7280] dark:text-[#9DA3AD] mb-1">
            Sort By
          </label>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              onFilterChange('sortBy', sortBy);
              onFilterChange('sortOrder', sortOrder);
            }}
            className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD]"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>
    </div>
  );
};
