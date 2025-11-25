import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3>MediCare AI</h3>
            <p>
              Leading the future of healthcare with AI-powered patient management, 
              smart diagnostics, and personalized care solutions.
            </p>
            <div className={styles.socialLinks}>
              <a href="#linkedin" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3C3.9 3 3 3.9 3 5V15C3 16.1 3.9 17 5 17H15C16.1 17 17 16.1 17 15V5C17 3.9 16.1 3 15 3H5ZM5.5 5H6.5C6.78 5 7 5.22 7 5.5V6.5C7 6.78 6.78 7 6.5 7H5.5C5.22 7 5 6.78 5 6.5V5.5C5 5.22 5.22 5 5.5 5ZM5 8H7V15H5V8ZM9 8H11V9C11.5 8.3 12.4 8 13 8C14.9 8 16 9.3 16 11V15H14V11.5C14 10.7 13.6 10 12.5 10C11.5 10 11 10.8 11 11.5V15H9V8Z"/>
                </svg>
              </a>
              <a href="#twitter" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18 4.5C17.3 4.8 16.5 5 15.7 5.1C16.5 4.6 17.1 3.8 17.4 2.9C16.6 3.4 15.7 3.7 14.7 3.9C14 3.1 13 2.6 11.8 2.6C9.6 2.6 7.8 4.4 7.8 6.6C7.8 6.9 7.8 7.2 7.9 7.5C4.7 7.3 1.9 5.7 0 3.3C-0.3 3.9 -0.5 4.6 -0.5 5.4C-0.5 6.8 0.2 8 1.3 8.7C0.7 8.7 0.1 8.5 -0.4 8.2V8.3C-0.4 10.2 1 11.8 2.9 12.2C2.6 12.3 2.2 12.3 1.9 12.3C1.6 12.3 1.4 12.3 1.1 12.2C1.6 13.8 3.1 14.9 4.9 15C3.5 16 1.7 16.6 -0.2 16.6C-0.5 16.6 -0.8 16.6 -1.1 16.5C0.7 17.6 2.9 18.2 5.3 18.2C11.8 18.2 15.4 12.4 15.4 7.2V6.7C16.2 6.1 16.9 5.4 17.5 4.6L18 4.5Z"/>
                </svg>
              </a>
              <a href="#facebook" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.5 0 0 4.5 0 10C0 14.9 3.7 19 8.4 19.9V12.9H5.9V10H8.4V7.8C8.4 5.3 9.9 3.9 12.2 3.9C13.3 3.9 14.5 4.1 14.5 4.1V6.6H13.2C11.9 6.6 11.5 7.4 11.5 8.2V10H14.4L13.9 12.9H11.5V19.9C16.3 19 20 14.9 20 10C20 4.5 15.5 0 10 0Z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className={styles.column}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#doctors">Doctors</a></li>
              <li><a href="#appointment">Appointments</a></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h4>Resources</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Health Blog</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h4>Contact Us</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📞</div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>✉️</div>
                <span>info@medicareai.com</span>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📍</div>
                <span>123 Healthcare Ave, Medical City</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; 2024 MediCare AI. All rights reserved. Powered by Advanced AI Technology</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
