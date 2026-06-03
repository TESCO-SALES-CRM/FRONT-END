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
<<<<<<< HEAD
        <main className="content-scroll">
          <Outlet />
        </main>
=======
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <main className="content-scroll">
            <Outlet />
          </main>
        </div>
>>>>>>> 7de2f04a0609998f838860361518918c881edffb
      </div>
    </div>
  );
};

export default DashboardLayout;
