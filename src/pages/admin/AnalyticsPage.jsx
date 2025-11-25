import { useState } from 'react';
import styles from './Analytics.module.css';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');

  const stats = {
    revenue: { current: 125000, previous: 110000, change: 13.6 },
    patients: { current: 1250, previous: 1180, change: 5.9 },
    appointments: { current: 487, previous: 445, change: 9.4 },
    satisfaction: { current: 4.7, previous: 4.5, change: 4.4 }
  };

  const departmentData = [
    { name: 'Cardiology', patients: 245, revenue: 35000, appointments: 120 },
    { name: 'Neurology', patients: 198, revenue: 28000, appointments: 95 },
    { name: 'Pediatrics', patients: 312, revenue: 22000, appointments: 145 },
    { name: 'Orthopedics', patients: 187, revenue: 25000, appointments: 85 },
    { name: 'General Medicine', patients: 308, revenue: 15000, appointments: 142 }
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: 95000 },
    { month: 'Feb', revenue: 102000 },
    { month: 'Mar', revenue: 98000 },
    { month: 'Apr', revenue: 110000 },
    { month: 'May', revenue: 115000 },
    { month: 'Jun', revenue: 125000 }
  ];

  const topDoctors = [
    { name: 'Dr. Sarah Johnson', patients: 145, rating: 4.9, revenue: 42000 },
    { name: 'Dr. Michael Chen', patients: 132, rating: 4.8, revenue: 38000 },
    { name: 'Dr. Emily Davis', patients: 156, rating: 4.7, revenue: 35000 },
    { name: 'Dr. James Wilson', patients: 128, rating: 4.6, revenue: 33000 }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Analytics Dashboard</h1>
        <div className={styles.timeRangeSelector}>
          <button 
            className={`${styles.rangeBtn} ${timeRange === 'week' ? styles.active : ''}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button 
            className={`${styles.rangeBtn} ${timeRange === 'month' ? styles.active : ''}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button 
            className={`${styles.rangeBtn} ${timeRange === 'year' ? styles.active : ''}`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statIcon}>💰</span>
            <span className={`${styles.change} ${styles.positive}`}>
              ↑ {stats.revenue.change}%
            </span>
          </div>
          <h3>${stats.revenue.current.toLocaleString()}</h3>
          <p>Total Revenue</p>
          <div className={styles.comparison}>
            vs ${stats.revenue.previous.toLocaleString()} last period
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statIcon}>🏥</span>
            <span className={`${styles.change} ${styles.positive}`}>
              ↑ {stats.patients.change}%
            </span>
          </div>
          <h3>{stats.patients.current.toLocaleString()}</h3>
          <p>Total Patients</p>
          <div className={styles.comparison}>
            vs {stats.patients.previous.toLocaleString()} last period
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statIcon}>📅</span>
            <span className={`${styles.change} ${styles.positive}`}>
              ↑ {stats.appointments.change}%
            </span>
          </div>
          <h3>{stats.appointments.current}</h3>
          <p>Appointments</p>
          <div className={styles.comparison}>
            vs {stats.appointments.previous} last period
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statIcon}>⭐</span>
            <span className={`${styles.change} ${styles.positive}`}>
              ↑ {stats.satisfaction.change}%
            </span>
          </div>
          <h3>{stats.satisfaction.current}/5.0</h3>
          <p>Patient Satisfaction</p>
          <div className={styles.comparison}>
            vs {stats.satisfaction.previous} last period
          </div>
        </div>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h2>Monthly Revenue Trend</h2>
          <div className={styles.barChart}>
            {monthlyRevenue.map((data, index) => (
              <div key={index} className={styles.barContainer}>
                <div 
                  className={styles.bar}
                  style={{ 
                    height: `${(data.revenue / 125000) * 100}%`,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  <span className={styles.barValue}>${(data.revenue / 1000).toFixed(0)}k</span>
                </div>
                <span className={styles.barLabel}>{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2>Department Performance</h2>
          <div className={styles.departmentList}>
            {departmentData.map((dept, index) => (
              <div key={index} className={styles.departmentItem}>
                <div className={styles.deptInfo}>
                  <h4>{dept.name}</h4>
                  <div className={styles.deptStats}>
                    <span>👥 {dept.patients}</span>
                    <span>📅 {dept.appointments}</span>
                    <span>💰 ${dept.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progress}
                    style={{ 
                      width: `${(dept.revenue / 35000) * 100}%`,
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.topDoctorsSection}>
        <h2>Top Performing Doctors</h2>
        <div className={styles.doctorsGrid}>
          {topDoctors.map((doctor, index) => (
            <div key={index} className={styles.doctorCard}>
              <div className={styles.rank}>#{index + 1}</div>
              <div className={styles.doctorAvatar}>👨‍⚕️</div>
              <h3>{doctor.name}</h3>
              <div className={styles.doctorStats}>
                <div className={styles.doctorStat}>
                  <span className={styles.statLabel}>Patients</span>
                  <span className={styles.statValue}>{doctor.patients}</span>
                </div>
                <div className={styles.doctorStat}>
                  <span className={styles.statLabel}>Rating</span>
                  <span className={styles.statValue}>⭐ {doctor.rating}</span>
                </div>
                <div className={styles.doctorStat}>
                  <span className={styles.statLabel}>Revenue</span>
                  <span className={styles.statValue}>${(doctor.revenue / 1000).toFixed(0)}k</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
