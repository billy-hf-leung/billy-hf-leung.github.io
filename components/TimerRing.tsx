import React from 'react';

interface TimerRingProps {
  radius: number;
  stroke: number;
  progress: number; // 0 to 100
  color?: string;
}

export const TimerRing: React.FC<TimerRingProps> = ({ 
  radius, 
  stroke, 
  progress,
  color = "text-theme-primary" 
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="rotate-[-90deg] transition-all duration-300"
      >
        {/* Background Ring */}
        <circle
          className="text-theme-border opacity-20 transition-colors duration-300"
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress Ring */}
        <circle
          className={`${color} transition-all duration-500 ease-in-out`}
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </div>
  );
};