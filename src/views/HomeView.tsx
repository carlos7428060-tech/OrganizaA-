import React from 'react';
import { Plus, Check, CheckCircle2, ChevronRight, ClipboardList } from 'lucide-react';
import { Task, Subject } from '../types';
import { SubjectIcon } from '../components/SubjectIcon';
import { getDueDateBadge, formatGreetingDate } from '../utils/dateUtils';

interface HomeViewProps {
  tasks: Task[];
  subjects: Subject[];
  onOpenTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onAddTask: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  tasks,
  subjects,
  onOpenTask,
  onToggleComplete,
  onAddTask,
}) => {
  const pendingTasks = tasks.filter((t) => !t.completed);
  const subjectsMap = new Map(subjects.map((s) => [s.id, s]));

  // Reference date matching PDF demo
  const greetingDate = formatGreetingDate('2026-09-17');

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-6 overflow-y-auto">
      {/* Greeting and Date Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Olá!
        </h1>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-sm font-medium text-slate-600">
            {greetingDate}
          </p>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase tracking-wider">
            E.E. Maria Barbosa Leite
          </span>
        </div>
      </div>

      {/* Routine Summary Box */}
      <div className="bg-emerald-50/90 border border-emerald-100 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 mb-5 shadow-xs">
        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
          <Check size={13} className="stroke-[3]" />
        </div>
        <span className="text-xs font-semibold text-emerald-900">
          {pendingTasks.length === 1
            ? '1 tarefa pendente'
            : `${pendingTasks.length} tarefas pendentes`}
        </span>
      </div>

      {/* Section: Próximas entregas */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Próximas entregas
          </h2>
          <span className="text-[11px] text-slate-600 font-medium">
            {pendingTasks.length} ativas
          </span>
        </div>

        {pendingTasks.length === 0 ? (
          // Empty state matching Page 10 of PDF
          <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center my-auto">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3 shadow-xs">
              <ClipboardList size={32} className="stroke-[1.7]" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Nenhuma atividade pendente
            </h3>
            <p className="text-xs text-slate-600 max-w-[240px] leading-relaxed mb-5">
              Adicione sua primeira tarefa para começar ou veja as tarefas já concluídas na Agenda.
            </p>
            <button
              onClick={onAddTask}
              className="py-2.5 px-5 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-[0.98]"
            >
              <Plus size={16} />
              + Adicionar primeira tarefa
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {pendingTasks.map((task) => {
              const subject = subjectsMap.get(task.subjectId) || {
                name: 'Geral',
                icon: 'book',
                badgeBg: 'bg-slate-100 text-slate-700',
                badgeText: 'text-slate-700',
              };
              const dueInfo = getDueDateBadge(task.dueDate);

              return (
                <div
                  key={task.id}
                  onClick={() => onOpenTask(task.id)}
                  className="group bg-white rounded-2xl p-3.5 border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-150 flex items-center gap-3.5 cursor-pointer relative"
                >
                  {/* Circle completion checkbox (Page 3: "O círculo ao lado da tarefa permite concluí-la") */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleComplete(task.id);
                    }}
                    className="w-6 h-6 rounded-full border-2 border-slate-300 hover:border-emerald-600 flex items-center justify-center transition-colors shrink-0 group-hover:scale-105"
                    title="Marcar como concluída"
                    aria-label={`Concluir ${task.title}`}
                  >
                    <span className="sr-only">Concluir</span>
                  </button>

                  {/* Task info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate leading-snug group-hover:text-emerald-950 transition-colors">
                      {task.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-700">
                      <SubjectIcon
                        icon={subject.icon as any}
                        size={13}
                        className={subject.badgeText}
                      />
                      <span className="font-semibold text-slate-700 truncate">
                        {subject.name}
                      </span>
                    </div>
                  </div>

                  {/* Due date tag (Urgency badge) */}
                  <div className="shrink-0 flex items-center gap-1.5">
                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-full whitespace-nowrap ${dueInfo.badgeClass}`}
                    >
                      {dueInfo.text}
                    </span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </div>
                </div>
              );
            })}

            <p className="text-[11px] text-center text-slate-600 pt-1">
              Toque em uma tarefa para ver os detalhes
            </p>
          </div>
        )}

        {/* Primary CTA button: + Adicionar tarefa */}
        <div className="mt-6 pt-2">
          <button
            onClick={onAddTask}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-300 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
          >
            <Plus size={18} className="stroke-[2.5]" />
            <span>Adicionar tarefa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
