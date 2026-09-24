import React from 'react';
import { Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  formatCurrency,
  getCategoryBadgeStyle,
  getCategoryIcon,
} from '../../utils/formatters';

export const BudgetCard = ({ budget, onDelete }) => {
  const { currency } = useAuth();

  const percentage = Math.min(100, budget.percentage || 0);
  const isOverBudget = budget.spent > budget.limit;
  const isNearLimit = budget.percentage >= 80 && !isOverBudget;

  let progressColor = 'bg-[#45B97C]';
  if (isOverBudget) progressColor = 'bg-[#D95C68]';
  else if (isNearLimit) progressColor = 'bg-[#94A3B8] dark:bg-[#6F7680]';

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${getCategoryBadgeStyle(
                budget.category
              )}`}
            >
              {getCategoryIcon(budget.category, 'w-5 h-5')}
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0F1115] dark:text-[#F4F1EA]">
                {budget.category}
              </h4>
              <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
                Monthly Limit:{' '}
                <strong className="text-[#0F1115] dark:text-[#F4F1EA]">
                  {formatCurrency(budget.limit, currency)}
                </strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => onDelete(budget)}
            className="p-1.5 text-[#6B7280] hover:text-[#D95C68] dark:text-[#9DA3AD] dark:hover:text-[#D95C68] rounded-lg hover:bg-[#D95C68]/10 transition-colors"
            title="Delete Budget"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Metrics */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#6B7280] dark:text-[#9DA3AD]">
              Spent: <strong className="text-[#0F1115] dark:text-[#F4F1EA]">{formatCurrency(budget.spent, currency)}</strong>
            </span>
            <span
              className={`font-bold ${
                isOverBudget
                  ? 'text-[#D95C68]'
                  : isNearLimit
                  ? 'text-[#6B7280] dark:text-[#9DA3AD]'
                  : 'text-[#45B97C]'
              }`}
            >
              {budget.percentage}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 rounded-full bg-[#F1F3F6] dark:bg-[#15181D] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#2C323A] flex items-center justify-between text-xs">
        {isOverBudget ? (
          <span className="flex items-center gap-1 text-[#D95C68] font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            Exceeded by {formatCurrency(budget.spent - budget.limit, currency)}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[#6B7280] dark:text-[#9DA3AD] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#45B97C]" />
            Remaining: {formatCurrency(budget.remaining, currency)}
          </span>
        )}
      </div>
    </div>
  );
};
