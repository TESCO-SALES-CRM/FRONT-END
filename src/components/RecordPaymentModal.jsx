import React, { useState } from 'react';
import { X, CreditCard, User, Building, Calendar, IndianRupee, FileText } from 'lucide-react';

export default function RecordPaymentModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    invoiceId: '',
    customer: '',
    company: '',
    amountPaid: '',
    method: 'Bank Transfer',
    transactionId: '',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Generate a new payment record or update an existing one based on the invoice ID
    const newPayment = {
      id: formData.invoiceId || `INV-${Math.floor(Math.random() * 1000) + 1000}`,
      customer: formData.customer || 'Unknown Customer',
      company: formData.company || 'Unknown Company',
      service: 'General Servicing',
      milestone: 'Payment Received',
      amountDue: '₹0', // Assuming paid in full for simplicity
      amountPaid: formData.amountPaid.includes('₹') 
        ? formData.amountPaid 
        : `₹${Number(formData.amountPaid || 0).toLocaleString('en-IN')}`,
      status: 'Paid',
      dueDate: formData.paymentDate,
      method: formData.method
    };
    onSave(newPayment);
    onClose();
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    marginTop: '0.25rem',
    backgroundColor: '#FFFFFF',
    color: '#1E293B'
  };

  const labelStyle = {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        width: '100%', maxWidth: '700px', maxHeight: '90vh',
        backgroundColor: '#F8FAFC',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        animation: 'modalSlideUp 0.3s ease-out forwards'
      }}>
        <style>{`
          @keyframes modalSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .pay-scroll::-webkit-scrollbar { width: 6px; }
          .pay-scroll::-webkit-scrollbar-track { background: transparent; }
          .pay-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
        `}</style>

        {/* Header */}
        <div style={{ padding: '1.5rem 2rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1E293B' }}>Record Payment</h2>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8125rem', color: '#64748B' }}>Log a new payment receipt.</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: '#94A3B8', borderRadius: '8px', transition: 'all 0.2s' }}>
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div className="pay-scroll" style={{ padding: '2rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Section 1: Invoice & Client Info */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} color="var(--primary-color)" /> Invoice & Client Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Invoice / Reference ID</label>
                <input type="text" name="invoiceId" value={formData.invoiceId} onChange={handleChange} placeholder="e.g. INV-1025 (Optional)" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Customer Name</label>
                <input type="text" name="customer" value={formData.customer} onChange={handleChange} placeholder="e.g. Sarah Jenkins" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Company Name</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Nexus Retail" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Section 2: Transaction Details */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndianRupee size={18} color="var(--primary-color)" /> Transaction Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Amount Paid</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontWeight: '600' }}>₹</span>
                  <input type="number" name="amountPaid" value={formData.amountPaid} onChange={handleChange} placeholder="0.00" style={{ ...inputStyle, paddingLeft: '2rem' }} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Payment Method</label>
                <select name="method" value={formData.method} onChange={handleChange} style={inputStyle}>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Transaction ID / Cheque No.</label>
                <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} placeholder="e.g. TXN987654321" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Payment Date</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input type="date" name="paymentDate" value={formData.paymentDate} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '2.5rem' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Notes */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <label style={labelStyle}>Payment Notes & Remarks</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Add any details about this payment..." rows="2" style={{ ...inputStyle, resize: 'vertical' }}></textarea>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1.25rem 2rem', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', color: '#475569', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '0.75rem 2rem', backgroundColor: '#10B981', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)' }}>Save Record</button>
        </div>

      </div>
    </div>
  );
}
