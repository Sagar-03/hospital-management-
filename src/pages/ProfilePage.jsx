import { doctorData } from '../mockData';

function ProfilePage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Doctor Profile</h1>

      <div className="card">
        <h2>Personal Information</h2>
        <div className="profile-info">
          <div className="info-item">
            <label>Full Name</label>
            <p>{doctorData.name}</p>
          </div>
          <div className="info-item">
            <label>Specialization</label>
            <p>{doctorData.specialization}</p>
          </div>
          <div className="info-item">
            <label>Experience</label>
            <p>{doctorData.experience} Years</p>
          </div>
          <div className="info-item">
            <label>Phone Number</label>
            <p>{doctorData.phone}</p>
          </div>
          <div className="info-item">
            <label>Email Address</label>
            <p>{doctorData.email}</p>
          </div>
          <div className="info-item">
            <label>Clinic Timings</label>
            <p>{doctorData.timings}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Professional Details</h2>
        <div className="profile-info">
          <div className="info-item">
            <label>Department</label>
            <p>Cardiology</p>
          </div>
          <div className="info-item">
            <label>Hospital</label>
            <p>City Medical Center</p>
          </div>
          <div className="info-item">
            <label>License Number</label>
            <p>MED-2015-12345</p>
          </div>
          <div className="info-item">
            <label>Languages Spoken</label>
            <p>English, Hindi, Gujarati</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
