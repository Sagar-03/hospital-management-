import { patientMedicalRecords, patientAllergies } from '../../mockData';
import styles from './MedicalRecords.module.css';

function MedicalRecordsPage() {
  return (
    <div className={styles.recordsPage}>
      <div className={styles.header}>
        <h2>📋 Medical Records</h2>
        <button className={styles.uploadBtn}>📤 Upload New Record</button>
      </div>

      <div className={styles.allergiesSection}>
        <h3>⚠️ Allergies</h3>
        <div className={styles.allergiesList}>
          {patientAllergies.map((allergy, idx) => (
            <span key={idx} className={styles.allergyTag}>{allergy}</span>
          ))}
        </div>
      </div>

      <div className={styles.recordsList}>
        {patientMedicalRecords.map(record => (
          <div key={record.id} className={styles.recordCard}>
            <div className={styles.recordIcon}>📄</div>
            <div className={styles.recordInfo}>
              <h3>{record.type}</h3>
              <p className={styles.doctor}>👨‍⚕️ {record.doctor}</p>
              <p className={styles.findings}>{record.findings}</p>
              <span className={styles.date}>📅 {record.date}</span>
            </div>
            <div className={styles.recordActions}>
              <button className={styles.viewBtn}>👁️ View</button>
              <button className={styles.downloadBtn}>⬇️ Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicalRecordsPage;
