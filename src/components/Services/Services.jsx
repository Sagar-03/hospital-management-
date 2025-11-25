import styles from './Services.module.css';

const Services = () => {
  const services = [
    { 
      icon: '🤖', 
      title: 'AI Health Assistant', 
      description: 'Get instant answers to health questions with our advanced AI chatbot trained on medical knowledge'
    },
    { 
      icon: '📊', 
      title: 'Smart Analytics', 
      description: 'Track your health metrics with AI-powered insights and predictive health analytics'
    },
    { 
      icon: '💊', 
      title: 'Medication Management', 
      description: 'Never miss a dose with intelligent reminders and drug interaction warnings'
    },
    { 
      icon: '🔬', 
      title: 'Lab Results Portal', 
      description: 'Access test results instantly with AI-generated explanations in simple terms'
    },
    { 
      icon: '📱', 
      title: 'Telemedicine', 
      description: 'Connect with doctors virtually through secure video consultations anytime'
    },
    { 
      icon: '🎯', 
      title: 'Personalized Care Plans', 
      description: 'Receive customized treatment plans based on your unique health profile'
    }
  ];

  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Our Services</span>
          <h2>AI-Powered Healthcare Solutions</h2>
          <p>
            Leveraging cutting-edge artificial intelligence to provide you with 
            the most advanced and personalized healthcare experience
          </p>
        </div>
        
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#" className={styles.learnMore}>
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
