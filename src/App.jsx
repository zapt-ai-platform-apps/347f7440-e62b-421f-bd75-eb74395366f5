import React, { useState, useRef, useEffect } from 'react';
import TaskList from './components/TaskList';
import Timer from './components/Timer';
import Calendar from './components/Calendar';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [addingTask, setAddingTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [timerMode, setTimerMode] = useState(false);
  const [selectedTimerDuration, setSelectedTimerDuration] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
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

  const resetTimerMode = () => {
    console.log('Exiting Timer mode');
    setTimerMode(false);
    setSelectedTimerDuration(null);
  };

  const renderTimerOptions = () => {
    const options = [
      { label: '1 Minute', seconds: 60 },
      { label: '5 Minutes', seconds: 300 },
      { label: '10 Minutes', seconds: 600 },
      { label: '30 Minutes', seconds: 1800 },
      { label: '1 Hour', seconds: 3600 }
    ];

    return (
      <div className="flex justify-center space-x-2 mt-4">
        {options.map((option) => (
          <button
            key={option.seconds}
            onClick={() => {
              setSelectedTimerDuration(option.seconds);
              console.log(`Timer duration set to ${option.seconds} seconds`);
            }}
            className="py-2 px-4 bg-yellow-400 text-black font-bold rounded cursor-pointer"
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="p-4 relative flex justify-center items-center">
        <button
          onClick={toggleDarkMode}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 border px-2 py-1 rounded box-border cursor-pointer"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <h1 className="text-xl font-bold">SnapTasks</h1>
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {new Date().toLocaleDateString()}
        </span>
      </header>
      <main className="flex-1 flex flex-col items-center p-4">
        <div className="w-full max-w-xl">
          {showCalendar ? (
            <Calendar onClose={() => { setShowCalendar(false); console.log('Calendar closed'); }} />
          ) : timerMode ? (
            <div>
              <div className="flex justify-end">
                <button
                  onClick={resetTimerMode}
                  className="py-2 px-4 bg-gray-500 text-white font-bold rounded cursor-pointer"
                >
                  Back
                </button>
              </div>
              {selectedTimerDuration === null ? (
                renderTimerOptions()
              ) : (
                <Timer initialSeconds={selectedTimerDuration} exitTimer={resetTimerMode} />
              )}
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-4">
                <button
                  onClick={() => { setShowCalendar(true); console.log('Calendar opened'); }}
                  className="py-2 px-4 bg-orange-500 text-white font-bold rounded cursor-pointer"
                >
                  Calendar
                </button>
                {!addingTask ? (
                  <button
                    onClick={handleAddTaskClick}
                    className="py-4 px-6 bg-green-500 text-white font-bold rounded cursor-pointer"
                    style={{ backgroundColor: '#39FF14' }}
                  >
                    Add Task
                  </button>
                ) : (
                  <button
                    disabled
                    className="py-4 px-6 bg-gray-400 text-white font-bold rounded cursor-not-allowed"
                  >
                    Add Task
                  </button>
                )}
                <button
                  onClick={() => { setTimerMode(true); setSelectedTimerDuration(null); console.log('Timer mode activated'); }}
                  className="py-4 px-6 bg-yellow-400 text-black font-bold rounded cursor-pointer"
                  style={{ backgroundColor: '#FFFF00' }}
                >
                  Set Timer
                </button>
              </div>
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
              <div className="w-full max-w-xl mt-4 overflow-y-auto">
                <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
              </div>
            </div>
          )}
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