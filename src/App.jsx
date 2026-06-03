import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './views/DashboardHome';
import LeadManagement from './views/LeadManagement';
<<<<<<< HEAD
import Appointments from './views/Appointments';
=======
import CallingWorkflow from './views/CallingWorkflow';
import Appointments from './views/Appointments';
import AssignedLeads from './views/AssignedLeads';
>>>>>>> 7de2f04a0609998f838860361518918c881edffb
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
<<<<<<< HEAD
          <Route path="appointments" element={<Appointments />} />
=======
          <Route path="calling" element={<CallingWorkflow />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="assigned-leads" element={<AssignedLeads />} />
>>>>>>> 7de2f04a0609998f838860361518918c881edffb
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
