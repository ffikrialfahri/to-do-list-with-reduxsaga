import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

function TodoList() {
  const tasks = useSelector((state) => state.todos.tasks);
  const { status, category, keyword } = useSelector((state) => state.filter);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = status === 'All' ||
      (status === 'Active' && !task.completed) ||
      (status === 'Completed' && task.completed);

    const matchesCategory = category === 'All' || task.category === category;

    const matchesKeyword = task.text.toLowerCase().includes(keyword.toLowerCase());

    return matchesStatus && matchesCategory && matchesKeyword;
  });

  return (
    <div className="todo-list-container">
      <TodoForm currentTask={editingTask} setEditingTask={setEditingTask} />
      <ul className="todo-list">
        {filteredTasks.map((task) => (
          <TodoItem key={task.id} task={task} setEditingTask={setEditingTask} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
