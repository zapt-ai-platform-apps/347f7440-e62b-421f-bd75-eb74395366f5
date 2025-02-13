import React, { useState, useEffect, useRef } from 'react';

export default function Timer({ exitTimer }) {
  const [timerActive, setTimerActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const timerIntervalRef = useRef(null);

  const timerOptions = [
    { label: "1 minute", seconds: 60 },
    { label: "5 minutes", seconds: 300 },
    { label: "10 minutes", seconds: 600 },
    { label: "30 minutes", seconds: 1800 },
    { label: "1 hour", seconds: 3600 },
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const handleStartTimer = (seconds) => {
    console.log(`Timer started for ${seconds} seconds`);
    setRemainingTime(seconds);
    setTimerActive(true);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          setTimerActive(false);
          console.log("Timer ended");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBackFromTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTimerActive(false);
    setRemainingTime(0);
    exitTimer();
  };

  return (
    <div>
      <button
        onClick={handleBackFromTimer}
        className="mb-4 px-4 py-2 border rounded cursor-pointer"
      >
        Back
      </button>
      {!timerActive ? (
        <div className="flex flex-col space-y-2">
          {timerOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => handleStartTimer(option.seconds)}
              className="w-full py-2 bg-yellow-400 text-black font-bold rounded cursor-pointer"
              style={{ backgroundColor: '#FFFF00' }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">
          <p className="text-2xl font-bold">
            Remaining Time: {formatTime(remainingTime)}
          </p>
        </div>
      )}
    </div>
  );
}