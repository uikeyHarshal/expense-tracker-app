import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';
import Goal from '../models/Goal.js';

dotenv.config();

export const seedDemoData = async (userId) => {
  try {
    // Clean old data for this user
    await Transaction.deleteMany({ user: userId });
    await Budget.deleteMany({ user: userId });
    await Goal.deleteMany({ user: userId });

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const sampleTransactions = [
      // Current Month Incomes
      {
        user: userId,
        title: 'Monthly Tech Salary',
        amount: 5200,
        type: 'income',
        category: 'Salary',
        date: new Date(currentYear, currentMonth, 1),
        paymentMethod: 'Bank Transfer',
        notes: 'Monthly regular salary deposit',
        tags: ['salary', 'primary'],
      },
      {
        user: userId,
        title: 'Freelance UI/UX Project',
        amount: 1450,
        type: 'income',
        category: 'Freelance',
        date: new Date(currentYear, currentMonth, 12),
        paymentMethod: 'PayPal',
        notes: 'Mobile app redesign milestone 1',
        tags: ['freelance', 'design'],
      },
      {
        user: userId,
        title: 'Dividend Payout',
        amount: 280,
        type: 'income',
        category: 'Investments',
        date: new Date(currentYear, currentMonth, 18),
        paymentMethod: 'Bank Transfer',
        notes: 'Quarterly index fund dividend',
        tags: ['investing', 'passive'],
      },

      // Current Month Expenses
      {
        user: userId,
        title: 'Apartment Rent',
        amount: 1650,
        type: 'expense',
        category: 'Housing & Rent',
        date: new Date(currentYear, currentMonth, 2),
        paymentMethod: 'Bank Transfer',
        notes: 'Monthly downtown 1BR apartment rent',
        tags: ['rent', 'fixed'],
      },
      {
        user: userId,
        title: 'Whole Foods Grocery Run',
        amount: 215.40,
        type: 'expense',
        category: 'Food & Dining',
        date: new Date(currentYear, currentMonth, 4),
        paymentMethod: 'Credit Card',
        notes: 'Organic groceries & pantry restock',
        tags: ['groceries', 'food'],
      },
      {
        user: userId,
        title: 'High-Speed Fiber Internet & Electricity',
        amount: 142.50,
        type: 'expense',
        category: 'Utilities',
        date: new Date(currentYear, currentMonth, 6),
        paymentMethod: 'Debit Card',
        notes: '1Gbps internet + electric bill',
        tags: ['bills', 'utilities'],
      },
      {
        user: userId,
        title: 'Dinner at Italian Bistro',
        amount: 88.00,
        type: 'expense',
        category: 'Food & Dining',
        date: new Date(currentYear, currentMonth, 9),
        paymentMethod: 'Credit Card',
        notes: 'Dinner with friends',
        tags: ['dining', 'weekend'],
      },
      {
        user: userId,
        title: 'Gas & EV Charging',
        amount: 65.20,
        type: 'expense',
        category: 'Transportation',
        date: new Date(currentYear, currentMonth, 11),
        paymentMethod: 'Credit Card',
        notes: 'Weekly commute fuel and charging',
        tags: ['commute'],
      },
      {
        user: userId,
        title: 'Nike Running Shoes & Workout Gear',
        amount: 179.99,
        type: 'expense',
        category: 'Shopping',
        date: new Date(currentYear, currentMonth, 14),
        paymentMethod: 'Credit Card',
        notes: 'New marathon training shoes',
        tags: ['fitness', 'shopping'],
      },
      {
        user: userId,
        title: 'Streaming & Cloud Subscriptions',
        amount: 45.00,
        type: 'expense',
        category: 'Entertainment',
        date: new Date(currentYear, currentMonth, 16),
        paymentMethod: 'Credit Card',
        notes: 'Netflix, Spotify, ChatGPT Plus',
        tags: ['subscriptions'],
      },
      {
        user: userId,
        title: 'Dental Checkup & Cleaning',
        amount: 120.00,
        type: 'expense',
        category: 'Health & Medical',
        date: new Date(currentYear, currentMonth, 19),
        paymentMethod: 'Debit Card',
        notes: 'Routine 6-month checkup',
        tags: ['health'],
      },

      // Past 5 Months Historical Data for rich chart trends
      // Month -1
      {
        user: userId,
        title: 'Monthly Tech Salary',
        amount: 5200,
        type: 'income',
        category: 'Salary',
        date: new Date(currentYear, currentMonth - 1, 1),
        paymentMethod: 'Bank Transfer',
      },
      {
        user: userId,
        title: 'Freelance Consulting',
        amount: 950,
        type: 'income',
        category: 'Freelance',
        date: new Date(currentYear, currentMonth - 1, 15),
        paymentMethod: 'PayPal',
      },
      {
        user: userId,
        title: 'Rent & Living Expenses',
        amount: 2450,
        type: 'expense',
        category: 'Housing & Rent',
        date: new Date(currentYear, currentMonth - 1, 2),
        paymentMethod: 'Bank Transfer',
      },
      {
        user: userId,
        title: 'Weekend Getaway',
        amount: 620,
        type: 'expense',
        category: 'Travel',
        date: new Date(currentYear, currentMonth - 1, 20),
        paymentMethod: 'Credit Card',
      },
      {
        user: userId,
        title: 'Food & Groceries',
        amount: 580,
        type: 'expense',
        category: 'Food & Dining',
        date: new Date(currentYear, currentMonth - 1, 10),
        paymentMethod: 'Credit Card',
      },

      // Month -2
      {
        user: userId,
        title: 'Monthly Tech Salary',
        amount: 5200,
        type: 'income',
        category: 'Salary',
        date: new Date(currentYear, currentMonth - 2, 1),
        paymentMethod: 'Bank Transfer',
      },
      {
        user: userId,
        title: 'Stock Portfolio Returns',
        amount: 800,
        type: 'income',
        category: 'Investments',
        date: new Date(currentYear, currentMonth - 2, 14),
        paymentMethod: 'Bank Transfer',
      },
      {
        user: userId,
        title: 'Monthly Expenses & Rent',
        amount: 2850,
        type: 'expense',
        category: 'Housing & Rent',
        date: new Date(currentYear, currentMonth - 2, 3),
        paymentMethod: 'Bank Transfer',
      },
      {
        user: userId,
        title: 'Electronics Upgrade (Monitor)',
        amount: 499,
        type: 'expense',
        category: 'Shopping',
        date: new Date(currentYear, currentMonth - 2, 18),
        paymentMethod: 'Credit Card',
      },

      // Month -3
      {
        user: userId,
        title: 'Monthly Tech Salary',
        amount: 5200,
        type: 'income',
        category: 'Salary',
        date: new Date(currentYear, currentMonth - 3, 1),
        paymentMethod: 'Bank Transfer',
      },
      {
        user: userId,
        title: 'Bonus Payout',
        amount: 2000,
        type: 'income',
        category: 'Salary',
        date: new Date(currentYear, currentMonth - 3, 20),
        paymentMethod: 'Bank Transfer',
      },
      {
        user: userId,
        title: 'Monthly Expenses',
        amount: 2600,
        type: 'expense',
        category: 'Housing & Rent',
        date: new Date(currentYear, currentMonth - 3, 4),
        paymentMethod: 'Bank Transfer',
      },

      // Month -4
      {
        user: userId,
        title: 'Monthly Tech Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary',
        date: new Date(currentYear, currentMonth - 4, 1),
        paymentMethod: 'Bank Transfer',
      },
      {
        user: userId,
        title: 'Monthly Expenses',
        amount: 2350,
        type: 'expense',
        category: 'Housing & Rent',
        date: new Date(currentYear, currentMonth - 4, 5),
        paymentMethod: 'Bank Transfer',
      },

      // Month -5
      {
        user: userId,
        title: 'Monthly Tech Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary',
        date: new Date(currentYear, currentMonth - 5, 1),
        paymentMethod: 'Bank Transfer',
      },
      {
        user: userId,
        title: 'Monthly Expenses',
        amount: 2200,
        type: 'expense',
        category: 'Housing & Rent',
        date: new Date(currentYear, currentMonth - 5, 2),
        paymentMethod: 'Bank Transfer',
      },
    ];

    await Transaction.insertMany(sampleTransactions);

    // Seed Budgets for current month
    const sampleBudgets = [
      {
        user: userId,
        category: 'Food & Dining',
        limit: 600,
        month: currentMonth + 1,
        year: currentYear,
      },
      {
        user: userId,
        category: 'Housing & Rent',
        limit: 1700,
        month: currentMonth + 1,
        year: currentYear,
      },
      {
        user: userId,
        category: 'Shopping',
        limit: 350,
        month: currentMonth + 1,
        year: currentYear,
      },
      {
        user: userId,
        category: 'Transportation',
        limit: 200,
        month: currentMonth + 1,
        year: currentYear,
      },
      {
        user: userId,
        category: 'Entertainment',
        limit: 150,
        month: currentMonth + 1,
        year: currentYear,
      },
      {
        user: userId,
        category: 'Utilities',
        limit: 250,
        month: currentMonth + 1,
        year: currentYear,
      },
    ];

    await Budget.insertMany(sampleBudgets);

    // Seed Savings Goals
    const sampleGoals = [
      {
        user: userId,
        title: 'Emergency Rainy Day Fund',
        targetAmount: 10000,
        currentAmount: 7200,
        deadline: new Date(currentYear, 11, 31),
        category: 'Emergency',
        color: '#10b981',
      },
      {
        user: userId,
        title: 'Japan Vacation Trip',
        targetAmount: 4500,
        currentAmount: 2900,
        deadline: new Date(currentYear + 1, 3, 15),
        category: 'Travel',
        color: '#f59e0b',
      },
      {
        user: userId,
        title: 'New M4 MacBook Pro',
        targetAmount: 2400,
        currentAmount: 1850,
        deadline: new Date(currentYear, currentMonth + 2, 1),
        category: 'Gadgets',
        color: '#6366f1',
      },
    ];

    await Goal.insertMany(sampleGoals);

    console.log(`✅ Demo data seeded successfully for user ${userId}`);
  } catch (err) {
    console.error('Error seeding demo data:', err);
  }
};
