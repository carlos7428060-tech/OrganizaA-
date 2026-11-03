import React, { useState } from 'react';
import { ChevronLeft, Plus, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { Task, Subject } from '../types';
import { SubjectIcon } from '../components/SubjectIcon';
import { getDueDateBadge } from '../utils/dateUtils';

interface SubjectDetailViewProps {
  subject: Subject;
  tasks: Task[];
  onBack: () => void;
  onOpenTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onAddTask: (subjectId: string) => void;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subject,
  tasks,
  onBack,
  onOpenTask,
  onToggleComplete,
  onAddTask,
}) => {
  const [filter, setFilter] = useState<'pendentes' | 'concluidas'>('pendentes');

  const subjectTasks = tasks.filter((t) => t.subjectId === subject.id);
  const pendingTasks = subjectTasks.filter((t) => !t.completed);
  const completedTasks = subjectTasks.filter((t) => t.completed);

  const displayedTasks = filter === 'pendentes' ? pendingTasks : completedTasks;

  return (
    <div className="flex-1 flex flex-col px-5 pt-3 pb-6 overflow-y-auto">
      {/* Header back */}
      <div className="flex items-center gap-1 -ml-2 mb-3">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-1.5 py-1 px-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft size={20} className="stroke-[2.5]" />
          <span className="text-xs font-bold text-slate-900 tracking-tight">
            Matérias
          </span>
        </button>
      </div>

      {/* Subject Header Banner */}
      <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs mb-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${subject.lightBg} border border-slate-100`}
        >
          <SubjectIcon icon={subject.icon} size={24} className={subject.badgeText} />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            {subject.name}
          </h1>
          <p className="text-xs font-semibold text-emerald-700 mt-0.5">
            {pendingTasks.length === 1
              ? '1 tarefa pendente'
              : `${pendingTasks.length} tarefas pendentes`}
          </p>
        </div>
      </div>

      {/* Segmented control: Pendentes / Concluídas */}
      <div className="flex items-center p-1 bg-slate-100 rounded-xl mb-4">
        <button
          type="button"
          onClick={() => setFilter('pendentes')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            filter === 'pendentes'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pendentes ({pendingTasks.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('concluidas')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            filter === 'concluidas'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Concluídas ({completedTasks.length})
        </button>
      </div>

      {/* Tasks list */}
      <div className="flex-1 space-y-2.5">
        {displayedTasks.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500">
            Nenhuma atividade {filter === 'pendentes' ? 'pendente' : 'concluída'} para {subject.name}.
          </div>
        ) : (
          displayedTasks.map((task) => {
            const dueInfo = getDueDateBadge(task.dueDate);

            return (
              <div
                key={task.id}
                onClick={() => onOpenTask(task.id)}
                className="group bg-white rounded-2xl p-3.5 border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-150 flex items-center gap-3 cursor-pointer"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(task.id);
                  }}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                    task.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 hover:border-emerald-600'
                  }`}
                  aria-label={task.completed ? 'Reabrir tarefa' : 'Concluir tarefa'}
                >
                  {task.completed && <CheckCircle2 size={16} className="text-white" />}
                </button>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-bold truncate leading-snug ${
                      task.completed
                        ? 'line-through text-slate-400'
                        : 'text-slate-900 group-hover:text-emerald-950'
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tipo: {task.type}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full whitespace-nowrap ${dueInfo.badgeClass}`}
                  >
                    {dueInfo.text}
                  </span>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Button: Add task specifically for this subject */}
      <div className="mt-4 pt-2">
        <button
          onClick={() => onAddTask(subject.id)}
          className="w-full py-3.5 px-4 rounded-2xl bg-emerald-300 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
        >
          <Plus size={18} className="stroke-[2.5]" />
          <span>Nova atividade em {subject.name}</span>
        </button>
      </div>
    </div>
  );
};
