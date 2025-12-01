// src/utils/dataUtils.js

// Function to format the date string to the required 'YYYY-MM-DD' format
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Gets the data from localStorage or returns default data structure
export const loadData = () => {
  const storedData = localStorage.getItem('healthAndFitness');
  return storedData ? JSON.parse(storedData) : [];
};

export const saveData = (data) => {
  localStorage.setItem('healthAndFitness', JSON.stringify(data));
};

// Generates data for the Bar Chart (Last 7 days, excluding today)
export const getWeeklyBarData = (data) => {
  if (data.length === 0) return [];
  
  // Sort data by date descending (most recent first)
  const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get only the unique last 7 days (by date)
  const weeklyDataMap = new Map();
  for (const item of sortedData) {
    if (!weeklyDataMap.has(item.date)) {
      weeklyDataMap.set(item.date, {
        date: formatDate(item.date),
        calorieIntake: parseInt(item.calorieIntake, 10),
        calorieBurned: parseInt(item.calorieBurned, 10),
      });
    }
    // Stop after collecting 7 unique days
    if (weeklyDataMap.size >= 7) break;
  }
  
  // Return data in ascending date order for chart rendering
  return Array.from(weeklyDataMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
};

// Generates data for the Pie Chart (Overall Totals)
export const getOverallPieData = (data) => {
  const totalIntake = data.reduce((sum, item) => sum + parseInt(item.calorieIntake, 10), 0);
  const totalBurned = data.reduce((sum, item) => sum + parseInt(item.calorieBurned, 10), 0);
  const total = totalIntake + totalBurned;

  return [
    { name: 'Intake', value: totalIntake, percent: total > 0 ? Math.round((totalIntake / total) * 100) : 50 },
    { name: 'Burned', value: totalBurned, percent: total > 0 ? Math.round((totalBurned / total) * 100) : 50 },
  ];
};