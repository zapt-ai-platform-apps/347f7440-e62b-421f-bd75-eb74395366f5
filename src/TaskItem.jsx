import React from 'react';
import { useSwipeable } from 'react-swipeable';

export default function TaskItem({ task, updateTask, deleteTask }) {
  const handleSwipe = (direction) => {
    console.log(`Task ${task.id} swiped:`, direction);
    if (direction === 'Left') {
      deleteTask(task.id);
      console.log('Task deleted:', task.id);
    } else if (direction === 'Right') {
      const updated = { ...task, completed: !task.completed };
      updateTask(updated);
      console.log('Task updated:', updated);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('Left'),
    onSwipedRight: () => handleSwipe('Right'),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <div
      {...handlers}
      className="p-4 bg-white dark:bg-gray-800 rounded shadow cursor-pointer select-none"
    >
      <p className={`text-lg ${task.completed ? "line-through text-green-500" : ""}`}>
        {task.text}
      </p>
    </div>
  );
}