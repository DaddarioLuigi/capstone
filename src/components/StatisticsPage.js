import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from 'recharts';

const StatisticsPage = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    // Fetch statistics from API
    // For now, we'll use mock data
    setStatistics({
      genderDistribution: [
        { name: 'Male', value: 120 },
        { name: 'Female', value: 150 }
      ],
      diagnosisDistribution: [
        { name: 'Yes', value: 180 },
        { name: 'No', value: 70 }
      ],
      ageDistribution: [
        { ageGroup: '0-20', count: 10 },
        { ageGroup: '21-40', count: 50 },
        { ageGroup: '41-60', count: 120 },
        { ageGroup: '61-80', count: 80 },
        { ageGroup: '80+', count: 10 }
      ],
      averageTumorVolumeOverTime: [
        { month: 'Jan', averageVolume: 12 },
        { month: 'Feb', averageVolume: 11.5 },
        { month: 'Mar', averageVolume: 11 },
        { month: 'Apr', averageVolume: 10.5 },
        { month: 'May', averageVolume: 10 },
        { month: 'Jun', averageVolume: 9.5 }
      ]
    });
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (!statistics) {
    return <div>Loading statistics...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Gender Distribution</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={statistics.genderDistribution}
            cx={200}
            cy={150}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {statistics.genderDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Model Response</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={statistics.diagnosisDistribution}
            cx={200}
            cy={150}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {statistics.diagnosisDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Age Distribution</h3>
        <BarChart width={400} height={300} data={statistics.ageDistribution}>
          <XAxis dataKey="ageGroup" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Average Tumor Volume Over Time</h3>
        <LineChart width={400} height={300} data={statistics.averageTumorVolumeOverTime}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="averageVolume" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default StatisticsPage;