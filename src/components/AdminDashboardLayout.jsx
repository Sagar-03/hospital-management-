import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './AdminDashboardLayout.module.css';

const AdminDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/doctors', icon: '👨‍⚕️', label: 'Manage Doctors' },
    { path: '/admin/patients', icon: '🏥', label: 'Manage Patients' },
    { path: '/admin/resources', icon: '🛏️', label: 'Hospital Resources' },
    { path: '/admin/billing', icon: '💰', label: 'Billing & Invoices' },
    { path: '/admin/lab-pharmacy', icon: '💊', label: 'Lab & Pharmacy' },
    { path: '/admin/insurance', icon: '📋', label: 'Insurance & Claims' },
    { path: '/admin/appointments', icon: '📅', label: 'Appointments' },
    { path: '/admin/analytics', icon: '📈', label: 'Analytics' },
    { path: '/admin/profile', icon: '👤', label: 'Admin Profile' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <h2>🏥 Admin Panel</h2>
          <button 
            className={styles.toggleBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {isSidebarOpen && <span className={styles.label}>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <span className={styles.icon}>🚪</span>
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
