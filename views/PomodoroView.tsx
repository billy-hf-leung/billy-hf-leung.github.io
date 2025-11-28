import React, { useState, useEffect, useRef } from 'react';
import { TimerState } from '../types';
import { TimerRing } from '../components/TimerRing';
import { TimerControls } from '../components/TimerControls';
import { playAlarm } from '../utils/sound';
import { Coffee, Brain, Armchair } from 'lucide-react';

enum PomoMode {
  FOCUS = 25 * 60,
  SHORT = 5 * 60,
  LONG = 15 * 60,
}

export const PomodoroView: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<PomoMode>(PomoMode.FOCUS);
  const [timeLeft, setTimeLeft] = useState<number>(PomoMode.FOCUS);
  const [timerState, setTimerState] = useState<TimerState>(TimerState.IDLE);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerState === TimerState.RUNNING && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playAlarm();
            setTimerState(TimerState.COMPLETED);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerState, timeLeft]);

  const switchMode = (mode: PomoMode) => {
    setTimerState(TimerState.IDLE);
    setCurrentMode(mode);
    setTimeLeft(mode);
  };

  const getModeLabel = () => {
    switch(currentMode) {
      case PomoMode.FOCUS: return "Focus Time";
      case PomoMode.SHORT: return "Short Break";
      case PomoMode.LONG: return "Long Break";
    }
  };

  const getColor = () => {
    // Map modes to the theme palette
    switch(currentMode) {
      case PomoMode.FOCUS: return "text-theme-primary"; // Sky Blue
      case PomoMode.SHORT: return "text-theme-secondary"; // Pale Ice Blue
      case PomoMode.LONG: return "text-theme-accent"; // Muted Ocean Blue
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((currentMode - timeLeft) / currentMode) * 100;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto animate-in zoom-in-95 duration-500 pt-10">
      
      {/* Mode Switcher */}
      <div className="flex p-1 bg-theme-surface rounded-full mb-8 border border-theme-border/30 transition-colors duration-300">
        <button
          onClick={() => switchMode(PomoMode.FOCUS)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            currentMode === PomoMode.FOCUS ? 'bg-theme-primary text-theme-text shadow-md' : 'text-theme-border hover:text-theme-accent'
          }`}
        >
          <Brain size={14} /> Focus
        </button>
        <button
          onClick={() => switchMode(PomoMode.SHORT)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            currentMode === PomoMode.SHORT ? 'bg-theme-secondary text-theme-text shadow-md' : 'text-theme-border hover:text-theme-accent'
          }`}
        >
          <Coffee size={14} /> Short
        </button>
        <button
          onClick={() => switchMode(PomoMode.LONG)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            currentMode === PomoMode.LONG ? 'bg-theme-accent text-white shadow-md' : 'text-theme-border hover:text-theme-accent'
          }`}
        >
          <Armchair size={14} /> Long
        </button>
      </div>

      {/* Visualizer */}
      <div className="relative mb-6">
        <TimerRing 
          radius={140} 
          stroke={8} 
          progress={100 - progress} // Reverse for countdown feel
          color={getColor()}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-theme-accent text-sm uppercase tracking-widest mb-2 font-medium">{getModeLabel()}</span>
          <div className="text-7xl font-mono font-bold text-theme-text tracking-tighter transition-colors duration-300">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <TimerControls 
        state={timerState} 
        onStart={() => setTimerState(TimerState.RUNNING)} 
        onPause={() => setTimerState(TimerState.PAUSED)} 
        onReset={() => {
          setTimerState(TimerState.IDLE);
          setTimeLeft(currentMode);
        }}
      />
    </div>
  );
};