// frontend/src/components/EventTable.jsx
import React from 'react';

const EventTable = ({ events }) => {
  return (
    <table className="min-w-full bg-white rounded-md overflow-hidden mt-4">
      <thead className="bg-gray-200">
        <tr>
          <th className="text-left px-4 py-2">Event Name</th>
          <th className="text-left px-4 py-2">Date</th>
          <th className="text-left px-4 py-2">Time</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, idx) => (
          <tr key={idx} className="border-t">
            <td className="px-4 py-2">{event.name}</td>
            <td className="px-4 py-2">{event.date}</td>
            <td className="px-4 py-2">{event.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
