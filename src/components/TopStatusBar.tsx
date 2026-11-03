import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface TopStatusBarProps {
  darkText?: boolean;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({ darkText = true }) => {
  return (
    <div
      className={`w-full px-6 pt-3 pb-1 flex items-center justify-between text-xs font-semibold select-none z-30 transition-colors ${
        darkText ? 'text-slate-900' : 'text-slate-100'
      }`}
    >
      {/* Time */}
      <span className="tracking-tight text-[13px] font-bold">9:41</span>

      {/* Dynamic Island pill representation */}
      <div className="w-24 h-5 bg-black rounded-full mx-auto -mt-1 hidden sm:flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-slate-900/80 rounded-full ml-auto mr-2 border border-slate-700/50" />
      </div>

      {/* Right icons: Cellular, Wifi, Battery */}
      <div className="flex items-center gap-1.5 ml-auto">
        {/* Cellular signal bars */}
        <div className="flex items-end gap-0.5 h-3">
          <div className="w-0.5 h-1 bg-current rounded-full" />
          <div className="w-0.5 h-1.5 bg-current rounded-full" />
          <div className="w-0.5 h-2 bg-current rounded-full" />
          <div className="w-0.5 h-2.5 bg-current rounded-full" />
        </div>
        <Wifi size={13} className="stroke-[2.5]" />
        <div className="flex items-center gap-0.5">
          <Battery size={16} className="stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
};
