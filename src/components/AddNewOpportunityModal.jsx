import React, { useState } from 'react';
import { X, Target, Calendar, User, Briefcase, IndianRupee } from 'lucide-react';

export default function AddNewOpportunityModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    customer: '',
    company: '',
    service: 'PEB Structure',
    stage: 'New Lead',
    pipelineStatus: 'On Track',
    assignedTo: 'John Smith',
    expectedValue: '',
    probability: '50%',
    expectedClose: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Generate a random ID for the dummy data
    const newOp = {
      id: `OP-${Math.floor(Math.random() * 1000) + 1000}`,
      ...formData,
      // Format the expected value to look like currency if it's a raw number
      expectedValue: formData.expectedValue.includes('₹') 
        ? formData.expectedValue 
        : `₹${Number(formData.expectedValue).toLocaleString('en-IN')}`,
      // Some default fields for the table
      lastActivity: 'Just Now',
      followUp: formData.expectedClose || 'TBD'
    };
    onSave(newOp);
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
        width: '100%', maxWidth: '800px', maxHeight: '90vh',
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
          .op-scroll::-webkit-scrollbar { width: 6px; }
          .op-scroll::-webkit-scrollbar-track { background: transparent; }
          .op-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
        `}</style>

        {/* Header */}
        <div style={{ padding: '1.5rem 2rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1E293B' }}>Add New Opportunity</h2>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8125rem', color: '#64748B' }}>Create a new deal for the sales pipeline.</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: '#94A3B8', borderRadius: '8px', transition: 'all 0.2s' }}>
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div className="op-scroll" style={{ padding: '2rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Section 1: Customer Info */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} color="#4F46E5" /> Customer & Client Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Customer Name</label>
                <input type="text" name="customer" value={formData.customer} onChange={handleChange} placeholder="e.g. John Doe" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Company Name</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Acme Corp" style={inputStyle} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Service / Project Type</label>
                <select name="service" value={formData.service} onChange={handleChange} style={inputStyle}>
                  <option value="PEB Structure">PEB Structure</option>
                  <option value="Tensile Roofing">Tensile Roofing</option>
                  <option value="Civil Work">Civil Work</option>
                  <option value="Other roofing">Other roofing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Deal Specifics */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={18} color="#4F46E5" /> Pipeline Positioning
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Stage</label>
                <select name="stage" value={formData.stage} onChange={handleChange} style={inputStyle}>
                  <option value="New Lead">New Lead</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Negotiation">Negotiation</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Pipeline Status</label>
                <select name="pipelineStatus" value={formData.pipelineStatus} onChange={handleChange} style={inputStyle}>
                  <option value="On Track">On Track</option>
                  <option value="Follow Up">Follow Up</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Assigned To</label>
                <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} style={inputStyle}>
                  <option value="John Smith">John Smith</option>
                  <option value="Sarah Lee">Sarah Lee</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Value & Timeline */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IndianRupee size={18} color="#4F46E5" /> Value & Timeline
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Expected Value</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontWeight: '600' }}>₹</span>
                  <input type="number" name="expectedValue" value={formData.expectedValue} onChange={handleChange} placeholder="0.00" style={{ ...inputStyle, paddingLeft: '2rem' }} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Probability</label>
                <select name="probability" value={formData.probability} onChange={handleChange} style={inputStyle}>
                  <option value="10%">10% (Low)</option>
                  <option value="30%">30%</option>
                  <option value="50%">50% (Medium)</option>
                  <option value="75%">75%</option>
                  <option value="90%">90% (High)</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Expected Close Date</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input type="date" name="expectedClose" value={formData.expectedClose} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '2.5rem' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Notes */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <label style={labelStyle}>Initial Notes & Description</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Add any background context on this opportunity..." rows="3" style={{ ...inputStyle, resize: 'vertical' }}></textarea>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1.25rem 2rem', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', color: '#475569', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '0.75rem 2rem', backgroundColor: '#4F46E5', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }}>Save Opportunity</button>
        </div>

      </div>
    </div>
  );
}
