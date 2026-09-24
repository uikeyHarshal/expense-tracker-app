import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';

export const Toast = () => {
  const { toast, hideToast } = useTransactions();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-md">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md transition-all ${
          isSuccess
            ? 'bg-white dark:bg-[#1A1E24] border-[#45B97C]/50 text-[#0F1115] dark:text-[#F4F1EA]'
            : isError
            ? 'bg-white dark:bg-[#1A1E24] border-[#D95C68]/50 text-[#0F1115] dark:text-[#F4F1EA]'
            : 'bg-white dark:bg-[#1A1E24] border-[#CBD5E1] dark:border-[#2C323A] text-[#0F1115] dark:text-[#F4F1EA]'
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#45B97C] shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-[#D95C68] shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-[#64748b] dark:text-[#9DA3AD] shrink-0" />}

        <p className="text-sm font-medium pr-2 text-[#0F1115] dark:text-[#F4F1EA]">{toast.message}</p>

        <button
          onClick={hideToast}
          className="p-1 rounded-lg hover:bg-[#F1F3F6] dark:hover:bg-[#22272F] transition-colors shrink-0 text-[#6B7280] dark:text-[#9DA3AD] hover:text-[#0F1115] dark:hover:text-[#F4F1EA]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
