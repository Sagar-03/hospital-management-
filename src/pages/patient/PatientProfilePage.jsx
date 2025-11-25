import { currentPatient, patientAllergies } from '../../mockData';
import styles from './PatientProfile.module.css';

function PatientProfilePage() {
  return (
    <div className={styles.profilePage}>
      <h2>👤 My Profile</h2>
      
      <div className={styles.profileGrid}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            {currentPatient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h3>{currentPatient.name}</h3>
          <p className={styles.medicalId}>Medical ID: {currentPatient.medicalId}</p>
          <button className={styles.editBtn}>✏️ Edit Profile</button>
        </div>

        <div className={styles.infoCard}>
          <h3>📋 Basic Information</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Age</span>
              <span className={styles.value}>{currentPatient.age} years</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Gender</span>
              <span className={styles.value}>{currentPatient.gender}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Blood Group</span>
              <span className={styles.value}>{currentPatient.bloodGroup}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Phone</span>
              <span className={styles.value}>{currentPatient.phone}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{currentPatient.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Address</span>
              <span className={styles.value}>{currentPatient.address}</span>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3>🚨 Emergency Contact</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Name</span>
              <span className={styles.value}>{currentPatient.emergencyContact.name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Relation</span>
              <span className={styles.value}>{currentPatient.emergencyContact.relation}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Phone</span>
              <span className={styles.value}>{currentPatient.emergencyContact.phone}</span>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3>🏥 Insurance Details</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Provider</span>
              <span className={styles.value}>{currentPatient.insurance.provider}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Policy Number</span>
              <span className={styles.value}>{currentPatient.insurance.policyNumber}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Valid Till</span>
              <span className={styles.value}>{currentPatient.insurance.validTill}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Coverage</span>
              <span className={styles.value}>{currentPatient.insurance.coverageAmount}</span>
            </div>
          </div>
        </div>

        <div className={styles.allergiesCard}>
          <h3>⚠️ Allergies</h3>
          <div className={styles.allergiesList}>
            {patientAllergies.map((allergy, idx) => (
              <span key={idx} className={styles.allergyTag}>{allergy}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfilePage;
