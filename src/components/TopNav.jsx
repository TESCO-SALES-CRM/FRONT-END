<<<<<<< HEAD
import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
=======
import React, { useState } from 'react';
import { Search, Bell, Settings, Plus, User } from 'lucide-react';
>>>>>>> 7de2f04a0609998f838860361518918c881edffb
import { useToast } from './Toast';
import { useLocation } from 'react-router-dom';

const TopNav = () => {
  const location = useLocation();
  const addToast = useToast();
<<<<<<< HEAD
=======
  const [searchValue, setSearchValue] = useState('');
>>>>>>> 7de2f04a0609998f838860361518918c881edffb
  
  const path = location.pathname.substring(1).replace('-', ' ');
  const title = path.charAt(0).toUpperCase() + path.slice(1);

<<<<<<< HEAD
=======
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim() !== '') {
      addToast(`Searching global records for "${searchValue}"...`, 'success');
      setSearchValue('');
    }
  };

>>>>>>> 7de2f04a0609998f838860361518918c881edffb
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

<<<<<<< HEAD
      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
=======
      {/* Center Section */}
      <div style={{ flex: 1, maxWidth: '400px', margin: '0 2rem' }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search leads, projects, invoices..." 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              width: '100%',
              padding: '0.5rem 1rem 0.5rem 2.5rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--background-light)',
              outline: 'none',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px' }} onClick={() => addToast('Quick Add modal opening...')}>
          <Plus size={16} /> Quick Add
        </button>
>>>>>>> 7de2f04a0609998f838860361518918c881edffb

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', position: 'relative' }} onClick={() => addToast('Opening Notification Center')}>
            <Bell size={20} />
            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: 'var(--danger-color)', borderRadius: '50%' }}></span>
          </button>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => addToast('Opening User Profile')}>
            <User size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
