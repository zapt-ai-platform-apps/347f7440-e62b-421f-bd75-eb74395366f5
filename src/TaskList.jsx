import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <div className="flex flex-col space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
      ))}
    </div>
  );
}