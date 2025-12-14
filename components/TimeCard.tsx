import React from 'react';
import { format } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { TimeZone } from '../types';
import { COMMON_TIMEZONES } from '../constants';

interface TimeCardProps {
  title: string;
  role: 'User' | 'Client';
  selectedDate: Date; // UTC date
  selectedZone: string;
  onDateChange: (newDate: Date) => void;
  onZoneChange: (newZoneId: string) => void;
  icon: React.ReactNode;
}

export const TimeCard: React.FC<TimeCardProps> = ({
  title,
  role,
  selectedDate,
  selectedZone,
  onDateChange,
  onZoneChange,
  icon
}) => {
  
  // 1. Convert the Global UTC State (selectedDate) to the Card's Local Time
  // toZonedTime converts the UTC date to a Date object representing the wall-clock time in the target zone
  const zonedDate = toZonedTime(selectedDate, selectedZone);
  
  // 2. Format for input[type="datetime-local"]
  // format pattern "yyyy-MM-dd'T'HH:mm" is required by HTML5 spec for this input
  const localInputValue = format(zonedDate, "yyyy-MM-dd'T'HH:mm");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // e.g., "2023-10-25T14:30"
    if (!value) return;

    try {
      // 3. Convert Local Wall-Clock Input back to Global UTC State
      // fromZonedTime takes the string time and the zone, and figures out the absolute UTC timestamp
      const newUtcDate = fromZonedTime(value, selectedZone);
      
      if (!isNaN(newUtcDate.getTime())) {
        onDateChange(newUtcDate);
      }
    } catch (err) {
      console.error("Time conversion error:", err);
    }
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newZone = e.target.value;
    onZoneChange(newZone);
    // Note: When zone changes, we keep the same UTC instant (selectedDate), 
    // so the wall-clock time shown in the input will shift automatically via the prop update.
  };

  // Find current zone details for display
  const currentZoneObj = COMMON_TIMEZONES.find(z => z.id === selectedZone);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-slate-700 ${role === 'User' ? 'hover:shadow-indigo-500/10 hover:bg-indigo-950/10' : 'hover:shadow-emerald-500/10 hover:bg-emerald-950/10'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-lg ${role === 'User' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
          {icon}
        </div>
        <div>
            <h2 className="text-xl font-bold text-slate-100">{title}</h2>
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">{currentZoneObj?.name}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Date Time Picker */}
        <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Selected Time ({currentZoneObj?.abbrev})
            </label>
            <input
                type="datetime-local"
                value={localInputValue}
                onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all [color-scheme:dark] font-mono"
            />
        </div>

        {/* Timezone Selector */}
        <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Time Zone</label>
            <div className="relative">
                <select
                    value={selectedZone}
                    onChange={handleZoneChange}
                    className="w-full appearance-none bg-slate-950 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                >
                    {COMMON_TIMEZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                        {zone.abbrev} — {zone.name} ({zone.gmtOffsetLabel})
                    </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
            </div>
        </div>
        
        {/* Helper Display */}
        <div className="pt-4 border-t border-slate-800/50 flex justify-between items-center">
             <span className="text-xs text-slate-500 font-mono">UTC Offset: {currentZoneObj?.gmtOffsetLabel}</span>
             <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-300`}>{currentZoneObj?.abbrev}</span>
        </div>
      </div>
    </div>
  );
};
