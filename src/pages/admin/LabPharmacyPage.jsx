import { useState } from 'react';
import styles from './LabPharmacy.module.css';

const LabPharmacyPage = () => {
  const [activeTab, setActiveTab] = useState('lab');

  const [labTests, setLabTests] = useState([
    { id: 1, patient: 'John Doe', test: 'Complete Blood Count', status: 'Completed', date: '2024-11-25', result: 'Normal' },
    { id: 2, patient: 'Jane Smith', test: 'X-Ray Chest', status: 'In Progress', date: '2024-11-26', result: 'Pending' },
    { id: 3, patient: 'Mike Johnson', test: 'MRI Brain', status: 'Scheduled', date: '2024-11-27', result: 'Pending' },
    { id: 4, patient: 'Sarah Williams', test: 'Blood Sugar', status: 'Completed', date: '2024-11-24', result: 'High' }
  ]);

  const [medications, setMedications] = useState([
    { id: 1, name: 'Paracetamol 500mg', stock: 500, reorderLevel: 100, price: 5, category: 'Pain Relief' },
    { id: 2, name: 'Amoxicillin 250mg', stock: 45, reorderLevel: 100, price: 15, category: 'Antibiotic' },
    { id: 3, name: 'Ibuprofen 400mg', stock: 300, reorderLevel: 150, price: 8, category: 'Pain Relief' },
    { id: 4, name: 'Metformin 500mg', stock: 200, reorderLevel: 100, price: 12, category: 'Diabetes' },
    { id: 5, name: 'Lisinopril 10mg', stock: 80, reorderLevel: 100, price: 20, category: 'Blood Pressure' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});

  const openAddModal = (type) => {
    setModalType(type);
    setShowAddModal(true);
    if (type === 'lab') {
      setFormData({ patient: '', test: '', date: '', status: 'Scheduled' });
    } else {
      setFormData({ name: '', stock: '', reorderLevel: '', price: '', category: '' });
    }
  };

  const handleAdd = () => {
    if (modalType === 'lab') {
      const newTest = {
        id: labTests.length + 1,
        ...formData,
        result: 'Pending'
      };
      setLabTests([...labTests, newTest]);
    } else {
      const newMed = {
        id: medications.length + 1,
        name: formData.name,
        stock: parseInt(formData.stock),
        reorderLevel: parseInt(formData.reorderLevel),
        price: parseFloat(formData.price),
        category: formData.category
      };
      setMedications([...medications, newMed]);
    }
    setShowAddModal(false);
    setFormData({});
  };

  const lowStockMeds = medications.filter(med => med.stock < med.reorderLevel);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Lab & Pharmacy Management</h1>
        <button className={styles.addBtn} onClick={() => openAddModal(activeTab)}>
          ➕ Add {activeTab === 'lab' ? 'Lab Test' : 'Medication'}
        </button>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'lab' ? styles.active : ''}`}
          onClick={() => setActiveTab('lab')}
        >
          🔬 Laboratory
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'pharmacy' ? styles.active : ''}`}
          onClick={() => setActiveTab('pharmacy')}
        >
          💊 Pharmacy
        </button>
      </div>

      {activeTab === 'lab' && (
        <div className={styles.section}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className={styles.statIcon}>🔬</div>
              <div className={styles.statInfo}>
                <h3>{labTests.length}</h3>
                <p>Total Tests</p>
              </div>
            </div>
            <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statInfo}>
                <h3>{labTests.filter(t => t.status === 'Completed').length}</h3>
                <p>Completed</p>
              </div>
            </div>
            <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)' }}>
              <div className={styles.statIcon}>⏳</div>
              <div className={styles.statInfo}>
                <h3>{labTests.filter(t => t.status === 'In Progress').length}</h3>
                <p>In Progress</p>
              </div>
            </div>
          </div>

          <div className={styles.tableSection}>
            <h2>Lab Tests</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Test</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Result</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {labTests.map((test) => (
                  <tr key={test.id}>
                    <td>{test.patient}</td>
                    <td>{test.test}</td>
                    <td>{test.date}</td>
                    <td>
                      <span className={`${styles.status} ${styles[test.status.replace(' ', '').toLowerCase()]}`}>
                        {test.status}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.result} ${styles[test.result.toLowerCase()]}`}>
                        {test.result}
                      </span>
                    </td>
                    <td>
                      <button className={styles.viewBtn}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'pharmacy' && (
        <div className={styles.section}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className={styles.statIcon}>💊</div>
              <div className={styles.statInfo}>
                <h3>{medications.length}</h3>
                <p>Total Medications</p>
              </div>
            </div>
            <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)' }}>
              <div className={styles.statIcon}>⚠️</div>
              <div className={styles.statInfo}>
                <h3>{lowStockMeds.length}</h3>
                <p>Low Stock Items</p>
              </div>
            </div>
            <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              <div className={styles.statIcon}>📦</div>
              <div className={styles.statInfo}>
                <h3>{medications.reduce((sum, med) => sum + med.stock, 0)}</h3>
                <p>Total Stock</p>
              </div>
            </div>
          </div>

          {lowStockMeds.length > 0 && (
            <div className={styles.alertBox}>
              <h3>⚠️ Low Stock Alert</h3>
              <p>{lowStockMeds.length} medication(s) below reorder level</p>
            </div>
          )}

          <div className={styles.tableSection}>
            <h2>Pharmacy Inventory</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Reorder Level</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {medications.map((med) => (
                  <tr key={med.id}>
                    <td className={styles.medName}>{med.name}</td>
                    <td>{med.category}</td>
                    <td>{med.stock}</td>
                    <td>{med.reorderLevel}</td>
                    <td>${med.price}</td>
                    <td>
                      <span className={`${styles.stockStatus} ${med.stock < med.reorderLevel ? styles.low : styles.good}`}>
                        {med.stock < med.reorderLevel ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add {modalType === 'lab' ? 'Lab Test' : 'Medication'}</h2>
            {modalType === 'lab' ? (
              <>
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={formData.patient || ''}
                  onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Test Name"
                  value={formData.test || ''}
                  onChange={(e) => setFormData({ ...formData, test: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={styles.input}
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Medication Name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={formData.stock || ''}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="number"
                  placeholder="Reorder Level"
                  value={formData.reorderLevel || ''}
                  onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                  className={styles.input}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className={styles.input}
                />
              </>
            )}
            <div className={styles.modalActions}>
              <button className={styles.saveBtn} onClick={handleAdd}>
                Add
              </button>
              <button className={styles.cancelBtn} onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabPharmacyPage;
