// src/components/FilterControls.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterStatus, setFilterCategory, setSearchKeyword } from '../redux/actions/filterActions';
import { Plus, Search } from 'lucide-react';

function FilterControls({ setIsModalOpen, setEditingTask }) {
  const dispatch = useDispatch();
  const { status, category, keyword } = useSelector((state) => state.filter);
  const [showSearchInput, setShowSearchInput] = useState(false); // State untuk visibilitas input pencarian

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

  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
    if (showSearchInput) {
      dispatch(setSearchKeyword('')); // Clear search when hiding
    }
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

      {/* Search Input (conditionally rendered) */}
      {showSearchInput && (
        <input
          type="text"
          placeholder="Cari tugas..."
          value={keyword}
          onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
          className="flex-grow p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
      )}

      <div className="flex-grow"></div> {/* Spacer untuk mendorong tombol ke kanan */}
      
      {/* Search Icon Button */}
      <button
        onClick={handleSearchClick}
        className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors flex-shrink-0"
        title="Cari Tugas"
      >
        <Search size={20} />
      </button>

      {/* Add Task Button */}
      <button
        onClick={handleAddTaskClick}
        className="p-2 rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 transition-colors flex-shrink-0"
        title="Tambah Tugas"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}

export default FilterControls;