import { NavLink, Link, Outlet } from 'react-router-dom';
import { currentPatient, notifications } from '../mockData';
import { useState } from 'react';

function PatientDashboardLayout() {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="dashboard-layout patient-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h2>🏥 MetaCare AI</h2>
            <p>Patient Portal</p>
          </Link>
        </div>
        <nav>
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/patient-dashboard" end>
                <span className="icon">🏠</span>
                Dashboard
              </NavLink>
            </li>
             <li>
              <NavLink to="/patient-dashboard/appointments">
                <span className="icon">📅</span>
                Appointments
              </NavLink>
            </li>
              <li>
              <NavLink to="/patient-dashboard/ai-health">
                <span className="icon">🤖</span>
                AI Health Assistant
              </NavLink>
            </li>
           
            <li>
              <NavLink to="/patient-dashboard/medical-records">
                <span className="icon">📋</span>
                Medical Records
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient-dashboard/prescriptions">
                <span className="icon">💊</span>
                Prescriptions
              </NavLink>
            </li>
          
            <li>
              <NavLink to="/patient-dashboard/wearables">
                <span className="icon">⌚</span>
                Wearables & Fitness
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/patient-dashboard/family">
                <span className="icon">👨‍👩‍👧‍👦</span>
                Family Health
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/patient-dashboard/billing">
                <span className="icon">💳</span>
                Billing & Insurance
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient-dashboard/teleconsult">
                <span className="icon">📞</span>
                Teleconsultation
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient-dashboard/emergency" className="emergency-link">
                <span className="icon">🚨</span>
                Emergency SOS
              </NavLink>
            </li>
             <li>
              <NavLink to="/patient-dashboard/profile">
                <span className="icon">👤</span>
                My Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="navbar">
          <h1>My Health Dashboard</h1>
          <div className="navbar-actions">
            <div className="notification-wrapper">
              <button 
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
              </button>
              {showNotifications && (
                <div className="notification-dropdown">
                  <h3>Notifications</h3>
                  {notifications.map(notif => (
                    <div key={notif.id} className={`notification-item ${notif.read ? 'read' : ''}`}>
                      <div className="notif-icon">
                        {notif.type === 'appointment' && '📅'}
                        {notif.type === 'medicine' && '💊'}
                        {notif.type === 'report' && '📄'}
                        {notif.type === 'alert' && '⚠️'}
                      </div>
                      <div className="notif-content">
                        <h4>{notif.title}</h4>
                        <p>{notif.message}</p>
                        <span className="notif-time">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="navbar-user">
              <span>{currentPatient.name}</span>
              <div className="user-avatar">
                {currentPatient.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

export default PatientDashboardLayout;
