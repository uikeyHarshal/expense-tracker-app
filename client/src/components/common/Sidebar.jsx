import React from 'react';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  BarChart3,
  User,
  LogOut,
  Wallet,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ activePage, setActivePage, isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'budgets', label: 'Budgets & Goals', icon: Target },
    { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 },
    { id: 'profile', label: 'Settings & Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 dark:bg-[#0F1115]/75 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-[#15181D] border-r border-[#E2E8F0] dark:border-[#2C323A] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and Brand */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2C323A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#15181D] dark:bg-[#F4F1EA] flex items-center justify-center text-[#F4F1EA] dark:text-[#0F1115] shadow-sm font-bold">
                <Wallet className="w-5 h-5 text-[#F4F1EA] dark:text-[#0F1115]" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-[#0F1115] dark:text-[#F4F1EA]">
                  SmartSpend
                </span>
                <span className="block text-[10px] font-semibold tracking-wider text-[#6B7280] dark:text-[#9DA3AD] uppercase">
                  MERN Tracker
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="p-1.5 text-[#6B7280] hover:text-[#0F1115] dark:text-[#9DA3AD] dark:hover:text-[#F4F1EA] rounded-lg lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#15181D] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:text-[#0F1115] shadow-sm font-bold'
                      : 'text-[#6B7280] dark:text-[#9DA3AD] hover:text-[#0F1115] dark:hover:text-[#F4F1EA] hover:bg-[#F1F3F6] dark:hover:bg-[#22272F]'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive
                        ? 'scale-110 text-[#F4F1EA] dark:text-[#0F1115]'
                        : 'text-[#6B7280] dark:text-[#9DA3AD]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout Bottom */}
        <div className="p-4 border-t border-[#E2E8F0] dark:border-[#2C323A]">
          <div className="p-3 rounded-xl bg-[#F8F9FA] dark:bg-[#1A1E24] border border-[#E2E8F0] dark:border-[#2C323A] mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#15181D] dark:bg-[#F4F1EA] text-[#F4F1EA] dark:text-[#0F1115] flex items-center justify-center font-bold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#0F1115] dark:text-[#F4F1EA] truncate">
                  {user?.name || 'Smart User'}
                </p>
                <p className="text-[11px] text-[#6B7280] dark:text-[#9DA3AD] truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#D95C68] hover:bg-[#D95C68]/10 border border-transparent hover:border-[#D95C68]/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
