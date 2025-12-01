// src/components/StatsList.js
import React from 'react';
import { FaTimesCircle, FaEdit } from 'react-icons/fa';

const StatsList = ({ data, onEdit, onDelete }) => {
  // Sort data descending by date (most recent first)
  const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="stats-list-container">
      <h2 className="list-title">Recent Health Statistics</h2>
      {sortedData.map((item) => (
        <div key={item.id} className="stat-item">
          <div className="stat-details">
            <p className="stat-description">{item.shortDescription || 'No description provided.'}</p>
            <p className="stat-metrics">
              Calories Intake = {item.calorieIntake} | Calories Burned = {item.calorieBurned}
            </p>
            <p className="stat-date">{item.date}</p>
          </div>
          <div className="stat-actions">
            <button className="delete-btn" onClick={() => onDelete(item.id)}>
              <FaTimesCircle />
            </button>
            <button className="edit-btn" onClick={() => onEdit(item)}>
              <FaEdit />
            </button>
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="no-data">No progress to show!</p>}
    </div>
  );
};

export default StatsList;