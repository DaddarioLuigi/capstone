import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import PatientsPage from './components/PatientsPage';
import StatisticsPage from './components/StatisticsPage';
import PatientUploadPage from './components/PatientUploadPage';
import PatientStatisticsPage from './components/PatientStatisticsPage';

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const userId = 1; // This would typically come from your authentication system

  const handleViewStatistics = (patientId) => {
    setSelectedPatientId(patientId);
    setActivePage('patientStatistics');
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'patients':
        return <PatientsPage userId={userId} onViewStatistics={handleViewStatistics} />;
      case 'statistics':
        return <StatisticsPage />;
      case 'patientupload':
        return <PatientUploadPage />;
      case 'patientStatistics':
        return <PatientStatisticsPage 
                  patientId={selectedPatientId} 
                  onBackToPatients={() => setActivePage('patients')} 
                />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header setActivePage={setActivePage} activeTab={activePage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderActivePage()}
      </main>
    </div>
  );
};

export default App;