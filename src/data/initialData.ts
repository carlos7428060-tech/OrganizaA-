import { Subject, Task } from '../types';

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'ciencias',
    name: 'Ciências',
    icon: 'flask',
    color: '#059669', // emerald
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeText: 'text-emerald-700',
    lightBg: 'bg-emerald-50',
  },
  {
    id: 'matematica',
    name: 'Matemática',
    icon: 'calculator',
    color: '#7c3aed', // violet
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: 'text-purple-700',
    lightBg: 'bg-purple-50',
  },
  {
    id: 'portugues',
    name: 'Português',
    icon: 'book',
    color: '#2563eb', // blue
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeText: 'text-blue-700',
    lightBg: 'bg-blue-50',
  },
  {
    id: 'historia',
    name: 'História',
    icon: 'landmark',
    color: '#d97706', // amber
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    badgeText: 'text-amber-700',
    lightBg: 'bg-amber-50',
  },
  {
    id: 'geografia',
    name: 'Geografia',
    icon: 'globe',
    color: '#0891b2', // cyan
    badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    badgeText: 'text-cyan-700',
    lightBg: 'bg-cyan-50',
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Trabalho em grupo',
    subjectId: 'ciencias',
    type: 'Trabalho',
    dueDate: '2026-09-18',
    reminder: {
      enabled: true,
      timing: '1 dia antes',
      time: '18:00',
      targetDateDescription: '17/09, às 18h',
    },
    description: 'Preparar os slides e revisar o conteúdo com o grupo.',
    completed: false,
    createdAt: '2026-09-15T10:00:00Z',
  },
  {
    id: 'task-2',
    title: 'Lista de exercícios',
    subjectId: 'matematica',
    type: 'Lista de exercícios',
    dueDate: '2026-09-18',
    reminder: {
      enabled: true,
      timing: '1 dia antes',
      time: '18:00',
      targetDateDescription: '17/09, às 18h',
    },
    description: 'Resolver os exercícios do capítulo 4 sobre equações de 2º grau.',
    completed: false,
    createdAt: '2026-09-15T11:30:00Z',
  },
  {
    id: 'task-3',
    title: 'Leitura do capítulo 5',
    subjectId: 'portugues',
    type: 'Leitura',
    dueDate: '2026-09-21',
    reminder: {
      enabled: true,
      timing: '1 dia antes',
      time: '18:00',
      targetDateDescription: '20/09, às 18h',
    },
    description: 'Fazer anotações dos principais tópicos para debate em sala.',
    completed: false,
    createdAt: '2026-09-16T09:15:00Z',
  },
];
