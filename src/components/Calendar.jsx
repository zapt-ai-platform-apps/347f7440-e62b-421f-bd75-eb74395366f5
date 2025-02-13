import React, { useState } from 'react';

export default function Calendar({ onClose }) {
  const [eventText, setEventText] = useState('');
  const [events, setEvents] = useState([]);

  const addEvent = () => {
    if (eventText.trim() === '') return;
    const newEvent = { id: Date.now(), text: eventText.trim() };
    setEvents((prev) => [...prev, newEvent]);
    setEventText('');
    console.log('Event added:', newEvent.text);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Calendar</h2>
        <button
          onClick={onClose}
          className="py-2 px-4 bg-gray-500 text-white font-bold rounded cursor-pointer"
        >
          Close
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          placeholder="Add new event"
          className="p-2 border rounded w-full box-border"
        />
        <button
          onClick={addEvent}
          className="mt-2 py-2 px-4 bg-green-500 text-white font-bold rounded cursor-pointer"
        >
          Add Event
        </button>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Events</h3>
        {events.length === 0 ? (
          <p>No events added.</p>
        ) : (
          <ul className="list-disc pl-5">
            {events.map((event) => (
              <li key={event.id}>{event.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}