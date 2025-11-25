import { useState } from 'react';
import styles from './Appointment.module.css';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
    symptoms: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Appointment request submitted! Our AI will find the best time slot for you.');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.appointment} id="appointment">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <span className={styles.badge}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L10 6H15L11 9L13 14L8 11L3 14L5 9L1 6H6L8 1Z"/>
              </svg>
              AI-Powered Booking
            </span>
            <h2>Book Your Appointment</h2>
            <p className={styles.description}>
              Our intelligent scheduling system finds the perfect time slot based on 
              your preferences and doctor availability. Get instant confirmation!
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <div>
                  <h4>Instant Confirmation</h4>
                  <p>Get immediate booking confirmation via email & SMS</p>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <div>
                  <h4>Smart Reminders</h4>
                  <p>AI-powered reminders so you never miss an appointment</p>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <div>
                  <h4>Easy Rescheduling</h4>
                  <p>Change appointments with just one click, anytime</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.formSection}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formHeader}>
                <h3>Schedule Your Visit</h3>
                <p>Fill in your details and we'll take care of the rest</p>
              </div>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="John Doe" 
                    required 
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="john@example.com" 
                    required 
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="+1 (555) 000-0000" 
                    required 
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Preferred Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    required 
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Preferred Time</label>
                  <select name="time" required onChange={handleChange}>
                    <option value="">Select time</option>
                    <option value="morning">Morning (8AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 4PM)</option>
                    <option value="evening">Evening (4PM - 8PM)</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Select Doctor</label>
                  <select name="doctor" required onChange={handleChange}>
                    <option value="">Choose specialist</option>
                    <option value="cardiology">Dr. Sarah Johnson - Cardiologist</option>
                    <option value="neurology">Dr. Michael Chen - Neurologist</option>
                    <option value="pediatrics">Dr. Emily Rodriguez - Pediatrician</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Symptoms / Reason for Visit</label>
                <textarea 
                  name="symptoms" 
                  placeholder="Describe your symptoms or reason for consultation..." 
                  rows="4" 
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <button type="submit" className={styles.submitBtn}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16 6L8.5 13.5L4 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Confirm Appointment</span>
              </button>
              
              <p className={styles.disclaimer}>
                By booking, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
