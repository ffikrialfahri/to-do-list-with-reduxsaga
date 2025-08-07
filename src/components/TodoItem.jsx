import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskStatus } from '../redux/actions/todoActions';

function TodoItem({ task, setEditingTask }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggle = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleEdit = () => {
    setEditingTask(task);
  };

  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      <span className="todo-text">{task.text}</span>
      <span className="todo-category">[{task.category}]</span>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Hapus</button>
    </li>
  );
}

export default TodoItem;
