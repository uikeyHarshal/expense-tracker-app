import React from 'react';
import {
  UtensilsCrossed,
  ShoppingBag,
  Home,
  Zap,
  Car,
  Film,
  HeartPulse,
  GraduationCap,
  Plane,
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  MoreHorizontal,
} from 'lucide-react';
import { CATEGORIES } from './constants';

export const formatCurrency = (amount = 0, currency = '$') => {
  const num = Number(amount) || 0;
  return `${currency}${num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatShortDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const getCategoryIcon = (categoryName, className = 'w-5 h-5') => {
  switch (categoryName) {
    case 'Food & Dining':
      return <UtensilsCrossed className={className} />;
    case 'Shopping':
      return <ShoppingBag className={className} />;
    case 'Housing & Rent':
      return <Home className={className} />;
    case 'Utilities':
      return <Zap className={className} />;
    case 'Transportation':
      return <Car className={className} />;
    case 'Entertainment':
      return <Film className={className} />;
    case 'Health & Medical':
      return <HeartPulse className={className} />;
    case 'Education':
      return <GraduationCap className={className} />;
    case 'Travel':
      return <Plane className={className} />;
    case 'Salary':
      return <Briefcase className={className} />;
    case 'Freelance':
      return <Laptop className={className} />;
    case 'Investments':
      return <TrendingUp className={className} />;
    case 'Gifts & Donations':
      return <Gift className={className} />;
    default:
      return <MoreHorizontal className={className} />;
  }
};

export const getCategoryBadgeStyle = (categoryName) => {
  const cat = CATEGORIES[categoryName];
  if (cat && cat.bgColor) {
    return cat.bgColor;
  }
  return 'bg-[#22272F] text-[#9DA3AD] border-[#2C323A]';
};

export const getCategoryColor = (categoryName) => {
  const cat = CATEGORIES[categoryName];
  return cat ? cat.color : '#9DA3AD';
};
