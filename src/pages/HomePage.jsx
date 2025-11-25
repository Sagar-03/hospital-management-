import { Link } from 'react-router-dom';
import { patientsData, appointmentsData } from '../mockData';

function HomePage() {
  const todayAppointments = appointmentsData.filter(app => app.date === '2025-11-24').length;
  const pendingAppointments = appointmentsData.filter(app => app.status === 'Pending').length;
  const recentPatients = patientsData.slice(0, 5);

  return (
    <div className="page-container">
      <h1 className="page-title">Dashboard Overview</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p>{patientsData.length}</p>
        </div>
        <div className="stat-card">
          <h3>Today's Appointments</h3>
          <p>{todayAppointments}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Appointments</h3>
          <p>{pendingAppointments}</p>
        </div>
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <p>{appointmentsData.length}</p>
        </div>
      </div>

      <div className="card">
        <h2>Recent Patients</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Last Visit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentPatients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age} years</td>
                  <td>{patient.lastVisit}</td>
                  <td>
                    <Link to={`/dashboard/patients/${patient.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2>Today's Appointments</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsData.filter(app => app.date === '2025-11-24').map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <span className={`badge ${
                      appointment.status === 'Confirmed' ? 'badge-success' :
                      appointment.status === 'Pending' ? 'badge-warning' :
                      'badge-danger'
                    }`}>
                      {appointment.status}
                    </span>
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

export default HomePage;
