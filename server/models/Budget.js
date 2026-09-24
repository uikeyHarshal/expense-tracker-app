import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Please specify category for budget'],
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
        'Other',
      ],
    },
    limit: {
      type: Number,
      required: [true, 'Please set a budget limit'],
      min: [1, 'Budget limit must be at least 1'],
    },
    month: {
      type: Number,
      default: () => new Date().getMonth() + 1, // 1 to 12
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique budget per user per category per month/year
budgetSchema.index({ user: 1, category: 1, month: 1, year: 1 }, { unique: true });

const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;
