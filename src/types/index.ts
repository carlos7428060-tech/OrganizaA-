export type TaskType = 
  | 'Trabalho'
  | 'Lista de exercícios'
  | 'Leitura'
  | 'Prova'
  | 'Projeto'
  | 'Apresentação'
  | 'Outro';

export type ReminderTiming = 
  | '1 dia antes'
  | '2 dias antes'
  | 'No dia da entrega'
  | '3 horas antes'
  | 'Sem lembrete';

export interface TaskReminder {
  enabled: boolean;
  timing: ReminderTiming;
  time: string; // e.g. "18:00"
  targetDateDescription?: string; // e.g. "17/09, às 18h"
}

export interface Task {
  id: string;
  title: string;
  subjectId: string;
  type: TaskType;
  dueDate: string; // YYYY-MM-DD format (e.g. "2026-09-18")
  reminder: TaskReminder;
  description: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: 'flask' | 'calculator' | 'book' | 'landmark' | 'globe' | 'palette' | 'music' | 'code';
  color: string;
  badgeBg: string;
  badgeText: string;
  lightBg: string;
}

export type ActiveTab = 'inicio' | 'agenda' | 'materias';

export type CurrentScreen = 
  | { type: 'home' }
  | { type: 'task-create'; initialSubjectId?: string }
  | { type: 'task-edit'; taskId: string }
  | { type: 'task-detail'; taskId: string }
  | { type: 'reminders'; taskId: string }
  | { type: 'subjects' }
  | { type: 'subject-detail'; subjectId: string }
  | { type: 'agenda' }
  | { type: 'progress' };

export interface NotificationToast {
  id: string;
  title: string;
  message: string;
  taskId?: string;
  subjectName?: string;
  type?: 'success' | 'info' | 'reminder';
}
