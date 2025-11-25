import styles from './Teleconsult.module.css';

function TeleconsultPage() {
  return (
    <div className={styles.teleconsultPage}>
      <h2>📞 Teleconsultation</h2>

      <div className={styles.videoSection}>
        <div className={styles.videoPlaceholder}>
          <div className={styles.videoIcon}>📹</div>
          <h3>Start Video Consultation</h3>
          <p>Connect with your doctor from anywhere</p>
          <button className={styles.startBtn}>🎥 Start Call</button>
        </div>
      </div>

      <div className={styles.availableDoctors}>
        <h3>👨‍⚕️ Available Doctors</h3>
        <div className={styles.doctorsList}>
          {['Dr. Aarav Mehta - Cardiologist', 'Dr. Neha Gupta - General Physician', 'Dr. Priya Singh - Radiologist'].map((doctor, idx) => (
            <div key={idx} className={styles.doctorCard}>
              <div className={styles.doctorAvatar}>
                {doctor.split(' ')[1][0]}
              </div>
              <div className={styles.doctorInfo}>
                <h4>{doctor}</h4>
                <span className={styles.available}>🟢 Available Now</span>
              </div>
              <button className={styles.callBtn}>📞 Call</button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.features}>
        <h3>✨ Features</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🎥</span>
            <h4>HD Video Call</h4>
            <p>Crystal clear video quality</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>💬</span>
            <h4>Chat Support</h4>
            <p>Text chat during call</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>📄</span>
            <h4>Share Reports</h4>
            <p>Share medical documents</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>💊</span>
            <h4>E-Prescription</h4>
            <p>Get digital prescription</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeleconsultPage;
