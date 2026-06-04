import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { useToast } from './Toast';
import { useLocation } from 'react-router-dom';

const TopNav = () => {
  const location = useLocation();
  const addToast = useToast();
  
  const path = location.pathname.substring(1).replace('-', ' ');
  const title = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <div className="glass-panel" style={{
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      borderBottom: '1px solid var(--border-color)'
    }}>
      {/* Left Section */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pages / {title}</div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>{title}</h1>
      </div>

      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }} onClick={() => addToast('Opening Notification Center')}>
          <Bell size={20} />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: 'var(--danger-color)', borderRadius: '50%' }}></span>
        </button>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => addToast('Opening User Profile')}>
          <User size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopNav;
