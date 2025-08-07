import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../redux/actions/todoActions';

function TodoForm({ currentTask, setEditingTask }) {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('Pribadi');
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTask) {
      setTaskText(currentTask.text);
      setCategory(currentTask.category);
    } else {
      setTaskText('');
      setCategory('Pribadi');
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    if (currentTask) {
      dispatch(editTask({ ...currentTask, text: taskText, category }));
      setEditingTask(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        category,
      };
      dispatch(addTask(newTask));
    }
    setTaskText('');
    setCategory('Pribadi');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Tambah atau Edit Tugas..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Pribadi">Pribadi</option>
        <option value="Pekerjaan">Pekerjaan</option>
        <option value="Belajar">Belajar</option>
      </select>
      <button type="submit">{currentTask ? 'Update Tugas' : 'Tambah Tugas'}</button>
    </form>
  );
}

export default TodoForm;
