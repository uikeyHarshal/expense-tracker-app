export const CATEGORIES = {
  // Expense Categories
  'Food & Dining': {
    name: 'Food & Dining',
    type: 'expense',
    color: '#f97316', // orange
    bgColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    icon: 'UtensilsCrossed',
  },
  'Shopping': {
    name: 'Shopping',
    type: 'expense',
    color: '#ec4899', // pink
    bgColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    icon: 'ShoppingBag',
  },
  'Housing & Rent': {
    name: 'Housing & Rent',
    type: 'expense',
    color: '#8b5cf6', // purple
    bgColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    icon: 'Home',
  },
  'Utilities': {
    name: 'Utilities',
    type: 'expense',
    color: '#06b6d4', // cyan
    bgColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    icon: 'Zap',
  },
  'Transportation': {
    name: 'Transportation',
    type: 'expense',
    color: '#3b82f6', // blue
    bgColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    icon: 'Car',
  },
  'Entertainment': {
    name: 'Entertainment',
    type: 'expense',
    color: '#a855f7', // violet
    bgColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    icon: 'Film',
  },
  'Health & Medical': {
    name: 'Health & Medical',
    type: 'expense',
    color: '#D95C68', // Error
    bgColor: 'bg-[#D95C68]/10 text-[#D95C68] border-[#D95C68]/20',
    icon: 'HeartPulse',
  },
  'Education': {
    name: 'Education',
    type: 'expense',
    color: '#14b8a6', // teal
    bgColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    icon: 'GraduationCap',
  },
  'Travel': {
    name: 'Travel',
    type: 'expense',
    color: '#D6A84F', // Gold
    bgColor: 'bg-[#D6A84F]/10 text-[#D6A84F] border-[#D6A84F]/20',
    icon: 'Plane',
  },
  // Income Categories
  'Salary': {
    name: 'Salary',
    type: 'income',
    color: '#45B97C', // Success
    bgColor: 'bg-[#45B97C]/10 text-[#45B97C] border-[#45B97C]/20',
    icon: 'Briefcase',
  },
  'Freelance': {
    name: 'Freelance',
    type: 'income',
    color: '#D6A84F', // Gold
    bgColor: 'bg-[#D6A84F]/10 text-[#D6A84F] border-[#D6A84F]/20',
    icon: 'Laptop',
  },
  'Investments': {
    name: 'Investments',
    type: 'income',
    color: '#3aa36c',
    bgColor: 'bg-[#45B97C]/10 text-[#45B97C] border-[#45B97C]/20',
    icon: 'TrendingUp',
  },
  'Gifts & Donations': {
    name: 'Gifts & Donations',
    type: 'income',
    color: '#d946ef', // fuchsia
    bgColor: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
    icon: 'Gift',
  },
  'Other': {
    name: 'Other',
    type: 'both',
    color: '#9DA3AD', // Secondary Text
    bgColor: 'bg-[#22272F] text-[#9DA3AD] border-[#2C323A]',
    icon: 'MoreHorizontal',
  },
};

export const PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'UPI',
  'PayPal',
  'Other',
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', label: '$ USD - US Dollar' },
  { code: 'INR', symbol: '₹', label: '₹ INR - Indian Rupee' },
  { code: 'EUR', symbol: '€', label: '€ EUR - Euro' },
  { code: 'GBP', symbol: '£', label: '£ GBP - British Pound' },
  { code: 'JPY', symbol: '¥', label: '¥ JPY - Japanese Yen' },
  { code: 'CAD', symbol: 'C$', label: 'C$ CAD - Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'A$ AUD - Australian Dollar' },
  { code: 'CHF', symbol: 'CHF', label: 'CHF - Swiss Franc' },
];

export const EXPENSE_CATEGORIES = Object.keys(CATEGORIES).filter(
  (c) => CATEGORIES[c].type === 'expense' || CATEGORIES[c].type === 'both'
);

export const INCOME_CATEGORIES = Object.keys(CATEGORIES).filter(
  (c) => CATEGORIES[c].type === 'income' || CATEGORIES[c].type === 'both'
);
