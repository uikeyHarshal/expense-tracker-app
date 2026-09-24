import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  formatCurrency,
  getCategoryBadgeStyle,
  getCategoryColor,
  getCategoryIcon,
} from "../../utils/formatters";

export const CategoryBreakdown = ({ categories = [], totalExpense = 0 }) => {
  const { currency } = useAuth();

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm space-y-6">
      <div>
        <h3 className="text-base font-bold text-[#0F1115] dark:text-[#F4F1EA]">
          Category Spending Breakdown
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
          Detailed itemization of historical and monthly outflows
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-[#6B7280] dark:text-[#9DA3AD] py-6 text-center">
          No category expenses recorded yet.
        </p>
      ) : (
        <div className="space-y-4">
          {categories.map((cat, index) => {
            const percentage = Number(cat.percentage) || 0;
            const catColor = getCategoryColor(cat.category);

            return (
              <div key={index} className="space-y-1.5 group">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${getCategoryBadgeStyle(
                        cat.category,
                      )}`}
                    >
                      {getCategoryIcon(cat.category, "w-3.5 h-3.5")}
                    </div>
                    <div>
                      <span className="font-bold text-[#0F1115] dark:text-[#F4F1EA]">
                        {cat.category}
                      </span>
                      <span className="text-[10px] text-[#6B7280] dark:text-[#9DA3AD] ml-2">
                        ({cat.count}{" "}
                        {cat.count === 1 ? "transaction" : "transactions"})
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-[#0F1115] dark:text-[#F4F1EA]">
                      {formatCurrency(cat.amount, currency)}
                    </span>
                    <span className="text-[11px] text-[#6B7280] dark:text-[#9DA3AD] font-semibold ml-2">
                      {percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-[#F1F3F6] dark:bg-[#15181D] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: catColor,
                    }}
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
