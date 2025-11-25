import { useState } from 'react';
import styles from './Insurance.module.css';

const InsurancePage = () => {
  const [claims, setClaims] = useState([
    { id: 'CLM-001', patient: 'John Doe', provider: 'Blue Cross', amount: 5000, submitted: '2024-11-20', status: 'Approved', coverage: 80 },
    { id: 'CLM-002', patient: 'Jane Smith', provider: 'Aetna', amount: 8500, submitted: '2024-11-22', status: 'Pending', coverage: 75 },
    { id: 'CLM-003', patient: 'Mike Johnson', provider: 'United Health', amount: 3200, submitted: '2024-11-23', status: 'Under Review', coverage: 90 },
    { id: 'CLM-004', patient: 'Sarah Williams', provider: 'Cigna', amount: 6700, submitted: '2024-11-24', status: 'Rejected', coverage: 70 },
    { id: 'CLM-005', patient: 'David Brown', provider: 'Humana', amount: 4100, submitted: '2024-11-25', status: 'Approved', coverage: 85 }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    patient: '', provider: '', amount: '', coverage: '', status: 'Pending'
  });

  const handleAddClaim = () => {
    if (formData.patient && formData.provider && formData.amount) {
      const newClaim = {
        id: `CLM-${String(claims.length + 1).padStart(3, '0')}`,
        patient: formData.patient,
        provider: formData.provider,
        amount: parseFloat(formData.amount),
        submitted: new Date().toISOString().split('T')[0],
        status: formData.status,
        coverage: parseInt(formData.coverage)
      };
      setClaims([newClaim, ...claims]);
      setFormData({ patient: '', provider: '', amount: '', coverage: '', status: 'Pending' });
      setShowAddModal(false);
    }
  };

  const updateStatus = (id, newStatus) => {
    setClaims(claims.map(claim => 
      claim.id === id ? { ...claim, status: newStatus } : claim
    ));
  };

  const totalClaims = claims.reduce((sum, claim) => sum + claim.amount, 0);
  const approvedClaims = claims.filter(c => c.status === 'Approved').reduce((sum, c) => sum + (c.amount * c.coverage / 100), 0);
  const pendingClaims = claims.filter(c => c.status === 'Pending').length;
  const rejectedClaims = claims.filter(c => c.status === 'Rejected').length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Insurance & Claims</h1>
        <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
          ➕ Submit Claim
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className={styles.statIcon}>📋</div>
          <div className={styles.statInfo}>
            <h3>{claims.length}</h3>
            <p>Total Claims</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <h3>${approvedClaims.toLocaleString()}</h3>
            <p>Approved Amount</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)' }}>
          <div className={styles.statIcon}>⏳</div>
          <div className={styles.statInfo}>
            <h3>{pendingClaims}</h3>
            <p>Pending Claims</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)' }}>
          <div className={styles.statIcon}>❌</div>
          <div className={styles.statInfo}>
            <h3>{rejectedClaims}</h3>
            <p>Rejected Claims</p>
          </div>
        </div>
      </div>

      <div className={styles.claimsSection}>
        <h2>Insurance Claims</h2>
        <div className={styles.claimsTable}>
          <table>
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Patient</th>
                <th>Insurance Provider</th>
                <th>Claim Amount</th>
                <th>Coverage %</th>
                <th>Covered Amount</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id}>
                  <td className={styles.claimId}>{claim.id}</td>
                  <td>{claim.patient}</td>
                  <td>{claim.provider}</td>
                  <td className={styles.amount}>${claim.amount.toLocaleString()}</td>
                  <td>{claim.coverage}%</td>
                  <td className={styles.covered}>${(claim.amount * claim.coverage / 100).toLocaleString()}</td>
                  <td>{claim.submitted}</td>
                  <td>
                    <span className={`${styles.status} ${styles[claim.status.replace(' ', '').toLowerCase()]}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      {claim.status === 'Pending' && (
                        <>
                          <button 
                            className={styles.approveBtn}
                            onClick={() => updateStatus(claim.id, 'Approved')}
                          >
                            Approve
                          </button>
                          <button 
                            className={styles.rejectBtn}
                            onClick={() => updateStatus(claim.id, 'Rejected')}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button className={styles.viewBtn}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Submit Insurance Claim</h2>
            <input
              type="text"
              placeholder="Patient Name"
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Insurance Provider"
              value={formData.provider}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Claim Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Coverage Percentage"
              value={formData.coverage}
              onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
              className={styles.input}
            />
            <div className={styles.modalActions}>
              <button className={styles.saveBtn} onClick={handleAddClaim}>
                Submit Claim
              </button>
              <button 
                className={styles.cancelBtn}
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({ patient: '', provider: '', amount: '', coverage: '', status: 'Pending' });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsurancePage;
