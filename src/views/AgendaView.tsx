import React, { useState } from 'react';
import { ChevronRight, Info, CheckCircle2 } from 'lucide-react';
import { Task, Subject } from '../types';
import { SubjectIcon } from '../components/SubjectIcon';
import { formatAgendaGroupDate, getDueDateBadge } from '../utils/dateUtils';

interface AgendaViewProps {
  tasks: Task[];
  subjects: Subject[];
  onOpenTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  tasks,
  subjects,
  onOpenTask,
  onToggleComplete,
}) => {
  const [activeFilter, setActiveFilter] = useState<'pendentes' | 'concluidas'>('pendentes');

  const subjectsMap = new Map(subjects.map((s) => [s.id, s]));

  // Filter tasks
  const filteredTasks = tasks.filter((t) =>
    activeFilter === 'pendentes' ? !t.completed : t.completed
  );

  // Sort tasks chronologically by dueDate
  const sortedTasks = [...filteredTasks].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate)
  );

  // Group by dueDate
  const groupedTasks: { date: string; items: Task[] }[] = [];
  sortedTasks.forEach((task) => {
    const existingGroup = groupedTasks.find((g) => g.date === task.dueDate);
    if (existingGroup) {
      existingGroup.items.push(task);
    } else {
      groupedTasks.push({ date: task.dueDate, items: [task] });
    }
  });

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-6 overflow-y-auto">
      {/* Title & Subtitle */}
      <div className="mb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Agenda
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Setembro de 2026
        </p>
      </div>

      {/* Filter Segmented Control: Pendentes / Concluídas (Page 6) */}
      <div className="flex items-center p-1 bg-slate-100 rounded-xl mb-5">
        <button
          type="button"
          onClick={() => setActiveFilter('pendentes')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeFilter === 'pendentes'
              ? 'bg-emerald-200 text-emerald-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pendentes
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('concluidas')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeFilter === 'concluidas'
              ? 'bg-emerald-200 text-emerald-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Concluídas
        </button>
      </div>

      {/* Grouped Chronological List */}
      <div className="flex-1 space-y-5">
        {groupedTasks.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 my-4">
            Nenhuma atividade {activeFilter === 'pendentes' ? 'pendente' : 'concluída'} encontrada.
          </div>
        ) : (
          groupedTasks.map((group) => (
            <div key={group.date} className="space-y-2">
              {/* Group Date Header (e.g. 18 SET · SEXTA-FEIRA) */}
              <div className="text-[11px] font-bold tracking-wider text-slate-600 px-1 uppercase">
                {formatAgendaGroupDate(group.date)}
              </div>

              {/* Task Items */}
              <div className="space-y-2">
                {group.items.map((task) => {
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
                      className="group bg-white rounded-2xl p-3.5 border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-150 flex items-center gap-3.5 cursor-pointer"
                    >
                      {/* Checkbox circle */}
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
                        aria-label={task.completed ? 'Reabrir' : 'Concluir'}
                      >
                        {task.completed && <CheckCircle2 size={16} className="text-white" />}
                      </button>

                      {/* Content */}
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
                        <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-600">
                          <SubjectIcon
                            icon={subject.icon as any}
                            size={12}
                            className={subject.badgeText}
                          />
                          <span className="truncate">{subject.name}</span>
                        </div>
                      </div>

                      {/* Badge and chevron */}
                      <div className="shrink-0 flex items-center gap-1.5">
                        {!task.completed && (
                          <span
                            className={`text-[11px] px-2.5 py-0.5 rounded-full whitespace-nowrap ${dueInfo.badgeClass}`}
                          >
                            {dueInfo.text}
                          </span>
                        )}
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-600" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info footer per Page 6 */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-600">
        <Info size={13} className="text-slate-600 shrink-0" />
        <span>Os prazos mais próximos aparecem primeiro.</span>
      </div>
    </div>
  );
};
