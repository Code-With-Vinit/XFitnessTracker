// src/components/Charts.js (Modified to handle chartType prop)
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getOverallPieData, getWeeklyBarData } from '../utils/dataUtils';

const CHART_COLORS = ['#8884d8', '#ff9800', '#82ca9d', '#00C49F']; // Adjusted colors for better contrast

const Charts = ({ data, chartType }) => {
  // Data processing remains the same
  const weeklyBarData = getWeeklyBarData(data);
  const overallPieData = getOverallPieData(data);
  
  // --- Bar Chart Rendering ---
  if (chartType === 'bar') {
    const maxY = weeklyBarData.length > 0
      ? Math.max(...weeklyBarData.map(d => Math.max(d.calorieIntake, d.calorieBurned)))
      : 1500;
    const yTicks = [0, 400, 800, 1457];

    return (
      <div className="chart-box weekly-trends">
       
        {weeklyBarData.length > 0 ? (
          <>
          <h2 className="chart-title">Weekly Health Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyBarData}>
              {/* Styling and data mapping */}
              <XAxis dataKey="date" stroke="#999" />
              <YAxis domain={[0, maxY * 1.1]} ticks={yTicks} stroke="#999" />
              <Tooltip contentStyle={{ background: '#333', border: 'none', color: '#fff' }} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="calorieIntake" fill="#8884d8" name="Calorie Intake" />
              <Bar dataKey="calorieBurned" fill="#82ca9d" name="Calorie Burned" />
            </BarChart>
          </ResponsiveContainer>
          </>
        ) : (
          <div className="no-data-message">No data available</div>
        )}
      </div>
    );
  }

  // --- Pie Chart Rendering ---
  if (chartType === 'pie') {
    const pieDisplayData = overallPieData.map(d => ({ 
      ...d, 
      name: d.name, 
      value: d.value, 
    }));
    
    // Determine colors based on Intake (Purple) and Burned (Orange) from the image
    const PIE_COLORS = ['#8884d8', '#FF8042']; 

    return (
      <div className="chart-box overall-data">
        <h2 className="chart-title">Overall Data:</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieDisplayData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ percent }) => `${Math.round(percent)}%`} // Display percentage
              fill="#8884d8"
            >
              {pieDisplayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null; // Return nothing if chartType is undefined or invalid
};

export default Charts;