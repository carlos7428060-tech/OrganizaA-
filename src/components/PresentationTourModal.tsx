import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  CheckCircle2,
  Calendar,
  Bell,
  BookOpen,
  PlusCircle,
} from 'lucide-react';
import { CurrentScreen } from '../types';

interface PresentationTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToScreen: (screen: CurrentScreen) => void;
  onTriggerNotification: () => void;
  onMarkTaskCompleted?: (taskId: string) => void;
}

const TOUR_STEPS = [
  {
    step: '01',
    title: 'Cadastrar',
    tagline: 'Criar a atividade escolar',
    description:
      'Informar o título, a matéria, a entrega e a descrição. O formulário curto reúne apenas o essencial com validação visual imediata.',
    icon: PlusCircle,
    screenAction: { type: 'task-create', initialSubjectId: 'ciencias' } as CurrentScreen,
    actionButtonLabel: 'Ir para Nova Atividade',
  },
  {
    step: '02',
    title: 'Conferir',
    tagline: 'Visão centralizada e organizada',
    description:
      'O trabalho em grupo cadastrado aparece automaticamente na tela de Início, na matéria de Ciências e na Agenda cronológica.',
    icon: Calendar,
    screenAction: { type: 'home' } as CurrentScreen,
    actionButtonLabel: 'Ver na Tela Inicial',
  },
  {
    step: '03',
    title: 'Programar',
    tagline: 'Definir horário de aviso',
    description:
      'Escolher o lembrete programado (ex: 1 dia antes da entrega, às 18h). O aluno decide a antecedência e o momento de ser lembrado.',
    icon: Bell,
    screenAction: { type: 'reminders', taskId: 'task-1' } as CurrentScreen,
    actionButtonLabel: 'Abrir Lembretes',
  },
  {
    step: '04',
    title: 'Receber o aviso',
    tagline: 'Notificação inteligente',
    description:
      'A notificação informa que a entrega será amanhã. Tocar no aviso abre diretamente a tela de detalhes com todas as instruções.',
    icon: Bell,
    isNotificationTrigger: true,
    actionButtonLabel: 'Disparar Notificação Simulada',
  },
  {
    step: '05',
    title: 'Fazer a atividade',
    tagline: 'Consultar orientações',
    description:
      'Consultar os detalhes completos: matéria, prazo com destaque de urgência, tipo de atividade e descrição das orientações.',
    icon: BookOpen,
    screenAction: { type: 'task-detail', taskId: 'task-1' } as CurrentScreen,
    actionButtonLabel: 'Ver Detalhes do Trabalho',
  },
  {
    step: '06',
    title: 'Concluir',
    tagline: 'Acompanhar progresso',
    description:
      'Ao finalizar o trabalho, o aluno marca como concluída com 1 toque. Acompanha o avanço no progresso e pode reabrir se necessário.',
    icon: CheckCircle2,
    screenAction: { type: 'progress' } as CurrentScreen,
    actionButtonLabel: 'Ver Meu Progresso',
  },
];

export const PresentationTourModal: React.FC<PresentationTourModalProps> = ({
  isOpen,
  onClose,
  onNavigateToScreen,
  onTriggerNotification,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const activeStep = TOUR_STEPS[currentIdx];
  const Icon = activeStep.icon;

  const handleAction = () => {
    if (activeStep.isNotificationTrigger) {
      onTriggerNotification();
    } else if (activeStep.screenAction) {
      onNavigateToScreen(activeStep.screenAction);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Sparkles size={16} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Roteiro de Demonstração (PDF p.12)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Do cadastro à conclusão · Passo {currentIdx + 1} de {TOUR_STEPS.length}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Stepper pills */}
            <div className="grid grid-cols-6 gap-1.5 my-4">
              {TOUR_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    idx === currentIdx
                      ? 'bg-emerald-600 ring-2 ring-emerald-200'
                      : idx < currentIdx
                      ? 'bg-emerald-300'
                      : 'bg-slate-200'
                  }`}
                  aria-label={`Passo ${s.step}`}
                />
              ))}
            </div>

            {/* Step card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 my-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black text-emerald-700 font-mono">
                  {activeStep.step}
                </span>
                <span className="p-2 rounded-xl bg-white shadow-xs text-slate-700 border border-slate-200/60">
                  <Icon size={20} className="text-emerald-600" />
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-0.5">
                {activeStep.title}
              </h4>
              <p className="text-xs font-semibold text-emerald-700 mb-2">
                {activeStep.tagline}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Action button */}
            <button
              onClick={handleAction}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98]"
            >
              <Play size={14} className="fill-white" />
              <span>{activeStep.actionButtonLabel}</span>
            </button>

            {/* Prev / Next controls */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-1 text-xs font-medium text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-slate-900"
              >
                <ChevronLeft size={16} />
                Anterior
              </button>

              <span className="text-[11px] text-slate-400 font-medium">
                {currentIdx + 1} de {TOUR_STEPS.length}
              </span>

              <button
                onClick={() =>
                  setCurrentIdx((prev) => Math.min(TOUR_STEPS.length - 1, prev + 1))
                }
                disabled={currentIdx === TOUR_STEPS.length - 1}
                className="flex items-center gap-1 text-xs font-semibold text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed hover:text-emerald-800"
              >
                Próximo
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
