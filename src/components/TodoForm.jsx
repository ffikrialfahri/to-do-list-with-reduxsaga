import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../redux/actions/todoActions';

function TodoForm({ currentTask, setEditingTask, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Pribadi');
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description || ''); // Handle existing tasks without description
      setCategory(currentTask.category);
    } else {
      setTitle('');
      setDescription('');
      setCategory('Pribadi');
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Title is required

    if (currentTask) {
      dispatch(editTask({ ...currentTask, title, description, category }));
      if (setEditingTask) setEditingTask(null);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        completed: false,
        category,
      };
      dispatch(addTask(newTask));
    }
    setTitle('');
    setDescription('');
    setCategory('Pribadi');
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Judul Tugas..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />
      <textarea
        placeholder="Deskripsi Tugas..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 outline-none h-24 resize-y"
      ></textarea>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 outline-none">
        <option value="Pribadi">Pribadi</option>
        <option value="Pekerjaan">Pekerjaan</option>
        <option value="Belajar">Belajar</option>
      </select>
      <button type="submit" className="w-full p-2.5 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 transition-colors">
        {currentTask ? 'Update Tugas' : 'Tambah Tugas'}
      </button>
    </form>
  );
}

export default TodoForm;
