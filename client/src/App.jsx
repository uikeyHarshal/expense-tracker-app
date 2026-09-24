import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Toast } from './components/common/Toast';
import { TransactionFormModal } from './components/transactions/TransactionFormModal';

import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { BudgetsPage } from './pages/BudgetsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export function App() {
  const { isAuthenticated, loading } = useAuth();

  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] dark:bg-[#0F1115] text-[#0F1115] dark:text-[#F4F1EA]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#15181D] dark:border-[#F4F1EA] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-[#6B7280] dark:text-[#9DA3AD]">Loading SmartSpend...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show Auth screens
  if (!isAuthenticated) {
    if (authView === 'register') {
      return <RegisterPage onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <LoginPage onSwitchToRegister={() => setAuthView('register')} />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0F1115] text-[#0F1115] dark:text-[#F4F1EA] transition-colors">
      {/* Toast Notification Container */}
      <Toast />

      {/* Global Add Transaction Modal */}
      <TransactionFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen bg-[#F8F9FA] dark:bg-[#0F1115]">
        <Navbar
          activePage={activePage}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activePage === 'dashboard' && (
            <DashboardPage
              onOpenAddModal={() => setIsAddModalOpen(true)}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'transactions' && (
            <TransactionsPage
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}

          {activePage === 'budgets' && <BudgetsPage />}

          {activePage === 'analytics' && <AnalyticsPage />}

          {activePage === 'profile' && <ProfilePage />}
        </main>
      </div>
    </div>
  );
}

export default App;
