import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './views/DashboardHome';
import LeadManagement from './views/LeadManagement';
import Appointments from './views/Appointments';
import Quotations from './views/Quotations';
import ProjectFiling from './views/ProjectFiling';
import Payments from './views/Payments';
import Reports from './views/Reports';
import Notifications from './views/Notifications';
import Settings from './views/Settings';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="leads" element={<LeadManagement />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="projects" element={<ProjectFiling />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
