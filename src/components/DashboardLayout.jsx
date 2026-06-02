import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const DashboardLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TopNav />
        <main className="content-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
