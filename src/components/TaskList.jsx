import React from 'react';

export default function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => updateTask({ ...task, completed: !task.completed })}
              className="mr-2"
            />
            <span className={task.completed ? "line-through" : ""}>{task.text}</span>
          </div>
          <button onClick={() => deleteTask(task.id)} className="text-red-500">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}