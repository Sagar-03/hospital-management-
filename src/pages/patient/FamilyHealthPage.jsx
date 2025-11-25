import { familyMembers } from '../../mockData';
import styles from './FamilyHealth.module.css';

function FamilyHealthPage() {
  return (
    <div className={styles.familyPage}>
      <div className={styles.header}>
        <h2>👨‍👩‍👧‍👦 Family Health Management</h2>
        <button className={styles.addBtn}>+ Add Family Member</button>
      </div>

      <div className={styles.familyGrid}>
        {familyMembers.map(member => (
          <div key={member.id} className={styles.memberCard}>
            <div className={styles.memberAvatar}>
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3>{member.name}</h3>
            <p className={styles.relation}>{member.relation}</p>
            
            <div className={styles.memberInfo}>
              <div className={styles.infoRow}>
                <span>Age:</span>
                <strong>{member.age} years</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Blood Group:</span>
                <strong>{member.bloodGroup}</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Phone:</span>
                <strong>{member.phone}</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Last Checkup:</span>
                <strong>{member.lastCheckup}</strong>
              </div>
            </div>

            <div className={styles.conditions}>
              <h4>Medical Conditions:</h4>
              {member.conditions.map((condition, idx) => (
                <span key={idx} className={styles.conditionTag}>
                  {condition}
                </span>
              ))}
            </div>

            <div className={styles.memberActions}>
              <button className={styles.viewBtn}>View Records</button>
              <button className={styles.bookBtn}>Book Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FamilyHealthPage;
