import React, { useState, useEffect } from 'react';
import { Search, X, Image } from 'lucide-react';

const PatientsPage = ({ onViewStatistics }) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    // Fetch patients data from API
    setPatients([
      {
        id: 1,
        birthDate: "1978-05-15",
        gender: "M",
        response: "Yes",
        probability: 0.85,
        diagnosis: {
          site: "Frontal lobe",
          grade: "II",
          operated: true,
          boneComponent: false,
          volume: 15,
          histologicalDiagnosis: "Meningioma"
        },
        treatment: {
          date: "2023-01-15",
          prescribedDose: 54,
          fractionDose: 1.8,
          averageDose: 52,
          fractionNumber: 30
        },
        followUps: [
          {
            date: "2023-03-15",
            volumetricResponse: "Partial response",
            pseudoprogression: false,
            toxicity: false,
            clinicalResponse: "Improved",
            image: "https://example.com/image1.jpg"
          },
          {
            date: "2023-06-15",
            volumetricResponse: "Stable disease",
            pseudoprogression: false,
            toxicity: false,
            clinicalResponse: "Stable",
            image: "https://example.com/image2.jpg"
          }
        ]
      },
      {
        id: 2,
        birthDate: "1965-11-22",
        gender: "F",
        response: "No",
        probability: 0.72,
        diagnosis: {
          site: "Parietal lobe",
          grade: "III",
          operated: false,
          boneComponent: true,
          volume: 25,
          histologicalDiagnosis: "Atypical meningioma"
        },
        treatment: {
          date: "2023-02-01",
          prescribedDose: 60,
          fractionDose: 2,
          averageDose: 58,
          fractionNumber: 30
        },
        followUps: [
          {
            date: "2023-04-01",
            volumetricResponse: "Stable disease",
            pseudoprogression: true,
            toxicity: true,
            clinicalResponse: "Stable",
            image: "https://example.com/image3.jpg"
          }
        ]
      },
      {
        id: 3,
        birthDate: "1982-03-10",
        gender: "M",
        response: "Yes",
        probability: 0.91,
        diagnosis: {
          site: "Temporal lobe",
          grade: "I",
          operated: true,
          boneComponent: false,
          volume: 8,
          histologicalDiagnosis: "Benign meningioma"
        },
        treatment: {
          date: "2023-03-05",
          prescribedDose: 50,
          fractionDose: 2,
          averageDose: 48,
          fractionNumber: 25
        },
        followUps: [
          {
            date: "2023-05-05",
            volumetricResponse: "Partial response",
            pseudoprogression: false,
            toxicity: false,
            clinicalResponse: "Improved",
            image: "https://example.com/image4.jpg"
          },
          {
            date: "2023-07-05",
            volumetricResponse: "Complete response",
            pseudoprogression: false,
            toxicity: false,
            clinicalResponse: "Resolved",
            image: "https://example.com/image5.jpg"
          }
        ]
      },
      {
        id: 4,
        birthDate: "1990-08-18",
        gender: "F",
        response: "No",
        probability: 0.65,
        diagnosis: {
          site: "Occipital lobe",
          grade: "II",
          operated: false,
          boneComponent: false,
          volume: 18,
          histologicalDiagnosis: "Atypical meningioma"
        },
        treatment: {
          date: "2023-04-10",
          prescribedDose: 56,
          fractionDose: 1.75,
          averageDose: 54,
          fractionNumber: 32
        },
        followUps: [
          {
            date: "2023-06-10",
            volumetricResponse: "Progressive disease",
            pseudoprogression: false,
            toxicity: true,
            clinicalResponse: "Worsened",
            image: "https://example.com/image6.jpg"
          }
        ]
      },
      {
        id: 5,
        birthDate: "1973-12-05",
        gender: "M",
        response: "Yes",
        probability: 0.88,
        diagnosis: {
          site: "Cerebellum",
          grade: "I",
          operated: true,
          boneComponent: false,
          volume: 12,
          histologicalDiagnosis: "Benign meningioma"
        },
        treatment: {
          date: "2023-05-20",
          prescribedDose: 52,
          fractionDose: 2,
          averageDose: 50,
          fractionNumber: 26
        },
        followUps: [
          {
            date: "2023-07-20",
            volumetricResponse: "Partial response",
            pseudoprogression: false,
            toxicity: false,
            clinicalResponse: "Improved",
            image: "https://example.com/image7.jpg"
          }
        ]
      }
    ]);
  }, []);

  const filteredPatients = patients.filter(patient => 
    patient.id.toString().includes(searchTerm.toLowerCase())
  );

  const handleViewImages = (patient) => {
    const images = patient.followUps.map(followUp => ({
      src: followUp.image,
      date: followUp.date
    }));
    setGalleryImages(images);
    setShowImageGallery(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Patients</h2>
      <div className="mb-4 relative">
        <input 
          type="text" 
          placeholder="Search patients..." 
          className="w-full p-2 pl-8 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-2 top-2 text-gray-400" size={20} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Birth Date</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Model Response</th>
              <th className="border p-2">Probability</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="border p-2">{patient.id}</td>
                <td className="border p-2">{patient.birthDate}</td>
                <td className="border p-2">{patient.gender}</td>
                <td className="border p-2">
                  <span 
                    className={`px-2 py-1 rounded ${
                      patient.response === "Yes" 
                        ? "bg-green-500 text-white" 
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {patient.response}
                  </span>
                </td>
                <td className="border p-2">{(patient.probability * 100).toFixed(2)}%</td>
                <td className="border p-2">
                  <button 
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    Details
                  </button>
                  <button 
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => onViewStatistics(patient.id)}
                  >
                    Statistics
                  </button>
                  <button 
                    className="bg-purple-500 text-white px-2 py-1 rounded"
                    onClick={() => handleViewImages(patient)}
                  >
                    View Images
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="patient-modal">
          <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-semibold mb-2">Patient Details</h3>
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800"
                onClick={() => setSelectedPatient(null)}
              >
                <X size={24} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Personal Information</h4>
                  <p><strong>ID:</strong> {selectedPatient.id}</p>
                  <p><strong>Birth Date:</strong> {selectedPatient.birthDate}</p>
                  <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                  <p>
                    <strong>Model Response:</strong> 
                    <span 
                      className={`ml-2 px-2 py-1 rounded ${
                        selectedPatient.response === "Yes" 
                          ? "bg-green-500 text-white" 
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {selectedPatient.response}
                    </span>
                  </p>
                  <p><strong>Probability:</strong> {(selectedPatient.probability * 100).toFixed(2)}%</p>
                </div>
                <div>
                  <h4 className="font-semibold">Diagnosis</h4>
                  <p><strong>Site:</strong> {selectedPatient.diagnosis.site}</p>
                  <p><strong>Grade:</strong> {selectedPatient.diagnosis.grade}</p>
                  <p><strong>Operated:</strong> {selectedPatient.diagnosis.operated ? 'Yes' : 'No'}</p>
                  <p><strong>Bone Component:</strong> {selectedPatient.diagnosis.boneComponent ? 'Yes' : 'No'}</p>
                  <p><strong>Volume:</strong> {selectedPatient.diagnosis.volume} cm³</p>
                  <p><strong>Histological Diagnosis:</strong> {selectedPatient.diagnosis.histologicalDiagnosis}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Treatment</h4>
                  <p><strong>Date:</strong> {selectedPatient.treatment.date}</p>
                  <p><strong>Prescribed Dose:</strong> {selectedPatient.treatment.prescribedDose} Gy</p>
                  <p><strong>Fraction Dose:</strong> {selectedPatient.treatment.fractionDose} Gy</p>
                  <p><strong>Average Dose:</strong> {selectedPatient.treatment.averageDose} Gy</p>
                  <p><strong>Number of Fractions:</strong> {selectedPatient.treatment.fractionNumber}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Follow-ups</h4>
                  {selectedPatient.followUps.map((followUp, index) => (
                    <div key={index} className="mb-2">
                      <p><strong>Date:</strong> {followUp.date}</p>
                      <p><strong>Volumetric Response:</strong> {followUp.volumetricResponse}</p>
                      <p><strong>Pseudoprogression:</strong> {followUp.pseudoprogression ? 'Yes' : 'No'}</p>
                      <p><strong>Toxicity:</strong> {followUp.toxicity ? 'Yes' : 'No'}</p>
                      <p><strong>Clinical Response:</strong> {followUp.clinicalResponse}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="image-gallery-modal">
          <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-semibold mb-2">Follow-up Images</h3>
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800"
                onClick={() => setShowImageGallery(false)}
              >
                <X size={24} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="border rounded p-2">
                    <img src={image.src} alt={`Follow-up ${index + 1}`} className="w-full h-48 object-cover" />
                    <p className="text-center mt-2">{image.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;