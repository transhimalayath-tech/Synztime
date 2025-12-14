import React, { useState, useEffect } from 'react';
import { format, differenceInSeconds } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface LiveFooterProps {
  targetDate: Date; // The selected meeting time in UTC
}

export const LiveFooter: React.FC<LiveFooterProps> = ({ targetDate }) => {
  const [now, setNow] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // IST Specifics
  const istZone = 'Asia/Kolkata';
  const istTime = toZonedTime(now, istZone);

  // Countdown Logic
  const diffSeconds = differenceInSeconds(targetDate, now);
  const isFuture = diffSeconds > 0;
  
  const formatCountdown = (totalSeconds: number) => {
    const d = Math.floor(totalSeconds / (3600 * 24));
    const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    if (d > 0) return `${d}d ${h}h ${m}m ${s}s`;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/60 p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Live IST Clock */}
        <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase leading-none mb-1">Current Time (IST)</span>
                    <span className="text-xs text-slate-500 font-medium leading-none">Asia/Kolkata</span>
                </div>
            </div>
            
            <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>

            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-mono font-bold text-slate-100 tabular-nums tracking-tight">
                    {format(istTime, 'hh:mm:ss')}
                </span>
                <span className="text-sm font-bold text-slate-400">
                    {format(istTime, 'a')}
                </span>
            </div>
        </div>

        {/* Right: Meeting Timer */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end bg-slate-900/50 rounded-lg px-4 py-2 border border-slate-800">
             <div className="text-left sm:text-right">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                    {isFuture ? 'Time until Meeting' : 'Status'}
                </span>
                <span className={`text-lg font-mono font-bold tabular-nums ${isFuture ? 'text-indigo-400' : 'text-slate-600'}`}>
                    {isFuture ? formatCountdown(diffSeconds) : 'Started / Passed'}
                </span>
             </div>
             <div className={`p-2 rounded-full ${isFuture ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
        </div>

      </div>
    </div>
  );
};