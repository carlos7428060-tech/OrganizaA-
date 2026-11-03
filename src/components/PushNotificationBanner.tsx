import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { NotificationToast } from '../types';

interface PushNotificationBannerProps {
  notification: NotificationToast | null;
  onDismiss: () => void;
  onOpenTask: (taskId: string) => void;
}

export const PushNotificationBanner: React.FC<PushNotificationBannerProps> = ({
  notification,
  onDismiss,
  onOpenTask,
}) => {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          className="absolute top-10 left-3 right-3 z-50 pointer-events-auto"
        >
          <div
            onClick={() => {
              if (notification.taskId) {
                onOpenTask(notification.taskId);
              }
              onDismiss();
            }}
            className="bg-slate-900/95 backdrop-blur-lg text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700/50 flex items-start gap-3 cursor-pointer hover:bg-slate-800 transition-colors"
          >
            {/* App Icon badge */}
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center shrink-0 shadow-sm text-sm">
              Aí
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                <span className="font-semibold text-emerald-400">OrganizaAí</span>
                <span>agora</span>
              </div>
              <p className="text-xs font-bold text-white tracking-tight leading-tight">
                {notification.title}
              </p>
              <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5 leading-snug">
                {notification.message}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Fechar notificação"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
