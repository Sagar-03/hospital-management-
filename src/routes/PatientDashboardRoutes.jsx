import { Routes, Route } from 'react-router-dom';
import PatientDashboardLayout from '../components/PatientDashboardLayout';
import PatientHomePage from '../pages/patient/PatientHomePage';
import PatientProfilePage from '../pages/patient/PatientProfilePage';
import MedicalRecordsPage from '../pages/patient/MedicalRecordsPage';
import PatientAppointmentsPage from '../pages/patient/PatientAppointmentsPage';
import PrescriptionsPage from '../pages/patient/PrescriptionsPage';
import AIHealthPage from '../pages/patient/AIHealthPage';
import WearablesPage from '../pages/patient/WearablesPage';
import FamilyHealthPage from '../pages/patient/FamilyHealthPage';
import BillingPage from '../pages/patient/BillingPage';
import TeleconsultPage from '../pages/patient/TeleconsultPage';
import EmergencySOSPage from '../pages/patient/EmergencySOSPage';

function PatientDashboardRoutes() {
  return (
    <Routes>
      <Route element={<PatientDashboardLayout />}>
        <Route index element={<PatientHomePage />} />
        <Route path="profile" element={<PatientProfilePage />} />
        <Route path="medical-records" element={<MedicalRecordsPage />} />
        <Route path="appointments" element={<PatientAppointmentsPage />} />
        <Route path="prescriptions" element={<PrescriptionsPage />} />
        <Route path="ai-health" element={<AIHealthPage />} />
        <Route path="wearables" element={<WearablesPage />} />
        <Route path="family" element={<FamilyHealthPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="teleconsult" element={<TeleconsultPage />} />
        <Route path="emergency" element={<EmergencySOSPage />} />
      </Route>  
    </Routes>
  );
}

export default PatientDashboardRoutes;
