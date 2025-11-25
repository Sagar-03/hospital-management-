import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <>
      <section className={styles.hero} id="home">
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.badge}>
              <svg className={styles.aiIcon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" />
              </svg>
              AI-Powered Healthcare
            </div>
            
            <h1 className={styles.title}>
              Smart Hospital <br />
              <span className={styles.gradient}>Patient Management</span>
            </h1>
            
            <p className={styles.description}>
              Experience the future of healthcare with AI-driven patient records, 
              intelligent appointment booking, and personalized health recommendations. 
              Your health, simplified.
            </p>
            
            <div className={styles.ctaButtons}>
              <Link to="/patient-dashboard" className={styles.primaryBtn}>
                <span>Patient Portal</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/dashboard" className={styles.secondaryBtn}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM13 11H11V13C11 13.55 10.55 14 10 14C9.45 14 9 13.55 9 13V11H7C6.45 11 6 10.55 6 10C6 9.45 6.45 9 7 9H9V7C9 6.45 9.45 6 10 6C10.55 6 11 6.45 11 7V9H13C13.55 9 14 9.45 14 10C14 10.55 13.55 11 13 11Z"/>
                </svg>
                <span>Doctor Portal</span>
              </Link>
            </div>
            
            <div className={styles.stats}>
              <div className={styles.stat}>
                <h3>50K+</h3>
                <p>Patients Served</p>
              </div>
              <div className={styles.stat}>
                <h3>200+</h3>
                <p>Expert Doctors</p>
              </div>
              <div className={styles.stat}>
                <h3>98%</h3>
                <p>Satisfaction Rate</p>
              </div>
            </div>
          </div>
          
          <div className={styles.imageContainer}>
            <div className={styles.mainImage}>
              <div className={styles.doctorPlaceholder}>
                👨‍⚕️
              </div>
              
              <div className={`${styles.floatingCard} ${styles.aiCard}`}>
                <div className={styles.aiCardIcon}>🤖</div>
                <div className={styles.aiCardText}>
                  <h4>AI Analysis</h4>
                  <p>99.8% Accurate</p>
                </div>
              </div>
              
              <div className={`${styles.floatingCard} ${styles.recordCard}`}>
                <div className={styles.aiCardIcon}>📊</div>
                <div className={styles.aiCardText}>
                  <h4>Patient Records</h4>
                  <p>Secure & Fast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className={styles.infoCards}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>📋</div>
          <div className={styles.cardContent}>
            <h3>Digital Patient Records</h3>
            <p>Access your complete medical history securely from anywhere, anytime</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}>📅</div>
          <div className={styles.cardContent}>
            <h3>Smart Appointment Booking</h3>
            <p>AI-powered scheduling finds the best time slots for you and your doctor</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardIcon}>🤖</div>
          <div className={styles.cardContent}>
            <h3>AI Health Recommendations</h3>
            <p>Get personalized health insights and preventive care suggestions</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
