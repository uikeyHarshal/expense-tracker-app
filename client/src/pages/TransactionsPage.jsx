import React, { useState } from 'react';
import { Plus, Download, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionFormModal } from '../components/transactions/TransactionFormModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';

export const TransactionsPage = ({ onOpenAddModal }) => {
  const { currency } = useAuth();
  const {
    transactions,
    loading,
    pagination,
    filters,
    updateFilters,
    resetFilters,
    setPage,
    deleteTransaction,
    exportCSV,
  } = useTransactions();

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deletingTransaction) return;
    setDeleteLoading(true);
    await deleteTransaction(deletingTransaction._id);
    setDeleteLoading(false);
    setDeletingTransaction(null);
  };

  // Quick summary of currently visible transactions
  const filteredSummary = transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'income') {
        acc.income += curr.amount;
      } else {
        acc.expense += curr.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
  filteredSummary.balance = filteredSummary.income - filteredSummary.expense;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F1115] dark:text-[#F4F1EA]">
            Transaction Records
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9DA3AD]">
            Detailed ledger of all financial inflows and outflows
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAddModal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#15181D] hover:bg-[#22272F] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:hover:bg-white dark:text-[#0F1115] font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Cards for Filtered Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9DA3AD] uppercase">Filtered Income</p>
            <p className="text-lg font-bold text-[#45B97C]">
              +{formatCurrency(filteredSummary.income, currency)}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#45B97C]/10 text-[#45B97C] flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9DA3AD] uppercase">Filtered Expenses</p>
            <p className="text-lg font-bold text-[#D95C68]">
              -{formatCurrency(filteredSummary.expense, currency)}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#D95C68]/10 text-[#D95C68] flex items-center justify-center">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9DA3AD] uppercase">Net Flow</p>
            <p className={`text-lg font-bold ${filteredSummary.balance >= 0 ? 'text-[#45B97C]' : 'text-[#D95C68]'}`}>
              {filteredSummary.balance >= 0 ? '+' : ''}
              {formatCurrency(filteredSummary.balance, currency)}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F1F3F6] text-[#15181D] dark:bg-[#22272F] dark:text-[#F4F1EA] flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <TransactionFilters
        filters={filters}
        onFilterChange={updateFilters}
        onResetFilters={resetFilters}
        onExportCSV={exportCSV}
        totalResults={pagination?.totalCount || 0}
      />

      {/* Transaction Table */}
      <TransactionTable
        transactions={transactions}
        loading={loading}
        pagination={pagination}
        onPageChange={setPage}
        onEdit={(txn) => setEditingTransaction(txn)}
        onDelete={(txn) => setDeletingTransaction(txn)}
      />

      {/* Edit Modal */}
      <TransactionFormModal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        transactionToEdit={editingTransaction}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingTransaction}
        onClose={() => setDeletingTransaction(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Transaction"
        message={`Are you sure you want to delete "${deletingTransaction?.title}" (${currency}${deletingTransaction?.amount})?`}
        confirmText="Delete Entry"
        loading={deleteLoading}
      />
    </div>
  );
};
