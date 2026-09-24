import React from 'react';
import { Target, PlusCircle, Trash2, Calendar, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const SavingsGoalCard = ({ goal, onContribute, onDelete }) => {
  const { currency } = useAuth();

  const isCompleted = goal.currentAmount >= goal.targetAmount;
  const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));

  return (
    <div
      className={`p-5 rounded-2xl bg-white dark:bg-[#1A1E24] border transition-all relative overflow-hidden flex flex-col justify-between ${
        isCompleted
          ? 'border-[#45B97C]/40 bg-[#45B97C]/5'
          : 'border-[#E2E8F0] dark:border-[#2C323A]'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm"
              style={{ backgroundColor: goal.color || '#64748b' }}
            >
              {isCompleted ? <Award className="w-5 h-5" /> : <Target className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0F1115] dark:text-[#F4F1EA]">
                {goal.title}
              </h4>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#F1F3F6] dark:bg-[#15181D] text-[#4B5563] dark:text-[#9DA3AD] font-medium border border-[#E2E8F0] dark:border-[#2C323A]">
                {goal.category}
              </span>
            </div>
          </div>

          <button
            onClick={() => onDelete(goal)}
            className="p-1.5 text-[#6B7280] hover:text-[#D95C68] dark:text-[#9DA3AD] rounded-lg transition-colors"
            title="Delete Goal"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Progress & Values */}
        <div className="space-y-2 mb-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-[#0F1115] dark:text-[#F4F1EA]">
              {formatCurrency(goal.currentAmount, currency)}
            </span>
            <span className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
              Target: {formatCurrency(goal.targetAmount, currency)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-[#F1F3F6] dark:bg-[#15181D] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                backgroundColor: goal.color || '#64748b',
              }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-[#9DA3AD]">
            <span>{percentage}% reached</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Target: {formatDate(goal.deadline)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#2C323A] flex items-center justify-between">
        {isCompleted ? (
          <span className="text-xs font-bold text-[#45B97C] flex items-center gap-1.5">
            <Award className="w-4 h-4" /> Target Completed! 🎉
          </span>
        ) : (
          <button
            onClick={() => onContribute(goal)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-[#F1F3F6] hover:bg-[#E2E8F0] text-[#15181D] dark:bg-[#22272F] dark:hover:bg-[#2C323A] dark:text-[#F4F1EA] border border-[#E2E8F0] dark:border-[#2C323A] transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Funds</span>
          </button>
        )}
      </div>
    </div>
  );
};
