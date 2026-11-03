import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isDestructive = true,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 z-10 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              {isDestructive ? <Trash2 size={24} /> : <AlertTriangle size={24} />}
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">{message}</p>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onConfirm}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-[0.98] ${
                  isDestructive
                    ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-600/20'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {confirmLabel}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2.5 px-4 rounded-xl font-medium text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {cancelLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
