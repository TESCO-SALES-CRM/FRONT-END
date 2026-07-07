import React, { useState } from 'react';
import { Handshake, Target, Clock, MessageSquare, Eye, AlertCircle, ArrowRight, X } from 'lucide-react';

const initialNegotiationsData = [
  { id: 'LD-1035', client: 'Wayne Enterprises', project: 'PEB Warehouse Structure', quoted: '₹30,000', offer: '₹27,000', gap: '₹3,000', probability: 50, status: 'Active', remark: '' },
  { id: 'LD-1042', client: 'Stark Industries', project: 'Tensile Fabric Walkway', quoted: '₹12,50,000', offer: '₹12,00,000', gap: '₹50,000', probability: 80, status: 'Pending Client', remark: '' },
  { id: 'LD-1055', client: 'Oscorp', project: 'Cold Storage PEB', quoted: '₹85,00,000', offer: '₹75,00,000', gap: '₹10,00,000', probability: 30, status: 'Active', remark: '' },
  { id: 'LD-1061', client: 'Daily Planet', project: 'Office Mezzanine Floor', quoted: '₹4,20,000', offer: '₹4,00,000', gap: '₹20,000', probability: 90, status: 'Counter Sent', remark: '' },
  { id: 'LD-1070', client: 'LexCorp', project: 'Dyeing Unit Shed', quoted: '₹55,00,000', offer: '₹45,00,000', gap: '₹10,00,000', probability: 40, status: 'Active', remark: '' },
];

const getStatusStyle = (status) => {
  const base = {
    padding: '0.35rem 1.6rem 0.35rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'all 0.2s ease',
  };

  if (status === 'Active') {
    return { ...base, backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE' };
  } else if (status === 'Pending Client') {
    return { ...base, backgroundColor: '#FFF7ED', color: '#C2410C', border: '1px solid #FED7AA' };
  } else if (status === 'Counter Sent') {
    return { ...base, backgroundColor: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0' };
  } else {
    return { ...base, backgroundColor: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' };
  }
};

const getProbabilityColor = (prob) => {
  if (prob >= 75) return '#10B981'; // Green
  if (prob >= 40) return '#F59E0B'; // Orange
  return '#EF4444'; // Red
};

export default function Negotiations() {
  const [negotiations, setNegotiations] = useState(initialNegotiationsData);
  
  const [remarkLeadId, setRemarkLeadId] = useState(null);
  const [remarkNewStatus, setRemarkNewStatus] = useState('');
  const [remarkText, setRemarkText] = useState('');

  const handleStatusChange = (id, newStatus) => {
    setRemarkLeadId(id);
    setRemarkNewStatus(newStatus);
    setRemarkText('');
  };

  const handleRemarkSubmit = (e) => {
    e.preventDefault();
    setNegotiations(negotiations.map(n => n.id === remarkLeadId ? { ...n, status: remarkNewStatus, remark: remarkText } : n));
    setRemarkLeadId(null);
    setRemarkNewStatus('');
    setRemarkText('');
  };

  const cancelRemarkModal = () => {
    setRemarkLeadId(null);
    setRemarkNewStatus('');
    setRemarkText('');
  };

  const activeCount = negotiations.filter(n => n.status === 'Active').length;
  const highProbCount = negotiations.filter(n => n.probability >= 70).length;
  const pendingClientCount = negotiations.filter(n => n.status === 'Pending Client').length;
  const counterSentCount = negotiations.filter(n => n.status === 'Counter Sent').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      
      {/* ── Page Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Negotiations</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Track and manage active high-value deals</p>
        </div>
      </div>

      {/* ── 4 Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {[
          { label: 'Active Negotiations', value: activeCount, Icon: Handshake, color: '#4F46E5', bg: '#EEF4FF', border: '#C7D2FE', sub: 'Total deals in play' },
          { label: 'High Probability', value: highProbCount, Icon: Target, color: '#16A34A', bg: '#ECFDF5', border: '#BBF7D0', sub: '>70% Win Chance' },
          { label: 'Pending Client', value: pendingClientCount, Icon: Clock, color: '#D97706', bg: '#FFF7ED', border: '#FED7AA', sub: 'Waiting on client response' },
          { label: 'Counter Offers Sent', value: counterSentCount, Icon: MessageSquare, color: '#0EA5E9', bg: '#F0F9FF', border: '#BAE6FD', sub: 'Waiting on us' },
        ].map(({ label, value, Icon, color, bg, border, sub }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', backgroundColor: bg, border: `1px solid ${border}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)', borderRadius: 'var(--radius-lg)', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500', margin: 0 }}>{label}</p>
              <Icon size={18} color={color} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>{value}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Full-Width Table Card ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Table Card */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
              <thead style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid var(--border-color)' }}>
                <tr>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Lead ID</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Client & Project</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Financials (Gap)</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Win Probability</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {negotiations.map((neg, index) => (
                  <tr key={neg.id} style={{ borderBottom: index === negotiations.length - 1 ? 'none' : '1px solid var(--border-color)', backgroundColor: 'white', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                    
                    {/* Lead ID Column */}
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary-color)' }}>
                      {neg.id}
                    </td>
                    
                    {/* Customer Name & Project Column */}
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0F172A' }}>{neg.client}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {neg.project}
                      </div>
                    </td>
                    
                    {/* Financials Column */}
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Quoted</div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{neg.quoted}</div>
                        </div>
                        <ArrowRight size={14} color="#94A3B8" />
                        <div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Offer</div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#2563EB' }}>{neg.offer}</div>
                        </div>
                        <div style={{ paddingLeft: '1rem', borderLeft: '1px solid #E2E8F0' }}>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gap</div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#DC2626' }}>{neg.gap}</div>
                        </div>
                      </div>
                    </td>

                    {/* Probability Column */}
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '60px', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${neg.probability}%`, height: '100%', backgroundColor: getProbabilityColor(neg.probability) }}></div>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: getProbabilityColor(neg.probability) }}>{neg.probability}%</span>
                      </div>
                    </td>
                    
                    {/* Status Drop Down Column */}
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <select
                          value={neg.status}
                          onChange={(e) => handleStatusChange(neg.id, e.target.value)}
                          style={getStatusStyle(neg.status)}
                        >
                          <option value="Active" style={{ color: '#1E293B', backgroundColor: '#fff' }}>Active</option>
                          <option value="Pending Client" style={{ color: '#1E293B', backgroundColor: '#fff' }}>Pending Client</option>
                          <option value="Counter Sent" style={{ color: '#1E293B', backgroundColor: '#fff' }}>Counter Sent</option>
                        </select>
                        <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '0.55rem', opacity: 0.7, color: 'inherit' }}>▼</span>
                      </div>
                    </td>
                    
                    {/* Action Column */}
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <button 
                        className="btn btn-outline"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', borderColor: '#E2E8F0', color: '#475569' }}
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Status Update Remark Modal ── */}
      {remarkLeadId && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 1000, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2rem', animation: 'scaleIn 0.25s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'Poppins, sans-serif', color: 'var(--text-main)', fontWeight: '600' }}>
                Status Update Remark
              </h3>
              <button 
                onClick={cancelRemarkModal} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.25rem', borderRadius: '50%', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleRemarkSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                  You are changing the status to <strong style={{ 
                    color: getStatusStyle(remarkNewStatus).color, 
                    backgroundColor: getStatusStyle(remarkNewStatus).bg,
                    padding: '0.15rem 0.6rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    display: 'inline-block',
                    marginLeft: '0.25rem'
                  }}>{remarkNewStatus.toUpperCase()}</strong>.
                </p>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  Add a Remark / Note for this transition:
                </label>
                <textarea 
                  rows="3" 
                  value={remarkText} 
                  onChange={(e) => setRemarkText(e.target.value)} 
                  placeholder="e.g., Talked to client, they requested pricing details..." 
                  required
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid var(--border-color)', 
                    resize: 'vertical',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary-color)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                ></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={cancelRemarkModal} className="btn btn-outline" style={{ padding: '0.6rem 1.25rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
