import styles from './Doctors.module.css';

const Doctors = () => {
  const doctors = [
    { 
      name: 'Dr. Sarah Johnson', 
      specialty: 'Cardiologist', 
      rating: 4.9,
      reviews: 245,
      patients: '2.5K',
      experience: '15 Years',
      avatar: '👩‍⚕️'
    },
    { 
      name: 'Dr. Michael Chen', 
      specialty: 'Neurologist', 
      rating: 4.8,
      reviews: 198,
      patients: '1.8K',
      experience: '12 Years',
      avatar: '👨‍⚕️'
    },
    { 
      name: 'Dr. Emily Rodriguez', 
      specialty: 'Pediatrician', 
      rating: 5.0,
      reviews: 312,
      patients: '3.2K',
      experience: '18 Years',
      avatar: '👩‍⚕️'
    }
  ];

  return (
    <section className={styles.doctors} id="doctors">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Expert Care</span>
          <h2>Meet Our Specialist Doctors</h2>
          <p>
            Our team of highly qualified medical professionals is dedicated to 
            providing you with exceptional care and expertise
          </p>
        </div>
        
        <div className={styles.grid}>
          {doctors.map((doctor, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <span className={styles.avatar}>{doctor.avatar}</span>
                <div className={styles.badge}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z"/>
                  </svg>
                  AI Verified
                </div>
              </div>
              
              <div className={styles.info}>
                <div className={styles.rating}>
                  <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
                  <span className={styles.ratingText}>{doctor.rating} ({doctor.reviews})</span>
                </div>
                
                <h3>{doctor.name}</h3>
                <p className={styles.specialty}>{doctor.specialty}</p>
                
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{doctor.patients}</span>
                    <span className={styles.statLabel}>Patients</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{doctor.experience}</span>
                    <span className={styles.statLabel}>Experience</span>
                  </div>
                </div>
                
                <div className={styles.actions}>
                  <button className={styles.bookBtn}>Book Now</button>
                  <button className={styles.profileBtn}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 2C4.7 2 2 4.7 2 8C2 11.3 4.7 14 8 14C11.3 14 14 11.3 14 8C14 4.7 11.3 2 8 2ZM8 5C8.8 5 9.5 5.7 9.5 6.5C9.5 7.3 8.8 8 8 8C7.2 8 6.5 7.3 6.5 6.5C6.5 5.7 7.2 5 8 5ZM8 12.2C6.5 12.2 5.2 11.4 4.5 10.2C4.5 9 6.5 8.3 8 8.3C9.5 8.3 11.5 9 11.5 10.2C10.8 11.4 9.5 12.2 8 12.2Z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
