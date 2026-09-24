import React from 'react';
import { Download } from 'lucide-react';
import { AnalyticsOverview } from '../components/analytics/AnalyticsOverview';
import { CategoryBreakdown } from '../components/analytics/CategoryBreakdown';
import { SpendingTrends } from '../components/analytics/SpendingTrends';
import { useTransactions } from '../context/TransactionContext';

export const AnalyticsPage = () => {
  const { summary, exportCSV } = useTransactions();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F1115] dark:text-[#F4F1EA]">
            Analytics & Insights
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9DA3AD]">
            Understand your cashflow habits, top spending channels, and trends
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F1F3F6] text-[#0F1115] border border-[#E2E8F0] dark:bg-[#1A1E24] dark:hover:bg-[#22272F] dark:text-[#F4F1EA] dark:border-[#2C323A] shadow-sm font-bold text-xs sm:text-sm active:scale-95 transition-all"
        >
          <Download className="w-4 h-4 text-[#15181D] dark:text-[#F4F1EA]" />
          <span>Download Financial Report</span>
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <AnalyticsOverview summary={summary} />

      {/* Deep Category Itemization Breakdown */}
      <CategoryBreakdown
        categories={summary?.categoryExpenses}
        totalExpense={summary?.totalExpense}
      />

      {/* Net Trends & Payment Methods */}
      <SpendingTrends
        monthlyTrends={summary?.monthlyTrends}
        paymentMethods={summary?.paymentMethods}
      />
    </div>
  );
};
