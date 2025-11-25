import { NavLink, Link, Outlet } from 'react-router-dom';
import { doctorData } from '../mockData';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h2>Doctor Portal</h2>
            <p>Smart Patient Management</p>
          </Link>
        </div>
        <nav>
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/dashboard" end>
                <span className="icon">🏠</span>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/profile">
                <span className="icon">👤</span>
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/patients">
                <span className="icon">👥</span>
                Patients
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/appointments">
                <span className="icon">📅</span>
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/prescriptions">
                <span className="icon">💊</span>
                E-Prescription
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reports">
                <span className="icon">📄</span>
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/teleconsult">
                <span className="icon">📞</span>
                Teleconsultation
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/analytics">
                <span className="icon">📊</span>
                Analytics
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="navbar">
          <h1>Smart Patient History Management</h1>
          <div className="navbar-user">
            <span>{doctorData.name}</span>
            <div className="user-avatar">
              {doctorData.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
