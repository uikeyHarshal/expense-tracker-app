import React from 'react';
import {
  PieChart as PieIcon,
  TrendingDown,
  CreditCard,
  Percent,
} from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { formatCurrency } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

export const AnalyticsOverview = ({ summary }) => {
  const { currency } = useAuth();

  if (!summary) return null;

  const {
    totalIncome = 0,
    totalExpense = 0,
    savingsRate = 0,
    categoryExpenses = [],
    monthlyTrends = [],
  } = summary;

  const topExpenseCategory = categoryExpenses.length > 0 ? categoryExpenses[0] : null;

  // Calculate average monthly expense
  const totalMonths = Math.max(1, monthlyTrends.length);
  const avgMonthlyExpense =
    monthlyTrends.reduce((acc, curr) => acc + curr.expense, 0) / totalMonths;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard
        title="Top Expense Category"
        value={topExpenseCategory ? topExpenseCategory.category : 'None'}
        icon={PieIcon}
        variant="amber"
        subtitle={
          topExpenseCategory
            ? `${formatCurrency(topExpenseCategory.amount, currency)} (${topExpenseCategory.percentage}%)`
            : 'No data'
        }
      />

      <StatCard
        title="Avg. Monthly Spend"
        value={formatCurrency(avgMonthlyExpense, currency)}
        icon={TrendingDown}
        variant="rose"
        subtitle={`Computed over past ${totalMonths} active months`}
      />

      <StatCard
        title="Savings Efficiency"
        value={`${savingsRate}%`}
        icon={Percent}
        variant={savingsRate > 20 ? 'emerald' : 'indigo'}
        badgeText={savingsRate > 20 ? 'Strong' : 'Moderate'}
        badgeType={savingsRate > 20 ? 'positive' : 'warning'}
        subtitle="Income retained after all expenses"
      />

      <StatCard
        title="Income : Expense Ratio"
        value={
          totalExpense > 0
            ? `${(totalIncome / totalExpense).toFixed(2)} : 1`
            : 'N/A'
        }
        icon={CreditCard}
        variant="indigo"
        subtitle="Financial stability indicator"
      />
    </div>
  );
};
