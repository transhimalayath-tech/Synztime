import React from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface ReferenceClocksProps {
  baseDate: Date;
}

// Focused list: US West, US East, Europe (London), India (IST)
const ZONES_TO_DISPLAY = [
  { label: 'PST', subLabel: 'Pacific', zone: 'America/Los_Angeles', color: 'text-pink-400', border: 'border-pink-500/20' },
  { label: 'EST', subLabel: 'Eastern', zone: 'America/New_York', color: 'text-purple-400', border: 'border-purple-500/20' },
  { label: 'GMT', subLabel: 'London', zone: 'Europe/London', color: 'text-cyan-400', border: 'border-cyan-500/20' },
  { label: 'IST', subLabel: 'India', zone: 'Asia/Kolkata', color: 'text-orange-400', border: 'border-orange-500/20' },
];

export const ReferenceClocks: React.FC<ReferenceClocksProps> = ({ baseDate }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {ZONES_TO_DISPLAY.map((item) => {
        const timeInZone = toZonedTime(baseDate, item.zone);
        
        return (
          <div key={item.label} className={`flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/60 border ${item.border} backdrop-blur-sm transition-all hover:bg-slate-900`}>
            <div className="flex items-baseline gap-2 mb-2">
                 <span className={`text-sm font-bold tracking-wider ${item.color}`}>{item.label}</span>
                 <span className="text-[10px] text-slate-500 uppercase">{item.subLabel}</span>
            </div>
            <span className="text-3xl font-mono text-slate-100 font-medium tracking-tight">
              {format(timeInZone, 'h:mm a')}
            </span>
            <span className="text-xs text-slate-400 font-medium mt-1">
              {format(timeInZone, 'EEE, MMM d')}
            </span>
          </div>
        );
      })}
    </div>
  );
};