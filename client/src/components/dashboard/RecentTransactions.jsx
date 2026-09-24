import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  formatCurrency,
  formatDate,
  getCategoryIcon,
  getCategoryBadgeStyle,
} from '../../utils/formatters';

export const RecentTransactions = ({
  transactions = [],
  onViewAll,
  onOpenAddModal,
}) => {
  const { currency } = useAuth();

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-[#0F1115] dark:text-[#F4F1EA]">
            Recent Activity
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
            Latest transactions made
          </p>
        </div>

        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-semibold text-[#4B5563] hover:text-[#0F1115] dark:text-[#9DA3AD] dark:hover:text-[#F4F1EA] transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="py-10 text-center space-y-3">
          <p className="text-sm text-[#6B7280] dark:text-[#9DA3AD]">No transactions recorded yet.</p>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F1F3F6] hover:bg-[#E2E8F0] text-[#15181D] dark:bg-[#22272F] dark:hover:bg-[#2C323A] dark:text-[#F4F1EA] border border-[#E2E8F0] dark:border-[#2C323A] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Entry</span>
          </button>
        </div>
      ) : (
        <div className="divide-y divide-[#E2E8F0] dark:divide-[#2C323A]/60">
          {transactions.map((t) => {
            const isExpense = t.type === 'expense';
            return (
              <div
                key={t._id}
                className="py-3.5 flex items-center justify-between gap-3 hover:bg-[#F1F3F6] dark:hover:bg-[#22272F] rounded-xl px-2 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${getCategoryBadgeStyle(
                      t.category
                    )}`}
                  >
                    {getCategoryIcon(t.category, 'w-5 h-5')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0F1115] dark:text-[#F4F1EA] truncate">
                      {t.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#9DA3AD] mt-0.5">
                      <span>{formatDate(t.date)}</span>
                      <span>•</span>
                      <span className="truncate">{t.category}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p
                    className={`text-sm font-bold ${
                      isExpense
                        ? 'text-[#D95C68]'
                        : 'text-[#45B97C]'
                    }`}
                  >
                    {isExpense ? '-' : '+'}
                    {formatCurrency(t.amount, currency)}
                  </p>
                  <p className="text-[11px] text-[#9CA3AF] dark:text-[#6F7680] capitalize">
                    {t.paymentMethod}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
