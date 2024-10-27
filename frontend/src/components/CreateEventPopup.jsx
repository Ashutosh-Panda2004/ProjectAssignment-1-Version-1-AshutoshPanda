// frontend/src/components/CreateEventPopup.jsx

import React, { useState } from 'react';
import axios from 'axios';

const CreateEventPopup = ({ onClose, token }) => {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    time: '',
    duration: 1,
    description: '', // Added description field
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the correct URL with protocol and hostname
      await axios.post('http://localhost:5000/api/events/create', eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Reload the page to update the calendar
      window.location.reload();
    } catch (err) {
      console.error('Failed to create event:', err);
      alert('Failed to create event.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Create Calendar Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
          <input
            type="time"
            name="time"
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (hours)"
            min="1"
            max="24"
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
          {/* Added description textarea */}
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            rows="4"
          ></textarea>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPopup;
