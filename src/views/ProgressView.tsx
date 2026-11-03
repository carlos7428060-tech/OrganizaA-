import React, { useState } from 'react';
import {
  ChevronLeft,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { Task, Subject } from '../types';
import { SubjectIcon } from '../components/SubjectIcon';

interface ProgressViewProps {
  tasks: Task[];
  subjects: Subject[];
  onOpenTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onBack: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  tasks,
  subjects,
  onOpenTask,
  onToggleComplete,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'concluidas' | 'pendentes'>('concluidas');

  const subjectsMap = new Map(subjects.map((s) => [s.id, s]));
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed);
  const pendingTasks = tasks.filter((t) => !t.completed);

  const percentage =
    totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col px-5 pt-3 pb-8 overflow-y-auto">
      {/* Top back navigation */}
      <div className="flex items-center gap-1 -ml-2 mb-3">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-1.5 py-1 px-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft size={20} className="stroke-[2.5]" />
          <span className="text-sm font-bold text-slate-900 tracking-tight">
            Organiza<span className="text-emerald-600">Aí</span>
          </span>
        </button>
      </div>

      {/* Screen Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Meu progresso
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {completedTasks.length} de {totalTasks} tarefas concluídas
        </p>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs mb-5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
          <span>Aproveitamento escolar</span>
          <span className="text-emerald-600 font-mono">{percentage}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs: Pendentes (X) / Concluídas (Y) */}
      <div className="flex items-center p-1 bg-slate-100 rounded-xl mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('pendentes')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'pendentes'
              ? 'bg-emerald-200 text-emerald-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pendentes ({pendingTasks.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('concluidas')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'concluidas'
              ? 'bg-emerald-200 text-emerald-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Concluídas ({completedTasks.length})
        </button>
      </div>

      {/* Section Content */}
      <div className="flex-1 space-y-3">
        {activeTab === 'concluidas' ? (
          completedTasks.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500">
              Nenhuma tarefa concluída ainda. Marque uma tarefa como concluída para registrá-la aqui.
            </div>
          ) : (
            <>
              {/* Highlight feedback banner */}
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <span>Atividade concluída!</span>
              </div>

              {completedTasks.map((task) => {
                const subject = subjectsMap.get(task.subjectId) || {
                  name: 'Geral',
                  icon: 'book',
                  badgeBg: 'bg-slate-100',
                  badgeText: 'text-slate-700',
                };

                return (
                  <div
                    key={task.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3"
                  >
                    <div
                      onClick={() => onOpenTask(task.id)}
                      className="flex items-start gap-3 cursor-pointer"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {task.title}
                        </p>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          {subject.name}
                        </p>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                        Concluída
                      </span>
                    </div>

                    {/* Reabrir atividade button (Page 9) */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => onToggleComplete(task.id)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw size={13} />
                        <span>Reabrir atividade</span>
                      </button>
                      <button
                        onClick={() => onOpenTask(task.id)}
                        className="text-[11px] text-slate-500 hover:text-slate-800 font-medium inline-flex items-center gap-1"
                      >
                        <span>Ver detalhes</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}

              <p className="text-[11px] text-center text-slate-600 pt-2">
                As outras {pendingTasks.length} tarefas continuam pendentes.
              </p>
            </>
          )
        ) : (
          pendingTasks.map((task) => {
            const subject = subjectsMap.get(task.subjectId) || {
              name: 'Geral',
              icon: 'book',
              badgeBg: 'bg-slate-100',
              badgeText: 'text-slate-700',
            };

            return (
              <div
                key={task.id}
                onClick={() => onOpenTask(task.id)}
                className="bg-white rounded-2xl p-3.5 border border-slate-200/90 hover:border-emerald-300 shadow-xs flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleComplete(task.id);
                    }}
                    className="w-6 h-6 rounded-full border-2 border-slate-300 hover:border-emerald-600 flex items-center justify-center transition-colors shrink-0"
                    title="Concluir"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {subject.name}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                  Pendente
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
