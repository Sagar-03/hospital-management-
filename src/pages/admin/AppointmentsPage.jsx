import { useState } from 'react';
import styles from './Appointments.module.css';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', date: '2024-11-26', time: '09:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Chen', department: 'Neurology', date: '2024-11-26', time: '10:30 AM', status: 'Pending' },
    { id: 3, patient: 'Mike Johnson', doctor: 'Dr. Emily Davis', department: 'Pediatrics', date: '2024-11-26', time: '02:00 PM', status: 'Confirmed' },
    { id: 4, patient: 'Sarah Williams', doctor: 'Dr. James Wilson', department: 'Orthopedics', date: '2024-11-27', time: '11:00 AM', status: 'Cancelled' },
    { id: 5, patient: 'David Brown', doctor: 'Dr. Sarah Johnson', department: 'Cardiology', date: '2024-11-27', time: '03:30 PM', status: 'Pending' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    patient: '', doctor: '', department: '', date: '', time: '', status: 'Pending'
  });

  const [filterStatus, setFilterStatus] = useState('all');

  const handleAddAppointment = () => {
    if (formData.patient && formData.doctor && formData.date && formData.time) {
      const newAppointment = {
        id: appointments.length + 1,
        ...formData
      };
      setAppointments([...appointments, newAppointment]);
      setFormData({ patient: '', doctor: '', department: '', date: '', time: '', status: 'Pending' });
      setShowAddModal(false);
    }
  };

  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filterStatus);

  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Appointments Management</h1>
        <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
          ➕ Schedule Appointment
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statInfo}>
            <h3>{appointments.length}</h3>
            <p>Total Appointments</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <h3>{appointments.filter(a => a.status === 'Confirmed').length}</h3>
            <p>Confirmed</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)' }}>
          <div className={styles.statIcon}>⏳</div>
          <div className={styles.statInfo}>
            <h3>{appointments.filter(a => a.status === 'Pending').length}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
          <div className={styles.statIcon}>📆</div>
          <div className={styles.statInfo}>
            <h3>{todayAppointments.length}</h3>
            <p>Today</p>
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <button 
          className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.active : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          All
        </button>
        <button 
          className={`${styles.filterBtn} ${filterStatus === 'Confirmed' ? styles.active : ''}`}
          onClick={() => setFilterStatus('Confirmed')}
        >
          Confirmed
        </button>
        <button 
          className={`${styles.filterBtn} ${filterStatus === 'Pending' ? styles.active : ''}`}
          onClick={() => setFilterStatus('Pending')}
        >
          Pending
        </button>
        <button 
          className={`${styles.filterBtn} ${filterStatus === 'Cancelled' ? styles.active : ''}`}
          onClick={() => setFilterStatus('Cancelled')}
        >
          Cancelled
        </button>
      </div>

      <div className={styles.appointmentsSection}>
        <h2>Appointments List</h2>
        <div className={styles.appointmentsTable}>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td>{apt.patient}</td>
                  <td>{apt.doctor}</td>
                  <td>{apt.department}</td>
                  <td>{apt.date}</td>
                  <td className={styles.time}>{apt.time}</td>
                  <td>
                    <span className={`${styles.status} ${styles[apt.status.toLowerCase()]}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      {apt.status === 'Pending' && (
                        <button 
                          className={styles.confirmBtn}
                          onClick={() => updateStatus(apt.id, 'Confirmed')}
                        >
                          Confirm
                        </button>
                      )}
                      {apt.status !== 'Cancelled' && (
                        <button 
                          className={styles.cancelBtn}
                          onClick={() => updateStatus(apt.id, 'Cancelled')}
                        >
                          Cancel
                        </button>
                      )}
                      <button className={styles.viewBtn}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Schedule New Appointment</h2>
            <input
              type="text"
              placeholder="Patient Name"
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Doctor Name"
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className={styles.input}
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={styles.input}
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className={styles.input}
            />
            <div className={styles.modalActions}>
              <button className={styles.saveBtn} onClick={handleAddAppointment}>
                Schedule
              </button>
              <button 
                className={styles.cancelBtnModal}
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({ patient: '', doctor: '', department: '', date: '', time: '', status: 'Pending' });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
