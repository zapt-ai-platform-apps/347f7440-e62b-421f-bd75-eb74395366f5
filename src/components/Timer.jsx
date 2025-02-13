import React, { useState, useEffect } from 'react';

export default function Timer({ exitTimer }) {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="text-center">
      <h2 className="text-2xl">Timer: {seconds} seconds</h2>
      {seconds <= 0 && (
        <button
          onClick={exitTimer}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
        >
          Exit Timer
        </button>
      )}
    </div>
  );
}