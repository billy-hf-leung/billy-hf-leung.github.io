import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { TimerState, Lap } from '../types';

export const StopwatchView: React.FC = () => {
  const [time, setTime] = useState(0); // in milliseconds
  const [state, setState] = useState<TimerState>(TimerState.IDLE);
  const [laps, setLaps] = useState<Lap[]>([]);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const savedTimeRef = useRef<number>(0);

  const animate = (timestamp: number) => {
    if (startTimeRef.current > 0) {
      setTime(timestamp - startTimeRef.current + savedTimeRef.current);
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (state === TimerState.RUNNING) {
      startTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      savedTimeRef.current = time;
      startTimeRef.current = 0;
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleStart = () => setState(TimerState.RUNNING);
  const handlePause = () => setState(TimerState.PAUSED);
  const handleReset = () => {
    setState(TimerState.IDLE);
    setTime(0);
    setLaps([]);
    savedTimeRef.current = 0;
  };

  const handleLap = () => {
    const lastLapTime = laps.length > 0 ? laps[0].time : 0;
    const newLap: Lap = {
      id: laps.length + 1,
      time: time,
      split: time - lastLapTime
    };
    setLaps([newLap, ...laps]);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return (
      <div className="flex items-baseline gap-1">
        <span>{minutes.toString().padStart(2, '0')}</span>
        <span className="text-theme-border">:</span>
        <span>{seconds.toString().padStart(2, '0')}</span>
        <span className="text-theme-border">.</span>
        <span className="text-4xl text-theme-accent">{centiseconds.toString().padStart(2, '0')}</span>
      </div>
    );
  };

  const formatSplit = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `+${m}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto h-[600px] animate-in slide-in-from-right duration-500">
      {/* Display */}
      <div className="flex flex-col items-center justify-center h-64 w-full">
        <div className="text-7xl font-mono font-bold text-theme-text tracking-tighter tabular-nums transition-colors duration-300">
          {formatTime(time)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
         {state === TimerState.RUNNING ? (
          <button
            onClick={handlePause}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-theme-text border border-theme-border/50 hover:bg-theme-surface transition-all shadow-sm"
          >
            <Pause size={28} />
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-theme-primary text-theme-text shadow-lg shadow-theme-accent/20 hover:bg-theme-secondary transition-all"
          >
            <Play size={28} className="ml-1" />
          </button>
        )}

        <button
          onClick={state === TimerState.RUNNING ? handleLap : handleReset}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-theme-text border border-theme-border/50 hover:bg-theme-surface transition-all shadow-sm"
        >
          {state === TimerState.RUNNING ? <Flag size={24} /> : <RotateCcw size={24} />}
        </button>
      </div>

      {/* Laps */}
      <div className="w-full flex-1 overflow-y-auto bg-white/50 rounded-xl p-4 border border-theme-border/30 shadow-inner transition-colors duration-300">
        <table className="w-full text-sm">
          <thead className="text-theme-border text-xs uppercase text-left sticky top-0 bg-theme-bg/95 backdrop-blur-sm pb-2 border-b border-theme-border/20">
            <tr>
              <th className="pb-2 pl-2">Lap</th>
              <th className="pb-2">Split</th>
              <th className="pb-2 text-right pr-2">Total</th>
            </tr>
          </thead>
          <tbody className="font-mono text-theme-text">
            {laps.map((lap) => (
              <tr key={lap.id} className="border-b border-theme-border/20 last:border-0 hover:bg-theme-surface/50 transition-colors">
                <td className="py-3 pl-2 text-theme-accent">#{lap.id.toString().padStart(2, '0')}</td>
                <td className="py-3 text-theme-secondaryDark">{formatSplit(lap.split)}</td>
                <td className="py-3 text-right pr-2">
                  {Math.floor(lap.time / 60000)}:
                  {Math.floor((lap.time % 60000) / 1000).toString().padStart(2, '0')}.
                  {Math.floor((lap.time % 1000) / 10).toString().padStart(2, '0')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {laps.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-theme-border space-y-2">
            <Flag size={24} className="opacity-20" />
            <p className="text-xs">No laps recorded</p>
          </div>
        )}
      </div>
    </div>
  );
};