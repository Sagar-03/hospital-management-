import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './routes/LandingRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import NotFound from './pages/NotFound';
import './index.css';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
