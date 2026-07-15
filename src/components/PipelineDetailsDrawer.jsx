import React, { useState } from 'react';
import { X, UserPlus, Flame, Snowflake, Thermometer, CalendarCheck, FileText, FileSignature, CheckCircle2, Trash2, Activity, MessageSquare, Paperclip, MapPin, DollarSign } from 'lucide-react';

const PipelineDetailsDrawer = ({ opportunity, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('sales_progress');

  if (!isOpen || !opportunity) return null;

  // Timeline
  const timelineStages = [
    { label: 'Lead Created', completed: true },
    { label: 'Qualification', completed: ['Qualified', 'Site Visit', 'Quotation Sent', 'Negotiation', 'Won'].includes(opportunity.stage) },
    { label: 'Site Visit', completed: ['Site Visit', 'Quotation Sent', 'Negotiation', 'Won'].includes(opportunity.stage) },
    { label: 'Proposal', completed: ['Quotation Sent', 'Negotiation', 'Won'].includes(opportunity.stage) },
    { label: 'Negotiation', completed: ['Negotiation', 'Won'].includes(opportunity.stage) },
    { label: opportunity.stage === 'Lost' ? 'Lost' : 'Won', completed: ['Won', 'Lost'].includes(opportunity.stage), isTerminal: true, terminalSuccess: opportunity.stage === 'Won' }
  ];

  return (
    <>
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease'
        }}
        onClick={onClose}
      />
      
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '100%', maxWidth: '600px',
        backgroundColor: '#F8FAFC',
        zIndex: 9999,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '-10px 0 25px -5px rgba(0, 0, 0, 0.1)',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ backgroundColor: '#F1F5F9', color: '#64748B', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px' }}>{opportunity.id}</span>
              <span style={{ backgroundColor: '#DBEAFE', color: '#1D4ED8', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>{opportunity.stage}</span>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#1E293B' }}>{opportunity.company}</h2>
            <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserPlus size={14} /> {opportunity.customer}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: '#94A3B8', borderRadius: '8px', transition: 'all 0.2s' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ padding: '0 1.5rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '2rem' }}>
          {['sales_progress', 'customer_details', 'timeline', 'notes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1rem 0',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab ? 'var(--primary-color)' : 'transparent'}`,
                color: activeTab === tab ? 'var(--primary-color)' : '#64748B',
                fontWeight: activeTab === tab ? '600' : '500',
                fontSize: '0.875rem',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          
          {activeTab === 'sales_progress' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity size={18} color="var(--primary-color)" /> Sales Progress
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Current Stage</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{opportunity.stage}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Expected Closing</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{opportunity.expectedClose}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Win Probability</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: opportunity.probability, height: '100%', backgroundColor: parseInt(opportunity.probability) > 70 ? '#10B981' : parseInt(opportunity.probability) > 40 ? '#F59E0B' : '#EF4444' }}></div>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1E293B' }}>{opportunity.probability}</span>
                    </div>
                  </div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Assigned Manager</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{opportunity.assigned}</span></div>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} color="var(--primary-color)" /> Project Details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Service Type</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{opportunity.service}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Project Value</span><span style={{ fontWeight: '700', color: '#10B981', fontSize: '1rem' }}>{opportunity.value}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Location</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>Chennai, TN</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Project Area</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>4500 Sq.Ft</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customer_details' && (
             <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <UserPlus size={18} color="var(--primary-color)" /> Contact Information
               </h3>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                 <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Customer Name</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{opportunity.customer}</span></div>
                 <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Company</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{opportunity.company}</span></div>
                 <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Phone</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>+91 98765 43210</span></div>
                 <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Email</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>contact@company.com</span></div>
               </div>
             </div>
          )}

          {activeTab === 'timeline' && (
            <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ position: 'relative', paddingLeft: '1rem' }}>
                {timelineStages.map((stage, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: i === timelineStages.length - 1 ? 0 : '1.5rem', position: 'relative' }}>
                    {i !== timelineStages.length - 1 && (
                      <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-1.5rem', width: '2px', backgroundColor: stage.completed ? 'var(--primary-color)' : '#E2E8F0' }}></div>
                    )}
                    <div style={{ 
                      width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                      backgroundColor: stage.completed ? (stage.isTerminal ? (stage.terminalSuccess ? '#10B981' : '#EF4444') : 'var(--primary-color)') : '#F1F5F9',
                      border: `2px solid ${stage.completed ? (stage.isTerminal ? (stage.terminalSuccess ? '#10B981' : '#EF4444') : 'var(--primary-color)') : '#E2E8F0'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      zIndex: 1
                    }}>
                      {stage.completed && <CheckCircle2 size={14} color="#FFFFFF" />}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', fontWeight: '700', color: stage.completed ? '#1E293B' : '#94A3B8' }}>{stage.label}</h4>
                      {stage.completed && <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Completed</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageSquare size={18} color="var(--primary-color)" /> Add Note
                </h3>
                <textarea rows="3" placeholder="Type your sales notes here..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', resize: 'vertical', fontSize: '0.875rem' }}></textarea>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--primary-color)', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Save Note</button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '1rem' }}>
          <button style={{ flex: 1, padding: '0.75rem', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Update Stage</button>
          <button style={{ flex: 1, padding: '0.75rem', backgroundColor: '#F5F3FF', color: '#6D28D9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Send Quotation</button>
          <button style={{ flex: 1, padding: '0.75rem', backgroundColor: 'var(--primary-color)', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }}>Convert to Project</button>
        </div>
      </div>
    </>
  );
};

export default PipelineDetailsDrawer;
