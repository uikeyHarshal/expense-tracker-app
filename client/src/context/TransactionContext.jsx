import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { transactionAPI, budgetAPI, goalAPI } from '../services/api';
import { useAuth } from './AuthContext';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // State
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Pagination & Filtering state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    count: 0,
  });

  const [filteredSummary, setFilteredSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    paymentMethod: 'all',
    startDate: '',
    endDate: '',
    sortBy: 'date',
    sortOrder: 'desc',
    page: 1,
    limit: 15,
  });

  // Helper to show toasts
  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Fetch Summary for Dashboard
  const fetchSummary = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setSummaryLoading(true);
      const { data } = await transactionAPI.getSummary();
      setSummary(data.data);
    } catch (err) {
      console.error('Failed to fetch summary:', err);
    } finally {
      setSummaryLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch Transactions with current or custom filters
  const fetchTransactions = useCallback(
    async (customFilters = {}) => {
      if (!isAuthenticated) return;
      try {
        setLoading(true);
        const queryParams = { ...filters, ...customFilters };
        const { data } = await transactionAPI.getAll(queryParams);
        setTransactions(data.data);
        setPagination({
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          totalCount: data.totalCount,
          count: data.count,
        });
        if (data.summary) {
          setFilteredSummary(data.summary);
        }
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
        showToast('Failed to load transactions', 'error');
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, filters]
  );

  // Fetch Budgets
  const fetchBudgets = useCallback(async (month, year) => {
    if (!isAuthenticated) return;
    try {
      const { data } = await budgetAPI.getAll({ month, year });
      setBudgets(data.data || []);
    } catch (err) {
      console.error('Failed to fetch budgets:', err);
    }
  }, [isAuthenticated]);

  // Fetch Goals
  const fetchGoals = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const { data } = await goalAPI.getAll();
      setGoals(data.data || []);
    } catch (err) {
      console.error('Failed to fetch goals:', err);
    }
  }, [isAuthenticated]);

  // Initial load when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchSummary();
      fetchTransactions();
      fetchBudgets();
      fetchGoals();
    }
  }, [isAuthenticated, fetchSummary, fetchTransactions, fetchBudgets, fetchGoals]);

  // Transactions Actions
  const addTransaction = async (transactionData) => {
    try {
      const { data } = await transactionAPI.create(transactionData);
      showToast('Transaction added successfully!', 'success');
      fetchTransactions();
      fetchSummary();
      fetchBudgets();
      return { success: true, data: data.data };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add transaction';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const updateTransaction = async (id, transactionData) => {
    try {
      const { data } = await transactionAPI.update(id, transactionData);
      showToast('Transaction updated successfully!', 'success');
      fetchTransactions();
      fetchSummary();
      fetchBudgets();
      return { success: true, data: data.data };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update transaction';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await transactionAPI.delete(id);
      showToast('Transaction deleted successfully', 'success');
      fetchTransactions();
      fetchSummary();
      fetchBudgets();
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete transaction';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  // Budget Actions
  const setBudget = async (budgetData) => {
    try {
      const { data } = await budgetAPI.set(budgetData);
      showToast('Budget saved successfully!', 'success');
      fetchBudgets(budgetData.month, budgetData.year);
      return { success: true, data: data.data };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to set budget';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const deleteBudget = async (id, month, year) => {
    try {
      await budgetAPI.delete(id);
      showToast('Budget deleted', 'success');
      fetchBudgets(month, year);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete budget';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  // Goal Actions
  const createGoal = async (goalData) => {
    try {
      const { data } = await goalAPI.create(goalData);
      showToast('Savings goal created!', 'success');
      fetchGoals();
      return { success: true, data: data.data };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create goal';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const updateGoal = async (id, goalData) => {
    try {
      const { data } = await goalAPI.update(id, goalData);
      showToast('Savings goal updated!', 'success');
      fetchGoals();
      return { success: true, data: data.data };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update goal';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  const deleteGoal = async (id) => {
    try {
      await goalAPI.delete(id);
      showToast('Goal removed', 'success');
      fetchGoals();
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to remove goal';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
  };

  // Export CSV
  const exportCSV = async () => {
    try {
      const response = await transactionAPI.exportCSV();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Expense_Report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('CSV Export downloaded successfully!', 'success');
    } catch (err) {
      console.error('Export CSV error:', err);
      showToast('Failed to export CSV', 'error');
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        summary,
        budgets,
        goals,
        loading,
        summaryLoading,
        pagination,
        filteredSummary,
        filters,
        setFilters,
        toast,
        showToast,
        hideToast,
        fetchSummary,
        fetchTransactions,
        fetchBudgets,
        fetchGoals,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        setBudget,
        deleteBudget,
        createGoal,
        updateGoal,
        deleteGoal,
        exportCSV,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
