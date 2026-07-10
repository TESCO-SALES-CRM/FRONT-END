import React, { useState } from 'react';
import { X, UserPlus, IndianRupee, CalendarCheck, FileText, CheckCircle2, MessageSquare, ArrowRight, Activity, Download, Bell, CreditCard } from 'lucide-react';

const PaymentDetailsDrawer = ({ payment, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('payment_overview');

  if (!isOpen || !payment) return null;

  const timelineStages = [
    { label: 'Invoice Generated', date: '10 Jun 2026', completed: true },
    { label: 'Payment Reminder Sent', date: '15 Jun 2026', completed: payment.status !== 'Pending' },
    { label: 'Partial Payment Received', date: '20 Jun 2026', completed: payment.status === 'Partially Paid' || payment.status === 'Paid' },
    { label: 'Full Payment Cleared', date: payment.status === 'Paid' ? payment.dueDate : 'Pending', completed: payment.status === 'Paid', isTerminal: true, terminalSuccess: payment.status === 'Paid' }
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
              <span style={{ backgroundColor: '#F1F5F9', color: '#64748B', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px' }}>{payment.id}</span>
              <span style={{ backgroundColor: '#DBEAFE', color: '#1D4ED8', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700' }}>{payment.status}</span>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#1E293B' }}>{payment.company}</h2>
            <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserPlus size={14} /> {payment.customer}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: '#94A3B8', borderRadius: '8px', transition: 'all 0.2s' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ padding: '0 1.5rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '2rem' }}>
          {['payment_overview', 'billing_details', 'timeline', 'notes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1rem 0',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab ? '#4F46E5' : 'transparent'}`,
                color: activeTab === tab ? '#4F46E5' : '#64748B',
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
          
          {activeTab === 'payment_overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CreditCard size={18} color="#4F46E5" /> Payment Status
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Amount Due</span><span style={{ fontWeight: '700', color: '#1E293B', fontSize: '1.125rem' }}>{payment.amountDue}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Amount Paid</span><span style={{ fontWeight: '700', color: '#10B981', fontSize: '1.125rem' }}>{payment.amountPaid}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Due Date</span><span style={{ fontWeight: '600', color: payment.status === 'Overdue' ? '#EF4444' : '#1E293B', fontSize: '0.875rem' }}>{payment.dueDate}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Milestone</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{payment.milestone}</span></div>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} color="#4F46E5" /> Project Reference
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Service Type</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{payment.service}</span></div>
                  <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Total Project Value</span><span style={{ fontWeight: '700', color: '#6366F1', fontSize: '1rem' }}>₹45,00,000</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing_details' && (
             <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <UserPlus size={18} color="#4F46E5" /> Billing Contact
               </h3>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                 <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Customer Name</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{payment.customer}</span></div>
                 <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Company</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>{payment.company}</span></div>
                 <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Phone</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>+91 98765 43210</span></div>
                 <div><span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '700', color: '#94A3B8', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Billing Email</span><span style={{ fontWeight: '600', color: '#1E293B', fontSize: '0.875rem' }}>accounts@company.com</span></div>
               </div>
             </div>
          )}

          {activeTab === 'timeline' && (
            <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ position: 'relative', paddingLeft: '1rem' }}>
                {timelineStages.map((stage, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: i === timelineStages.length - 1 ? 0 : '1.5rem', position: 'relative' }}>
                    {i !== timelineStages.length - 1 && (
                      <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-1.5rem', width: '2px', backgroundColor: stage.completed ? '#4F46E5' : '#E2E8F0' }}></div>
                    )}
                    <div style={{ 
                      width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                      backgroundColor: stage.completed ? (stage.isTerminal ? (stage.terminalSuccess ? '#10B981' : '#EF4444') : '#4F46E5') : '#F1F5F9',
                      border: `2px solid ${stage.completed ? (stage.isTerminal ? (stage.terminalSuccess ? '#10B981' : '#EF4444') : '#4F46E5') : '#E2E8F0'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      zIndex: 1
                    }}>
                      {stage.completed && <CheckCircle2 size={14} color="#FFFFFF" />}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', fontWeight: '700', color: stage.completed ? '#1E293B' : '#94A3B8' }}>{stage.label}</h4>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{stage.date}</span>
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
                  <MessageSquare size={18} color="#4F46E5" /> Add Note
                </h3>
                <textarea rows="3" placeholder="Type your accounts notes here..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', resize: 'vertical', fontSize: '0.875rem' }}></textarea>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button style={{ padding: '0.5rem 1rem', backgroundColor: '#4F46E5', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Save Note</button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '1rem' }}>
          <button style={{ flex: 1, padding: '0.75rem', backgroundColor: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Download size={16} /> Invoice
          </button>
          <button style={{ flex: 1, padding: '0.75rem', backgroundColor: '#F5F3FF', color: '#6D28D9', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Bell size={16} /> Reminder
          </button>
          <button style={{ flex: 1, padding: '0.75rem', backgroundColor: '#4F46E5', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <IndianRupee size={16} /> Log Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentDetailsDrawer;
