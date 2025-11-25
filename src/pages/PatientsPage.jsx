import { useState } from 'react';
import { Link } from 'react-router-dom';
import { patientsData } from '../mockData';

function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Patient List</h1>

      <div className="card">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <p style={{ marginBottom: '20px', color: '#666' }}>
          Total Patients: <strong>{filteredPatients.length}</strong>
        </p>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Last Visit</th>
                <th>Allergies</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age} years</td>
                  <td>{patient.phone}</td>
                  <td>{patient.lastVisit}</td>
                  <td>
                    {patient.allergies === 'None' ? (
                      <span style={{ color: '#43A047' }}>None</span>
                    ) : (
                      <span style={{ color: '#EF5350' }}>{patient.allergies}</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/dashboard/patients/${patient.id}`} className="btn btn-primary">
                      View History
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PatientsPage;
