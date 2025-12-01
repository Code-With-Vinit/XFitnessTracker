// src/components/DataForm.js
import React, { useState, useEffect } from 'react';
import './Modal.css'; // Assume this CSS styles the modal pop-up

const DataForm = ({ isOpen, onClose, onSubmit, editingData }) => {
  const isEditMode = !!editingData;
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    id: editingData?.id || Date.now(),
    date: editingData?.date || today,
    calorieIntake: editingData?.calorieIntake || '',
    calorieBurned: editingData?.calorieBurned || '',
    shortDescription: editingData?.shortDescription || '',
  });

  // Load editing data when the modal opens in edit mode
  useEffect(() => {
    if (isEditMode) {
      setFormData(editingData);
    } else {
      setFormData({
        id: Date.now(),
        date: today,
        calorieIntake: '',
        calorieBurned: '',
        shortDescription: '',
      });
    }
  }, [editingData, isEditMode, today]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation (can be expanded)
    if (!formData.date || !formData.calorieIntake || !formData.calorieBurned) {
      alert("Please fill in Date, Calorie Intake, and Calorie Burned.");
      return;
    }
    
    // Convert numbers to ensure correct type for submission
    const dataToSubmit = {
      ...formData,
      calorieIntake: parseInt(formData.calorieIntake, 10),
      calorieBurned: parseInt(formData.calorieBurned, 10),
    };

    onSubmit(dataToSubmit);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEditMode ? "Let's see what you want to change!" : "How Much Net Calories did you take Today?"}</h2>
        <form onSubmit={handleSubmit}>
          
          <label>Date:</label>
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
          />
          <span className="date-icon">📅</span>

          <label>Calorie Intake:</label>
          <input 
            type="number" 
            name="calorieIntake" 
            value={formData.calorieIntake} 
            onChange={handleChange} 
            placeholder="Enter Today's Calorie Intake" 
            required 
            min="0"
          />

          <label>Calorie Burned:</label>
          <input 
            type="number" 
            name="calorieBurned" 
            value={formData.calorieBurned} 
            onChange={handleChange} 
            placeholder="Enter Today's Calorie Burned" 
            required 
            min="0"
          />

          <label>Short Description:</label>
          <input 
            type="text" 
            name="shortDescription" 
            value={formData.shortDescription} 
            onChange={handleChange} 
            placeholder="Enter a short description" 
          />

          <div className="form-actions">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataForm;