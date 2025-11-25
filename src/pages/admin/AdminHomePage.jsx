import { useState, useEffect } from 'react';
import styles from './AdminHome.module.css';

const AdminHomePage = () => {
  const [stats, setStats] = useState({
    totalDoctors: 45,
    totalPatients: 1250,
    todayAppointments: 87,
    availableBeds: 23,
    revenue: 125000,
    pendingClaims: 12
  });

  const recentActivities = [
    { id: 1, type: 'doctor', message: 'Dr. Sarah Johnson added to Cardiology', time: '10 mins ago' },
    { id: 2, type: 'patient', message: 'New patient registration: John Doe', time: '25 mins ago' },
    { id: 3, type: 'billing', message: 'Invoice #INV-2024-1234 generated', time: '1 hour ago' },
    { id: 4, type: 'resource', message: 'ICU Bed 5 now available', time: '2 hours ago' },
    { id: 5, type: 'appointment', message: '15 appointments scheduled for tomorrow', time: '3 hours ago' }
  ];

  const quickActions = [
    { icon: '➕', label: 'Add Doctor', color: '#667eea' },
    { icon: '📝', label: 'New Patient', color: '#764ba2' },
    { icon: '💰', label: 'Generate Invoice', color: '#f093fb' },
    { icon: '🛏️', label: 'Update Resources', color: '#4facfe' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Welcome back, Administrator</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className={styles.statIcon}>👨‍⚕️</div>
          <div className={styles.statInfo}>
            <h3>{stats.totalDoctors}</h3>
            <p>Total Doctors</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          <div className={styles.statIcon}>🏥</div>
          <div className={styles.statInfo}>
            <h3>{stats.totalPatients}</h3>
            <p>Total Patients</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statInfo}>
            <h3>{stats.todayAppointments}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
          <div className={styles.statIcon}>🛏️</div>
          <div className={styles.statInfo}>
            <h3>{stats.availableBeds}</h3>
            <p>Available Beds</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statInfo}>
            <h3>${stats.revenue.toLocaleString()}</h3>
            <p>Monthly Revenue</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
          <div className={styles.statIcon}>📋</div>
          <div className={styles.statInfo}>
            <h3>{stats.pendingClaims}</h3>
            <p>Pending Claims</p>
          </div>
        </div>
      </div>

      <div className={styles.quickActionsSection}>
        <h2>Quick Actions</h2>
        <div className={styles.quickActions}>
          {quickActions.map((action, index) => (
            <button key={index} className={styles.actionBtn} style={{ background: action.color }}>
              <span className={styles.actionIcon}>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2>Recent Activities</h2>
        <div className={styles.activityList}>
          {recentActivities.map((activity) => (
            <div key={activity.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {activity.type === 'doctor' && '👨‍⚕️'}
                {activity.type === 'patient' && '🏥'}
                {activity.type === 'billing' && '💰'}
                {activity.type === 'resource' && '🛏️'}
                {activity.type === 'appointment' && '📅'}
              </div>
              <div className={styles.activityContent}>
                <p>{activity.message}</p>
                <span className={styles.activityTime}>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
