export enum AppMode {
  TIMER = 'TIMER',
  POMODORO = 'POMODORO'
}

export enum TimerState {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED'
}

export interface Lap {
  id: number;
  time: number; // in milliseconds
  split: number; // difference from last lap
}

export interface TimerConfig {
  duration: number; // in seconds
  initialDuration: number;
  label: string;
}

export interface AITimerResponse {
  durationSeconds: number;
  label: string;
  confidence: number;
}