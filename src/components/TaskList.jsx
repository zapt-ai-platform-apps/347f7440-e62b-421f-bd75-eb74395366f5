import React from 'react';

export default function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-between items-center border-b p-2">
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={() => updateTask({ ...task, completed: !task.completed })}
          >
            {task.text}
          </span>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}