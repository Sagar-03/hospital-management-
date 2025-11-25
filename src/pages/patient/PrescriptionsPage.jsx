import { useState } from 'react';
import { patientPrescriptions } from '../../mockData';
import styles from './Prescriptions.module.css';

function PrescriptionsPage() {
  const [reminders, setReminders] = useState({});
  const [takenMedicines, setTakenMedicines] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSetReminder = (prescriptionId, medicineIndex, medicineName, time) => {
    const key = `${prescriptionId}-${medicineIndex}`;
    setReminders(prev => ({ ...prev, [key]: true }));
    
    setSuccessMessage(`✓ Reminder set for ${medicineName} at ${time}`);
    setTimeout(() => setSuccessMessage(''), 3000);
    
    // In a real app, this would set up actual notifications
    console.log(`Reminder set for ${medicineName} at ${time}`);
  };

  const handleMarkAsTaken = (prescriptionId, medicineIndex, medicineName) => {
    const key = `${prescriptionId}-${medicineIndex}`;
    setTakenMedicines(prev => ({ ...prev, [key]: true }));
    
    setSuccessMessage(`✓ ${medicineName} marked as taken`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDownloadPrescription = (prescriptionId) => {
    setSuccessMessage(`✓ Prescription #${prescriptionId} downloaded`);
    setTimeout(() => setSuccessMessage(''), 3000);
    // In a real app, this would trigger actual download
    console.log(`Downloading prescription ${prescriptionId}`);
  };

  return (
    <div className={styles.prescriptionsPage}>
      <h2>💊 My Prescriptions & Medicine Reminders</h2>
      
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      <div className={styles.prescriptionsList}>
        {patientPrescriptions.map(prescription => (
          <div key={prescription.id} className={styles.prescriptionCard}>
            <div className={styles.prescriptionHeader}>
              <div>
                <h3>Prescription #{prescription.id}</h3>
                <p>📅 {prescription.date} | 👨‍⚕️ {prescription.doctor}</p>
              </div>
              <button 
                className={styles.downloadBtn}
                onClick={() => handleDownloadPrescription(prescription.id)}
              >
                ⬇️ Download
              </button>
            </div>
            
            <div className={styles.medicinesList}>
              {prescription.medicines.map((med, idx) => {
                const key = `${prescription.id}-${idx}`;
                const hasReminder = reminders[key];
                const isTaken = takenMedicines[key];
                
                return (
                  <div key={idx} className={`${styles.medicineCard} ${isTaken ? styles.taken : ''}`}>
                    <div className={styles.medIcon}>💊</div>
                    <div className={styles.medInfo}>
                      <h4>{med.name} {isTaken && <span className={styles.takenBadge}>✓ Taken</span>}</h4>
                      <p><strong>Dosage:</strong> {med.dosage}</p>
                      <p><strong>Frequency:</strong> {med.frequency}</p>
                      <p><strong>Duration:</strong> {med.duration}</p>
                      <p><strong>Instructions:</strong> {med.instructions}</p>
                    </div>
                    <div className={styles.reminder}>
                      <span className={styles.reminderTime}>⏰ {med.reminderTime}</span>
                      <button 
                        className={`${styles.reminderBtn} ${hasReminder ? styles.active : ''}`}
                        onClick={() => handleSetReminder(prescription.id, idx, med.name, med.reminderTime)}
                        disabled={hasReminder}
                      >
                        {hasReminder ? '✓ Reminder Set' : '🔔 Set Reminder'}
                      </button>
                      <button 
                        className={styles.takenBtn}
                        onClick={() => handleMarkAsTaken(prescription.id, idx, med.name)}
                        disabled={isTaken}
                      >
                        {isTaken ? '✓ Taken' : 'Mark as Taken'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrescriptionsPage;
