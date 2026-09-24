import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  PAYMENT_METHODS,
} from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import { useTransactions } from '../../context/TransactionContext';

export const TransactionFormModal = ({
  isOpen,
  onClose,
  transactionToEdit = null,
}) => {
  const { currency } = useAuth();
  const { addTransaction, updateTransaction } = useTransactions();

  const isEditing = !!transactionToEdit;

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: EXPENSE_CATEGORIES[0] || 'Food & Dining',
    date: new Date().toISOString().slice(0, 10),
    paymentMethod: 'Cash',
    notes: '',
    tags: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        title: transactionToEdit.title || '',
        amount: transactionToEdit.amount || '',
        type: transactionToEdit.type || 'expense',
        category: transactionToEdit.category || EXPENSE_CATEGORIES[0],
        date: transactionToEdit.date
          ? new Date(transactionToEdit.date).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10),
        paymentMethod: transactionToEdit.paymentMethod || 'Cash',
        notes: transactionToEdit.notes || '',
        tags: Array.isArray(transactionToEdit.tags)
          ? transactionToEdit.tags.join(', ')
          : '',
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        type: 'expense',
        category: EXPENSE_CATEGORIES[0] || 'Food & Dining',
        date: new Date().toISOString().slice(0, 10),
        paymentMethod: 'Cash',
        notes: '',
        tags: '',
      });
    }
    setError('');
  }, [transactionToEdit, isOpen]);

  const handleTypeChange = (newType) => {
    const defaultCat =
      newType === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0];
    setFormData((prev) => ({
      ...prev,
      type: newType,
      category: defaultCat,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide a title');
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      setError('Please enter a valid amount greater than zero');
      return;
    }

    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      amount: Number(formData.amount),
      tags: formData.tags
        ? formData.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    };

    let result;
    if (isEditing) {
      result = await updateTransaction(transactionToEdit._id, payload);
    } else {
      result = await addTransaction(payload);
    }

    setLoading(false);
    if (result.success) {
      onClose();
    } else {
      setError(result.message || 'Operation failed');
    }
  };

  const availableCategories =
    formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Transaction' : 'New Transaction'}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-[#D95C68]/10 border border-[#D95C68]/20 text-[#D95C68] text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Type Toggle Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#F1F3F6] dark:bg-[#15181D] border border-[#E2E8F0] dark:border-[#2C323A] rounded-xl">
          <button
            type="button"
            onClick={() => handleTypeChange('expense')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              formData.type === 'expense'
                ? 'bg-[#D95C68] text-white shadow-md shadow-[#D95C68]/25'
                : 'text-[#6B7280] dark:text-[#9DA3AD] hover:text-[#0F1115] dark:hover:text-[#F4F1EA]'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('income')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              formData.type === 'income'
                ? 'bg-[#45B97C] text-white shadow-md shadow-[#45B97C]/25'
                : 'text-[#6B7280] dark:text-[#9DA3AD] hover:text-[#0F1115] dark:hover:text-[#F4F1EA]'
            }`}
          >
            Income
          </button>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
            Transaction Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Grocery shopping, Client payment..."
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD] transition-all"
          />
        </div>

        {/* Amount and Currency */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
              Amount ({currency}) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-[#9DA3AD] font-bold text-sm">
                {currency}
              </span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                required
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD] transition-all font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] text-sm focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD] transition-all"
            />
          </div>
        </div>

        {/* Category & Payment Method */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] text-sm focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD] transition-all"
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] text-sm focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD] transition-all"
            >
              {PAYMENT_METHODS.map((pm) => (
                <option key={pm} value={pm}>
                  {pm}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
            Notes / Description (Optional)
          </label>
          <textarea
            name="notes"
            rows="2"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional context, receipt info..."
            className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD] transition-all resize-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
            Tags (Optional, comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="groceries, weekend, trip"
            className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD] transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0] dark:border-[#2C323A]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] text-[#4B5563] dark:text-[#9DA3AD] hover:bg-[#F1F3F6] dark:hover:bg-[#22272F] hover:text-[#0F1115] dark:hover:text-[#F4F1EA] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-[#15181D] hover:bg-[#22272F] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:hover:bg-white dark:text-[#0F1115] shadow-md disabled:opacity-50 transition-all"
          >
            {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Entry'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
