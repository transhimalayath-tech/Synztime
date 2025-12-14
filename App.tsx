import React, { useState } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { TimeCard } from './components/TimeCard';
import { ReferenceClocks } from './components/ReferenceClocks';
import { LiveFooter } from './components/LiveFooter';
import { COMMON_TIMEZONES } from './constants';

const App: React.FC = () => {
  // Core State: The single source of truth is `meetingTime` in UTC.
  // We initialize it to the next hour start.
  const [meetingTime, setMeetingTime] = useState<Date>(() => {
    const d = new Date();
    d.setMinutes(0, 0, 0);
    d.setHours(d.getHours() + 1);
    return d;
  });

  const [userZone, setUserZone] = useState<string>('Asia/Kolkata');
  const [clientZone, setClientZone] = useState<string>('America/New_York');

  // Helper to lookup abbreviation
  const getAbbrev = (zoneId: string) => {
    return COMMON_TIMEZONES.find(z => z.id === zoneId)?.abbrev || 'LOC';
  };

  // Dynamic summary zones: User, Client, IST
  const summaryZones = [
      { 
        id: userZone, 
        label: `${getAbbrev(userZone)} (User)`,
        sub: 'Your Time'
      },
      { 
        id: clientZone, 
        label: `${getAbbrev(clientZone)} (Client)`,
        sub: 'Client Time'
      },
      { 
        id: 'Asia/Kolkata', 
        label: 'IST (India)',
        sub: 'Reference'
      },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-slate-950 text-white selection:bg-indigo-500/30 flex flex-col">
      
      {/* Navbar */}
      <nav className="border-b border-slate-800/60 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="bg-indigo-600 p-1.5 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
             <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-slate-100">SyncZone</span>
          </div>
          <div className="text-sm text-slate-400 hidden sm:block">
            Global Meeting Planner
          </div>
        </div>
      </nav>

      {/* Main Content - Added padding bottom (pb-32) to accommodate fixed footer */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32 flex-grow w-full">
        
        {/* Global Reference Bar - Prominent placement as requested */}
        <div className="mb-8">
             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 ml-1 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Universal Reference Time
             </h3>
             <ReferenceClocks baseDate={meetingTime} />
        </div>

        {/* Hero Section / Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* User Card */}
            <TimeCard 
                title="Your Location" 
                role="User" 
                selectedDate={meetingTime}
                selectedZone={userZone}
                onDateChange={setMeetingTime}
                onZoneChange={setUserZone}
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}
            />

            {/* Client Card */}
            <TimeCard 
                title="Client Location" 
                role="Client" 
                selectedDate={meetingTime}
                selectedZone={clientZone}
                onDateChange={setMeetingTime}
                onZoneChange={setClientZone}
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>}
            />
        </div>

        {/* Meeting Booked Time Summary */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Selected Meeting Time
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summaryZones.map((zone, index) => {
                    const zTime = toZonedTime(meetingTime, zone.id);
                    return (
                        <div key={`${zone.id}-${index}`} className="flex flex-col border-l-2 border-slate-800 pl-4 transition-colors hover:border-indigo-500/50">
                            <span className="text-xs text-slate-500 font-bold uppercase mb-1">{zone.label}</span>
                            <span className="text-2xl font-mono text-slate-100">{format(zTime, 'h:mm a')}</span>
                            <span className="text-xs text-slate-400">{format(zTime, 'EEE, MMM d')}</span>
                        </div>
                    )
                })}
            </div>
        </div>

      </main>

      {/* Live Footer */}
      <LiveFooter targetDate={meetingTime} />

    </div>
  );
};

export default App;