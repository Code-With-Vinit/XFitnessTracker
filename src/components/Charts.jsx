// // src/components/Charts.js (Modified to handle chartType prop)
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import { getOverallPieData, getWeeklyBarData } from '../utils/dataUtils';

// const CHART_COLORS = ['#8884d8', '#ff9800', '#82ca9d', '#00C49F']; // Adjusted colors for better contrast

// const Charts = ({ data, chartType }) => {
//   // Data processing remains the same
//   const weeklyBarData = getWeeklyBarData(data);
//   const overallPieData = getOverallPieData(data);
  
//   // --- Bar Chart Rendering ---
//   if (chartType === 'bar') {
//     const maxY = weeklyBarData.length > 0
//       ? Math.max(...weeklyBarData.map(d => Math.max(d.calorieIntake, d.calorieBurned)))
//       : 1500;
//     const yTicks = [0, 400, 800, 1457];

//     return (
//       <div className="chart-box weekly-trends">
       
//         {weeklyBarData.length > 0 ? (
//           <>
//           <h2 className="chart-title">Weekly Health Trends</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={weeklyBarData}>
//               {/* Styling and data mapping */}
//               <XAxis dataKey="date" stroke="#999" />
//               <YAxis domain={[0, maxY * 1.1]} ticks={yTicks} stroke="#999" />
//               <Tooltip contentStyle={{ background: '#333', border: 'none', color: '#fff' }} />
//               <Legend wrapperStyle={{ paddingTop: '10px' }} />
//               <Bar dataKey="calorieIntake" fill="#8884d8" name="Calorie Intake" />
//               <Bar dataKey="calorieBurned" fill="#82ca9d" name="Calorie Burned" />
//             </BarChart>
//           </ResponsiveContainer>
//           </>
//         ) : (
//           <div className="no-data-message">No data available</div>
//         )}
//       </div>
//     );
//   }

//   // --- Pie Chart Rendering ---
//   if (chartType === 'pie') {
//     const pieDisplayData = overallPieData.map(d => ({ 
//       ...d, 
//       name: d.name, 
//       value: d.value, 
//     }));
    
//     // Determine colors based on Intake (Purple) and Burned (Orange) from the image
//     const PIE_COLORS = ['#8884d8', '#FF8042']; 

//     return (
//       <div className="chart-box overall-data">
//         <h2 className="chart-title">Overall Data:</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={pieDisplayData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               label={({ percent }) => `${Math.round(percent)}%`} // Display percentage
//               fill="#8884d8"
//             >
//               {pieDisplayData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//               ))}
//             </Pie>
//             <Legend layout="horizontal" align="center" verticalAlign="bottom" />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }

//   return null; // Return nothing if chartType is undefined or invalid
// };

// export default Charts;




// src/components/Charts.js
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import { getOverallPieData, getWeeklyBarData } from '../utils/dataUtils';

// const CHART_COLORS = ['#8884d8', '#ff9800', '#82ca9d', '#00C49F']; // Adjusted colors for better contrast

// const Charts = ({ data, chartType }) => {
//   const weeklyBarData = getWeeklyBarData(data);
//   const overallPieData = getOverallPieData(data);
  
//   // --- Bar Chart Rendering ---
//   if (chartType === 'bar') {
    
//     // FIX: Return null if no data is available to prevent rendering the title or container.
//     if (weeklyBarData.length === 0) {
//       return null; 
//     }
    
//     // Logic runs only if data is present
//     const maxY = Math.max(...weeklyBarData.map(d => Math.max(d.calorieIntake, d.calorieBurned)));
//     const yTicks = [0, 400, 800, 1457];

//     return (
//       <div className="chart-box weekly-trends">
//         <h2 className="chart-title">Weekly Health Trends</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={weeklyBarData}>
//             {/* Styling and data mapping */}
//             <XAxis dataKey="date" stroke="#999" />
//             <YAxis domain={[0, maxY * 1.1]} ticks={yTicks} stroke="#999" />
//             <Tooltip contentStyle={{ background: '#333', border: 'none', color: '#fff' }} />
//             <Legend wrapperStyle={{ paddingTop: '10px' }} />
//             <Bar dataKey="calorieIntake" fill="#8884d8" name="Calorie Intake" />
//             <Bar dataKey="calorieBurned" fill="#82ca9d" name="Calorie Burned" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }

//   // --- Pie Chart Rendering (Always renders) ---
//   if (chartType === 'pie') {
//     const pieDisplayData = overallPieData.map(d => ({ 
//       ...d, 
//       name: d.name, 
//       value: d.value, 
//     }));
    
//     const PIE_COLORS = ['#8884d8', '#FF8042']; 

//     return (
//       <div className="chart-box overall-data">
//         <h2 className="chart-title">Overall Data:</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={pieDisplayData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               // Fixed label to use value and check for division by zero risk
//               label={({ value, name }) => {
//                   const total = overallPieData.reduce((sum, item) => sum + item.value, 0);
//                   const percent = total > 0 ? Math.round((value / total) * 100) : 50;
//                   return `${percent}%`;
//               }} 
//               fill="#8884d8"
//             >
//               {pieDisplayData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//               ))}
//             </Pie>
//             <Legend layout="horizontal" align="center" verticalAlign="bottom" />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }

//   return null; // Return nothing if chartType is undefined or invalid
// };

// export default Charts;



// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import { getOverallPieData, getWeeklyBarData } from '../utils/dataUtils';

// // Colors for the charts
// const BAR_COLORS = { intake: '#8884d8', burned: '#82ca9d' };
// const PIE_COLORS = ['#8884d8', '#FF8042']; 

// const Charts = ({ data, chartType }) => {
//   // Data processing remains the same
//   const weeklyBarData = getWeeklyBarData(data);
//   const overallPieData = getOverallPieData(data);
  
//   // --- 1. Bar Chart Rendering (Weekly Health Trends) ---
//   if (chartType === 'bar') {
    
//     // 🔥 CRITICAL FIX: Return null if no data is available. 
//     // This ensures the title "Weekly Health Trends" is completely absent from the DOM.
//     if (weeklyBarData.length === 0) {
//       return null; 
//     }
    
//     // Logic runs ONLY if data is present
//     const maxY = Math.max(...weeklyBarData.map(d => Math.max(d.calorieIntake, d.calorieBurned)));
//     const yTicks = [0, 400, 800, 1457];

//     return (
//       <div className="chart-box weekly-trends">
//         <h2 className="chart-title">Weekly Health Trends:</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={weeklyBarData}>
//             <XAxis dataKey="date" stroke="#999" />
//             <YAxis domain={[0, maxY * 1.1]} ticks={yTicks} stroke="#999" />
//             <Tooltip contentStyle={{ background: '#333', border: 'none', color: '#fff' }} />
//             <Legend wrapperStyle={{ paddingTop: '10px' }} />
//             <Bar dataKey="calorieIntake" fill={BAR_COLORS.intake} name="Calorie Intake" />
//             <Bar dataKey="calorieBurned" fill={BAR_COLORS.burned} name="Calorie Burned" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }

//   // --- 2. Pie Chart Rendering (Overall Data) ---
//   if (chartType === 'pie') {
//     const pieDisplayData = overallPieData.map(d => ({ 
//       ...d, 
//       name: d.name, 
//       value: d.value, 
//     }));

//     return (
//       <div className="chart-box overall-data">
//         {/* Requirement: Pie Chart title is visible from the start */}
//         <h2 className="chart-title">Overall Data:</h2> 
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={pieDisplayData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               label={({ value, name }) => {
//                   const grandTotal = overallPieData.reduce((sum, item) => sum + item.value, 0);
//                   const percent = grandTotal > 0 ? Math.round((value / grandTotal) * 100) : 50;
//                   return `${percent}%`;
//               }} 
//               fill={PIE_COLORS[0]} // Default fill
//             >
//               {pieDisplayData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//               ))}
//             </Pie>
//             <Legend layout="horizontal" align="center" verticalAlign="bottom" />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }

//   return null; // Safety return for invalid chartType
// };

// export default Charts;




// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import { getOverallPieData, getWeeklyBarData } from '../utils/dataUtils';

// // Colors for the charts
// const BAR_COLORS = { intake: '#8884d8', burned: '#82ca9d' };
// const PIE_COLORS = ['#8884d8', '#FF8042']; 

// const Charts = ({ data, chartType }) => {
//   // Data processing remains the same
//   const weeklyBarData = getWeeklyBarData(data);
//   const overallPieData = getOverallPieData(data);
  
//   // --- 1. Bar Chart Rendering (Weekly Health Trends) ---
//   if (chartType === 'bar') {
    
//     // 🔥 CRITICAL FIX: Return null if no data is available. 
//     // This ensures the title "Weekly Health Trends" is completely absent from the DOM.
//     if (!weeklyBarData || weeklyBarData.length === 0) {
//       return null; 
//     }
    
//     // Logic runs ONLY if data is present
//     const maxY = Math.max(...weeklyBarData.map(d => Math.max(d.calorieIntake, d.calorieBurned)));
//     const yTicks = [0, 400, 800, 1457];

//     return (
//       <div className="chart-box weekly-trends" data-testid="weekly-trends">
//         <h2 className="chart-title">Weekly Health Trends:</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={weeklyBarData}>
//             <XAxis dataKey="date" stroke="#999" />
//             <YAxis domain={[0, maxY * 1.1]} ticks={yTicks} stroke="#999" />
//             <Tooltip contentStyle={{ background: '#333', border: 'none', color: '#fff' }} />
//             <Legend wrapperStyle={{ paddingTop: '10px' }} />
//             <Bar dataKey="calorieIntake" fill={BAR_COLORS.intake} name="Calorie Intake" />
//             <Bar dataKey="calorieBurned" fill={BAR_COLORS.burned} name="Calorie Burned" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }

//   // --- 2. Pie Chart Rendering (Overall Data) ---
//   if (chartType === 'pie') {
//     const pieDisplayData = overallPieData.map(d => ({ 
//       ...d, 
//       name: d.name, 
//       value: d.value, 
//     }));

//     return (
//       <div className="chart-box overall-data">
//         {/* Requirement: Pie Chart title is visible from the start */}
//         <h2 className="chart-title">Overall Data:</h2> 
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={pieDisplayData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               label={({ value, name }) => {
//                   const grandTotal = overallPieData.reduce((sum, item) => sum + item.value, 0);
//                   const percent = grandTotal > 0 ? Math.round((value / grandTotal) * 100) : 50;
//                   return `${percent}%`;
//               }} 
//               fill={PIE_COLORS[0]} // Default fill
//             >
//               {pieDisplayData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//               ))}
//             </Pie>
//             <Legend layout="horizontal" align="center" verticalAlign="bottom" />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }

//   return null; // Safety return for invalid chartType
// };

// export default Charts;




import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getOverallPieData, getWeeklyBarData } from '../utils/dataUtils';

// Colors for the charts
const BAR_COLORS = { intake: '#8884d8', burned: '#82ca9d' };
const PIE_COLORS = ['#8884d8', '#FF8042']; 

const Charts = ({ data, chartType }) => {
  // --- 1. Bar Chart Rendering (Weekly Health Trends) ---
  if (chartType === 'bar') {
    // Get weekly data
    const weeklyBarData = getWeeklyBarData(data);
    
    // 🔥 CRITICAL FIX: Return null if no data exists
    // This completely removes "Weekly Health Trends" from the DOM
    if (!weeklyBarData || weeklyBarData.length === 0) {
      return null; 
    }
    
    // Logic runs ONLY if data is present
    const maxY = Math.max(...weeklyBarData.map(d => Math.max(d.calorieIntake, d.calorieBurned)));
    const yTicks = [0, 400, 800, 1457];

    return (
      <div className="chart-box weekly-trends" data-testid="weekly-trends">
        <h2 className="chart-title">Weekly Health Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyBarData}>
            <XAxis dataKey="date" stroke="#999" />
            <YAxis domain={[0, maxY * 1.1]} ticks={yTicks} stroke="#999" />
            <Tooltip contentStyle={{ background: '#333', border: 'none', color: '#fff' }} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="calorieIntake" fill={BAR_COLORS.intake} name="Calorie Intake" />
            <Bar dataKey="calorieBurned" fill={BAR_COLORS.burned} name="Calorie Burned" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // --- 2. Pie Chart Rendering (Overall Data) ---
  if (chartType === 'pie') {
    const overallPieData = getOverallPieData(data);
    
    const pieDisplayData = overallPieData.map(d => ({ 
      ...d, 
      name: d.name, 
      value: d.value, 
    }));

    return (
      <div className="chart-box overall-data">
        {/* Requirement: Pie Chart title is visible from the start */}
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
              label={({ value, name }) => {
                  const grandTotal = overallPieData.reduce((sum, item) => sum + item.value, 0);
                  const percent = grandTotal > 0 ? Math.round((value / grandTotal) * 100) : 50;
                  return `${percent}%`;
              }} 
              fill={PIE_COLORS[0]} // Default fill
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

  return null; // Safety return for invalid chartType
};

export default Charts;