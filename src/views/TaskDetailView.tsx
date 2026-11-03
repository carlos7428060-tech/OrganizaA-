import React from 'react';
import {
  ChevronLeft,
  Pencil,
  Calendar,
  Bell,
  AlignLeft,
  FileText,
  Check,
  RotateCcw,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { Task, Subject } from '../types';
import { SubjectIcon } from '../components/SubjectIcon';
import { formatFullDate, getDueDateBadge } from '../utils/dateUtils';

interface TaskDetailViewProps {
  task: Task;
  subject?: Subject;
  onBack: () => void;
  onEdit: () => void;
  onOpenReminders: () => void;
  onToggleComplete: () => void;
  onRequestDelete: () => void;
}

export const TaskDetailView: React.FC<TaskDetailViewProps> = ({
  task,
  subject,
  onBack,
  onEdit,
  onOpenReminders,
  onToggleComplete,
  onRequestDelete,
}) => {
  const dueInfo = getDueDateBadge(task.dueDate);
  const formattedDelivery = formatFullDate(task.dueDate);

  const fallbackSubject: Subject = subject || {
    id: 'geral',
    name: 'Geral',
    icon: 'book',
    color: '#059669',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeText: 'text-emerald-700',
    lightBg: 'bg-emerald-50',
  };

  return (
    <div className="flex-1 flex flex-col px-5 pt-3 pb-8 overflow-y-auto">
      {/* Top Header with Back and Edit Icon */}
      <div className="flex items-center justify-between -ml-2 mb-3">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-1.5 py-1 px-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft size={20} className="stroke-[2.5]" />
          <span className="text-xs font-bold text-slate-900 tracking-tight">
            Detalhes da atividade
          </span>
        </button>

        <button
          onClick={onEdit}
          type="button"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Editar atividade"
          aria-label="Editar atividade"
        >
          <Pencil size={18} />
        </button>
      </div>

      {/* Task Title */}
      <div className="mb-3">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
          {task.title}
        </h1>

        {/* Badges: Subject + Status */}
        <div className="flex items-center gap-2 mt-2">
          {/* Subject Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-800">
            <SubjectIcon
              icon={fallbackSubject.icon}
              size={13}
              className={fallbackSubject.badgeText}
            />
            <span>{fallbackSubject.name}</span>
          </div>

          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
              task.completed
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                task.completed ? 'bg-emerald-600' : 'bg-slate-400'
              }`}
            />
            <span>{task.completed ? 'Concluída' : 'Pendente'}</span>
          </div>
        </div>
      </div>

      {/* Information Cards List */}
      <div className="space-y-2.5 my-3">
        {/* Tipo */}
        <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-200/80 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-slate-200/60 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
            <FileText size={16} />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Tipo
            </span>
            <span className="text-xs font-bold text-slate-900">{task.type}</span>
          </div>
        </div>

        {/* Entrega */}
        <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-200/80 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-slate-200/60 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
              <Calendar size={16} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Entrega
              </span>
              <span className="text-xs font-bold text-slate-900">
                {formattedDelivery}
              </span>
            </div>
          </div>
          <span
            className={`text-[11px] px-2.5 py-0.5 rounded-full whitespace-nowrap self-center ${dueInfo.badgeClass}`}
          >
            {dueInfo.text}
          </span>
        </div>

        {/* Lembrete (Clickable to open Lembretes screen) */}
        <div
          onClick={onOpenReminders}
          className="group bg-slate-50/90 hover:bg-emerald-50/50 rounded-2xl p-3.5 border border-slate-200/80 hover:border-emerald-200 transition-colors flex items-start justify-between gap-3 cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-slate-200/60 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
              <Bell size={16} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Lembrete
              </span>
              <span className="text-xs font-bold text-slate-900">
                {task.reminder.enabled
                  ? task.reminder.targetDateDescription ||
                    `${task.reminder.timing}, às ${task.reminder.time}`
                  : 'Desativado'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 self-center">
            <span>Configurar</span>
            <ChevronRight size={14} />
          </div>
        </div>

        {/* Descrição */}
        <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-200/80 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-slate-200/60 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
            <AlignLeft size={16} />
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Descrição
            </span>
            <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
              {task.description || 'Nenhuma descrição adicionada.'}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 space-y-2 pt-2">
        {/* Toggle Complete */}
        <button
          onClick={onToggleComplete}
          className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] ${
            task.completed
              ? 'bg-slate-800 text-white hover:bg-slate-900'
              : 'bg-emerald-300 hover:bg-emerald-400 text-slate-950'
          }`}
        >
          {task.completed ? (
            <>
              <RotateCcw size={16} />
              <span>Reabrir atividade</span>
            </>
          ) : (
            <>
              <Check size={18} className="stroke-[3]" />
              <span>Marcar como concluída</span>
            </>
          )}
        </button>

        {/* Editar atividade */}
        <button
          onClick={onEdit}
          className="w-full py-3 px-4 rounded-2xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Pencil size={15} />
          <span>Editar atividade</span>
        </button>

        {/* Excluir atividade */}
        <div className="text-center pt-2">
          <button
            onClick={onRequestDelete}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 py-1 px-3 transition-colors inline-flex items-center gap-1.5"
          >
            <Trash2 size={13} />
            <span>Excluir atividade</span>
          </button>
        </div>
      </div>
    </div>
  );
};
