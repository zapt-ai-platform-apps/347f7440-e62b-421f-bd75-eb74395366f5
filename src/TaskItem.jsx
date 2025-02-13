import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export default function TaskItem({ task, updateTask, deleteTask }) {
  const [swipeDirection, setSwipeDirection] = useState('');

  const handleSwipe = (direction) => {
    console.log(`Task ${task.id} swiped:`, direction);
    if (direction === 'Left') {
      setSwipeDirection('-translate-x-full');
      setTimeout(() => {
        deleteTask(task.id);
        console.log('Task deleted:', task.id);
      }, 300);
    } else if (direction === 'Right') {
      setSwipeDirection('translate-x-full');
      setTimeout(() => {
        const updated = { ...task, completed: !task.completed };
        updateTask(updated);
        console.log('Task updated:', updated);
        setSwipeDirection('');
      }, 300);
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
      className={`p-4 bg-white dark:bg-gray-800 rounded shadow cursor-pointer select-none transition-transform duration-300 transform ${swipeDirection}`}
    >
      <p className={`text-lg ${task.completed ? "line-through text-green-500" : ""}`}>
        {task.text}
      </p>
    </div>
  );
}