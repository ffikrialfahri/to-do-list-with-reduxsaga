// src/components/TodoItem.jsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskStatus } from '../redux/actions/todoActions';
import { Edit, Trash2 } from 'lucide-react';

function TodoItem({ task, setEditingTask, setIsModalOpen }) {
  const dispatch = useDispatch();

  // Fungsi handleEdit DIPINDAHKAN KELUAR dari JSX dan diletakkan di sini.
  // Ini adalah tempat yang benar untuk mendefinisikan fungsi helper.
  const handleEdit = () => {
    setEditingTask(task);
    setIsModalOpen(true); // Membuka modal yang akan menampung form edit
  };

  const categoryColors = {
    Pekerjaan: 'bg-blue-100 text-blue-800',
    Pribadi: 'bg-green-100 text-green-800',
    Belajar: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <li className={`group flex items-center bg-white border border-slate-200 p-3 mb-2 rounded-lg transition-all duration-200 hover:shadow-md hover:border-slate-300 ${task.completed ? 'opacity-60' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleTaskStatus(task.id))}
        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer self-start mt-1"
      />
      <div className="flex-grow ml-4 text-left">
        {/* Menggunakan task.title dan task.description sesuai kode Anda */}
        <p className={`text-slate-800 font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</p>
        {task.description && <p className={`text-slate-600 text-sm ${task.completed ? 'line-through' : ''}`}>{task.description}</p>}
        <span className={`text-xs font-medium px-2 py-0.5 mt-1 inline-block rounded-full ${categoryColors[task.category] || 'bg-slate-100 text-slate-800'}`}>
          {task.category}
        </span>
      </div>
      
      {/* Tombol aksi yang muncul saat hover */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Tombol Edit DITAMBAHKAN KEMBALI dan menggunakan fungsi handleEdit */}
        <button onClick={handleEdit} className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md">
          <Edit size={16} />
        </button>
        <button onClick={() => dispatch(deleteTask(task.id))} className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md">
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;