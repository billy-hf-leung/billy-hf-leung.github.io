import React from 'react';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';
import { TimerState } from '../types';

interface TimerControlsProps {
  state: TimerState;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onAddMinute?: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  state,
  onStart,
  onPause,
  onReset,
  onAddMinute
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {state === TimerState.RUNNING ? (
        <button
          onClick={onPause}
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-white text-theme-text hover:bg-theme-surface transition-all border border-theme-border/50 shadow-sm"
        >
          <Pause size={28} fill="currentColor" className="opacity-90" />
        </button>
      ) : (
        <button
          onClick={onStart}
          className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-theme-primary text-theme-text hover:bg-theme-secondary hover:scale-105 transition-all shadow-lg shadow-theme-accent/20"
        >
          <Play size={32} fill="currentColor" className="ml-1" />
        </button>
      )}

      <button
        onClick={onReset}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-theme-border hover:text-theme-text hover:bg-theme-surface transition-all border border-theme-border/50 shadow-sm"
        title="Reset"
      >
        <RotateCcw size={20} />
      </button>

      {onAddMinute && (
        <button
          onClick={onAddMinute}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-theme-border hover:text-theme-text hover:bg-theme-surface transition-all border border-theme-border/50 shadow-sm"
          title="Add 1 Minute"
        >
          <Plus size={20} />
        </button>
      )}
    </div>
  );
};