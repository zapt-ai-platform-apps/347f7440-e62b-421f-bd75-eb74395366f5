import React, { useState, useEffect } from 'react';

export default function Timer({ initialSeconds = 60, exitTimer }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    console.log('Timer started with', seconds, 'seconds');
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          console.log('Timer completed');
          clearInterval(interval);
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="text-center mt-4">
      <h2 className="text-2xl">Timer: {seconds} seconds</h2>
      {seconds <= 0 && (
        <button
          onClick={exitTimer}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded cursor-pointer"
        >
          Exit Timer
        </button>
      )}
    </div>
  );
}