import React from "react";
import { Plus } from "lucide-react";
import { OverviewMetrics } from "../components/dashboard/OverviewMetrics";
import { CashflowChart } from "../components/dashboard/CashflowChart";
import { CategoryPieChart } from "../components/dashboard/CategoryPieChart";
import { MonthlyComparisonChart } from "../components/dashboard/MonthlyComparisonChart";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { BudgetProgressWidget } from "../components/dashboard/BudgetProgressWidget";
import { useTransactions } from "../context/TransactionContext";
import { useAuth } from "../context/AuthContext";

export const DashboardPage = ({ onOpenAddModal, setActivePage }) => {
  const { user } = useAuth();
  const { summary, summaryLoading, budgets } = useTransactions();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-[#15181D] dark:via-[#1A1E24] dark:to-[#15181D] border border-[#E2E8F0] dark:border-[#2C323A] text-[#0F1115] dark:text-[#F4F1EA] shadow-sm dark:shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F1F3F6] text-[#4B5563] border border-[#E2E8F0] dark:bg-[#22272F] dark:text-[#9DA3AD] dark:border-[#2C323A]">
            Smart Financial Dashboard
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-[#0F1115] dark:text-[#F4F1EA]">
            Welcome back, {user?.name?.split(" ")[0] || "Friend"}!
          </h2>
          <p className="text-[#6B7280] dark:text-[#9DA3AD] text-xs sm:text-sm mt-1 max-w-md">
            Here is your financial snapshot. Keep your spending in check and
            stay ahead of your goals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15181D] hover:bg-[#22272F] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:hover:bg-white dark:text-[#0F1115] font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Transaction</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <OverviewMetrics summary={summary} loading={summaryLoading} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CashflowChart data={summary?.monthlyTrends} />
        </div>
        <div className="lg:col-span-1">
          <CategoryPieChart categories={summary?.categoryExpenses} />
        </div>
      </div>

      {/* Comparison, Budgets & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyComparisonChart data={summary?.monthlyTrends} />
        </div>
        <div className="lg:col-span-1">
          <BudgetProgressWidget
            budgets={budgets}
            onManageBudgets={() => setActivePage("budgets")}
          />
        </div>
      </div>

      {/* Recent Activity List */}
      <div>
        <RecentTransactions
          transactions={summary?.recentTransactions}
          onViewAll={() => setActivePage("transactions")}
          onOpenAddModal={onOpenAddModal}
        />
      </div>
    </div>
  );
};
