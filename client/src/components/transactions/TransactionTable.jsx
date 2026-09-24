import React from 'react';
import {
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  formatCurrency,
  formatDate,
  getCategoryBadgeStyle,
  getCategoryIcon,
} from '../../utils/formatters';
import { TableRowSkeleton } from '../common/LoadingSkeleton';

export const TransactionTable = ({
  transactions = [],
  loading = false,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const { currency } = useAuth();

  return (
    <div className="bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] rounded-2xl shadow-sm overflow-hidden">
      {/* Desktop / Tablet Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#9DA3AD]">
              <th className="py-3.5 px-4 sm:px-6">Transaction</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Method</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#2C323A]/60">
            {loading ? (
              <>
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-[#6B7280] dark:text-[#9DA3AD] text-sm">
                  No transactions match your criteria.
                </td>
              </tr>
            ) : (
              transactions.map((t) => {
                const isExpense = t.type === 'expense';
                return (
                  <tr
                    key={t._id}
                    className="hover:bg-[#F1F3F6] dark:hover:bg-[#22272F] transition-colors group"
                  >
                    {/* Title & Notes */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${getCategoryBadgeStyle(
                            t.category
                          )}`}
                        >
                          {getCategoryIcon(t.category, 'w-4 h-4')}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#0F1115] dark:text-[#F4F1EA] truncate max-w-xs sm:max-w-sm">
                            {t.title}
                          </p>
                          {t.notes && (
                            <p className="text-xs text-[#9CA3AF] dark:text-[#6F7680] truncate max-w-xs">
                              {t.notes}
                            </p>
                          )}
                          {t.tags && t.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {t.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-[#F1F3F6] dark:bg-[#15181D] text-[#4B5563] dark:text-[#9DA3AD] border border-[#E2E8F0] dark:border-[#2C323A]"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${getCategoryBadgeStyle(
                          t.category
                        )}`}
                      >
                        {t.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-[#6B7280] dark:text-[#9DA3AD] font-medium">
                      {formatDate(t.date)}
                    </td>

                    {/* Payment Method */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#F1F3F6] dark:bg-[#15181D] text-[#4B5563] dark:text-[#9DA3AD] border border-[#E2E8F0] dark:border-[#2C323A]">
                        {t.paymentMethod}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <span
                        className={`text-sm font-bold ${
                          isExpense
                            ? 'text-[#D95C68]'
                            : 'text-[#45B97C]'
                        }`}
                      >
                        {isExpense ? '-' : '+'}
                        {formatCurrency(t.amount, currency)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(t)}
                          className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#0F1115] hover:bg-[#E2E8F0] dark:text-[#9DA3AD] dark:hover:text-[#F4F1EA] dark:hover:bg-[#22272F] transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(t)}
                          className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#D95C68] hover:bg-[#D95C68]/10 dark:text-[#9DA3AD] transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination && pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-[#E2E8F0] dark:border-[#2C323A] flex items-center justify-between gap-4 bg-[#F8F9FA] dark:bg-[#15181D]">
          <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
            Showing Page <strong className="text-[#0F1115] dark:text-[#F4F1EA]">{pagination.currentPage}</strong> of{' '}
            <strong className="text-[#0F1115] dark:text-[#F4F1EA]">{pagination.totalPages}</strong> ({pagination.totalCount} total entries)
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
              className="p-2 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] text-[#6B7280] dark:text-[#9DA3AD] disabled:opacity-30 hover:bg-[#E2E8F0] dark:hover:bg-[#22272F] hover:text-[#0F1115] dark:hover:text-[#F4F1EA] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="p-2 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] text-[#6B7280] dark:text-[#9DA3AD] disabled:opacity-30 hover:bg-[#E2E8F0] dark:hover:bg-[#22272F] hover:text-[#0F1115] dark:hover:text-[#F4F1EA] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
