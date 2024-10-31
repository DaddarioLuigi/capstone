import React from 'react';
import logo from "../logo_besta.png"

const Header = ({ setActivePage, activeTab }) => {
  const tabs = [
    { name: 'Home', key: 'home' },
    { name: 'Patients', key: 'patients' },
    { name: 'Statistics', key: 'statistics' },
    { name: 'Upload', key: 'patientupload' }
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="Istituto Neurologico Carlo Besta Logo" 
            className="h-12 mr-4"
          />
        </div>
        <nav>
          <ul className="flex space-x-2">
            {tabs.map((tab) => (
              <li key={tab.key}>
                <button
                  className={`px-3 py-2 rounded text-sm font-medium ${
                    activeTab === tab.key 
                      ? 'bg-red-800 text-white' 
                      : 'text-red-800 hover:bg-red-100'
                  }`}
                  onClick={() => setActivePage(tab.key)}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;