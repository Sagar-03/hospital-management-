import { useState } from 'react';
import { aiReportAnalysis, aiDietRecommendations } from '../../mockData';
import styles from './AIHealth.module.css';

function AIHealthPage() {
  const [selectedReport, setSelectedReport] = useState('bloodTest');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setAnalyzing(false);
        setShowResults(true);
      }, 2000);
    }
  };

  const currentAnalysis = aiReportAnalysis[selectedReport];

  return (
    <div className={styles.aiHealthPage}>
      <div className={styles.header}>
        <h2>🤖 AI Health Assistant</h2>
        <p>Upload medical reports for instant AI-powered analysis</p>
      </div>

      <div className={styles.uploadSection}>
        <div className={styles.uploadCard}>
          <div className={styles.uploadIcon}>📄</div>
          <h3>Upload Medical Report</h3>
          <p>Supported: Blood Test, X-Ray, ECG, MRI, CT Scan</p>
          <label className={styles.uploadBtn}>
            <input 
              type="file" 
              accept=".pdf,.jpg,.jpeg,.png" 
              onChange={handleFileUpload}
              style={{display: 'none'}}
            />
            📤 Choose File
          </label>
          {uploadedFile && (
            <div className={styles.uploadedFile}>
              ✓ {uploadedFile.name}
            </div>
          )}
        </div>

        {analyzing && (
          <div className={styles.analyzing}>
            <div className={styles.spinner}></div>
            <h3>Analyzing Report...</h3>
            <p>AI is processing your medical data</p>
          </div>
        )}
      </div>

      <div className={styles.reportTabs}>
        <button 
          className={selectedReport === 'bloodTest' ? styles.active : ''}
          onClick={() => setSelectedReport('bloodTest')}
        >
          🩸 Blood Test Analysis
        </button>
        <button 
          className={selectedReport === 'xray' ? styles.active : ''}
          onClick={() => setSelectedReport('xray')}
        >
          🦴 X-Ray Analysis
        </button>
      </div>

      {showResults && currentAnalysis && (
        <div className={styles.analysisResults}>
          <div className={styles.reportInfo}>
            <h3>{currentAnalysis.reportType}</h3>
            <p>Analyzed on: {currentAnalysis.analysisDate}</p>
          </div>

          {selectedReport === 'bloodTest' && (
            <div className={styles.parametersTable}>
              <h4>📊 Test Parameters</h4>
              <table>
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Normal Range</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAnalysis.parameters.map((param, idx) => (
                    <tr key={idx}>
                      <td>{param.name}</td>
                      <td><strong>{param.value} {param.unit}</strong></td>
                      <td>{param.normalRange} {param.unit}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${
                          param.status === 'Normal' ? styles.normal : 
                          param.status.includes('High') ? styles.high : styles.borderline
                        }`}>
                          {param.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedReport === 'xray' && (
            <div className={styles.findingsTable}>
              <h4>🔍 X-Ray Findings</h4>
              <div className={styles.findingsList}>
                {currentAnalysis.findings.map((finding, idx) => (
                  <div key={idx} className={styles.findingCard}>
                    <h5>{finding.area}</h5>
                    <p>{finding.observation}</p>
                    <span className={`${styles.statusBadge} ${styles.normal}`}>
                      {finding.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.aiDiagnosis}>
            <div className={styles.diagnosisHeader}>
              <h3>🤖 AI Diagnosis</h3>
              <span className={`${styles.severityBadge} ${
                currentAnalysis.aiDiagnosis.severity === 'None' ? styles.none :
                currentAnalysis.aiDiagnosis.severity === 'Moderate' ? styles.moderate : styles.high
              }`}>
                {currentAnalysis.aiDiagnosis.severity}
              </span>
            </div>
            
            <div className={styles.condition}>
              <h4>{currentAnalysis.aiDiagnosis.condition}</h4>
              <p>{currentAnalysis.aiDiagnosis.description}</p>
            </div>

            {currentAnalysis.aiDiagnosis.riskFactors.length > 0 && (
              <div className={styles.section}>
                <h4>⚠️ Risk Factors</h4>
                <ul>
                  {currentAnalysis.aiDiagnosis.riskFactors.map((risk, idx) => (
                    <li key={idx}>{risk}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.section}>
              <h4>💡 Recommendations</h4>
              <ul>
                {currentAnalysis.aiDiagnosis.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h4>🛡️ Precautions</h4>
              <ul>
                {currentAnalysis.aiDiagnosis.precautions.map((prec, idx) => (
                  <li key={idx}>{prec}</li>
                ))}
              </ul>
            </div>

            <div className={styles.followUp}>
              <h4>📅 Follow-up</h4>
              <p>{currentAnalysis.aiDiagnosis.followUp}</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.dietSection}>
        <h3>🥗 AI Diet & Lifestyle Recommendations</h3>
        <div className={styles.dietCard}>
          <div className={styles.dietHeader}>
            <h4>Based on: {aiDietRecommendations.condition}</h4>
            <span className={styles.calories}>Target: {aiDietRecommendations.calories}</span>
          </div>
          
          <div className={styles.dietGrid}>
            {aiDietRecommendations.recommendations.map((rec, idx) => (
              <div key={idx} className={styles.dietCategory}>
                <h5>
                  {rec.category === 'Foods to Include' && '✅'}
                  {rec.category === 'Foods to Avoid' && '❌'}
                  {rec.category === 'Lifestyle Tips' && '💪'}
                  {' '}{rec.category}
                </h5>
                <ul>
                  {rec.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.disclaimer}>
        <p>⚠️ <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. Always consult with your healthcare provider for accurate diagnosis and treatment.</p>
      </div>
    </div>
  );
}

export default AIHealthPage;
