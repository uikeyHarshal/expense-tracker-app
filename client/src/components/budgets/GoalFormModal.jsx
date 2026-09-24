import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useTransactions } from '../../context/TransactionContext';

const PRESET_COLORS = [
  '#64748b', // Slate / Grey
  '#475569', // Darker Grey
  '#45B97C', // Success Green
  '#D95C68', // Rose / Red
  '#06b6d4', // Cyan
  '#8b5cf6', // Purple
];

export const GoalFormModal = ({ isOpen, onClose }) => {
  const { currency } = useAuth();
  const { createGoal } = useTransactions();

  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: 'General Savings',
    color: '#64748b',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide a goal title');
      return;
    }
    if (!formData.targetAmount || Number(formData.targetAmount) <= 0) {
      setError('Please enter a valid target amount');
      return;
    }
    if (!formData.deadline) {
      setError('Please select a target deadline date');
      return;
    }

    setLoading(true);
    setError('');

    const result = await createGoal({
      ...formData,
      targetAmount: Number(formData.targetAmount),
      currentAmount: Number(formData.currentAmount) || 0,
    });

    setLoading(false);
    if (result.success) {
      setFormData({
        title: '',
        targetAmount: '',
        currentAmount: '',
        deadline: '',
        category: 'General Savings',
        color: '#64748b',
      });
      onClose();
    } else {
      setError(result.message || 'Failed to create goal');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Savings Goal"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-[#D95C68]/10 border border-[#D95C68]/20 text-[#D95C68] text-xs font-semibold">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
            Goal Name *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. New Car, Vacation Trip, Emergency Fund..."
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
              Target Amount ({currency}) *
            </label>
            <input
              type="number"
              step="1"
              min="1"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              placeholder="5000"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm font-semibold focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
              Starting Amount ({currency})
            </label>
            <input
              type="number"
              step="1"
              min="0"
              name="currentAmount"
              value={formData.currentAmount}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] placeholder-[#9CA3AF] dark:placeholder-[#6F7680] text-sm focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
              Target Deadline *
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] text-sm focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] bg-[#F8F9FA] dark:bg-[#15181D] text-[#0F1115] dark:text-[#F4F1EA] text-sm focus:outline-none focus:border-[#6B7280] dark:focus:border-[#9DA3AD]"
            >
              <option value="General Savings">General Savings</option>
              <option value="Emergency">Emergency</option>
              <option value="Travel">Travel</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>

        {/* Color picker */}
        <div>
          <label className="block text-xs font-semibold text-[#4B5563] dark:text-[#9DA3AD] mb-1.5">
            Card Accent Color
          </label>
          <div className="flex items-center gap-3">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, color: c }))}
                className={`w-7 h-7 rounded-full transition-transform ${
                  formData.color === c ? 'ring-2 ring-offset-2 ring-[#64748b] scale-110' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
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
            {loading ? 'Creating...' : 'Create Goal'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
