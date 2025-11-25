import { useState } from 'react';
import styles from './Navbar.module.css';
import AuthModal from '../Auth/AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
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
            <button onClick={() => setShowAuthModal(true)} className={styles.loginBtn}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: '6px' }}>
                <path d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.75 16.5C15.75 13.6005 12.7279 11.25 9 11.25C5.27208 11.25 2.25 13.6005 2.25 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Login
            </button>
            <button onClick={() => setShowAuthModal(true)} className={styles.appointmentBtn}>
              <span>Get Started</span>
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

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;
