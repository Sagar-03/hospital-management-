import { useState, useEffect } from 'react';
import { patientAppointments as initialAppointments } from '../../mockData';
import styles from './PatientAppointments.module.css';

const doctors = [
  { name: 'Dr. Aarav Mehta', specialization: 'Cardiologist', location: 'Cardiology Dept, 3rd Floor' },
  { name: 'Dr. Neha Gupta', specialization: 'General Physician', location: 'OPD Block A' },
  { name: 'Dr. Priya Singh', specialization: 'Radiologist', location: 'Radiology Dept, 2nd Floor' },
  { name: 'Dr. Rajesh Kumar', specialization: 'Orthopedic', location: 'Orthopedic Wing, 4th Floor' },
  { name: 'Dr. Anita Desai', specialization: 'Dermatologist', location: 'Skin Care Center, 1st Floor' }
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
  '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'
];

const appointmentTypes = ['Consultation', 'Follow-up', 'Check-up', 'Emergency'];

function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    type: 'Consultation',
    reason: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Load appointments from localStorage or use initial data
    const savedAppointments = localStorage.getItem('patientAppointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      setAppointments(initialAppointments);
      localStorage.setItem('patientAppointments', JSON.stringify(initialAppointments));
    }
  }, []);

  const saveAppointments = (updatedAppointments) => {
    setAppointments(updatedAppointments);
    localStorage.setItem('patientAppointments', JSON.stringify(updatedAppointments));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    
    if (!formData.doctor || !formData.date || !formData.time || !formData.reason) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedDoctor = doctors.find(d => d.name === formData.doctor);
    const newAppointment = {
      id: `APT${Date.now()}`,
      doctor: formData.doctor,
      specialization: selectedDoctor.specialization,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: 'Pending',
      location: selectedDoctor.location,
      reason: formData.reason
    };

    const updatedAppointments = [...appointments, newAppointment];
    saveAppointments(updatedAppointments);
    
    setSuccessMessage('✓ Appointment booked successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    
    setShowBooking(false);
    setFormData({ doctor: '', date: '', time: '', type: 'Consultation', reason: '' });
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      doctor: appointment.doctor,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      reason: appointment.reason || ''
    });
    setShowReschedule(true);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time) {
      alert('Please select new date and time');
      return;
    }

    const updatedAppointments = appointments.map(apt => 
      apt.id === selectedAppointment.id 
        ? { ...apt, date: formData.date, time: formData.time, status: 'Pending' }
        : apt
    );
    
    saveAppointments(updatedAppointments);
    
    setSuccessMessage('✓ Appointment rescheduled successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    
    setShowReschedule(false);
    setSelectedAppointment(null);
    setFormData({ doctor: '', date: '', time: '', type: 'Consultation', reason: '' });
  };

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const updatedAppointments = appointments.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'Cancelled' }
          : apt
      );
      
      saveAppointments(updatedAppointments);
      
      setSuccessMessage('✓ Appointment cancelled successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleConfirmAppointment = (appointmentId) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'Confirmed' }
        : apt
    );
    
    saveAppointments(updatedAppointments);
    
    setSuccessMessage('✓ Appointment confirmed!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getFilteredAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (activeTab) {
      case 'upcoming':
        return appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate >= today && apt.status !== 'Cancelled' && apt.status !== 'Completed';
        });
      case 'past':
        return appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate < today || apt.status === 'Completed';
        });
      case 'cancelled':
        return appointments.filter(apt => apt.status === 'Cancelled');
      default:
        return appointments;
    }
  };

  const filteredAppointments = getFilteredAppointments();

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.appointmentsPage}>
      <div className={styles.header}>
        <h2>📅 My Appointments</h2>
        <button className={styles.bookBtn} onClick={() => setShowBooking(true)}>
          + Book New Appointment
        </button>
      </div>

      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      <div className={styles.tabs}>
        <button 
          className={activeTab === 'upcoming' ? styles.active : ''}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming ({appointments.filter(apt => {
            const aptDate = new Date(apt.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return aptDate >= today && apt.status !== 'Cancelled' && apt.status !== 'Completed';
          }).length})
        </button>
        <button 
          className={activeTab === 'past' ? styles.active : ''}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
        <button 
          className={activeTab === 'cancelled' ? styles.active : ''}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>

      <div className={styles.appointmentsList}>
        {filteredAppointments.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📅</div>
            <h3>No appointments found</h3>
            <p>Book your first appointment to get started</p>
          </div>
        ) : (
          filteredAppointments.map(apt => (
            <div key={apt.id} className={styles.appointmentCard}>
              <div className={styles.aptDate}>
                <span className={styles.day}>{new Date(apt.date).getDate()}</span>
                <span className={styles.month}>
                  {new Date(apt.date).toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </div>
              <div className={styles.aptDetails}>
                <h3>{apt.doctor}</h3>
                <p>{apt.specialization}</p>
                <div className={styles.aptMeta}>
                  <span>⏰ {apt.time}</span>
                  <span>📍 {apt.location}</span>
                  <span>🏥 {apt.type}</span>
                </div>
                {apt.reason && (
                  <p className={styles.reason}>Reason: {apt.reason}</p>
                )}
              </div>
              <div className={styles.aptActions}>
                <span className={`${styles.status} ${styles[apt.status.toLowerCase()]}`}>
                  {apt.status}
                </span>
                {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                  <div className={styles.buttons}>
                    {apt.status === 'Pending' && (
                      <button 
                        className={styles.confirmBtn}
                        onClick={() => handleConfirmAppointment(apt.id)}
                      >
                        ✓ Confirm
                      </button>
                    )}
                    <button 
                      className={styles.rescheduleBtn}
                      onClick={() => handleReschedule(apt)}
                    >
                      🔄 Reschedule
                    </button>
                    <button 
                      className={styles.cancelBtn}
                      onClick={() => handleCancelAppointment(apt.id)}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Book Appointment Modal */}
      {showBooking && (
        <div className={styles.modal} onClick={() => setShowBooking(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Book New Appointment</h3>
              <button className={styles.closeBtn} onClick={() => setShowBooking(false)}>✕</button>
            </div>
            <form className={styles.bookingForm} onSubmit={handleBookAppointment}>
              <div className={styles.formGroup}>
                <label>Select Doctor *</label>
                <select 
                  name="doctor" 
                  value={formData.doctor} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose a doctor...</option>
                  {doctors.map((doc, idx) => (
                    <option key={idx} value={doc.name}>
                      {doc.name} - {doc.specialization}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Date *</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={today}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Time Slot *</label>
                <select 
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose a time...</option>
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Appointment Type</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  {appointmentTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Reason for Visit *</label>
                <textarea 
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows="3" 
                  placeholder="Describe your symptoms or reason for visit..."
                  required
                ></textarea>
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={() => setShowBooking(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Book Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showReschedule && (
        <div className={styles.modal} onClick={() => setShowReschedule(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Reschedule Appointment</h3>
              <button className={styles.closeBtn} onClick={() => setShowReschedule(false)}>✕</button>
            </div>
            <form className={styles.bookingForm} onSubmit={handleRescheduleSubmit}>
              <div className={styles.currentInfo}>
                <h4>Current Appointment:</h4>
                <p><strong>{selectedAppointment?.doctor}</strong></p>
                <p>{selectedAppointment?.date} at {selectedAppointment?.time}</p>
              </div>
              <div className={styles.formGroup}>
                <label>New Date *</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={today}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>New Time Slot *</label>
                <select 
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose a time...</option>
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={() => setShowReschedule(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Reschedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientAppointmentsPage;
