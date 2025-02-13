import React from 'react';

export default function TaskList({ tasks, updateTask, deleteTask }) {
  const handleToggle = (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask);
  };

  return (
    <ul className="list-none p-0">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between my-2 p-2 bg-white dark:bg-gray-800 rounded shadow">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task)}
              className="mr-2"
            />
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.text}
            </span>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="ml-4 py-1 px-3 bg-red-500 text-white rounded cursor-pointer"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}