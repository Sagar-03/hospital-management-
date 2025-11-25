import { useState } from 'react';
import { patientsData, doctorData } from '../mockData';

function EPrescriptionPage() {
  const [formData, setFormData] = useState({
    patientId: '',
    diagnosis: '',
    medicines: '',
    instructions: '',
    followUpDate: ''
  });

  const [prescriptions, setPrescriptions] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = patientsData.find(p => p.id === formData.patientId);

    if (!patient) {
      alert('Patient not found!');
      return;
    }

    const newPrescription = {
      id: `RX${Date.now()}`,
      patientName: patient.name,
      date: new Date().toLocaleDateString('en-GB'),
      ...formData
    };

    setPrescriptions([newPrescription, ...prescriptions]);

    setFormData({
      patientId: '',
      diagnosis: '',
      medicines: '',
      instructions: '',
      followUpDate: ''
    });

    alert('Prescription created successfully!');
  };

  return (
    <div className="page-container">
      <h1 className="page-title">E-Prescription</h1>

      <div className="card">
        <h2>Create New Prescription</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient ID</label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            >
              <option value="">Select Patient</option>
              {patientsData.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.id} - {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Diagnosis</label>
            <input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Enter diagnosis"
              required
            />
          </div>

          <div className="form-group">
            <label>Medicines Prescribed</label>
            <textarea
              name="medicines"
              value={formData.medicines}
              onChange={handleChange}
              placeholder="Enter medicines with dosage (e.g., Paracetamol 500mg - 1 tablet twice daily)"
              required
            />
          </div>

          <div className="form-group">
            <label>Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Enter special instructions for the patient"
            />
          </div>

          <div className="form-group">
            <label>Follow-up Date</label>
            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Generate Prescription
          </button>
        </form>
      </div>

      {prescriptions.length > 0 && (
        <div className="card">
          <h2>Recent Prescriptions</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Rx ID</th>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Diagnosis</th>
                  <th>Follow-up</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map(prescription => (
                  <tr key={prescription.id}>
                    <td>{prescription.id}</td>
                    <td>{prescription.patientName}</td>
                    <td>{prescription.date}</td>
                    <td>{prescription.diagnosis}</td>
                    <td>{prescription.followUpDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default EPrescriptionPage;
