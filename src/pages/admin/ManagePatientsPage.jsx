import { useState } from 'react';
import styles from './ManagePatients.module.css';

const ManagePatientsPage = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', age: 45, bloodGroup: 'O+', condition: 'Hypertension', doctor: 'Dr. Sarah Johnson', status: 'Active', emergency: false },
    { id: 2, name: 'Jane Smith', age: 32, bloodGroup: 'A+', condition: 'Diabetes', doctor: 'Dr. Michael Chen', status: 'Active', emergency: true },
    { id: 3, name: 'Robert Brown', age: 58, bloodGroup: 'B-', condition: 'Heart Disease', doctor: 'Dr. Sarah Johnson', status: 'Critical', emergency: true },
    { id: 4, name: 'Emily Wilson', age: 28, bloodGroup: 'AB+', condition: 'Asthma', doctor: 'Dr. Emily Davis', status: 'Active', emergency: false }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setPatients(patients.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage Patients</h1>
        <div className={styles.headerActions}>
          <input
            type="text"
            placeholder="🔍 Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Critical">Critical</option>
            <option value="Discharged">Discharged</option>
          </select>
        </div>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>👥</span>
          <div>
            <div className={styles.statValue}>{patients.length}</div>
            <div className={styles.statLabel}>Total Patients</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>🚨</span>
          <div>
            <div className={styles.statValue}>{patients.filter(p => p.emergency).length}</div>
            <div className={styles.statLabel}>Emergency Cases</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>⚠️</span>
          <div>
            <div className={styles.statValue}>{patients.filter(p => p.status === 'Critical').length}</div>
            <div className={styles.statLabel}>Critical</div>
          </div>
        </div>
      </div>

      <div className={styles.patientsTable}>
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Blood Group</th>
              <th>Condition</th>
              <th>Assigned Doctor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className={patient.emergency ? styles.emergencyRow : ''}>
                <td>
                  <div className={styles.patientName}>
                    {patient.emergency && <span className={styles.emergencyBadge}>🚨</span>}
                    {patient.name}
                  </div>
                </td>
                <td>{patient.age}</td>
                <td><span className={styles.bloodGroup}>{patient.bloodGroup}</span></td>
                <td>{patient.condition}</td>
                <td>{patient.doctor}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[patient.status]}`}>
                    {patient.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    <button 
                      className={styles.viewBtn}
                      onClick={() => handleViewDetails(patient)}
                    >
                      👁️
                    </button>
                    <button className={styles.editBtn}>✏️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPatient && (
        <div className={styles.modal} onClick={() => setSelectedPatient(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Patient Details</h2>
            <div className={styles.patientDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Name:</span>
                <span className={styles.detailValue}>{selectedPatient.name}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Age:</span>
                <span className={styles.detailValue}>{selectedPatient.age} years</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Blood Group:</span>
                <span className={styles.detailValue}>{selectedPatient.bloodGroup}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Condition:</span>
                <span className={styles.detailValue}>{selectedPatient.condition}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Assigned Doctor:</span>
                <span className={styles.detailValue}>{selectedPatient.doctor}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Status:</span>
                <select
                  value={selectedPatient.status}
                  onChange={(e) => handleUpdateStatus(selectedPatient.id, e.target.value)}
                  className={styles.statusSelect}
                >
                  <option value="Active">Active</option>
                  <option value="Critical">Critical</option>
                  <option value="Discharged">Discharged</option>
                </select>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Emergency:</span>
                <span className={styles.detailValue}>{selectedPatient.emergency ? '🚨 Yes' : '✅ No'}</span>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setSelectedPatient(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePatientsPage;
