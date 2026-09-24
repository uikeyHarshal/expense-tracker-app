import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useTransactions } from '../../context/TransactionContext';
import { formatCurrency } from '../../utils/formatters';

export const ContributeGoalModal = ({ isOpen, onClose, goal }) => {
  const { currency } = useAuth();
  const { updateGoal } = useTransactions();

  const [addAmount, setAddAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!goal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!addAmount || Number(addAmount) <= 0) {
      setError('Please enter a valid deposit amount');
      return;
    }

    setLoading(true);
    setError('');

    const result = await updateGoal(goal._id, {
      addAmount: Number(addAmount),
    });

    setLoading(false);
    if (result.success) {
      setAddAmount('');
      onClose();
    } else {
      setError(result.message || 'Failed to add funds');
    }
  };

  const remainingNeeded = Math.max(0, goal.targetAmount - goal.currentAmount);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add Savings to "${goal.title}"`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-[#D95C68]/10 border border-[#D95C68]/20 text-[#D95C68] text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="p-3.5 rounded-xl bg-[#F8F9FA] dark:bg-[#15181D] border border-[#E2E8F0] dark:border-[#2C323A] text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-[#6B7280] dark:text-[#9DA3AD]">Current Balance:</span>
            <strong className="text-[#0F1115] dark:text-[#F4F1EA]">
              {formatCurrency(goal.currentAmount, currency)}
            </strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7280] dark:text-[#9DA3AD]">Target Amount:</span>
            <strong className="text-[#0F1115] dark:text-[#F4F1EA]">
              {formatCurrency(goal.targetAmount, currency)}
            </strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7280] dark:text-[#9DA3AD]">Remaining to Goal:</span>
            <strong className="text-[#0F1115] dark:text-[#F4F1EA]">
              {formatCurrency(remainingNeeded, currency)}
            </strong>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
            Contribution Amount ({currency}) *
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-[#9DA3AD] font-bold text-sm">
              {currency}
            </span>
            <input
              type="number"
              step="1"
              min="1"
              placeholder="e.g. 100"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              required
              className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm font-semibold focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0] dark:border-[#2C323A]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] text-[#4B5563] dark:text-[#9DA3AD] hover:bg-[#F1F3F6] dark:hover:bg-[#22272F] hover:text-[#0F1115] dark:hover:text-[#F4F1EA]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-[#15181D] hover:bg-[#22272F] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:hover:bg-white dark:text-[#0F1115] shadow-md disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Deposit Funds'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
