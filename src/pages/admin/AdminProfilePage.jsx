import { useState } from 'react';
import styles from './AdminProfile.module.css';

const AdminProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Administrator',
    email: 'admin@hospital.com',
    phone: '+1 (555) 123-4567',
    role: 'System Administrator',
    department: 'Administration',
    joinDate: '2020-01-15'
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  const activityLog = [
    { action: 'Added new doctor', time: '2 hours ago', icon: '👨‍⚕️' },
    { action: 'Updated hospital resources', time: '5 hours ago', icon: '🛏️' },
    { action: 'Approved insurance claim', time: '1 day ago', icon: '📋' },
    { action: 'Generated monthly report', time: '2 days ago', icon: '📊' },
    { action: 'Modified patient record', time: '3 days ago', icon: '🏥' }
  ];

  const systemStats = [
    { label: 'Total Users', value: '1,295', icon: '👥' },
    { label: 'Active Sessions', value: '87', icon: '🔄' },
    { label: 'System Uptime', value: '99.9%', icon: '⚡' },
    { label: 'Data Storage', value: '2.4 TB', icon: '💾' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Admin Profile</h1>
        {!isEditing && (
          <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
            ✏️ Edit Profile
          </button>
        )}
      </div>

      <div className={styles.profileSection}>
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>👤</div>
            <h2>{profile.name}</h2>
            <p className={styles.role}>{profile.role}</p>
          </div>

          <div className={styles.infoSection}>
            {isEditing ? (
              <>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className={styles.input}
                  />
                </div>
                <div className={styles.actions}>
                  <button className={styles.saveBtn} onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className={styles.cancelBtn} onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.infoItem}>
                  <span className={styles.label}>📧 Email</span>
                  <span className={styles.value}>{profile.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>📱 Phone</span>
                  <span className={styles.value}>{profile.phone}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>🏢 Department</span>
                  <span className={styles.value}>{profile.department}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>📅 Join Date</span>
                  <span className={styles.value}>{profile.joinDate}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.sideSection}>
          <div className={styles.statsCard}>
            <h3>System Statistics</h3>
            <div className={styles.statsGrid}>
              {systemStats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <span className={styles.statIcon}>{stat.icon}</span>
                  <div>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.activityCard}>
            <h3>Recent Activity</h3>
            <div className={styles.activityList}>
              {activityLog.map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <span className={styles.activityIcon}>{activity.icon}</span>
                  <div className={styles.activityContent}>
                    <p>{activity.action}</p>
                    <span className={styles.activityTime}>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.securitySection}>
        <h2>Security Settings</h2>
        <div className={styles.securityCard}>
          <div className={styles.securityItem}>
            <div>
              <h4>Change Password</h4>
              <p>Update your password regularly for security</p>
            </div>
            <button className={styles.securityBtn}>Change</button>
          </div>
          <div className={styles.securityItem}>
            <div>
              <h4>Two-Factor Authentication</h4>
              <p>Add an extra layer of security to your account</p>
            </div>
            <button className={styles.securityBtn}>Enable</button>
          </div>
          <div className={styles.securityItem}>
            <div>
              <h4>Login History</h4>
              <p>View your recent login activity</p>
            </div>
            <button className={styles.securityBtn}>View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
