import { patientsData } from '../mockData';

function ReportsPage() {
  const allReports = patientsData
    .filter(patient => patient.reports && patient.reports.length > 0)
    .flatMap(patient =>
      patient.reports.map(report => ({
        ...report,
        patientName: patient.name,
        patientId: patient.id
      }))
    );

  return (
    <div className="page-container">
      <h1 className="page-title">Patient Reports & Lab Results</h1>

      <div className="card">
        <h2>All Reports</h2>
        {allReports.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Report Type</th>
                  <th>Date</th>
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                {allReports.map(report => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.patientId}</td>
                    <td>{report.patientName}</td>
                    <td>{report.type}</td>
                    <td>{report.date}</td>
                    <td>
                      <a href={report.filePath} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        View Report
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            No reports available at the moment.
          </p>
        )}
      </div>

      {allReports.length > 0 && (
        <div className="card">
          <h2>Report Preview</h2>
          {allReports.map(report => (
            <div key={report.id} style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#1565C0', marginBottom: '10px' }}>
                {report.type} - {report.patientName}
              </h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                Date: {report.date} | File: {report.fileName}
              </p>
              <img
                src={report.filePath}
                alt={report.type}
                className="report-image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportsPage;
