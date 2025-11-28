import React, { useState, useEffect, useRef } from 'react';
import { TimerState } from '../types';
import { TimerRing } from '../components/TimerRing';
import { TimerControls } from '../components/TimerControls';
import { playAlarm } from '../utils/sound';
import { ChevronsUpDown } from 'lucide-react';

export const TimerView: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(300); // Default 5 mins
  const [initialTime, setInitialTime] = useState(300);
  const [timerState, setTimerState] = useState<TimerState>(TimerState.IDLE);
  const label = "Timer";
  
  const timerRef = useRef<number | null>(null);
  const scrollAccumulator = useRef(0);

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

  const handleStart = () => setTimerState(TimerState.RUNNING);
  const handlePause = () => setTimerState(TimerState.PAUSED);
  const handleReset = () => {
    setTimerState(TimerState.IDLE);
    setTimeLeft(initialTime);
  };
  const handleAddMinute = () => {
    setTimeLeft(prev => prev + 60);
    setInitialTime(prev => prev + 60);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (timerState !== TimerState.IDLE) return;

    scrollAccumulator.current += e.deltaY;
    const threshold = 50; // Throttle scroll events

    if (Math.abs(scrollAccumulator.current) > threshold) {
      const direction = scrollAccumulator.current < 0 ? 1 : -1; // Scroll up to increase, down to decrease
      const step = 60; // 60 seconds

      // Calculate new time but prevent it from going below 0
      const newTime = Math.max(0, timeLeft + (step * direction));
      
      setTimeLeft(newTime);
      setInitialTime(newTime);
      scrollAccumulator.current = 0;
    }
  };

  const progress = initialTime > 0 ? (timeLeft / initialTime) * 100 : 0;

  // Formatting
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto animate-in fade-in duration-500 pt-10">
      
      {/* Visualizer */}
      <div 
        className={`relative mb-6 ${timerState === TimerState.IDLE ? 'cursor-ns-resize group' : ''}`}
        onWheel={handleWheel}
      >
        <TimerRing radius={140} stroke={8} progress={progress} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-theme-accent text-sm uppercase tracking-widest mb-2 font-medium">{label}</span>
          <div className="text-6xl font-mono font-bold text-theme-text tracking-tighter transition-colors duration-300">
            {formatTime(timeLeft)}
          </div>
          
          {timerState === TimerState.IDLE ? (
            <div className="flex items-center gap-1 mt-2 text-theme-border opacity-50 group-hover:opacity-100 transition-opacity">
              <ChevronsUpDown size={14} className="animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wide">Scroll to Set</span>
            </div>
          ) : (
             <span className="text-theme-border text-xs mt-2 font-mono uppercase tracking-wide">
              {timerState === TimerState.RUNNING ? 'RUNNING' : timerState === TimerState.PAUSED ? 'PAUSED' : 'DONE'}
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <TimerControls 
        state={timerState} 
        onStart={handleStart} 
        onPause={handlePause} 
        onReset={handleReset}
        onAddMinute={handleAddMinute}
      />
    </div>
  );
};