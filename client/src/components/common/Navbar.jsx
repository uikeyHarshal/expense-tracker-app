import React from 'react';
import {
  Menu,
  Plus,
  Moon,
  Sun,
  Wallet,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = ({ onOpenAddModal, onToggleSidebar, activePage }) => {
  const { user, currency } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#15181D]/90 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#2C323A] transition-colors">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-[#6B7280] hover:text-[#0F1115] dark:text-[#9DA3AD] dark:hover:text-[#F4F1EA] rounded-xl hover:bg-[#F1F3F6] dark:hover:bg-[#22272F] lg:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#0F1115] dark:text-[#F4F1EA] capitalize">
              {activePage || 'Dashboard'}
            </h1>
            <p className="text-xs text-[#6B7280] dark:text-[#9DA3AD] hidden sm:block">
              Track, budget, and master your financial health
            </p>
          </div>
        </div>

        {/* Right Side: Quick Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Add Transaction */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold bg-[#15181D] hover:bg-[#22272F] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:hover:bg-white dark:text-[#0F1115] shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 text-[#6B7280] hover:text-[#0F1115] dark:text-[#9DA3AD] dark:hover:text-[#F4F1EA] rounded-xl hover:bg-[#F1F3F6] dark:hover:bg-[#22272F] border border-[#E2E8F0] dark:border-[#2C323A] transition-colors"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#F4F1EA]" />
            ) : (
              <Moon className="w-4 h-4 text-[#15181D]" />
            )}
          </button>

          {/* User Currency Badge */}
          <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F1F3F6] dark:bg-[#1A1E24] text-[#0F1115] dark:text-[#F4F1EA] border border-[#E2E8F0] dark:border-[#2C323A]">
            <Wallet className="w-3.5 h-3.5 text-[#6B7280] dark:text-[#9DA3AD]" />
            <span>{currency}</span>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0] dark:border-[#2C323A]">
            <div className="w-8 h-8 rounded-full bg-[#15181D] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:text-[#0F1115] flex items-center justify-center text-xs font-bold shadow-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-[#0F1115] dark:text-[#F4F1EA] leading-tight">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-[#6B7280] dark:text-[#9DA3AD] truncate max-w-[100px]">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
