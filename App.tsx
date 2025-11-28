import React, { useState, useEffect } from 'react';
import { Timer, Hourglass, Settings2, Palette, X } from 'lucide-react';
import { AppMode } from './types';
import { TimerView } from './views/TimerView';
import { PomodoroView } from './views/PomodoroView';
import { THEMES, Theme } from './utils/themes';

function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.TIMER);
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const { colors } = currentTheme;
    
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-bg', colors.bg);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-border', colors.border);
  }, [currentTheme]);

  const renderView = () => {
    switch (mode) {
      case AppMode.TIMER:
        return <TimerView />;
      case AppMode.POMODORO:
        return <PomodoroView />;
      default:
        return <TimerView />;
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-theme-bg text-theme-text flex flex-col items-center justify-between py-8 px-4 font-sans selection:bg-theme-primary/30 transition-colors duration-500">
        
        {/* Header & Theme Toggle */}
        <header className="flex items-start justify-between w-full max-w-2xl mb-8 relative">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-theme-primary flex items-center justify-center shadow-lg shadow-theme-accent/10 border border-theme-border/20 transition-colors duration-500">
                <Timer className="text-theme-text" size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-theme-text transition-colors duration-500">
                Timer m8
              </h1>
            </div>
            <p className="text-xs text-theme-accent font-medium tracking-wide transition-colors duration-500">"LOST TIME IS NEVER FOUND AGAIN."</p>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="p-2 rounded-full text-theme-border hover:bg-theme-surface hover:text-theme-text transition-all duration-300"
              title="Change Theme"
            >
              <Palette size={20} />
            </button>

            {/* Theme Dropdown */}
            {isThemeMenuOpen && (
              <div className="absolute right-0 top-12 z-50 w-64 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-theme-border/20 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex justify-between items-center mb-3 px-1">
                  <span className="text-xs font-bold uppercase text-theme-text tracking-wider">Select Theme</span>
                  <button onClick={() => setIsThemeMenuOpen(false)} className="text-theme-border hover:text-theme-accent">
                    <X size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setCurrentTheme(theme);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full p-2 rounded-lg transition-all text-left group ${
                        currentTheme.id === theme.id 
                          ? 'bg-theme-surface ring-1 ring-theme-primary/50' 
                          : 'hover:bg-theme-surface/50'
                      }`}
                    >
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: theme.colors.primary }} />
                        <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: theme.colors.bg }} />
                        <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: theme.colors.accent }} />
                      </div>
                      <span className={`text-sm font-medium ${currentTheme.id === theme.id ? 'text-theme-text' : 'text-theme-border group-hover:text-theme-text'}`}>
                        {theme.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full max-w-2xl flex-1 flex flex-col items-center justify-center">
          {renderView()}
        </main>

        {/* Navigation Bar */}
        <nav className="mt-8 bg-white/80 backdrop-blur-md border border-theme-border/50 rounded-2xl p-2 shadow-xl shadow-theme-accent/5 transition-colors duration-500">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMode(AppMode.TIMER)}
              className={`flex flex-col items-center gap-1 px-8 py-3 rounded-xl transition-all duration-300 ${
                mode === AppMode.TIMER 
                  ? 'bg-theme-surface text-theme-accent shadow-sm ring-1 ring-theme-border/20' 
                  : 'text-theme-border hover:text-theme-text hover:bg-theme-surface/50'
              }`}
            >
              <Hourglass size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Timer</span>
            </button>
            
            <button
              onClick={() => setMode(AppMode.POMODORO)}
              className={`flex flex-col items-center gap-1 px-8 py-3 rounded-xl transition-all duration-300 ${
                mode === AppMode.POMODORO 
                  ? 'bg-theme-surface text-theme-accent shadow-sm ring-1 ring-theme-border/20' 
                  : 'text-theme-border hover:text-theme-text hover:bg-theme-surface/50'
              }`}
            >
              <Settings2 size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Focus</span>
            </button>
          </div>
        </nav>

      </div>
    </div>
  );
}

export default App;