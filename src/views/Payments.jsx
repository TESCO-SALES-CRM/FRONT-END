import React from 'react';
import { IndianRupee } from 'lucide-react';

const Payments = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
      <div style={{ backgroundColor: '#EEF2FF', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
        <IndianRupee size={48} color="var(--primary-color)" />
      </div>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1rem' }}>Payment Collection</h2>
      <div style={{ padding: '0.5rem 1.25rem', backgroundColor: '#FEF3C7', color: '#92400E', borderRadius: '9999px', fontWeight: '700', fontSize: '0.875rem', letterSpacing: '0.5px' }}>
        COMING SOON
      </div>
      <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', maxWidth: '450px', lineHeight: '1.6', fontSize: '1.1rem' }}>
        We are actively working on building the Payment Collection module. It will be available in a future update!
      </p>
    </div>
  );
};

export default Payments;
