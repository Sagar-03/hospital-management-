import { patientsData, appointmentsData } from '../mockData';

function AnalyticsPage() {
  const totalPatients = patientsData.length;
  const totalAppointments = appointmentsData.length;
  const confirmedAppointments = appointmentsData.filter(a => a.status === 'Confirmed').length;
  const pendingAppointments = appointmentsData.filter(a => a.status === 'Pending').length;
  const cancelledAppointments = appointmentsData.filter(a => a.status === 'Cancelled').length;

  const patientsWithAllergies = patientsData.filter(p => p.allergies !== 'None').length;
  const averageAge = Math.round(patientsData.reduce((sum, p) => sum + p.age, 0) / totalPatients);

  const diagnosisCount = {};
  patientsData.forEach(patient => {
    if (patient.history && patient.history.length > 0) {
      patient.history.forEach(record => {
        const diagnosis = record.diagnosis;
        diagnosisCount[diagnosis] = (diagnosisCount[diagnosis] || 0) + 1;
      });
    }
  });

  const topDiagnoses = Object.entries(diagnosisCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="page-container">
      <h1 className="page-title">Analytics & Statistics</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p>{totalPatients}</p>
        </div>
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <p>{totalAppointments}</p>
        </div>
        <div className="stat-card">
          <h3>Average Patient Age</h3>
          <p>{averageAge} years</p>
        </div>
        <div className="stat-card">
          <h3>Patients with Allergies</h3>
          <p>{patientsWithAllergies}</p>
        </div>
      </div>

      <div className="card">
        <h2>Appointment Status Distribution</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ background: '#E8F5E9', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ color: '#43A047', fontSize: '36px', marginBottom: '10px' }}>{confirmedAppointments}</h3>
            <p style={{ color: '#666' }}>Confirmed</p>
          </div>
          <div style={{ background: '#FFF3E0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ color: '#FB8C00', fontSize: '36px', marginBottom: '10px' }}>{pendingAppointments}</h3>
            <p style={{ color: '#666' }}>Pending</p>
          </div>
          <div style={{ background: '#FFEBEE', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ color: '#EF5350', fontSize: '36px', marginBottom: '10px' }}>{cancelledAppointments}</h3>
            <p style={{ color: '#666' }}>Cancelled</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Top 5 Common Diagnoses</h2>
        {topDiagnoses.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Diagnosis</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {topDiagnoses.map(([diagnosis, count], index) => (
                  <tr key={diagnosis}>
                    <td>#{index + 1}</td>
                    <td>{diagnosis}</td>
                    <td>
                      <span className="badge badge-success">{count} cases</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No diagnosis data available.</p>
        )}
      </div>

      <div className="card">
        <h2>Age Distribution</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginTop: '20px' }}>
          <div style={{ background: '#E3F2FD', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h4 style={{ color: '#1565C0', marginBottom: '10px' }}>20-30 years</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E88E5' }}>
              {patientsData.filter(p => p.age >= 20 && p.age <= 30).length}
            </p>
          </div>
          <div style={{ background: '#E3F2FD', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h4 style={{ color: '#1565C0', marginBottom: '10px' }}>31-40 years</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E88E5' }}>
              {patientsData.filter(p => p.age >= 31 && p.age <= 40).length}
            </p>
          </div>
          <div style={{ background: '#E3F2FD', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h4 style={{ color: '#1565C0', marginBottom: '10px' }}>41-50 years</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E88E5' }}>
              {patientsData.filter(p => p.age >= 41 && p.age <= 50).length}
            </p>
          </div>
          <div style={{ background: '#E3F2FD', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h4 style={{ color: '#1565C0', marginBottom: '10px' }}>51+ years</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E88E5' }}>
              {patientsData.filter(p => p.age >= 51).length}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Monthly Trends</h2>
        <div className="analytics-chart">
          <h3>Patient Visit Trends</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Visual charts and graphs will be displayed here in production environment
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
