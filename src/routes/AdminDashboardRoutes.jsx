import { Routes, Route } from 'react-router-dom';
import AdminDashboardLayout from '../components/AdminDashboardLayout';
import AdminHomePage from '../pages/admin/AdminHomePage';
import ManageDoctorsPage from '../pages/admin/ManageDoctorsPage';
import ManagePatientsPage from '../pages/admin/ManagePatientsPage';
import HospitalResourcesPage from '../pages/admin/HospitalResourcesPage';
import BillingPage from '../pages/admin/BillingPage';
import LabPharmacyPage from '../pages/admin/LabPharmacyPage';
import InsurancePage from '../pages/admin/InsurancePage';
import AppointmentsPage from '../pages/admin/AppointmentsPage';
import AnalyticsPage from '../pages/admin/AnalyticsPage';
import AdminProfilePage from '../pages/admin/AdminProfilePage';

function AdminDashboardRoutes() {
  return (
    <Routes>
      <Route element={<AdminDashboardLayout />}>
        <Route path="dashboard" element={<AdminHomePage />} />
        <Route path="doctors" element={<ManageDoctorsPage />} />
        <Route path="patients" element={<ManagePatientsPage />} />
        <Route path="resources" element={<HospitalResourcesPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="lab-pharmacy" element={<LabPharmacyPage />} />
        <Route path="insurance" element={<InsurancePage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
      </Route>  
    </Routes>
  );
}

export default AdminDashboardRoutes;
