import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthModal.module.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!formData.name) {
        setError('Please enter your name');
        return;
      }
    }

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Role-based routing
    const email = formData.email.toLowerCase();
    
    if (email === 'patient@metaai.com') {
      navigate('/patient-dashboard');
      onClose();
    } else if (email === 'doctor@metaai.com') {
      navigate('/dashboard');
      onClose();
    } else if (email === 'admin@metaai.com') {
      navigate('/admin/dashboard');
      onClose();
    } else {
      setError('Invalid credentials. Use patient@metaai.com, doctor@metaai.com, or admin@metaai.com');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.modalHeader}>
          <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isSignUp ? 'Sign up to get started' : 'Sign in to your account'}</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {isSignUp && (
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={styles.input}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={styles.input}
            />
          </div>

          {isSignUp && (
            <div className={styles.formGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={styles.input}
              />
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitBtn}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>

          {/* <div className={styles.demoCredentials}>
            <p className={styles.demoTitle}>Demo Credentials:</p>
            <div className={styles.demoList}>
              <span>👤 Patient: patient@metaai.com</span>
              <span>👨‍⚕️ Doctor: doctor@metaai.com</span>
              <span>👔 Admin: admin@metaai.com</span>
            </div>
          </div> */}
        </form>

        <div className={styles.switchMode}>
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
