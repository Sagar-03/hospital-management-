import { useState } from 'react';
import { Link } from 'react-router-dom';
import { appointmentsData, patientsData } from '../mockData';

function AppointmentsPage() {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredAppointments = filterStatus === 'All'
    ? appointments
    : appointments.filter(app => app.status === filterStatus);

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(appointments.map(app =>
      app.id === appointmentId ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Appointments Management</h1>

      <div className="card">
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button
            className={`btn ${filterStatus === 'All' ? 'btn-primary' : 'btn-success'}`}
            onClick={() => setFilterStatus('All')}
          >
            All ({appointments.length})
          </button>
          <button
            className={`btn ${filterStatus === 'Confirmed' ? 'btn-primary' : 'btn-success'}`}
            onClick={() => setFilterStatus('Confirmed')}
          >
            Confirmed ({appointments.filter(a => a.status === 'Confirmed').length})
          </button>
          <button
            className={`btn ${filterStatus === 'Pending' ? 'btn-primary' : 'btn-success'}`}
            onClick={() => setFilterStatus('Pending')}
          >
            Pending ({appointments.filter(a => a.status === 'Pending').length})
          </button>
          <button
            className={`btn ${filterStatus === 'Cancelled' ? 'btn-primary' : 'btn-success'}`}
            onClick={() => setFilterStatus('Cancelled')}
          >
            Cancelled ({appointments.filter(a => a.status === 'Cancelled').length})
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>
                    <Link to={`/dashboard/patients/${appointment.patientId}`} style={{ color: '#1E88E5', textDecoration: 'none' }}>
                      {appointment.patientName}
                    </Link>
                  </td>
                  <td>{appointment.date}</td>
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
                  <td>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {appointment.status !== 'Confirmed' && (
                        <button
                          className="btn btn-success"
                          onClick={() => handleStatusChange(appointment.id, 'Confirmed')}
                        >
                          Confirm
                        </button>
                      )}
                      {appointment.status !== 'Cancelled' && (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
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

export default AppointmentsPage;
