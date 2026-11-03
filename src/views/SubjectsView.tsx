import React from 'react';
import { ChevronRight, Plus, FolderPlus } from 'lucide-react';
import { Task, Subject } from '../types';
import { SubjectIcon } from '../components/SubjectIcon';

interface SubjectsViewProps {
  subjects: Subject[];
  tasks: Task[];
  onSelectSubject: (subjectId: string) => void;
  onAddNewSubject?: () => void;
  onAddTaskForSubject: (subjectId: string) => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  subjects,
  tasks,
  onSelectSubject,
  onAddTaskForSubject,
}) => {
  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-6 overflow-y-auto">
      {/* Title & Subtitle */}
      <div className="mb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Matérias
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Suas atividades por disciplina
        </p>
      </div>

      {/* List of Subjects */}
      <div className="space-y-3 flex-1">
        {subjects.map((subject) => {
          const subjectTasks = tasks.filter((t) => t.subjectId === subject.id);
          const pendingTasks = subjectTasks.filter((t) => !t.completed);
          const nextTask = pendingTasks[0] || subjectTasks[0];

          return (
            <div
              key={subject.id}
              onClick={() => onSelectSubject(subject.id)}
              className="group bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer flex items-center justify-between gap-3.5"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Subject Icon square */}
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${subject.lightBg} border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform`}
                >
                  <SubjectIcon
                    icon={subject.icon}
                    size={22}
                    className={subject.badgeText}
                  />
                </div>

                {/* Text details */}
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    {pendingTasks.length === 1
                      ? '1 tarefa pendente'
                      : `${pendingTasks.length} tarefas pendentes`}
                  </p>
                  {nextTask && (
                    <p className="text-[11px] text-slate-600 truncate mt-0.5">
                      {nextTask.title}
                    </p>
                  )}
                </div>
              </div>

              {/* Chevron icon */}
              <div className="shrink-0 text-slate-400 group-hover:text-slate-700 transition-colors">
                <ChevronRight size={18} />
              </div>
            </div>
          );
        })}

        <p className="text-[11px] text-center text-slate-600 pt-2 pb-1">
          Toque na matéria para ver suas tarefas
        </p>
      </div>
    </div>
  );
};
