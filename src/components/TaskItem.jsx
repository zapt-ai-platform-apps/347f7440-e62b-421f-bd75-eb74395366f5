import React from 'react';

export default function TaskItem({ task, updateTask, deleteTask }) {
  const toggleCompletion = () => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask);
  };

  return (
    <li className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompletion}
          className="mr-2"
        />
        <span className={task.completed ? "line-through" : ""}>{task.text}</span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500"
      >
        Delete
      </button>
    </li>
  );
}