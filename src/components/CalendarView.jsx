// src/components/CalendarView.jsx

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function CalendarView() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  return (
    <aside className="w-80 flex-shrink-0 bg-white border-l border-slate-200 p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button className="p-1 rounded-md hover:bg-slate-100">
          <ChevronLeft size={20} className="text-slate-600" />
        </button>
        <h3 className="font-semibold text-slate-700">Oktober 2024</h3>
        <button className="p-1 rounded-md hover:bg-slate-100">
          <ChevronRight size={20} className="text-slate-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
        {/* Day Headers */}
        {days.map(day => (
          <div key={day} className="font-medium text-slate-500">{day}</div>
        ))}
        
        {/* Placeholder Dates */}
        {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
          <div 
            key={date} 
            className={`p-1.5 rounded-full cursor-pointer hover:bg-slate-200 ${date === 15 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'text-slate-700'}`}
          >
            {date}
          </div>
        ))}
      </div>
       {/* Placeholder for schedule items */}
       <div className="mt-6">
        <h4 className="font-semibold text-slate-800 mb-2">Jadwal Hari Ini</h4>
        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
          <p className="font-medium text-green-800">Rapat Tim</p>
          <p className="text-sm text-green-600">10:00 - 11:00</p>
        </div>
       </div>
    </aside>
  );
}

export default CalendarView;
