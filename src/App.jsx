// src/App.js (Modified structure)
import React, { useState, useEffect } from 'react';
import DataForm from './components/DataForm';
import StatsList from './components/StatsList';
import Charts from './components/Charts'; // This component renders both charts
import { loadData, saveData } from './utils/dataUtils';
import './App.css'; // Main application styles

function App() {
  const [data, setData] = useState(loadData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null); // Data object for editing

  // Data Persistence: Save data to localStorage whenever the 'data' state changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  const handleOpenModal = (dataToEdit = null) => {
    setEditingData(dataToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingData(null);
  };

  const handleDataSubmit = (formData) => {
    const updatedData = data.map(item => item.id).includes(formData.id)
      ? data.map(item => (item.id === formData.id ? formData : item)) // Edit existing
      : [...data, formData]; // Add new

    setData(updatedData);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setData(data.filter(item => item.id !== id));
    }
  };
  
  // -----------------------------------------------------------------------
  // Modification: We now pass a flag to the Charts component 
  // to tell it which chart to render in which section.
  // -----------------------------------------------------------------------

  return (
    <div className="app-main-layout">
      <h1 className="app-title">Health And Fitness Tracker</h1>

      {/* TOP SECTION: Input Card and Weekly Bar Chart */}
      <div className="dashboard-layout">
        
        {/* Input Card */}
        <div className="data-input-section">
          <h2>Update Today's Data</h2>
          <button className="add-data-btn" onClick={() => handleOpenModal(null)}>
            + Add data
          </button>
        </div>
        
        {/* Weekly Bar Chart (Only Bar Chart rendered here) */}
        <div className="charts-section">
          <Charts data={data} chartType="bar" />
        </div>
      </div>
      
      {/* BOTTOM SECTION: Statistics List and Overall Pie Chart (New Structure) */}
      <div className="stats-overall-layout">
        
        {/* Statistics List */}
        <StatsList 
          data={data} 
          onEdit={handleOpenModal} 
          onDelete={handleDelete} 
        />
        
        {/* Overall Pie Chart (Only Pie Chart rendered here) */}
        <div className="overall-data-container">
           <Charts data={data} chartType="pie" />
        </div>
      </div>

      {/* Modal Form */}
      <DataForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleDataSubmit}
        editingData={editingData}
      />
    </div>
  );
}

export default App;