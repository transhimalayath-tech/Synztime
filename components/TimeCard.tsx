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
  const zonedDate = toZonedTime(selectedDate, selectedZone);
  
  // 2. Extract parts for controlled inputs
  const dateValue = format(zonedDate, 'yyyy-MM-dd');
  const hourValue = format(zonedDate, 'h'); // '1' through '12'
  const minuteValue = format(zonedDate, 'mm'); // '00' through '59'
  const periodValue = format(zonedDate, 'a'); // 'AM' or 'PM'

  // Helper to rebuild date from parts and update parent
  const updateDateTime = (newDateStr: string, newHour12: string, newMinute: string, newPeriod: string) => {
    let h = parseInt(newHour12, 10);
    // Convert 12h to 24h
    if (newPeriod === 'PM' && h < 12) h += 12;
    if (newPeriod === 'AM' && h === 12) h = 0;
    
    const hStr = h.toString().padStart(2, '0');
    // Construct ISO-like string for parsing: YYYY-MM-DDTHH:mm:00
    const combined = `${newDateStr}T${hStr}:${newMinute}:00`;
    
    // Convert back to UTC using the selected timezone
    try {
      const newUtcDate = fromZonedTime(combined, selectedZone);
      if (!isNaN(newUtcDate.getTime())) {
        onDateChange(newUtcDate);
      }
    } catch (e) {
      console.error("Date update error:", e);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDateTime(e.target.value, hourValue, minuteValue, periodValue);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateDateTime(dateValue, e.target.value, minuteValue, periodValue);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateDateTime(dateValue, hourValue, e.target.value, periodValue);
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateDateTime(dateValue, hourValue, minuteValue, e.target.value);
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onZoneChange(e.target.value);
  };

  // Generate options
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // Calculate dynamic offset string (e.g., "GMT-4")
  const currentZoneObj = COMMON_TIMEZONES.find(z => z.id === selectedZone);
  const getDynamicOffset = (date: Date, timeZone: string) => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        timeZoneName: 'shortOffset'
      }).formatToParts(date);
      const offsetPart = parts.find(p => p.type === 'timeZoneName');
      return offsetPart ? offsetPart.value : '';
    } catch (e) {
      return '';
    }
  };
  const dynamicOffset = getDynamicOffset(selectedDate, selectedZone);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-slate-700 ${role === 'User' ? 'hover:shadow-indigo-500/10 hover:bg-indigo-950/10' : 'hover:shadow-emerald-500/10 hover:bg-emerald-950/10'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-lg ${role === 'User' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
          {icon}
        </div>
        <div>
            <h2 className="text-xl font-bold text-slate-100">{title}</h2>
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                {currentZoneObj?.name.split(',')[0]}
            </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Date & Time Selection */}
        <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Selected Date & Time
            </label>
            
            <div className="flex flex-col gap-3">
                {/* Date Input */}
                <input
                    type="date"
                    value={dateValue}
                    onChange={handleDateChange}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all [color-scheme:dark] font-mono"
                />
                
                {/* Time Input Group */}
                <div className="flex gap-2">
                    {/* Hour */}
                    <div className="relative flex-1">
                        <select
                            value={hourValue}
                            onChange={handleHourChange}
                            className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg px-2 py-3 focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-center cursor-pointer"
                        >
                            {hours.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                    </div>
                    
                    <div className="flex items-center text-slate-600 font-bold">:</div>

                    {/* Minute */}
                    <div className="relative flex-1">
                        <select
                            value={minuteValue}
                            onChange={handleMinuteChange}
                            className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-lg px-2 py-3 focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-center cursor-pointer"
                        >
                            {minutes.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>

                    {/* AM/PM */}
                    <div className="relative flex-1">
                        <select
                            value={periodValue}
                            onChange={handlePeriodChange}
                            className="w-full bg-slate-950 border border-slate-700 text-indigo-300 font-bold rounded-lg px-2 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-center cursor-pointer"
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {/* Timezone Selector */}
        <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Location / Time Zone</label>
            <div className="relative">
                <select
                    value={selectedZone}
                    onChange={handleZoneChange}
                    className="w-full appearance-none bg-slate-950 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm cursor-pointer"
                >
                    {COMMON_TIMEZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                         {zone.name} ({zone.abbrev})
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
             <span className="text-xs text-slate-500 font-mono">
                Offset: <span className="text-slate-400">{dynamicOffset || currentZoneObj?.gmtOffsetLabel}</span>
             </span>
             <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-300`}>{currentZoneObj?.abbrev}</span>
        </div>
      </div>
    </div>
  );
};