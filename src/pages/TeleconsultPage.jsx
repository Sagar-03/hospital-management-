import { useState } from 'react';
import { patientsData } from '../mockData';

function TeleconsultPage() {
  const [activeCall, setActiveCall] = useState(null);

  const upcomingCalls = [
    { id: 1, patientId: 'P002', patientName: 'Anjali Verma', time: '2:30 PM', date: '2025-11-25' },
    { id: 2, patientId: 'P007', patientName: 'Aditya Joshi', time: '4:00 PM', date: '2025-11-25' },
    { id: 3, patientId: 'P013', patientName: 'Ishaan Malhotra', time: '11:00 AM', date: '2025-11-26' }
  ];

  const startCall = (call) => {
    setActiveCall(call);
  };

  const endCall = () => {
    alert('Call ended successfully!');
    setActiveCall(null);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Teleconsultation</h1>

      {!activeCall ? (
        <>
          <div className="card">
            <h2>Upcoming Video Consultations</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingCalls.map(call => (
                    <tr key={call.id}>
                      <td>{call.patientId}</td>
                      <td>{call.patientName}</td>
                      <td>{call.date}</td>
                      <td>{call.time}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => startCall(call)}
                        >
                          Start Call
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2>Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', background: '#E3F2FD', borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '40px', marginBottom: '10px' }}>🎥</h3>
                <h4 style={{ color: '#1565C0', marginBottom: '8px' }}>HD Video</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Crystal clear video quality</p>
              </div>
              <div style={{ padding: '20px', background: '#E3F2FD', borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '40px', marginBottom: '10px' }}>🎤</h3>
                <h4 style={{ color: '#1565C0', marginBottom: '8px' }}>Voice Call</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>High quality audio</p>
              </div>
              <div style={{ padding: '20px', background: '#E3F2FD', borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '40px', marginBottom: '10px' }}>💬</h3>
                <h4 style={{ color: '#1565C0', marginBottom: '8px' }}>Chat</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Real-time messaging</p>
              </div>
              <div style={{ padding: '20px', background: '#E3F2FD', borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '40px', marginBottom: '10px' }}>📄</h3>
                <h4 style={{ color: '#1565C0', marginBottom: '8px' }}>Share Files</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Exchange reports instantly</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="card">
          <h2>Active Call with {activeCall.patientName}</h2>
          <div style={{
            background: '#1E88E5',
            padding: '60px',
            borderRadius: '10px',
            textAlign: 'center',
            color: 'white',
            marginTop: '20px'
          }}>
            <h3 style={{ fontSize: '48px', marginBottom: '20px' }}>📹</h3>
            <h2 style={{ marginBottom: '10px' }}>Video Call in Progress</h2>
            <p style={{ fontSize: '18px', marginBottom: '30px' }}>
              Consulting with {activeCall.patientName}
            </p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '40px' }}>
              Duration: 00:05:23
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <button className="btn" style={{ background: '#43A047' }}>
                🎤 Mute
              </button>
              <button className="btn" style={{ background: '#43A047' }}>
                🎥 Video Off
              </button>
              <button className="btn" style={{ background: '#43A047' }}>
                💬 Chat
              </button>
              <button className="btn btn-danger" onClick={endCall}>
                📞 End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeleconsultPage;
