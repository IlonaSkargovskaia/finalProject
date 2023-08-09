import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EventCalendar = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter events based on selectedDate
  const filteredEvents = events.filter(
    (event) =>
      new Date(event.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div>
      <h2>Event Calendar</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <ul>
        {filteredEvents.map((event) => (
          <li key={event.id}>
            {event.title} - {new Date(event.date).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventCalendar;
