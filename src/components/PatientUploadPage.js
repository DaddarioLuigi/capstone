import React, { useState, useEffect } from 'react';
import { Upload, Plus, CheckCircle, Search } from 'lucide-react';

const PatientUploadPage = () => {
  const [patients, setPatients] = useState([]);
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('patient'); // New tab management

  const [patientData, setPatientData] = useState({
    id: '',
    birthDate: '',
    gender: '',
  });

  const [diagnosisData, setDiagnosisData] = useState({
    site: '',
    grade: '',
    operated: false,
    boneComponent: false,
    volume: '',
    histologicalDiagnosis: '',
  });

  const [imageData, setImageData] = useState({
    type: '',
    acquisitionDate: '',
    file: null,
  });

  const [treatmentData, setTreatmentData] = useState({
    date: '',
    prescribedDose: '',
    fractionDose: '',
    averageDose: '',
    fractionNumber: '',
  });

  const [followUpData, setFollowUpData] = useState({
    date: '',
    volumetricResponse: '',
    pseudoprogression: false,
    toxicity: false,
    clinicalResponse: '',
  });

  useEffect(() => {
    // Mock fetching patients
    setPatients([
      { id: '1', birthDate: '1980-01-01', gender: 'M' },
      { id: '2', birthDate: '1975-05-15', gender: 'F' },
    ]);
  }, []);

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiagnosisChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDiagnosisData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setImageData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setImageData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTreatmentChange = (e) => {
    const { name, value } = e.target;
    setTreatmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFollowUpChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFollowUpData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      patient: patientData,
      diagnosis: diagnosisData,
      image: imageData,
      treatment: treatmentData,
      followUp: activeTab === 'followUp' ? followUpData : null, // Include follow-up only if follow-up tab is active
    };
    console.log(submissionData);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const foundPatient = patients.find(
      (patient) =>
        patient.id.includes(searchValue) ||
        patient.birthDate.includes(searchValue)
    );
    if (foundPatient) {
      setSelectedPatient(foundPatient);
      setPatientData(foundPatient); // Set full patient data
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Patient Data Upload</h2>

      <div className="mb-6">
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            checked={isNewPatient}
            onChange={() => {
              setIsNewPatient(true);
              setSelectedPatient(null);
              setPatientData({
                id: '',
                birthDate: '',
                gender: '',
              });
              setActiveTab('patient');
            }}
            className="form-radio"
          />
          <span className="ml-2">New Patient</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            checked={!isNewPatient && selectedPatient !== null}
            onChange={() => setIsNewPatient(false)}
            className="form-radio"
          />
          <span className="ml-2">Edit Existing Patient</span>
        </label>
      </div>

      {!isNewPatient && (
        <div className="mb-6 flex items-center">
          <Search className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Search by Patient ID or Birth Date"
          />
        </div>
      )}

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveTab('patient')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'patient' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          Patient Info
        </button>
        {!isNewPatient && (
        <button
            onClick={() => setActiveTab('followUp')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'followUp' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
            Follow-Up
        </button>
        )}

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === 'patient' && (
          <>
            <h3 className="text-xl font-semibold mb-4">Patient Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="id"
                value={patientData.id}
                onChange={handlePatientChange}
                className="p-2 border rounded-lg"
                placeholder="Patient ID"
                required
              />
              <input
                type="date"
                name="birthDate"
                value={patientData.birthDate}
                onChange={handlePatientChange}
                className="p-2 border rounded-lg"
                required
              />
              <select
                name="gender"
                value={patientData.gender}
                onChange={handlePatientChange}
                className="p-2 border rounded-lg"
                required
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <h3 className="text-xl font-semibold mb-4">Diagnosis</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="site"
                value={diagnosisData.site}
                onChange={handleDiagnosisChange}
                className="p-2 border rounded-lg"
                placeholder="Tumor Site"
              />
              <input
                type="text"
                name="grade"
                value={diagnosisData.grade}
                onChange={handleDiagnosisChange}
                className="p-2 border rounded-lg"
                placeholder="Tumor Grade"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="operated"
                  checked={diagnosisData.operated}
                  onChange={handleDiagnosisChange}
                />
                <span>Operated</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="boneComponent"
                  checked={diagnosisData.boneComponent}
                  onChange={handleDiagnosisChange}
                />
                <span>Bone Component</span>
              </label>
              <input
                type="text"
                name="volume"
                value={diagnosisData.volume}
                onChange={handleDiagnosisChange}
                className="p-2 border rounded-lg"
                placeholder="Tumor Volume"
              />
              <input
                type="text"
                name="histologicalDiagnosis"
                value={diagnosisData.histologicalDiagnosis}
                onChange={handleDiagnosisChange}
                className="p-2 border rounded-lg"
                placeholder="Histological Diagnosis"
              />
            </div>

            <h3 className="text-xl font-semibold mb-4">Imaging</h3>
            <div className="grid grid-cols-2 gap-4">
              <select
                name="type"
                value={imageData.type}
                onChange={handleImageChange}
                className="p-2 border rounded-lg"
              >
                <option value="">Select Image Type</option>
                <option value="CT">CT</option>
                <option value="MRI">MRI</option>
                <option value="PET">PET</option>
              </select>
              <input
                type="date"
                name="acquisitionDate"
                value={imageData.acquisitionDate}
                onChange={handleImageChange}
                className="p-2 border rounded-lg"
                placeholder="Acquisition Date"
              />
              <div className="flex items-center space-x-4">
                <label className="p-2 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                  <Upload className="inline mr-2" size={18} /> Upload Image
                  <input
                    type="file"
                    name="file"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imageData.file && <span>{imageData.file.name}</span>}
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Treatment</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={treatmentData.date}
                onChange={handleTreatmentChange}
                className="p-2 border rounded-lg"
                placeholder="Treatment Date"
              />
              <input
                type="text"
                name="prescribedDose"
                value={treatmentData.prescribedDose}
                onChange={handleTreatmentChange}
                className="p-2 border rounded-lg"
                placeholder="Prescribed Dose (Gy)"
              />
              <input
                type="text"
                name="fractionDose"
                value={treatmentData.fractionDose}
                onChange={handleTreatmentChange}
                className="p-2 border rounded-lg"
                placeholder="Fraction Dose (Gy)"
              />
              <input
                type="text"
                name="averageDose"
                value={treatmentData.averageDose}
                onChange={handleTreatmentChange}
                className="p-2 border rounded-lg"
                placeholder="Average Dose (Gy)"
              />
              <input
                type="number"
                name="fractionNumber"
                value={treatmentData.fractionNumber}
                onChange={handleTreatmentChange}
                className="p-2 border rounded-lg"
                placeholder="Number of Fractions"
              />
            </div>
          </>
        )}

        {activeTab === 'followUp' && (
          <>
            <h3 className="text-xl font-semibold mb-4">Follow-Up</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={followUpData.date}
                onChange={handleFollowUpChange}
                className="p-2 border rounded-lg"
                placeholder="Follow-Up Date"
              />
              <input
                type="text"
                name="volumetricResponse"
                value={followUpData.volumetricResponse}
                onChange={handleFollowUpChange}
                className="p-2 border rounded-lg"
                placeholder="Volumetric Response"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="pseudoprogression"
                  checked={followUpData.pseudoprogression}
                  onChange={handleFollowUpChange}
                />
                <span>Pseudoprogression</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="toxicity"
                  checked={followUpData.toxicity}
                  onChange={handleFollowUpChange}
                />
                <span>Toxicity</span>
              </label>
              <input
                type="text"
                name="clinicalResponse"
                value={followUpData.clinicalResponse}
                onChange={handleFollowUpChange}
                className="p-2 border rounded-lg"
                placeholder="Clinical Response"
              />
            </div>
          </>
        )}

        {submitSuccess && (
          <div className="text-green-600 mt-4 flex items-center">
            <CheckCircle className="mr-2" size={20} />
            Submission successful!
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {isNewPatient ? 'Add Patient' : 'Update Patient'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientUploadPage;
