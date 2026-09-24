import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';

export const BudgetProgressWidget = ({ budgets = [], onManageBudgets }) => {
  const { currency } = useAuth();

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-[#0F1115] dark:text-[#F4F1EA]">
            Budget Status
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
            Monthly category spending limits
          </p>
        </div>

        <button
          onClick={onManageBudgets}
          className="flex items-center gap-1 text-xs font-semibold text-[#4B5563] hover:text-[#0F1115] dark:text-[#9DA3AD] dark:hover:text-[#F4F1EA] transition-colors"
        >
          <span>Manage</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {budgets.length === 0 ? (
        <div className="py-8 text-center space-y-2">
          <p className="text-sm text-[#6B7280] dark:text-[#9DA3AD]">No monthly budgets configured yet.</p>
          <button
            onClick={onManageBudgets}
            className="text-xs font-semibold text-[#15181D] dark:text-[#F4F1EA] underline hover:opacity-80"
          >
            + Set Category Budgets
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {budgets.slice(0, 4).map((b) => {
            const percentage = Math.min(100, b.percentage || 0);
            const isDanger = b.percentage >= 90;
            const isWarning = b.percentage >= 70 && b.percentage < 90;

            let barColor = 'bg-[#45B97C]';
            if (isDanger) barColor = 'bg-[#D95C68]';
            else if (isWarning) barColor = 'bg-[#94A3B8] dark:bg-[#6F7680]';

            return (
              <div key={b._id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#0F1115] dark:text-[#F4F1EA]">
                      {b.category}
                    </span>
                    {isDanger && (
                      <span className="flex items-center gap-1 text-[10px] text-[#D95C68] font-bold">
                        <AlertTriangle className="w-3 h-3" /> Over 90%
                      </span>
                    )}
                  </div>
                  <span className="text-[#6B7280] dark:text-[#9DA3AD]">
                    <strong className="text-[#0F1115] dark:text-[#F4F1EA]">
                      {formatCurrency(b.spent, currency)}
                    </strong>{' '}
                    / {formatCurrency(b.limit, currency)}
                  </span>
                </div>

                {/* Progress Bar Track */}
                <div className="w-full h-2 rounded-full bg-[#F1F3F6] dark:bg-[#15181D] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
