import { wearableData } from '../../mockData';
import styles from './Wearables.module.css';

function WearablesPage() {
  return (
    <div className={styles.wearablesPage}>
      <div className={styles.header}>
        <h2>⌚ Wearables & Fitness Tracking</h2>
        <button className={styles.syncBtn}>🔄 Sync Now</button>
      </div>

      <div className={styles.deviceInfo}>
        <div className={styles.deviceIcon}>⌚</div>
        <div>
          <h3>{wearableData.device}</h3>
          <p>Last synced: {wearableData.lastSync}</p>
        </div>
        <span className={styles.connected}>✓ Connected</span>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>👣 Steps</h3>
          <div className={styles.statValue}>{wearableData.todayStats.steps.toLocaleString()}</div>
          <div className={styles.progress}>
            <div className={styles.progressBar} style={{width: `${(wearableData.todayStats.steps / wearableData.todayStats.goal) * 100}%`}}></div>
          </div>
          <p>Goal: {wearableData.todayStats.goal.toLocaleString()}</p>
        </div>

        <div className={styles.statCard}>
          <h3>❤️ Heart Rate</h3>
          <div className={styles.statValue}>{wearableData.todayStats.heartRate} <span>bpm</span></div>
          <p>Resting heart rate</p>
        </div>

        <div className={styles.statCard}>
          <h3>🔥 Calories</h3>
          <div className={styles.statValue}>{wearableData.todayStats.calories}</div>
          <p>Burned today</p>
        </div>

        <div className={styles.statCard}>
          <h3>🏃 Active Minutes</h3>
          <div className={styles.statValue}>{wearableData.todayStats.activeMinutes}</div>
          <p>Minutes today</p>
        </div>

        <div className={styles.statCard}>
          <h3>📏 Distance</h3>
          <div className={styles.statValue}>{wearableData.todayStats.distance}</div>
          <p>Walked today</p>
        </div>

        <div className={styles.statCard}>
          <h3>😴 Sleep</h3>
          <div className={styles.statValue}>{wearableData.todayStats.sleep}</div>
          <p>Last night</p>
        </div>
      </div>

      <div className={styles.weeklySection}>
        <h3>📊 Weekly Average</h3>
        <div className={styles.weeklyGrid}>
          <div className={styles.weeklyCard}>
            <span className={styles.weeklyLabel}>Steps</span>
            <span className={styles.weeklyValue}>{wearableData.weeklyAverage.steps.toLocaleString()}</span>
          </div>
          <div className={styles.weeklyCard}>
            <span className={styles.weeklyLabel}>Heart Rate</span>
            <span className={styles.weeklyValue}>{wearableData.weeklyAverage.heartRate} bpm</span>
          </div>
          <div className={styles.weeklyCard}>
            <span className={styles.weeklyLabel}>Sleep</span>
            <span className={styles.weeklyValue}>{wearableData.weeklyAverage.sleep}</span>
          </div>
        </div>
      </div>

      {wearableData.alerts.length > 0 && (
        <div className={styles.alertsSection}>
          <h3>⚠️ Health Alerts</h3>
          {wearableData.alerts.map((alert, idx) => (
            <div key={idx} className={styles.alertCard}>
              <span className={styles.alertIcon}>⚠️</span>
              <div>
                <p>{alert.message}</p>
                <span className={styles.alertTime}>{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WearablesPage;
