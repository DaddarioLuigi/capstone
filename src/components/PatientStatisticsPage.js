import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from 'recharts';

const PatientStatisticsPage = ({ patientId, onBackToPatients }) => {
  const [patientStats, setPatientStats] = useState(null);

  useEffect(() => {
    // Fetch patient statistics from API
    // For now, we'll use mock data
    setPatientStats({
      patientId: patientId,
      volumeOverTime: [
        { date: '2023-01', volume: 10 },
        { date: '2023-02', volume: 9.5 },
        { date: '2023-03', volume: 9 },
        { date: '2023-04', volume: 8.5 },
        { date: '2023-05', volume: 8 },
        { date: '2023-06', volume: 7.5 },
      ],
      modelProbability: [
        { category: 'Positive Response', probability: 0.75 },
        { category: 'Negative Response', probability: 0.25 },
      ],
    });
  }, [patientId]);

  if (!patientStats) {
    return <div>Loading statistics...</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <button
          onClick={onBackToPatients}
          className="mr-4 flex items-center text-blue-500 hover:text-blue-700"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back to Patients
        </button>
        <h2 className="text-2xl font-bold">Statistics for Patient {patientStats.patientId}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Tumor Volume Over Time</h3>
          <LineChart width={400} height={300} data={patientStats.volumeOverTime}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="volume" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Model Output Probability</h3>
          <BarChart width={400} height={300} data={patientStats.modelProbability}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="probability" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default PatientStatisticsPage;