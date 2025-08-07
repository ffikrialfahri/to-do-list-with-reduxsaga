// src/components/FilterControls.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterStatus, setFilterCategory } from '../redux/actions/filterActions';
import { Plus } from 'lucide-react';

function FilterControls({ setIsModalOpen, setEditingTask }) {
  const dispatch = useDispatch();
  const { status, category } = useSelector((state) => state.filter);

  const statuses = ['All', 'Active', 'Completed'];
  const categories = ['Pribadi', 'Pekerjaan', 'Belajar'];

  const commonButtonClasses = "px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200";
  const activeClasses = "bg-indigo-600 text-white shadow";
  const inactiveClasses = "bg-slate-100 text-slate-700 hover:bg-slate-200";

  const handleAllClick = () => {
    dispatch(setFilterStatus('All'));
    dispatch(setFilterCategory('All'));
  };

  const handleAddTaskClick = () => {
    setEditingTask(null); // Ensure it's a new task
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center gap-2 mb-6 pb-4 overflow-x-auto no-scrollbar">
      {/* Single All Filter Button */}
      <button
        onClick={handleAllClick}
        className={`${commonButtonClasses} ${status === 'All' && category === 'All' ? activeClasses : inactiveClasses} flex-shrink-0`}
      >
        All
      </button>

      {/* Status Filters (excluding All) */}
      {statuses.filter(s => s !== 'All').map((s) => (
        <button
          key={s}
          onClick={() => dispatch(setFilterStatus(s))}
          className={`${commonButtonClasses} ${status === s ? activeClasses : inactiveClasses} flex-shrink-0`}
        >
          {s}
        </button>
      ))}

      {/* Category Filters (excluding All) */}
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => dispatch(setFilterCategory(c))}
          className={`${commonButtonClasses} ${category === c ? activeClasses : inactiveClasses} flex-shrink-0`}
        >
          {c}
        </button>
      ))}

      <div className="flex-grow"></div> {/* Spacer untuk mendorong tombol ke kanan */}
      <button
        onClick={handleAddTaskClick} // Panggil fungsi baru
        className="p-2 rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 transition-colors flex-shrink-0"
        title="Tambah Tugas"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}

export default FilterControls;