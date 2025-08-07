// src/components/TodoList.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function TodoList({ setEditingTask, setIsModalOpen }) {
  const tasks = useSelector((state) => state.todos.tasks);
  const { status, category, keyword } = useSelector((state) => state.filter);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = status === 'All' ||
      (status === 'Active' && !task.completed) ||
      (status === 'Completed' && task.completed);
    const matchesCategory = category === 'All' || task.category === category;
    const matchesKeyword = task.title.toLowerCase().includes(keyword.toLowerCase()) ||
                           task.description.toLowerCase().includes(keyword.toLowerCase());
    return matchesStatus && matchesCategory && matchesKeyword;
  });

  return (
    <div className="todo-list-container">
      {/* Daftar tugas */}
      <ul className="list-none p-0 mt-6 space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TodoItem key={task.id} task={task} setEditingTask={setEditingTask} setIsModalOpen={setIsModalOpen} />
          ))
        ) : (
          <p className="text-center text-slate-500 py-4">Tidak ada tugas yang cocok.</p>
        )}
      </ul>
    </div>
  );
}

export default TodoList;