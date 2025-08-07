// src/components/Sidebar.jsx

import React from 'react';
import { LayoutGrid, CalendarDays } from 'lucide-react';

function Sidebar() {
  return (
    <aside className="w-16 flex flex-col items-center bg-white border-r border-slate-200 py-4">
      {/* Logo Placeholder */}
      <div className="w-8 h-8 bg-slate-800 rounded-lg mb-8"></div>

      {/* Main Navigation */}
      <nav className="flex flex-col items-center gap-4">
        <a href="#" className="p-2 rounded-lg bg-indigo-50 text-indigo-600 transition-colors duration-200" title="Tugas">
          <LayoutGrid size={24} />
        </a>
        <a href="#" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors duration-200" title="Jadwal">
          <CalendarDays size={24} />
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;