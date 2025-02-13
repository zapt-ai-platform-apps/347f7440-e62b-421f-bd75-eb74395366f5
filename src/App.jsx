import React, { useState, useEffect, useRef } from 'react';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [addingTask, setAddingTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    console.log('Theme toggled:', darkMode ? 'Dark Mode' : 'Light Mode');
  }, [darkMode]);

  useEffect(() => {
    console.log('SnapTasks app loaded');
  }, []);

  const handleAddTaskClick = () => {
    setAddingTask(true);
    console.log('Add Task button clicked');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleNewTaskKeyDown = (e) => {
    if (e.key === 'Enter' && newTaskText.trim() !== '') {
      const newTask = { id: Date.now(), text: newTaskText.trim(), completed: false };
      setTasks((prev) => [...prev, newTask]);
      console.log('Task added:', newTask.text);
      setNewTaskText('');
      setAddingTask(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="p-4 relative text-center">
        <h1 className="text-xl font-bold">SnapTasks</h1>
        <button
          onClick={toggleDarkMode}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer border px-2 py-1 rounded box-border"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <main className="flex-1 flex flex-col items-center p-4">
        <div className="w-full max-w-xl">
          {!addingTask && (
            <button
              onClick={handleAddTaskClick}
              className="w-full py-4 bg-neonGreen text-white font-bold rounded cursor-pointer"
              style={{ backgroundColor: '#39FF14' }}
            >
              Add Task
            </button>
          )}
          {addingTask && (
            <input
              ref={inputRef}
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={handleNewTaskKeyDown}
              className="w-full p-2 mt-2 border rounded box-border dark:text-black"
              placeholder="Enter task description"
            />
          )}
        </div>
        <div className="w-full max-w-xl mt-4 overflow-y-auto">
          <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
      </main>
      <footer className="p-4 text-center text-sm">
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}