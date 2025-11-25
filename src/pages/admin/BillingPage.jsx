import { useState } from 'react';
import styles from './Billing.module.css';

const BillingPage = () => {
  const [invoices, setInvoices] = useState([
    { id: 'INV-2024-001', patient: 'John Doe', amount: 1250, date: '2024-11-20', status: 'Paid', services: 'Consultation, Lab Tests' },
    { id: 'INV-2024-002', patient: 'Jane Smith', amount: 3500, date: '2024-11-22', status: 'Pending', services: 'Surgery, ICU' },
    { id: 'INV-2024-003', patient: 'Mike Johnson', amount: 850, date: '2024-11-23', status: 'Paid', services: 'X-Ray, Consultation' },
    { id: 'INV-2024-004', patient: 'Sarah Williams', amount: 2100, date: '2024-11-24', status: 'Overdue', services: 'MRI, Consultation' },
    { id: 'INV-2024-005', patient: 'David Brown', amount: 450, date: '2024-11-25', status: 'Pending', services: 'Blood Test' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    patient: '', amount: '', services: '', status: 'Pending'
  });

  const handleAddInvoice = () => {
    if (formData.patient && formData.amount && formData.services) {
      const newInvoice = {
        id: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
        patient: formData.patient,
        amount: parseFloat(formData.amount),
        date: new Date().toISOString().split('T')[0],
        status: formData.status,
        services: formData.services
      };
      setInvoices([newInvoice, ...invoices]);
      setFormData({ patient: '', amount: '', services: '', status: 'Pending' });
      setShowAddModal(false);
    }
  };

  const updateStatus = (id, newStatus) => {
    setInvoices(invoices.map(inv => 
      inv.id === id ? { ...inv, status: newStatus } : inv
    ));
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Billing & Invoices</h1>
        <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
          ➕ Generate Invoice
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statInfo}>
            <h3>${totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <h3>${paidAmount.toLocaleString()}</h3>
            <p>Paid</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)' }}>
          <div className={styles.statIcon}>⏳</div>
          <div className={styles.statInfo}>
            <h3>${pendingAmount.toLocaleString()}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)' }}>
          <div className={styles.statIcon}>⚠️</div>
          <div className={styles.statInfo}>
            <h3>${overdueAmount.toLocaleString()}</h3>
            <p>Overdue</p>
          </div>
        </div>
      </div>

      <div className={styles.invoicesSection}>
        <h2>Recent Invoices</h2>
        <div className={styles.invoicesTable}>
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Patient</th>
                <th>Services</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className={styles.invoiceId}>{invoice.id}</td>
                  <td>{invoice.patient}</td>
                  <td>{invoice.services}</td>
                  <td className={styles.amount}>${invoice.amount.toLocaleString()}</td>
                  <td>{invoice.date}</td>
                  <td>
                    <span className={`${styles.status} ${styles[invoice.status.toLowerCase()]}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      {invoice.status !== 'Paid' && (
                        <button 
                          className={styles.markPaidBtn}
                          onClick={() => updateStatus(invoice.id, 'Paid')}
                        >
                          Mark Paid
                        </button>
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
            <h2>Generate New Invoice</h2>
            <input
              type="text"
              placeholder="Patient Name"
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Services Provided"
              value={formData.services}
              onChange={(e) => setFormData({ ...formData, services: e.target.value })}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className={styles.input}
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className={styles.input}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
            <div className={styles.modalActions}>
              <button className={styles.saveBtn} onClick={handleAddInvoice}>
                Generate Invoice
              </button>
              <button 
                className={styles.cancelBtn}
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({ patient: '', amount: '', services: '', status: 'Pending' });
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

export default BillingPage;
