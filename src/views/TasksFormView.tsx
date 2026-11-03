import React, { useState } from 'react';
import {
  ChevronLeft,
  AlertCircle,
  Calendar,
  Clock,
  BookOpen,
  FileText,
  Tag,
  Check,
} from 'lucide-react';
import { Task, Subject, TaskType, ReminderTiming } from '../types';
import { SubjectIcon } from '../components/SubjectIcon';
import { computeReminderDescription } from '../utils/dateUtils';

interface TasksFormViewProps {
  initialTask?: Task;
  subjects: Subject[];
  initialSubjectId?: string;
  onSave: (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  onBack: () => void;
}

const TASK_TYPES: TaskType[] = [
  'Trabalho',
  'Lista de exercícios',
  'Leitura',
  'Prova',
  'Projeto',
  'Apresentação',
  'Outro',
];

const REMINDER_OPTIONS: ReminderTiming[] = [
  '1 dia antes',
  '2 dias antes',
  'No dia da entrega',
  '3 horas antes',
  'Sem lembrete',
];

export const TasksFormView: React.FC<TasksFormViewProps> = ({
  initialTask,
  subjects,
  initialSubjectId,
  onSave,
  onBack,
}) => {
  const isEditing = Boolean(initialTask);

  const [title, setTitle] = useState(initialTask?.title || '');
  const [subjectId, setSubjectId] = useState(
    initialTask?.subjectId || initialSubjectId || subjects[0]?.id || ''
  );
  const [type, setType] = useState<TaskType>(initialTask?.type || 'Trabalho');
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || '2026-09-18');
  const [reminderTiming, setReminderTiming] = useState<ReminderTiming>(
    initialTask?.reminder.timing || '1 dia antes'
  );
  const [reminderTime, setReminderTime] = useState(
    initialTask?.reminder.time || '18:00'
  );
  const [description, setDescription] = useState(initialTask?.description || '');

  // Validation states per Page 10 of PDF
  const [errors, setErrors] = useState<{
    title?: string;
    dueDate?: string;
    subjectId?: string;
  }>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { title?: string; dueDate?: string; subjectId?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Informe o título da atividade';
    }
    if (!dueDate) {
      newErrors.dueDate = 'Escolha a data de entrega';
    }
    if (!subjectId) {
      newErrors.subjectId = 'Selecione a matéria';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!validate()) {
      return;
    }

    const reminderEnabled = reminderTiming !== 'Sem lembrete';
    const targetDesc = reminderEnabled
      ? computeReminderDescription(dueDate, reminderTiming, reminderTime)
      : 'Sem lembrete';

    onSave({
      title: title.trim(),
      subjectId,
      type,
      dueDate,
      reminder: {
        enabled: reminderEnabled,
        timing: reminderTiming,
        time: reminderTime,
        targetDateDescription: targetDesc,
      },
      description: description.trim(),
    });
  };

  const selectedSubject = subjects.find((s) => s.id === subjectId);

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
          {isEditing ? 'Editar atividade' : 'Nova atividade'}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Preencha os dados da tarefa.
        </p>
      </div>

      {/* Validation warning banner per Page 10 */}
      {hasSubmitted && Object.keys(errors).length > 0 && (
        <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2 text-xs font-semibold animate-shake">
          <AlertCircle size={16} className="text-rose-600 shrink-0" />
          <span>Confira os campos destacados</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título * */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Título <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            placeholder="Ex: Trabalho em grupo"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 transition-colors focus:outline-hidden focus:ring-2 ${
              errors.title
                ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-200'
                : 'border-slate-200 bg-white hover:border-slate-300 focus:border-emerald-500 focus:ring-emerald-100'
            }`}
          />
          {errors.title && (
            <p className="text-[11px] font-medium text-rose-600 mt-1 pl-1">
              {errors.title}
            </p>
          )}
        </div>

        {/* Matéria * */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Matéria <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              value={subjectId}
              onChange={(e) => {
                setSubjectId(e.target.value);
                if (errors.subjectId)
                  setErrors((prev) => ({ ...prev, subjectId: undefined }));
              }}
              className={`w-full appearance-none px-3.5 py-2.5 pl-10 rounded-xl border text-sm text-slate-900 bg-white transition-colors focus:outline-hidden focus:ring-2 ${
                errors.subjectId
                  ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-200'
                  : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-emerald-100'
              }`}
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              {selectedSubject && (
                <SubjectIcon
                  icon={selectedSubject.icon}
                  size={16}
                  className={selectedSubject.badgeText}
                />
              )}
            </div>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
          {errors.subjectId && (
            <p className="text-[11px] font-medium text-rose-600 mt-1 pl-1">
              {errors.subjectId}
            </p>
          )}
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Tipo
          </label>
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TaskType)}
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white hover:border-slate-300 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors"
            >
              {TASK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Entrega * */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Entrega <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
                if (errors.dueDate)
                  setErrors((prev) => ({ ...prev, dueDate: undefined }));
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-white transition-colors focus:outline-hidden focus:ring-2 ${
                errors.dueDate
                  ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-200'
                  : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-emerald-100'
              }`}
            />
          </div>
          {errors.dueDate && (
            <p className="text-[11px] font-medium text-rose-600 mt-1 pl-1">
              {errors.dueDate}
            </p>
          )}
        </div>

        {/* Lembrete */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Lembrete
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <select
                value={reminderTiming}
                onChange={(e) =>
                  setReminderTiming(e.target.value as ReminderTiming)
                }
                className="w-full appearance-none px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white hover:border-slate-300 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors"
              >
                {REMINDER_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                ▼
              </div>
            </div>

            {reminderTiming !== 'Sem lembrete' && (
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white hover:border-slate-300 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors"
              />
            )}
          </div>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Descrição
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Preparar os slides e revisar o conteúdo com o grupo."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white hover:border-slate-300 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors resize-none placeholder:text-slate-400"
          />
        </div>

        <p className="text-[11px] text-slate-400">* Campos obrigatórios</p>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-300 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
          >
            <Check size={18} className="stroke-[3]" />
            <span>Salvar atividade</span>
          </button>
        </div>
      </form>
    </div>
  );
};
