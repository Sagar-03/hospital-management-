import { useState, useEffect } from 'react';
import { currentPatient } from '../../mockData';
import styles from './EmergencySOS.module.css';

function EmergencySOSPage() {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [location, setLocation] = useState('Fetching location...');
  const [emergencyActivated, setEmergencyActivated] = useState(false);

  useEffect(() => {
    // Simulate getting location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        () => {
          setLocation('Location unavailable');
        }
      );
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isPressed && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (isPressed && countdown === 0) {
      handleEmergencyCall();
    }
    return () => clearTimeout(timer);
  }, [isPressed, countdown]);

  const handleMouseDown = () => {
    setIsPressed(true);
    setCountdown(3);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setCountdown(3);
  };

  const handleEmergencyCall = () => {
    setEmergencyActivated(true);
    setIsPressed(false);
    
    // Simulate emergency alert
    alert(`🚨 EMERGENCY ALERT ACTIVATED!\n\nYour location and medical information have been shared with:\n- Emergency Services (108)\n- Hospital Emergency\n- ${currentPatient.emergencyContact.name} (${currentPatient.emergencyContact.relation})\n\nLocation: ${location}\nHelp is on the way!`);
    
    setTimeout(() => {
      setEmergencyActivated(false);
      setCountdown(3);
    }, 5000);
  };

  const handleQuickCall = (name, number) => {
    alert(`Calling ${name} at ${number}...`);
    // In a real app, this would initiate a phone call
  };

  return (
    <div className={styles.emergencyPage}>
      <div className={styles.emergencyHeader}>
        <h2>🚨 Emergency SOS</h2>
        <p>Quick access to emergency services</p>
      </div>

      {emergencyActivated && (
        <div className={styles.emergencyAlert}>
          <div className={styles.alertIcon}>🚨</div>
          <h3>EMERGENCY ACTIVATED!</h3>
          <p>Help is on the way. Stay calm.</p>
        </div>
      )}

      <div 
        className={`${styles.sosButton} ${isPressed ? styles.pressed : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <div className={styles.sosIcon}>🚨</div>
        {isPressed ? (
          <>
            <h3>ACTIVATING...</h3>
            <p className={styles.countdownText}>{countdown}</p>
          </>
        ) : (
          <>
            <h3>PRESS & HOLD</h3>
            <p>Hold for 3 seconds to activate</p>
          </>
        )}
      </div>

      <div className={styles.emergencyInfo}>
        <h3>📍 Your Location</h3>
        <p className={styles.locationText}>{location}</p>
        <p className={styles.infoSubtext}>Emergency services will receive your current location and medical information</p>
      </div>

      <div className={styles.medicalInfo}>
        <h3>🏥 Your Medical Information</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span>Name:</span>
            <strong>{currentPatient.name}</strong>
          </div>
          <div className={styles.infoItem}>
            <span>Blood Group:</span>
            <strong>{currentPatient.bloodGroup}</strong>
          </div>
          <div className={styles.infoItem}>
            <span>Age:</span>
            <strong>{currentPatient.age} years</strong>
          </div>
          <div className={styles.infoItem}>
            <span>Medical ID:</span>
            <strong>{currentPatient.medicalId}</strong>
          </div>
        </div>
      </div>

      <div className={styles.emergencyContacts}>
        <h3>📞 Emergency Contacts</h3>
        <div className={styles.contactsList}>
          <div className={styles.contactCard}>
            <span className={styles.contactIcon}>🚑</span>
            <div>
              <h4>Ambulance</h4>
              <p className={styles.number}>108</p>
            </div>
            <button 
              className={styles.callBtn}
              onClick={() => handleQuickCall('Ambulance', '108')}
            >
              Call
            </button>
          </div>
          <div className={styles.contactCard}>
            <span className={styles.contactIcon}>👨‍⚕️</span>
            <div>
              <h4>Hospital Emergency</h4>
              <p className={styles.number}>+91-9876543210</p>
            </div>
            <button 
              className={styles.callBtn}
              onClick={() => handleQuickCall('Hospital Emergency', '+91-9876543210')}
            >
              Call
            </button>
          </div>
          <div className={styles.contactCard}>
            <span className={styles.contactIcon}>👤</span>
            <div>
              <h4>{currentPatient.emergencyContact.name}</h4>
              <p className={styles.number}>{currentPatient.emergencyContact.phone}</p>
            </div>
            <button 
              className={styles.callBtn}
              onClick={() => handleQuickCall(currentPatient.emergencyContact.name, currentPatient.emergencyContact.phone)}
            >
              Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencySOSPage;
