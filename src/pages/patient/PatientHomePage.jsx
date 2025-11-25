import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { currentPatient, patientAppointments as initialAppointments, wearableData, patientPrescriptions } from '../../mockData';
import styles from './PatientHome.module.css';

function PatientHomePage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem('patientAppointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      setAppointments(initialAppointments);
    }
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate >= today && apt.status !== 'Cancelled' && apt.status !== 'Completed';
  });
  
  const todayMedicines = patientPrescriptions[0]?.medicines || [];

  return (
    <div className={styles.patientHome}>
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeText}>
          <h2>Welcome back, {currentPatient.name.split(' ')[0]}! 👋</h2>
          <p>Here's your health summary for today</p>
        </div>
        <Link to="/patient-dashboard/emergency" className={styles.sosButton}>
          🚨 Emergency SOS
        </Link>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👣</div>
          <div className={styles.statInfo}>
            <h3>{wearableData.todayStats.steps.toLocaleString()}</h3>
            <p>Steps Today</p>
            <div className={styles.progress}>
              <div 
                className={styles.progressBar} 
                style={{width: `${(wearableData.todayStats.steps / wearableData.todayStats.goal) * 100}%`}}
              ></div>
            </div>
            <span className={styles.goal}>Goal: {wearableData.todayStats.goal.toLocaleString()}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>❤️</div>
          <div className={styles.statInfo}>
            <h3>{wearableData.todayStats.heartRate} bpm</h3>
            <p>Heart Rate</p>
            <span className={styles.status}>Normal</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🔥</div>
          <div className={styles.statInfo}>
            <h3>{wearableData.todayStats.calories}</h3>
            <p>Calories Burned</p>
            <span className={styles.status}>{wearableData.todayStats.activeMinutes} min active</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>😴</div>
          <div className={styles.statInfo}>
            <h3>{wearableData.todayStats.sleep}</h3>
            <p>Sleep Last Night</p>
            <span className={styles.status}>Good quality</span>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>📅 Upcoming Appointments</h3>
            <Link to="/patient-dashboard/appointments">View All</Link>
          </div>
          <div className={styles.appointmentsList}>
            {upcomingAppointments.slice(0, 2).map(apt => (
              <div key={apt.id} className={styles.appointmentCard}>
                <div className={styles.aptDate}>
                  <span className={styles.day}>{new Date(apt.date).getDate()}</span>
                  <span className={styles.month}>
                    {new Date(apt.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
                <div className={styles.aptDetails}>
                  <h4>{apt.doctor}</h4>
                  <p>{apt.specialization}</p>
                  <span className={styles.time}>⏰ {apt.time}</span>
                </div>
                <span className={`${styles.status} ${styles[apt.status.toLowerCase()]}`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/patient-dashboard/appointments" className={styles.bookBtn}>
            + Book New Appointment
          </Link>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>💊 Today's Medicines</h3>
            <Link to="/patient-dashboard/prescriptions">View All</Link>
          </div>
          <div className={styles.medicinesList}>
            {todayMedicines.map((med, idx) => (
              <div key={idx} className={styles.medicineCard}>
                <div className={styles.medIcon}>💊</div>
                <div className={styles.medDetails}>
                  <h4>{med.name}</h4>
                  <p>{med.dosage} - {med.frequency}</p>
                  <span className={styles.time}>⏰ {med.reminderTime}</span>
                </div>
                <button className={styles.takenBtn}>✓ Taken</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h3>Quick Actions</h3>
        <div className={styles.actionsGrid}>
          <Link to="/patient-dashboard/ai-health" className={styles.actionCard}>
            <span className={styles.actionIcon}>🤖</span>
            <h4>AI Health Scan</h4>
            <p>Upload & analyze reports</p>
          </Link>
          <Link to="/patient-dashboard/medical-records" className={styles.actionCard}>
            <span className={styles.actionIcon}>📋</span>
            <h4>Medical Records</h4>
            <p>View your history</p>
          </Link>
          <Link to="/patient-dashboard/teleconsult" className={styles.actionCard}>
            <span className={styles.actionIcon}>📞</span>
            <h4>Teleconsult</h4>
            <p>Video call doctor</p>
          </Link>
          <Link to="/patient-dashboard/billing" className={styles.actionCard}>
            <span className={styles.actionIcon}>💳</span>
            <h4>Pay Bills</h4>
            <p>View & pay online</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientHomePage;
