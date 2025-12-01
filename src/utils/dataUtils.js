// // src/utils/dataUtils.js

// // ... (other functions: formatDate, loadData, saveData) ...

// export const loadData = () => {
//     const storedData = localStorage.getItem('healthAndFitness');
//     return storedData ? JSON.parse(storedData) : [];
// };

// export const saveData = (data) => {
//     localStorage.setItem('healthAndFitness', JSON.stringify(data));
// };

// export const getOverallPieData = (data) => {
//   // Use reduce to sum up total intake and total burned across all data entries
//   const totalIntake = data.reduce((sum, item) => sum + parseInt(item.calorieIntake, 10), 0);
//   const totalBurned = data.reduce((sum, item) => sum + parseInt(item.calorieBurned, 10), 0);
  
//   // Calculate the grand total for percentage calculations
//   const grandTotal = totalIntake + totalBurned;

//   // Return the data formatted for the Pie Chart.
//   // We use the sum as the 'value' for Recharts.
//   return [
//     { name: 'Intake', value: totalIntake, percent: grandTotal > 0 ? Math.round((totalIntake / grandTotal) * 100) : 0 },
//     { name: 'Burned', value: totalBurned, percent: grandTotal > 0 ? Math.round((totalBurned / grandTotal) * 100) : 0 },
//   ];
// };


// // Generates data for the Bar Chart (Last 7 days)
// export const getWeeklyBarData = (data) => {
//   if (data.length === 0) return [];
  
//   // 1. Sort data by date descending (most recent first)
//   const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

//   // 2. Use a Map to aggregate data for each unique date
//   const weeklyDataMap = new Map();
//   let uniqueDatesCount = 0;
  
//   for (const item of sortedData) {
//     const dateKey = item.date; // e.g., "2024-01-10"
    
//     // Check if we've already collected data for 7 unique dates
//     // If we have, and the current item's date is different from the 7th date, skip it.
//     // If we have 7, we break only AFTER processing the 7th unique date fully.
    
//     const isNewDate = !weeklyDataMap.has(dateKey);

//     if (isNewDate) {
//         if (uniqueDatesCount >= 7) {
//             // If we encounter an 8th unique date, we stop the loop
//             break;
//         }
        
//         // Initialize the new unique date entry
//         weeklyDataMap.set(dateKey, {
//             date: dateKey,
//             calorieIntake: 0,
//             calorieBurned: 0,
//         });
//         uniqueDatesCount++;
//     }
    
//     // Aggregate metrics for that day (handles multiple entries per day)
//     const current = weeklyDataMap.get(dateKey);
//     weeklyDataMap.set(dateKey, {
//       ...current,
//       // Ensure we parse the string values to integers before summing
//       calorieIntake: current.calorieIntake + parseInt(item.calorieIntake, 10),
//       calorieBurned: current.calorieBurned + parseInt(item.calorieBurned, 10),
//     });
//   }
  
//   // 3. Convert Map values to an array and sort by date ascending for chart rendering
//   // This array will contain a maximum of 7 aggregated days.
//   return Array.from(weeklyDataMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
// };




// src/utils/dataUtils.js

export const loadData = () => {
    const storedData = localStorage.getItem('healthAndFitness');
    return storedData ? JSON.parse(storedData) : [];
};

export const saveData = (data) => {
    localStorage.setItem('healthAndFitness', JSON.stringify(data));
};

export const getOverallPieData = (data) => {
  // Use reduce to sum up total intake and total burned across all data entries
  const totalIntake = data.reduce((sum, item) => sum + parseInt(item.calorieIntake, 10), 0);
  const totalBurned = data.reduce((sum, item) => sum + parseInt(item.calorieBurned, 10), 0);
  
  // Calculate the grand total for percentage calculations
  const grandTotal = totalIntake + totalBurned;

  // Return the data formatted for the Pie Chart.
  // We use the sum as the 'value' for Recharts.
  return [
    { name: 'Intake', value: totalIntake, percent: grandTotal > 0 ? Math.round((totalIntake / grandTotal) * 100) : 0 },
    { name: 'Burned', value: totalBurned, percent: grandTotal > 0 ? Math.round((totalBurned / grandTotal) * 100) : 0 },
  ];
};


// Generates data for the Bar Chart (Last 7 days ONLY)
export const getWeeklyBarData = (data) => {
  if (data.length === 0) return [];
  
  // 🔥 CRITICAL FIX: Calculate the date 7 days ago from today
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day
  
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  
  // 1. Filter data to only include entries from the last 7 days
  const recentData = data.filter(item => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0); // Reset to start of day
    return itemDate >= sevenDaysAgo && itemDate <= today;
  });
  
  // 🔥 If no data in the last 7 days, return empty array
  if (recentData.length === 0) return [];
  
  // 2. Sort data by date descending (most recent first)
  const sortedData = [...recentData].sort((a, b) => new Date(b.date) - new Date(a.date));

  // 3. Use a Map to aggregate data for each unique date
  const weeklyDataMap = new Map();
  
  for (const item of sortedData) {
    const dateKey = item.date; // e.g., "2024-01-10"
    
    if (!weeklyDataMap.has(dateKey)) {
      // Initialize the new unique date entry
      weeklyDataMap.set(dateKey, {
        date: dateKey,
        calorieIntake: 0,
        calorieBurned: 0,
      });
    }
    
    // Aggregate metrics for that day (handles multiple entries per day)
    const current = weeklyDataMap.get(dateKey);
    weeklyDataMap.set(dateKey, {
      ...current,
      // Ensure we parse the string values to integers before summing
      calorieIntake: current.calorieIntake + parseInt(item.calorieIntake, 10),
      calorieBurned: current.calorieBurned + parseInt(item.calorieBurned, 10),
    });
  }
  
  // 4. Convert Map values to an array and sort by date ascending for chart rendering
  return Array.from(weeklyDataMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
};