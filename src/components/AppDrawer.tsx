import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Home,
  Calendar,
  BookOpen,
  Trophy,
  Bell,
  Sparkles,
  Info,
  RotateCcw,
  CheckCircle2,
  PlusCircle,
  FileText,
} from 'lucide-react';
import { CurrentScreen, ActiveTab } from '../types';

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onNavigateScreen: (screen: CurrentScreen) => void;
  onOpenTour: () => void;
  onOpenAbout: () => void;
  onTriggerNotification: () => void;
  onResetData: () => void;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onNavigateScreen,
  onOpenTour,
  onOpenAbout,
  onTriggerNotification,
  onResetData,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Drawer content sliding from right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative ml-auto w-4/5 max-w-xs h-full bg-white shadow-2xl z-10 flex flex-col p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                  Organiza<span className="text-emerald-600">Aí</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                  E.E. MARIA BARBOSA LEITE
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Fechar menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation links */}
            <div className="py-4 space-y-1 flex-1 overflow-y-auto">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                Telas Principais
              </div>

              <button
                onClick={() => {
                  onNavigateTab('inicio');
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-left"
              >
                <Home size={16} className="text-emerald-600" />
                <span>Início (Resumo & Próximas)</span>
              </button>

              <button
                onClick={() => {
                  onNavigateTab('agenda');
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-left"
              >
                <Calendar size={16} className="text-emerald-600" />
                <span>Agenda (Cronológica & Prazos)</span>
              </button>

              <button
                onClick={() => {
                  onNavigateTab('materias');
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-left"
              >
                <BookOpen size={16} className="text-emerald-600" />
                <span>Matérias (Por Disciplina)</span>
              </button>

              <button
                onClick={() => {
                  onNavigateScreen({ type: 'progress' });
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-left"
              >
                <Trophy size={16} className="text-emerald-600" />
                <span>Meu Progresso (Concluídas)</span>
              </button>

              <button
                onClick={() => {
                  onNavigateScreen({ type: 'task-create' });
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-left"
              >
                <PlusCircle size={16} className="text-emerald-600" />
                <span>Nova Atividade (Cadastro)</span>
              </button>

              <div className="pt-4 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                Recursos do Protótipo
              </div>

              <button
                onClick={() => {
                  onOpenTour();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors text-left"
              >
                <Sparkles size={16} className="text-emerald-700" />
                <span>Tour da Apresentação (p. 12)</span>
              </button>

              <button
                onClick={() => {
                  onTriggerNotification();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors text-left"
              >
                <Bell size={16} className="text-amber-600" />
                <span>Simular Notificação Push</span>
              </button>

              <button
                onClick={() => {
                  onOpenAbout();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors text-left"
              >
                <Info size={16} className="text-blue-600" />
                <span>Sobre o Projeto & Equipe</span>
              </button>

              <button
                onClick={() => {
                  onResetData();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors text-left"
              >
                <RotateCcw size={16} className="text-slate-600" />
                <span>Restaurar Dados Originais</span>
              </button>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-100 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Desenvolvedores</p>
              <p className="text-[11px] font-semibold text-slate-700 mt-0.5">
                Anna Vitória · Carlos Henrique · Caroline · Cibely
              </p>
              <p className="text-[10px] text-emerald-700 font-medium mt-0.5">
                E.E. Maria Barbosa Leite
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
