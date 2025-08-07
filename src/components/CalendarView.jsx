// src/components/CalendarView.jsx

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';

function CalendarView() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const tasks = useSelector((state) => state.todos.tasks);

  const getTodayFormattedDate = () => {
    const today = new Date();
    // Format YYYY-MM-DD to match the input type="date" value
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayFormatted = getTodayFormattedDate();

  const todayTasks = tasks.filter(task => task.dueDate === todayFormatted);
  
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
            className={`p-1.5 rounded-full cursor-pointer hover:bg-slate-200 ${date === new Date().getDate() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'text-slate-700'}`}
          >
            {date}
          </div>
        ))}
      </div>
       {/* Today's Schedule */}
       <div className="mt-6">
        <h4 className="font-semibold text-slate-800 mb-2">Jadwal Hari Ini</h4>
        {todayTasks.length > 0 ? (
          todayTasks.map(task => (
            <div key={task.id} className="p-3 rounded-lg bg-blue-50 border border-blue-200 mb-2">
              <p className="font-medium text-blue-800">{task.title}</p>
              {task.description && <p className="text-sm text-blue-600">{task.description}</p>}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">Tidak ada tugas untuk hari ini.</p>
        )}
       </div>
    </aside>
  );
}

export default CalendarView;
