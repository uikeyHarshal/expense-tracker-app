import React, { useState } from 'react';
import { Plus, Target, PiggyBank } from 'lucide-react';
import { BudgetCard } from '../components/budgets/BudgetCard';
import { BudgetFormModal } from '../components/budgets/BudgetFormModal';
import { SavingsGoalCard } from '../components/budgets/SavingsGoalCard';
import { GoalFormModal } from '../components/budgets/GoalFormModal';
import { ContributeGoalModal } from '../components/budgets/ContributeGoalModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';

export const BudgetsPage = () => {
  const { currency } = useAuth();
  const {
    budgets,
    goals,
    deleteBudget,
    deleteGoal,
  } = useTransactions();

  // Modals state
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [contributeGoal, setContributeGoal] = useState(null);

  // Delete confirms state
  const [deletingBudget, setDeletingBudget] = useState(null);
  const [deletingGoal, setDeletingGoal] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Overall calculations
  const totalBudgetLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalBudgetSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const overallPercentage =
    totalBudgetLimit > 0
      ? Math.min(100, Math.round((totalBudgetSpent / totalBudgetLimit) * 100))
      : 0;

  const handleConfirmDeleteBudget = async () => {
    if (!deletingBudget) return;
    setDeleteLoading(true);
    await deleteBudget(deletingBudget._id, deletingBudget.month, deletingBudget.year);
    setDeleteLoading(false);
    setDeletingBudget(null);
  };

  const handleConfirmDeleteGoal = async () => {
    if (!deletingGoal) return;
    setDeleteLoading(true);
    await deleteGoal(deletingGoal._id);
    setDeleteLoading(false);
    setDeletingGoal(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F1115] dark:text-[#F4F1EA]">
            Budgets & Savings Goals
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9DA3AD]">
            Set spending limits to save more and reach your financial targets
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBudgetModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#15181D] hover:bg-[#22272F] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:hover:bg-white dark:text-[#0F1115] font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Set Budget</span>
          </button>

          <button
            onClick={() => setIsGoalModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#45B97C] hover:bg-[#3aa36c] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#45B97C]/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>New Goal</span>
          </button>
        </div>
      </div>

      {/* Monthly Budget Summary Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#0F1115] dark:text-[#F4F1EA]">
              Monthly Budget Health
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD]">
              Total allocated budget across all categories
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xl font-extrabold text-[#0F1115] dark:text-[#F4F1EA]">
              {formatCurrency(totalBudgetSpent, currency)}
            </span>
            <span className="text-xs text-[#6B7280] dark:text-[#9DA3AD] ml-1">
              / {formatCurrency(totalBudgetLimit, currency)}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 rounded-full bg-[#F1F3F6] dark:bg-[#15181D] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                overallPercentage >= 90
                  ? 'bg-[#D95C68]'
                  : overallPercentage >= 75
                  ? 'bg-[#64748B] dark:bg-[#9DA3AD]'
                  : 'bg-[#45B97C]'
              }`}
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-[#9DA3AD]">
            <span>{overallPercentage}% of monthly budget spent</span>
            <span>
              {totalBudgetLimit >= totalBudgetSpent
                ? `${formatCurrency(totalBudgetLimit - totalBudgetSpent, currency)} remaining`
                : `Over budget by ${formatCurrency(totalBudgetSpent - totalBudgetLimit, currency)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Category Budgets Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#0F1115] dark:text-[#F4F1EA] flex items-center gap-2">
            <Target className="w-5 h-5 text-[#15181D] dark:text-[#F4F1EA]" />
            <span>Category Spending Limits</span>
          </h3>
          <span className="text-xs text-[#6B7280] dark:text-[#9DA3AD] font-semibold">
            {budgets.length} {budgets.length === 1 ? 'Budget' : 'Budgets'}
          </span>
        </div>

        {budgets.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] text-center space-y-3">
            <p className="text-sm text-[#6B7280] dark:text-[#9DA3AD]">No category budgets created yet.</p>
            <button
              onClick={() => setIsBudgetModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F1F3F6] text-[#15181D] hover:bg-[#E2E8F0] border border-[#E2E8F0] dark:bg-[#22272F] dark:text-[#F4F1EA] dark:hover:bg-[#2C323A] dark:border-[#2C323A] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Set Your First Budget
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget._id}
                budget={budget}
                onDelete={(b) => setDeletingBudget(b)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Savings Goals Grid */}
      <div className="space-y-4 pt-4 border-t border-[#E2E8F0] dark:border-[#2C323A]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#0F1115] dark:text-[#F4F1EA] flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-[#45B97C]" />
            <span>Savings Goals</span>
          </h3>
          <span className="text-xs text-[#6B7280] dark:text-[#9DA3AD] font-semibold">
            {goals.length} {goals.length === 1 ? 'Goal' : 'Goals'}
          </span>
        </div>

        {goals.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] text-center space-y-3">
            <p className="text-sm text-[#6B7280] dark:text-[#9DA3AD]">No savings goals created yet.</p>
            <button
              onClick={() => setIsGoalModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#45B97C]/10 text-[#45B97C] hover:bg-[#45B97C]/20 border border-[#45B97C]/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Start a Savings Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {goals.map((goal) => (
              <SavingsGoalCard
                key={goal._id}
                goal={goal}
                onContribute={(g) => setContributeGoal(g)}
                onDelete={(g) => setDeletingGoal(g)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <BudgetFormModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />

      <GoalFormModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
      />

      <ContributeGoalModal
        isOpen={!!contributeGoal}
        onClose={() => setContributeGoal(null)}
        goal={contributeGoal}
      />

      {/* Delete Budget Dialog */}
      <ConfirmDialog
        isOpen={!!deletingBudget}
        onClose={() => setDeletingBudget(null)}
        onConfirm={handleConfirmDeleteBudget}
        title="Delete Budget"
        message={`Are you sure you want to delete the budget limit for ${deletingBudget?.category}?`}
        confirmText="Delete Budget"
        loading={deleteLoading}
      />

      {/* Delete Goal Dialog */}
      <ConfirmDialog
        isOpen={!!deletingGoal}
        onClose={() => setDeletingGoal(null)}
        onConfirm={handleConfirmDeleteGoal}
        title="Delete Savings Goal"
        message={`Are you sure you want to delete goal "${deletingGoal?.title}"?`}
        confirmText="Delete Goal"
        loading={deleteLoading}
      />
    </div>
  );
};
