import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Plus, CheckCircle, Clock, X, ThumbsUp, Send, Upload } from 'lucide-react';

const initialQuotesData = [
  { id: 'QT-5001', leadId: 'LD-1001', client: 'Reference Client', project: 'PEB', amount: '₹100,000', gst: '₹18,000', approvalStatus: 'Pending', quotationStatus: 'In Preparation', revision: 'Rev 0', fileName: null },
];

const getApprovalStatusStyle = (status) => {
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

  if (status === 'Approved') return { ...base, backgroundColor: '#DCFCE7', color: '#166534' };
  return { ...base, backgroundColor: '#FEF3C7', color: '#92400E' }; // Pending
};

const getQuotationStatusStyle = (status) => {
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

  if (status === 'Prepared') return { ...base, backgroundColor: '#E0F2FE', color: '#0369A1' };
  return { ...base, backgroundColor: '#E0E7FF', color: '#3730A3' }; // In Preparation
};

const QUOTES_API = 'http://localhost:5000/api/quotations';

const Quotations = () => {
  const [quotes, setQuotes] = useState([]);
  const [quotesLoaded, setQuotesLoaded] = useState(false);

  // Load from API; seed with reference if DB empty
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(QUOTES_API);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setQuotes(data);
        } else {
          await fetch(`${QUOTES_API}/bulk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(initialQuotesData)
          });
          setQuotes(initialQuotesData);
        }
      } catch (err) {
        console.error('Failed to load quotations:', err);
        setQuotes(initialQuotesData);
      } finally {
        setQuotesLoaded(true);
      }
    };
    load();
  }, []);

  // Sync to API on change (also mirror to localStorage so dashboard/lead pages stay in sync)
  useEffect(() => {
    if (!quotesLoaded) return;
    localStorage.setItem('crm_quotes', JSON.stringify(quotes));
    fetch(`${QUOTES_API}/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quotes)
    }).catch(err => console.error('Failed to sync quotations:', err));
  }, [quotes, quotesLoaded]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuote, setNewQuote] = useState({
    leadId: '', client: '', project: '', amount: '', gst: '', approvalStatus: 'Pending', quotationStatus: 'In Preparation', revision: 'Rev 0', fileName: null
  });

  const handleGenerateQuote = (e) => {
    e.preventDefault();
    const newId = `QT-${5001 + quotes.length}`;
    
    // Ensure amount and gst have ₹ symbol
    const formattedAmount = newQuote.amount.startsWith('₹') ? newQuote.amount : `₹${newQuote.amount}`;
    const formattedGst = newQuote.gst.startsWith('₹') ? newQuote.gst : `₹${newQuote.gst}`;
    
    setQuotes([...quotes, { 
      ...newQuote, 
      id: newId,
      amount: formattedAmount,
      gst: formattedGst
    }]);
    setIsModalOpen(false);
    setNewQuote({ leadId: '', client: '', project: '', amount: '', gst: '', approvalStatus: 'Pending', quotationStatus: 'In Preparation', revision: 'Rev 0', fileName: null });
  };

  const handleApprovalStatusChange = (id, newStatus) => {
    setQuotes(quotes.map(q => q.id === id ? { ...q, approvalStatus: newStatus } : q));
  };

  const handleQuotationStatusChange = (id, newStatus) => {
    setQuotes(quotes.map(q => q.id === id ? { ...q, quotationStatus: newStatus } : q));
  };

  const handleFileUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      setQuotes(quotes.map(q => q.id === id ? { ...q, fileName: file.name } : q));
    }
  };

  const handleRemoveFile = (id) => {
    setQuotes(quotes.map(q => q.id === id ? { ...q, fileName: null } : q));
  };

  // Compute card stats
  const requestedCount = quotes.filter(q => q.quotationStatus === 'In Preparation' || q.quotationStatus === 'Inprepared').length;
  const pendingCount = quotes.filter(q => q.approvalStatus === 'Pending').length;
  const completedCount = quotes.filter(q => q.quotationStatus === 'Prepared').length;
  const approvedCount = quotes.filter(q => q.approvalStatus === 'Approved').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* ── Page Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Quotations</h2>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Generate Quotation
        </button>
      </div>

      {/* ── 4 Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {[
          { label: 'Requested Quotations', value: requestedCount, Icon: FileText, color: '#4F46E5', bg: '#EEF4FF', border: '#C7D2FE', sub: 'Draft & initial requests' },
          { label: 'Pending Quotations', value: pendingCount, Icon: Clock, color: '#D97706', bg: '#FFF7ED', border: '#FED7AA', sub: 'Awaiting client/mgr approval' },
          { label: 'Completed Quotations', value: completedCount, Icon: Send, color: '#0EA5E9', bg: '#F0F9FF', border: '#BAE6FD', sub: 'Prepared & sent to clients' },
          { label: 'Approved Quotations', value: approvedCount, Icon: ThumbsUp, color: '#16A34A', bg: '#ECFDF5', border: '#BBF7D0', sub: 'Accepted quotations' },
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
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Lead ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Customer Name</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Approval Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Quotations Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Upload Quotation</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote, index) => (
                <tr key={quote.id} style={{ borderBottom: index === quotes.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                  {/* Lead ID Column */}
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary-color)' }}>
                    {quote.leadId || 'N/A'}
                  </td>
                  
                  {/* Customer Name Column */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{quote.client}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {quote.project}
                    </div>
                  </td>
                  
                  {/* Approval Status Badge Column */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      textAlign: 'center',
                      backgroundColor: quote.approvalStatus === 'Approved' ? '#DCFCE7' : '#FEF3C7',
                      color: quote.approvalStatus === 'Approved' ? '#166534' : '#92400E'
                    }}>
                      {quote.approvalStatus}
                    </span>
                  </td>
                  
                  {/* Quotation Status Drop Down Column */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <select
                        value={quote.quotationStatus}
                        onChange={(e) => handleQuotationStatusChange(quote.id, e.target.value)}
                        style={getQuotationStatusStyle(quote.quotationStatus)}
                      >
                        <option value="Prepared" style={{ color: '#1E293B', backgroundColor: '#fff' }}>Prepared</option>
                        <option value="In Preparation" style={{ color: '#1E293B', backgroundColor: '#fff' }}>In Preparation</option>
                      </select>
                      <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '0.55rem', opacity: 0.7, color: 'inherit' }}>▼</span>
                    </div>
                  </td>
                  
                  {/* Upload Quotation Column */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {quote.fileName ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', color: '#166534' }}>
                          <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={quote.fileName}>
                            📄 {quote.fileName}
                          </span>
                          <button 
                            onClick={() => handleRemoveFile(quote.id)} 
                            style={{ background: 'none', border: 'none', color: '#991B1B', cursor: 'pointer', display: 'flex', padding: 0 }}
                            title="Remove file"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="file" 
                            id={`file-input-${quote.id}`}
                            onChange={(e) => handleFileUpload(quote.id, e)} 
                            style={{ display: 'none' }} 
                          />
                          <button 
                            onClick={() => document.getElementById(`file-input-${quote.id}`)?.click()}
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '0.35rem', 
                              padding: '0.35rem 0.75rem', 
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--border-color)',
                              backgroundColor: 'var(--surface-color)',
                              cursor: 'pointer',
                              color: 'var(--text-muted)',
                              transition: 'all 0.2s'
                            }}
                          >
                            <Upload size={12} /> Upload PDF
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  {/* Action Column */}
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Preview">
                        <Eye size={18} />
                      </button>
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Export PDF">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Generate Quotation Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Generate Quotation</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleGenerateQuote} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Lead ID</label>
                  <input required value={newQuote.leadId} onChange={(e) => setNewQuote({...newQuote, leadId: e.target.value})} type="text" placeholder="e.g. LD-1007" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Client Name</label>
                  <input required value={newQuote.client} onChange={(e) => setNewQuote({...newQuote, client: e.target.value})} type="text" placeholder="e.g. Acme Corp" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Services</label>
                <select required value={newQuote.project} onChange={(e) => setNewQuote({...newQuote, project: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-main)', outline: 'none' }}>
                  <option value="">Select type</option>
                  <option value="PEB">PEB</option>
                  <option value="Tensile">Tensile</option>
                  <option value="Other roofing">Other roofing</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Amount (ex. GST)</label>
                  <input required value={newQuote.amount} onChange={(e) => setNewQuote({...newQuote, amount: e.target.value})} type="text" placeholder="e.g. ₹100,000" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>GST Amount</label>
                  <input required value={newQuote.gst} onChange={(e) => setNewQuote({...newQuote, gst: e.target.value})} type="text" placeholder="e.g. ₹18,000" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Generate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quotations;
