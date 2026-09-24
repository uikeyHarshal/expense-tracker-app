import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please enter a transaction title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    amount: {
      type: Number,
      required: [true, 'Please enter an amount'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    type: {
      type: String,
      required: [true, 'Please specify transaction type (income/expense)'],
      enum: {
        values: ['income', 'expense'],
        message: '{VALUE} is not a supported transaction type',
      },
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Food & Dining',
        'Shopping',
        'Housing & Rent',
        'Utilities',
        'Transportation',
        'Entertainment',
        'Health & Medical',
        'Education',
        'Travel',
        'Salary',
        'Freelance',
        'Investments',
        'Gifts & Donations',
        'Other',
      ],
      index: true,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    paymentMethod: {
      type: String,
      default: 'Cash',
      enum: [
        'Cash',
        'Credit Card',
        'Debit Card',
        'Bank Transfer',
        'UPI',
        'PayPal',
        'Other',
      ],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for fast query performance
transactionSchema.index({ user: 1, date: -1 });
transactionSchema.index({ user: 1, type: 1, date: -1 });
transactionSchema.index({ user: 1, category: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
