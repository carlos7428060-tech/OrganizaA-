import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface FeedbackToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const FeedbackToast: React.FC<FeedbackToastProps> = ({
  toast,
  onDismiss,
}) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="absolute bottom-20 left-4 right-4 z-50 pointer-events-auto"
        >
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-slate-700/60">
            <div className="flex items-center gap-2.5 min-w-0">
              {toast.type === 'success' && (
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              )}
              {toast.type === 'info' && (
                <Info size={18} className="text-blue-400 shrink-0" />
              )}
              {toast.type === 'error' && (
                <AlertCircle size={18} className="text-rose-400 shrink-0" />
              )}
              <span className="text-xs font-semibold tracking-tight truncate">
                {toast.text}
              </span>
            </div>
            <button
              onClick={onDismiss}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors shrink-0"
              aria-label="Fechar aviso"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
