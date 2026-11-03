import React, { useState, useEffect } from 'react';
import {
  Bell,
  Menu,
  Smartphone,
  Maximize2,
  Sparkles,
  Info,
  RotateCcw,
  CheckCircle,
  Calendar,
  BookOpen,
  Home,
  Trophy,
} from 'lucide-react';

import {
  Task,
  Subject,
  ActiveTab,
  CurrentScreen,
  NotificationToast,
} from './types';
import { INITIAL_SUBJECTS, INITIAL_TASKS } from './data/initialData';

import { TopStatusBar } from './components/TopStatusBar';
import { BottomNavBar } from './components/BottomNavBar';
import { PushNotificationBanner } from './components/PushNotificationBanner';
import { ConfirmModal } from './components/ConfirmModal';
import { FeedbackToast, ToastMessage } from './components/FeedbackToast';
import { PresentationTourModal } from './components/PresentationTourModal';
import { AboutProjectModal } from './components/AboutProjectModal';
import { AppDrawer } from './components/AppDrawer';

import { HomeView } from './views/HomeView';
import { TasksFormView } from './views/TasksFormView';
import { SubjectsView } from './views/SubjectsView';
import { SubjectDetailView } from './views/SubjectDetailView';
import { AgendaView } from './views/AgendaView';
import { TaskDetailView } from './views/TaskDetailView';
import { RemindersView } from './views/RemindersView';
import { ProgressView } from './views/ProgressView';

const STORAGE_KEY = 'organiza_ai_tasks_v1';

export default function App() {
  // Persistence state
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TASKS;
  });

  const [subjects] = useState<Subject[]>(INITIAL_SUBJECTS);

  // Navigation states
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>({ type: 'home' });

  // Notifications & Feedback
  const [activeNotification, setActiveNotification] = useState<NotificationToast | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  // Modals & Panels
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // View frame mode: 'phone' (authentic mobile shell like PDF) or 'fluid'
  const [viewMode, setViewMode] = useState<'phone' | 'fluid'>('phone');

  // Save tasks to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ id: Date.now().toString(), text, type });
  };

  // Trigger simulated push notification
  const triggerPushNotification = (
    title: string = 'Entrega amanhã',
    message: string = 'Ciências: Trabalho em grupo. Toque para ver os detalhes.',
    taskId: string = 'task-1'
  ) => {
    setActiveNotification({
      id: Date.now().toString(),
      title,
      message,
      taskId,
    });
  };

  // Handlers for Task management
  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newStatus = !t.completed;
          showToast(
            newStatus
              ? `"${t.title}" marcada como concluída!`
              : `"${t.title}" reaberta para a lista pendente!`,
            'success'
          );
          return {
            ...t,
            completed: newStatus,
            completedAt: newStatus ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleSaveTask = (
    data: Omit<Task, 'id' | 'createdAt' | 'completed'>,
    editingTaskId?: string
  ) => {
    if (editingTaskId) {
      // Edit existing task
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTaskId ? { ...t, ...data } : t))
      );
      showToast('Atividade atualizada com sucesso!');
      setCurrentScreen({ type: 'task-detail', taskId: editingTaskId });
    } else {
      // Create new task
      const newTask: Task = {
        ...data,
        id: `task-${Date.now()}`,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast('Atividade criada com sucesso!');
      setCurrentScreen({ type: 'task-detail', taskId: newTask.id });
    }
  };

  const handleSaveReminder = (taskId: string, reminder: Task['reminder']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, reminder } : t))
    );
    showToast('Lembrete atualizado com sucesso!');
    setCurrentScreen({ type: 'task-detail', taskId });
  };

  const confirmDeleteTask = () => {
    if (!deleteTaskId) return;
    const taskToDelete = tasks.find((t) => t.id === deleteTaskId);
    setTasks((prev) => prev.filter((t) => t.id !== deleteTaskId));
    setDeleteTaskId(null);
    showToast(
      taskToDelete ? `"${taskToDelete.title}" foi excluída.` : 'Atividade excluída.',
      'info'
    );
    // Return to main view
    if (activeTab === 'inicio') {
      setCurrentScreen({ type: 'home' });
    } else if (activeTab === 'agenda') {
      setCurrentScreen({ type: 'agenda' });
    } else {
      setCurrentScreen({ type: 'subjects' });
    }
  };

  const handleResetData = () => {
    setTasks(INITIAL_TASKS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    showToast('Dados originais do PDF restaurados com sucesso!', 'info');
    setCurrentScreen({ type: 'home' });
    setActiveTab('inicio');
  };

  // Tab navigation
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'inicio') {
      setCurrentScreen({ type: 'home' });
    } else if (tab === 'agenda') {
      setCurrentScreen({ type: 'agenda' });
    } else if (tab === 'materias') {
      setCurrentScreen({ type: 'subjects' });
    }
  };

  // Screen routing rendering inside phone viewport
  const renderCurrentScreen = () => {
    switch (currentScreen.type) {
      case 'home':
        return (
          <HomeView
            tasks={tasks}
            subjects={subjects}
            onOpenTask={(taskId) => setCurrentScreen({ type: 'task-detail', taskId })}
            onToggleComplete={handleToggleComplete}
            onAddTask={() => setCurrentScreen({ type: 'task-create' })}
          />
        );

      case 'task-create':
        return (
          <TasksFormView
            subjects={subjects}
            initialSubjectId={currentScreen.initialSubjectId}
            onSave={(data) => handleSaveTask(data)}
            onBack={() => {
              if (activeTab === 'materias') {
                setCurrentScreen({ type: 'subjects' });
              } else if (activeTab === 'agenda') {
                setCurrentScreen({ type: 'agenda' });
              } else {
                setCurrentScreen({ type: 'home' });
              }
            }}
          />
        );

      case 'task-edit': {
        const taskToEdit = tasks.find((t) => t.id === currentScreen.taskId);
        if (!taskToEdit) {
          return (
            <div className="p-8 text-center text-xs text-slate-500">
              Tarefa não encontrada.
            </div>
          );
        }
        return (
          <TasksFormView
            initialTask={taskToEdit}
            subjects={subjects}
            onSave={(data) => handleSaveTask(data, taskToEdit.id)}
            onBack={() =>
              setCurrentScreen({ type: 'task-detail', taskId: taskToEdit.id })
            }
          />
        );
      }

      case 'task-detail': {
        const currentTask = tasks.find((t) => t.id === currentScreen.taskId);
        if (!currentTask) {
          return (
            <div className="p-8 text-center text-xs text-slate-500">
              Tarefa não encontrada.
            </div>
          );
        }
        const subject = subjects.find((s) => s.id === currentTask.subjectId);
        return (
          <TaskDetailView
            task={currentTask}
            subject={subject}
            onBack={() => {
              if (activeTab === 'agenda') {
                setCurrentScreen({ type: 'agenda' });
              } else if (activeTab === 'materias') {
                setCurrentScreen({ type: 'subjects' });
              } else {
                setCurrentScreen({ type: 'home' });
              }
            }}
            onEdit={() =>
              setCurrentScreen({ type: 'task-edit', taskId: currentTask.id })
            }
            onOpenReminders={() =>
              setCurrentScreen({ type: 'reminders', taskId: currentTask.id })
            }
            onToggleComplete={() => handleToggleComplete(currentTask.id)}
            onRequestDelete={() => setDeleteTaskId(currentTask.id)}
          />
        );
      }

      case 'reminders': {
        const currentTask = tasks.find((t) => t.id === currentScreen.taskId);
        if (!currentTask) {
          return (
            <div className="p-8 text-center text-xs text-slate-500">
              Tarefa não encontrada.
            </div>
          );
        }
        const subject = subjects.find((s) => s.id === currentTask.subjectId);
        return (
          <RemindersView
            task={currentTask}
            subjectName={subject?.name}
            onSaveReminder={(reminder) =>
              handleSaveReminder(currentTask.id, reminder)
            }
            onTestNotification={triggerPushNotification}
            onBack={() =>
              setCurrentScreen({ type: 'task-detail', taskId: currentTask.id })
            }
          />
        );
      }

      case 'subjects':
        return (
          <SubjectsView
            subjects={subjects}
            tasks={tasks}
            onSelectSubject={(subjectId) =>
              setCurrentScreen({ type: 'subject-detail', subjectId })
            }
            onAddTaskForSubject={(subjectId) =>
              setCurrentScreen({ type: 'task-create', initialSubjectId: subjectId })
            }
          />
        );

      case 'subject-detail': {
        const subject = subjects.find((s) => s.id === currentScreen.subjectId);
        if (!subject) {
          return (
            <div className="p-8 text-center text-xs text-slate-500">
              Matéria não encontrada.
            </div>
          );
        }
        return (
          <SubjectDetailView
            subject={subject}
            tasks={tasks}
            onBack={() => setCurrentScreen({ type: 'subjects' })}
            onOpenTask={(taskId) =>
              setCurrentScreen({ type: 'task-detail', taskId })
            }
            onToggleComplete={handleToggleComplete}
            onAddTask={(subId) =>
              setCurrentScreen({ type: 'task-create', initialSubjectId: subId })
            }
          />
        );
      }

      case 'agenda':
        return (
          <AgendaView
            tasks={tasks}
            subjects={subjects}
            onOpenTask={(taskId) =>
              setCurrentScreen({ type: 'task-detail', taskId })
            }
            onToggleComplete={handleToggleComplete}
          />
        );

      case 'progress':
        return (
          <ProgressView
            tasks={tasks}
            subjects={subjects}
            onOpenTask={(taskId) =>
              setCurrentScreen({ type: 'task-detail', taskId })
            }
            onToggleComplete={handleToggleComplete}
            onBack={() => setCurrentScreen({ type: 'home' })}
          />
        );

      default:
        return null;
    }
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;

  const showTopBarLogo =
    currentScreen.type === 'home' ||
    currentScreen.type === 'agenda' ||
    currentScreen.type === 'subjects';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Bar Workspace Toolbar */}
      <header className="shrink-0 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Project Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md shadow-emerald-500/20">
              Aí
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white">
                  Organiza<span className="text-emerald-400">Aí</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-emerald-400 px-2 py-0.5 rounded-md border border-slate-700">
                  Protótipo Interativo
                </span>
              </div>
              <p className="text-xs font-bold text-emerald-400 tracking-wider uppercase mt-0.5">
                E.E. MARIA BARBOSA LEITE
              </p>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Anna Vitória · Carlos Henrique · Caroline · Cibely · Empreendedorismo
              </p>
            </div>
          </div>

          {/* Quick Prototype Actions */}
          <div className="flex items-center gap-2">
            {/* Tour Button */}
            <button
              onClick={() => setIsTourOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-[0.98]"
              title="Ver roteiro da apresentação do PDF (passos 1 a 6)"
            >
              <Sparkles size={14} />
              <span>Tour da Apresentação</span>
            </button>

            {/* Test Notification Simulator Button */}
            <button
              onClick={() => triggerPushNotification()}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="Testar notificação push conforme demonstrado no PDF"
            >
              <Bell size={14} className="text-amber-400" />
              <span className="hidden md:inline">Simular Notificação</span>
            </button>

            {/* Progress shortcut */}
            <button
              onClick={() => setCurrentScreen({ type: 'progress' })}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="Ver tela de Progresso e tarefas concluídas"
            >
              <Trophy size={14} className="text-emerald-400" />
              <span className="hidden md:inline">Meu Progresso</span>
            </button>

            {/* View Mode Toggle: Phone vs Fluid */}
            <div className="hidden lg:flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => setViewMode('phone')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'phone'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Modo Celular com Moldura (como no PDF)"
              >
                <Smartphone size={15} />
              </button>
              <button
                onClick={() => setViewMode('fluid')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'fluid'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Modo Expandido Responsivo"
              >
                <Maximize2 size={15} />
              </button>
            </div>

            {/* About / Info */}
            <button
              onClick={() => setIsAboutOpen(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Sobre o projeto e índice do PDF"
            >
              <Info size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Phone Frame Mockup Container */}
        <div
          className={`relative transition-all duration-300 ${
            viewMode === 'phone'
              ? 'w-full max-w-[400px] h-[780px] max-h-[92vh] rounded-[48px] ring-12 ring-slate-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-slate-700/80'
              : 'w-full max-w-2xl h-[800px] max-h-[92vh] rounded-3xl border border-slate-800 shadow-2xl'
          } bg-white text-slate-900 flex flex-col overflow-hidden relative`}
        >
          {/* Push Notification Simulator */}
          <PushNotificationBanner
            notification={activeNotification}
            onDismiss={() => setActiveNotification(null)}
            onOpenTask={(taskId) => {
              setCurrentScreen({ type: 'task-detail', taskId });
            }}
          />

          {/* Feedback Toast */}
          <FeedbackToast toast={toast} onDismiss={() => setToast(null)} />

          {/* Device Top Status Bar */}
          <TopStatusBar />

          {/* App Header (when on top tabs) */}
          {showTopBarLogo && (
            <div className="shrink-0 px-5 pt-1 pb-2 flex items-center justify-between z-20">
              <div
                onClick={() => handleSelectTab('inicio')}
                className="cursor-pointer flex flex-col select-none"
              >
                <span className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Organiza<span className="text-emerald-600">Aí</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                  E.E. MARIA BARBOSA LEITE
                </span>
              </div>

              <div className="flex items-center gap-1">
                {/* Notification Bell trigger */}
                <button
                  onClick={() => triggerPushNotification()}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors relative"
                  title="Notificações"
                  aria-label="Notificações"
                >
                  <Bell size={18} />
                  {pendingCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </button>

                {/* Menu drawer button */}
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                  title="Menu"
                  aria-label="Abrir menu"
                >
                  <Menu size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Active Screen View */}
          <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden bg-white">
            {renderCurrentScreen()}
          </div>

          {/* Bottom Navigation Bar */}
          <BottomNavBar
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            pendingCount={pendingCount}
          />

          {/* Home indicator bar (iPhone gesture bar) */}
          <div className="w-full pb-1 pt-0.5 flex justify-center bg-white/95">
            <div className="w-32 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>
      </main>

      {/* Footer with Developer Names */}
      <footer className="shrink-0 border-t border-slate-800 bg-slate-900/90 backdrop-blur-md py-3 px-4 sm:px-6 text-center text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-medium text-slate-300">
            Desenvolvido por:{' '}
            <span className="text-emerald-400 font-semibold">
              Anna Vitória, Carlos Henrique, Caroline e Cibely
            </span>
          </p>
          <p className="text-[11px] text-slate-400 font-medium">
            E.E. Maria Barbosa Leite · Empreendedorismo
          </p>
        </div>
      </footer>

      {/* Presentation Tour Modal (Page 12 of PDF) */}
      <PresentationTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNavigateToScreen={(screen) => {
          if (screen.type === 'home') setActiveTab('inicio');
          if (screen.type === 'agenda') setActiveTab('agenda');
          if (screen.type === 'subjects') setActiveTab('materias');
          setCurrentScreen(screen);
        }}
        onTriggerNotification={() => triggerPushNotification()}
      />

      {/* About Project & Team Modal */}
      <AboutProjectModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onResetData={handleResetData}
      />

      {/* App Drawer Navigation */}
      <AppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigateTab={handleSelectTab}
        onNavigateScreen={(screen) => setCurrentScreen(screen)}
        onOpenTour={() => setIsTourOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onTriggerNotification={() => triggerPushNotification()}
        onResetData={handleResetData}
      />

      {/* Delete Confirmation Modal (Page 7 & 10 of PDF) */}
      <ConfirmModal
        isOpen={Boolean(deleteTaskId)}
        title="Excluir atividade?"
        message="Esta ação removerá permanentemente a atividade do seu cronograma escolar. Deseja continuar?"
        confirmLabel="Sim, excluir"
        cancelLabel="Cancelar"
        isDestructive={true}
        onConfirm={confirmDeleteTask}
        onCancel={() => setDeleteTaskId(null)}
      />
    </div>
  );
}
