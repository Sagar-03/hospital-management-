import { useParams, Link } from 'react-router-dom';
import { patientsData } from '../mockData';

function PatientHistoryPage() {
  const { id } = useParams();
  const patient = patientsData.find(p => p.id === id);

  if (!patient) {
    return (
      <div className="page-container">
        <div className="card">
          <h2>Patient Not Found</h2>
          <p>The patient with ID {id} could not be found.</p>
          <Link to="/dashboard/patients" className="btn btn-primary">
            Back to Patients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="patient-header">
        <div className="patient-basic-info">
          <h2>{patient.name}</h2>
          <p>Patient ID: {patient.id}</p>
          <p>Age: {patient.age} years | Phone: {patient.phone}</p>
          <p>Last Visit: {patient.lastVisit}</p>
        </div>
        <div className="patient-vitals">
          <h3>Current Vitals</h3>
          <p>{patient.vitals}</p>
        </div>
      </div>

      <div className="card">
        <h2>Allergies</h2>
        <p style={{
          fontSize: '18px',
          color: patient.allergies === 'None' ? '#43A047' : '#EF5350',
          fontWeight: '500'
        }}>
          {patient.allergies}
        </p>
      </div>

      <div className="card">
        <h2>Medical History</h2>
        {patient.history && patient.history.length > 0 ? (
          patient.history.map((record, index) => (
            <div key={index} className="history-item">
              <h4>Visit Date: {record.date}</h4>
              <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>Medicines Prescribed:</strong> {record.medicines}</p>
            </div>
          ))
        ) : (
          <p>No medical history available.</p>
        )}
      </div>

      <div className="card">
        <h2>Reports & Lab Results</h2>
        {patient.reports && patient.reports.length > 0 ? (
          patient.reports.map(report => (
            <div key={report.id} style={{ marginBottom: '20px' }}>
              <h4>{report.type} - {report.date}</h4>
              <p>File: {report.fileName}</p>
              <img
                src={report.filePath}
                alt={report.type}
                className="report-image"
              />
            </div>
          ))
        ) : (
          <p>No reports available.</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/dashboard/patients" className="btn btn-primary">
          Back to Patients List
        </Link>
      </div>
    </div>
  );
}

export default PatientHistoryPage;
