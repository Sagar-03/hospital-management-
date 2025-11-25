import { billingData, currentPatient } from '../../mockData';
import styles from './Billing.module.css';

function BillingPage() {
  const totalPending = billingData.filter(b => b.status === 'Pending').reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className={styles.billingPage}>
      <h2>💳 Billing & Insurance</h2>

      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <h3>Total Pending</h3>
          <div className={styles.amount}>₹{totalPending.toLocaleString()}</div>
          <button className={styles.payBtn}>Pay Now</button>
        </div>

        <div className={styles.insuranceCard}>
          <h3>🏥 Insurance Details</h3>
          <div className={styles.insuranceInfo}>
            <p><strong>{currentPatient.insurance.provider}</strong></p>
            <p>Policy: {currentPatient.insurance.policyNumber}</p>
            <p>Coverage: {currentPatient.insurance.coverageAmount}</p>
            <p>Valid till: {currentPatient.insurance.validTill}</p>
          </div>
        </div>
      </div>

      <div className={styles.billsSection}>
        <h3>📄 Billing History</h3>
        <div className={styles.billsList}>
          {billingData.map(bill => (
            <div key={bill.id} className={styles.billCard}>
              <div className={styles.billInfo}>
                <h4>{bill.description}</h4>
                <p className={styles.billDate}>📅 {bill.date}</p>
              </div>
              <div className={styles.billAmount}>
                <div className={styles.price}>₹{bill.amount.toLocaleString()}</div>
                <span className={`${styles.status} ${styles[bill.status.toLowerCase()]}`}>
                  {bill.status}
                </span>
                {bill.paymentMethod !== '-' && (
                  <p className={styles.paymentMethod}>Paid via {bill.paymentMethod}</p>
                )}
              </div>
              <div className={styles.billActions}>
                <button className={styles.viewBtn}>👁️ View</button>
                {bill.status === 'Pending' && (
                  <button className={styles.payNowBtn}>💳 Pay Now</button>
                )}
                <button className={styles.downloadBtn}>⬇️ Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BillingPage;
