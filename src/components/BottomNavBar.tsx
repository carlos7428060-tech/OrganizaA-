import React from 'react';
import { Home, CalendarDays, BookOpen } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  pendingCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  pendingCount = 0,
}) => {
  return (
    <nav
      className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 flex items-center justify-around select-none shadow-[0_-4px_12px_rgba(0,0,0,0.03)]"
      aria-label="Navegação principal"
    >
      {/* Tab: Início */}
      <button
        onClick={() => onSelectTab('inicio')}
        className={`flex flex-col items-center justify-center py-1 px-4 min-w-[64px] min-h-[44px] rounded-xl transition-all duration-150 ${
          activeTab === 'inicio'
            ? 'text-emerald-700 font-semibold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className="relative">
          <Home
            size={22}
            className={`transition-transform duration-150 ${
              activeTab === 'inicio' ? 'stroke-[2.5] scale-105' : 'stroke-[1.8]'
            }`}
          />
        </div>
        <span className="text-[11px] tracking-tight mt-0.5">Início</span>
      </button>

      {/* Tab: Agenda */}
      <button
        onClick={() => onSelectTab('agenda')}
        className={`flex flex-col items-center justify-center py-1 px-4 min-w-[64px] min-h-[44px] rounded-xl transition-all duration-150 ${
          activeTab === 'agenda'
            ? 'text-emerald-700 font-semibold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className="relative">
          <CalendarDays
            size={22}
            className={`transition-transform duration-150 ${
              activeTab === 'agenda' ? 'stroke-[2.5] scale-105' : 'stroke-[1.8]'
            }`}
          />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
              {pendingCount}
            </span>
          )}
        </div>
        <span className="text-[11px] tracking-tight mt-0.5">Agenda</span>
      </button>

      {/* Tab: Matérias */}
      <button
        onClick={() => onSelectTab('materias')}
        className={`flex flex-col items-center justify-center py-1 px-4 min-w-[64px] min-h-[44px] rounded-xl transition-all duration-150 ${
          activeTab === 'materias'
            ? 'text-emerald-700 font-semibold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className="relative">
          <BookOpen
            size={22}
            className={`transition-transform duration-150 ${
              activeTab === 'materias' ? 'stroke-[2.5] scale-105' : 'stroke-[1.8]'
            }`}
          />
        </div>
        <span className="text-[11px] tracking-tight mt-0.5">Matérias</span>
      </button>
    </nav>
  );
};
