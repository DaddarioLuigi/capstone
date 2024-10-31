import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HomePage = () => {
  const [patientCode, setPatientCode] = useState('');
  const [result, setResult] = useState(null);
  const [probabilityData, setProbabilityData] = useState(null);

  const handlePatientCodeChange = (event) => {
    setPatientCode(event.target.value);
  };

  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      const mockProbability = Math.random();
      const mockResult = {
        response: mockProbability > 0.5,
        probability: mockProbability
      };
      setResult(mockResult);

      // Generate simplified probability curve data
      const curveData = [
        { x: 0, y: 1 - mockProbability },
        { x: 1, y: mockProbability }
      ];
      setProbabilityData(curveData);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Patient Response Prediction</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Patient Code</h3>
          <input
            type="text"
            placeholder="Enter patient code"
            className="w-full p-2 border rounded"
            value={patientCode}
            onChange={handlePatientCodeChange}
          />
        </div>
        <div>
          <button
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={!patientCode}
          >
            Get Response
          </button>
        </div>
        {result && (
          <div className="border p-4 rounded mt-4">
            <div className="flex items-center mb-2">
              <span className="mr-2">Response to Radiosurgery:</span>
              {result.response ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <XCircle className="text-red-500" size={20} />
              )}
              <span className="ml-2 font-bold">
                {result.response ? 'Yes' : 'No'}
              </span>
            </div>
            <p>Probability: {(result.probability * 100).toFixed(2)}%</p>
          </div>
        )}
        {probabilityData && (
          <div className="border p-4 rounded mt-4">
            <h3 className="text-lg font-semibold mb-2">Probability Distribution</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={probabilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="x" 
                    type="number" 
                    domain={[0, 1]} 
                    ticks={[0, 1]}
                    tickFormatter={(value) => value === 0 ? 'No' : 'Yes'}
                  />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;