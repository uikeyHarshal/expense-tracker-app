import mongoose from 'mongoose';
import Transaction from '../models/Transaction.js';

// @desc    Get all transactions with filtering, searching, sorting & pagination
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res, next) => {
  try {
    const {
      search,
      type,
      category,
      paymentMethod,
      startDate,
      endDate,
      sortBy = 'date',
      sortOrder = 'desc',
      page = 1,
      limit = 15,
    } = req.query;

    const query = { user: req.user._id };

    // Filter by type
    if (type && type !== 'all') {
      query.type = type;
    }

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by payment method
    if (paymentMethod && paymentMethod !== 'all') {
      query.paymentMethod = paymentMethod;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.date.$lte = end;
      }
    }

    // Search in title, notes, or category
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { notes: searchRegex },
        { category: searchRegex },
      ];
    }

    // Sorting
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 15;
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const totalCount = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Calculate sum of filtered items
    const totals = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
        },
      },
    ]);

    let filteredIncome = 0;
    let filteredExpense = 0;
    totals.forEach((item) => {
      if (item._id === 'income') filteredIncome = item.total;
      if (item._id === 'expense') filteredExpense = item.total;
    });

    res.json({
      success: true,
      count: transactions.length,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
      summary: {
        income: filteredIncome,
        expense: filteredExpense,
        balance: filteredIncome - filteredExpense,
      },
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this transaction',
      });
    }

    res.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, category, date, paymentMethod, notes, tags } =
      req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, amount, type, and category',
      });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      amount: Number(amount),
      type,
      category,
      date: date ? new Date(date) : new Date(),
      paymentMethod: paymentMethod || 'Cash',
      notes: notes || '',
      tags: Array.isArray(tags) ? tags : [],
    });

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res, next) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this transaction',
      });
    }

    const { title, amount, type, category, date, paymentMethod, notes, tags } =
      req.body;

    if (title !== undefined) transaction.title = title;
    if (amount !== undefined) transaction.amount = Number(amount);
    if (type !== undefined) transaction.type = type;
    if (category !== undefined) transaction.category = category;
    if (date !== undefined) transaction.date = new Date(date);
    if (paymentMethod !== undefined) transaction.paymentMethod = paymentMethod;
    if (notes !== undefined) transaction.notes = notes;
    if (tags !== undefined) transaction.tags = Array.isArray(tags) ? tags : [];

    const updatedTransaction = await transaction.save();

    res.json({
      success: true,
      message: 'Transaction updated successfully',
      data: updatedTransaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this transaction',
      });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get comprehensive dashboard summary & stats
// @route   GET /api/transactions/summary
// @access  Private
export const getTransactionSummary = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // 1. Overall lifetime totals
    const overallTotals = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;
    overallTotals.forEach((item) => {
      if (item._id === 'income') totalIncome = item.total;
      if (item._id === 'expense') totalExpense = item.total;
    });

    const netBalance = totalIncome - totalExpense;
    const savingsRate =
      totalIncome > 0
        ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
        : 0;

    // 2. This month totals
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const thisMonthTotals = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
        },
      },
    ]);

    let thisMonthIncome = 0;
    let thisMonthExpense = 0;
    thisMonthTotals.forEach((item) => {
      if (item._id === 'income') thisMonthIncome = item.total;
      if (item._id === 'expense') thisMonthExpense = item.total;
    });

    // 3. Category Breakdown for Expenses (This month & All time)
    const categoryExpenses = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: 'expense',
        },
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    const formattedCategoryExpenses = categoryExpenses.map((cat) => ({
      category: cat._id,
      amount: cat.total,
      count: cat.count,
      percentage: totalExpense > 0 ? ((cat.total / totalExpense) * 100).toFixed(1) : 0,
    }));

    // 4. Monthly Trend (Past 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyTrends = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            type: '$type',
          },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Format monthly data for chart
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyDataMap = {};

    // Initialize last 6 months in order
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      monthlyDataMap[key] = {
        name: `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`,
        income: 0,
        expense: 0,
        net: 0,
      };
    }

    monthlyTrends.forEach((item) => {
      const key = `${item._id.year}-${item._id.month}`;
      if (monthlyDataMap[key]) {
        if (item._id.type === 'income') {
          monthlyDataMap[key].income = item.total;
        } else if (item._id.type === 'expense') {
          monthlyDataMap[key].expense = item.total;
        }
        monthlyDataMap[key].net =
          monthlyDataMap[key].income - monthlyDataMap[key].expense;
      }
    });

    const monthlyChartData = Object.values(monthlyDataMap);

    // 5. Payment Methods Breakdown
    const paymentMethods = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$paymentMethod',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    // 6. Recent 5 transactions
    const recentTransactions = await Transaction.find({ user: userId })
      .sort({ date: -1, createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        netBalance,
        savingsRate,
        thisMonth: {
          income: thisMonthIncome,
          expense: thisMonthExpense,
          net: thisMonthIncome - thisMonthExpense,
        },
        categoryExpenses: formattedCategoryExpenses,
        monthlyTrends: monthlyChartData,
        paymentMethods: paymentMethods.map((pm) => ({
          method: pm._id || 'Cash',
          total: pm.total,
          count: pm.count,
        })),
        recentTransactions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export transactions as CSV
// @route   GET /api/transactions/export
// @access  Private
export const exportTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({
      date: -1,
    });

    const csvHeaders = 'Date,Title,Type,Category,Amount,Payment Method,Notes\n';
    const csvRows = transactions
      .map((t) => {
        const dateStr = new Date(t.date).toISOString().split('T')[0];
        const cleanTitle = `"${(t.title || '').replace(/"/g, '""')}"`;
        const cleanNotes = `"${(t.notes || '').replace(/"/g, '""')}"`;
        return `${dateStr},${cleanTitle},${t.type},${t.category},${t.amount},${t.paymentMethod},${cleanNotes}`;
      })
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=expenses_export_${Date.now()}.csv`
    );
    res.status(200).send(csvHeaders + csvRows);
  } catch (error) {
    next(error);
  }
};
