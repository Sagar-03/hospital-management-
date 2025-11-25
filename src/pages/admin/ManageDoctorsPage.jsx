import { useState } from 'react';
import styles from './ManageDoctors.module.css';

const ManageDoctorsPage = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', schedule: 'Mon-Fri 9AM-5PM', status: 'Active', patients: 45 },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', schedule: 'Mon-Sat 10AM-6PM', status: 'Active', patients: 38 },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Pediatrics', schedule: 'Tue-Sat 8AM-4PM', status: 'Active', patients: 52 },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedics', schedule: 'Mon-Fri 11AM-7PM', status: 'On Leave', patients: 41 }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '', specialty: '', schedule: '', status: 'Active'
  });

  const handleAddDoctor = () => {
    if (formData.name && formData.specialty) {
      const newDoctor = {
        id: doctors.length + 1,
        ...formData,
        patients: 0
      };
      setDoctors([...doctors, newDoctor]);
      setFormData({ name: '', specialty: '', schedule: '', status: 'Active' });
      setShowAddModal(false);
    }
  };

  const handleUpdateDoctor = () => {
    setDoctors(doctors.map(doc => 
      doc.id === editingDoctor.id ? { ...doc, ...formData } : doc
    ));
    setEditingDoctor(null);
    setFormData({ name: '', specialty: '', schedule: '', status: 'Active' });
  };

  const handleDeleteDoctor = (id) => {
    if (confirm('Are you sure you want to remove this doctor?')) {
      setDoctors(doctors.filter(doc => doc.id !== id));
    }
  };

  const openEditModal = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      schedule: doctor.schedule,
      status: doctor.status
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage Doctors</h1>
        <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
          ➕ Add New Doctor
        </button>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Doctors:</span>
          <span className={styles.statValue}>{doctors.length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Active:</span>
          <span className={styles.statValue}>{doctors.filter(d => d.status === 'Active').length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>On Leave:</span>
          <span className={styles.statValue}>{doctors.filter(d => d.status === 'On Leave').length}</span>
        </div>
      </div>

      <div className={styles.doctorsGrid}>
        {doctors.map((doctor) => (
          <div key={doctor.id} className={styles.doctorCard}>
            <div className={styles.doctorHeader}>
              <div className={styles.doctorAvatar}>👨‍⚕️</div>
              <div className={styles.doctorInfo}>
                <h3>{doctor.name}</h3>
                <p className={styles.specialty}>{doctor.specialty}</p>
              </div>
              <span className={`${styles.status} ${styles[doctor.status.replace(' ', '')]}`}>
                {doctor.status}
              </span>
            </div>
            <div className={styles.doctorDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📅</span>
                <span>{doctor.schedule}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>👥</span>
                <span>{doctor.patients} Patients</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.editBtn} onClick={() => openEditModal(doctor)}>
                ✏️ Edit
              </button>
              <button className={styles.deleteBtn} onClick={() => handleDeleteDoctor(doctor.id)}>
                🗑️ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {(showAddModal || editingDoctor) && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h2>
            <input
              type="text"
              placeholder="Doctor Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Specialty"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Schedule (e.g., Mon-Fri 9AM-5PM)"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              className={styles.input}
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className={styles.input}
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
            <div className={styles.modalActions}>
              <button 
                className={styles.saveBtn}
                onClick={editingDoctor ? handleUpdateDoctor : handleAddDoctor}
              >
                {editingDoctor ? 'Update' : 'Add'} Doctor
              </button>
              <button 
                className={styles.cancelBtn}
                onClick={() => {
                  setShowAddModal(false);
                  setEditingDoctor(null);
                  setFormData({ name: '', specialty: '', schedule: '', status: 'Active' });
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

export default ManageDoctorsPage;
