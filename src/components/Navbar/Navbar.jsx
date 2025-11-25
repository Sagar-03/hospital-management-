import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L28 8V14C28 21.732 22.732 28 16 30C9.268 28 4 21.732 4 14V8L16 2Z" fill="url(#gradient)" />
              <path d="M16 10V22M10 16H22" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="4" y1="2" x2="28" y2="30">
                  <stop stopColor="#1E40AF" />
                  <stop offset="1" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>MediCare AI</span>
            <span className={styles.logoTagline}>Smart Healthcare</span>
          </div>
        </div>
        
        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#doctors">Doctors</a></li>
          <li><a href="#appointment">Appointment</a></li>
        </ul>
        
        <div className={styles.navActions}>
          <Link to="/dashboard" className={styles.loginBtn}>Doctor Portal</Link>
          <button className={styles.appointmentBtn}>
            <span>Book Appointment</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
