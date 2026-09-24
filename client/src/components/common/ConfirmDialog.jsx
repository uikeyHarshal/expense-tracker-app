import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Delete',
  confirmVariant = 'danger',
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center space-y-4 pt-2">
        <div className="w-14 h-14 rounded-2xl bg-[#D95C68]/10 text-[#D95C68] flex items-center justify-center border border-[#D95C68]/20">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <p className="text-sm text-[#4B5563] dark:text-[#9DA3AD]">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3 w-full pt-4 border-t border-[#E2E8F0] dark:border-[#2C323A]">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2.5 text-sm font-medium rounded-xl border border-[#E2E8F0] dark:border-[#2C323A] text-[#4B5563] dark:text-[#9DA3AD] hover:bg-[#F1F3F6] dark:hover:bg-[#22272F] hover:text-[#0F1115] dark:hover:text-[#F4F1EA] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all ${
              confirmVariant === 'danger'
                ? 'bg-[#D95C68] hover:bg-[#c44753] text-white shadow-md shadow-[#D95C68]/20'
                : 'bg-[#15181D] hover:bg-[#22272F] text-[#F4F1EA] dark:bg-[#F4F1EA] dark:hover:bg-white dark:text-[#0F1115] shadow-md'
            } disabled:opacity-50`}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
