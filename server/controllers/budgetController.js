import mongoose from 'mongoose';
import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';

// @desc    Get all budgets for user with current spend calculation
// @route   GET /api/budgets
// @access  Private
export const getBudgets = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const currentMonth = month ? parseInt(month, 10) : new Date().getMonth() + 1;
    const currentYear = year ? parseInt(year, 10) : new Date().getFullYear();

    const budgets = await Budget.find({
      user: req.user._id,
      month: currentMonth,
      year: currentYear,
    });

    // Date range for current month
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);

    // Aggregate expenses for this month grouped by category
    const categorySpending = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
          type: 'expense',
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: '$category',
          spent: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    const spendingMap = {};
    categorySpending.forEach((item) => {
      spendingMap[item._id] = item.spent;
    });

    // Merge budgets with actual spending
    const budgetListWithProgress = budgets.map((b) => {
      const spent = spendingMap[b.category] || 0;
      const remaining = Math.max(0, b.limit - spent);
      const percentage = Math.round((spent / b.limit) * 100);
      const isOverBudget = spent > b.limit;

      return {
        _id: b._id,
        category: b.category,
        limit: b.limit,
        month: b.month,
        year: b.year,
        spent,
        remaining,
        percentage,
        isOverBudget,
        createdAt: b.createdAt,
      };
    });

    // Calculate total budget & total spent
    const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0);
    const totalBudgetedSpent = budgetListWithProgress.reduce((acc, b) => acc + b.spent, 0);

    res.json({
      success: true,
      month: currentMonth,
      year: currentYear,
      totalBudget,
      totalBudgetedSpent,
      data: budgetListWithProgress,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update a category budget
// @route   POST /api/budgets
// @access  Private
export const setBudget = async (req, res, next) => {
  try {
    const { category, limit, month, year } = req.body;

    if (!category || limit === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category and budget limit',
      });
    }

    const currentMonth = month || new Date().getMonth() + 1;
    const currentYear = year || new Date().getFullYear();

    // Find and update or create (upsert)
    const budget = await Budget.findOneAndUpdate(
      {
        user: req.user._id,
        category,
        month: currentMonth,
        year: currentYear,
      },
      {
        user: req.user._id,
        category,
        limit: Number(limit),
        month: currentMonth,
        year: currentYear,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Budget saved successfully',
      data: budget,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a budget
// @route   DELETE /api/budgets/:id
// @access  Private
export const deleteBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: 'Budget not found',
      });
    }

    if (budget.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this budget',
      });
    }

    await Budget.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Budget deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
