import React, { useState } from 'react';
import {
  ChevronLeft,
  Calendar,
  Clock,
  Bell,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';
import { Task, ReminderTiming } from '../types';
import { computeReminderDescription } from '../utils/dateUtils';

interface RemindersViewProps {
  task: Task;
  subjectName?: string;
  onSaveReminder: (reminder: Task['reminder']) => void;
  onTestNotification: (title: string, body: string, taskId: string) => void;
  onBack: () => void;
}

const TIMING_OPTIONS: ReminderTiming[] = [
  '1 dia antes',
  '2 dias antes',
  'No dia da entrega',
  '3 horas antes',
];

const TIME_OPTIONS = [
  '07:00',
  '08:00',
  '12:00',
  '14:00',
  '18:00',
  '20:00',
  '21:00',
];

export const RemindersView: React.FC<RemindersViewProps> = ({
  task,
  subjectName = 'Ciências',
  onSaveReminder,
  onTestNotification,
  onBack,
}) => {
  const [enabled, setEnabled] = useState(task.reminder.enabled);
  const [timing, setTiming] = useState<ReminderTiming>(
    task.reminder.timing === 'Sem lembrete' ? '1 dia antes' : task.reminder.timing
  );
  const [time, setTime] = useState(task.reminder.time || '18:00');

  const previewDescription = computeReminderDescription(task.dueDate, timing, time);

  const handleSave = () => {
    onSaveReminder({
      enabled,
      timing: enabled ? timing : 'Sem lembrete',
      time,
      targetDateDescription: enabled ? previewDescription : 'Sem lembrete',
    });
  };

  const handleTriggerTest = () => {
    const notifTitle =
      timing === '1 dia antes' ? 'Entrega amanhã' : `Entrega de ${task.title}`;
    const notifBody = `${subjectName}: ${task.title}. Toque para ver os detalhes.`;
    onTestNotification(notifTitle, notifBody, task.id);
  };

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
          Lembretes
        </h1>
        <p className="text-xs font-semibold text-slate-600 mt-0.5">
          {task.title}
        </p>
      </div>

      {/* Configuration Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs space-y-4">
        {/* Toggle: Receber lembrete */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-900">
            Receber lembrete
          </span>
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6 rounded-full transition-colors relative focus:outline-hidden ${
              enabled ? 'bg-emerald-400' : 'bg-slate-200'
            }`}
            aria-label="Ativar ou desativar lembrete"
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {enabled ? (
          <>
            {/* Quando avisar? */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                <Calendar size={14} className="text-slate-500" />
                <span>Quando avisar?</span>
              </label>
              <div className="relative">
                <select
                  value={timing}
                  onChange={(e) => setTiming(e.target.value as ReminderTiming)}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 hover:border-slate-300 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors"
                >
                  {TIMING_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Horário */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                <Clock size={14} className="text-slate-500" />
                <span>Horário</span>
              </label>
              <div className="relative">
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 hover:border-slate-300 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-colors"
                >
                  {TIME_OPTIONS.map((t) => (
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

            {/* Aviso programado */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex items-center gap-2">
              <Calendar size={14} className="text-emerald-700 shrink-0" />
              <span>Aviso programado para {previewDescription}</span>
            </div>
          </>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 text-center">
            Lembrete desativado. Ative a chave acima para configurar data e horário.
          </div>
        )}

        {/* Salvar lembrete */}
        <button
          onClick={handleSave}
          className="w-full py-3 px-4 rounded-2xl bg-emerald-300 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
        >
          <Check size={16} className="stroke-[3]" />
          <span>Salvar lembrete</span>
        </button>
      </div>

      {/* Exemplo de Notificação (PDF Page 8) */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-900">
            Exemplo de notificação
          </span>
          <button
            onClick={handleTriggerTest}
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md hover:bg-emerald-100 transition-colors"
          >
            <Send size={11} />
            <span>Testar aviso no app</span>
          </button>
        </div>

        {/* Realistic Push Preview Card as shown on page 8 */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center text-xs shrink-0">
              Aí
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-bold text-slate-700">OrganizaAí</span>
                <span>agora</span>
              </div>
              <p className="text-xs font-bold text-slate-900 leading-tight mt-0.5">
                Entrega amanhã
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                {subjectName}: {task.title}. Toque para ver os detalhes.
              </p>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-center text-slate-600 mt-2">
          Ative as notificações no celular
        </p>
      </div>
    </div>
  );
};
