import React from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { StatCardSkeleton } from '../common/LoadingSkeleton';
import { formatCurrency } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

export const OverviewMetrics = ({ summary, loading }) => {
  const { currency, user } = useAuth();

  if (loading || !summary) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  const {
    totalIncome = 0,
    totalExpense = 0,
    netBalance = 0,
    savingsRate = 0,
    thisMonth = { income: 0, expense: 0, net: 0 },
  } = summary;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Net Balance */}
      <StatCard
        title="Total Balance"
        value={formatCurrency(netBalance, currency)}
        icon={Wallet}
        variant={netBalance >= 0 ? 'indigo' : 'rose'}
        badgeText={netBalance >= 0 ? 'Healthy' : 'Deficit'}
        badgeType={netBalance >= 0 ? 'positive' : 'negative'}
        subtitle={`All-time lifetime balance`}
      />

      {/* Monthly Income */}
      <StatCard
        title="Income (This Month)"
        value={formatCurrency(thisMonth.income, currency)}
        icon={TrendingUp}
        variant="emerald"
        badgeText={`+${formatCurrency(thisMonth.income, currency)}`}
        badgeType="positive"
        subtitle={`Total all-time: ${formatCurrency(totalIncome, currency)}`}
      />

      {/* Monthly Expense */}
      <StatCard
        title="Spent (This Month)"
        value={formatCurrency(thisMonth.expense, currency)}
        icon={TrendingDown}
        variant="rose"
        badgeText={`-${formatCurrency(thisMonth.expense, currency)}`}
        badgeType="negative"
        subtitle={`Total all-time: ${formatCurrency(totalExpense, currency)}`}
      />

      {/* Savings Rate / Target */}
      <StatCard
        title="Savings Rate"
        value={`${savingsRate}%`}
        icon={PiggyBank}
        variant={savingsRate > 20 ? 'emerald' : savingsRate > 0 ? 'amber' : 'rose'}
        badgeText={savingsRate >= 20 ? 'Great' : savingsRate > 0 ? 'Moderate' : 'Low'}
        badgeType={savingsRate >= 20 ? 'positive' : savingsRate > 0 ? 'warning' : 'negative'}
        subtitle={
          user?.monthlyBudget
            ? `Budget: ${formatCurrency(user.monthlyBudget, currency)}/mo`
            : 'Track your savings pace'
        }
      />
    </div>
  );
};
