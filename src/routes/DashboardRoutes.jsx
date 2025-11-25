import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import PatientsPage from '../pages/PatientsPage';
import PatientHistoryPage from '../pages/PatientHistoryPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import EPrescriptionPage from '../pages/EPrescriptionPage';
import ReportsPage from '../pages/ReportsPage';
import TeleconsultPage from '../pages/TeleconsultPage';
import AnalyticsPage from '../pages/AnalyticsPage';

function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="patients/:id" element={<PatientHistoryPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="prescriptions" element={<EPrescriptionPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="teleconsult" element={<TeleconsultPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>  
    </Routes>
  );
}

export default DashboardRoutes;
