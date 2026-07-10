import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Calendar, Download, CheckCircle2, 
  X, AlertCircle, Clock, ChevronLeft, ChevronRight, Eye, Edit2, CreditCard
} from 'lucide-react';
import PaymentDetailsDrawer from '../components/PaymentDetailsDrawer';

const SUMMARY_CARDS = [
  { title: 'Total Collected', value: '₹2.4Cr', bg: '#ECFDF5', color: '#10B981', icon: <CheckCircle2 size={20} /> },
  { title: 'Upcoming Dues', value: '₹45L', bg: '#EFF6FF', color: '#3B82F6', icon: <Clock size={20} /> },
  { title: 'Pending Payments', value: '₹12L', bg: '#FFF7ED', color: '#F97316', icon: <AlertCircle size={20} /> },
  { title: 'Overdue Payments', value: '₹8.5L', bg: '#FEF2F2', color: '#EF4444', icon: <X size={20} /> },
];

const INITIAL_PAYMENTS = [
  { id: 'INV-1024', customer: 'Akash Kumar', company: 'ABC Builders', service: 'PEB Structure', milestone: '50% Advance', amountDue: '₹4,25,000', amountPaid: '₹4,25,000', status: 'Paid', dueDate: '15 Jun 2026', method: 'Bank Transfer' },
  { id: 'INV-1025', customer: 'Sarah Jenkins', company: 'Nexus Retail', service: 'Tensile Roofing', milestone: 'Completion (20%)', amountDue: '₹2,40,000', amountPaid: '₹0', status: 'Pending', dueDate: '30 Jul 2026', method: '-' },
  { id: 'INV-1026', customer: 'Ramesh Patel', company: 'Patel Logistics', service: 'PEB Structure', milestone: 'Material Delivery (30%)', amountDue: '₹13,50,000', amountPaid: '₹5,00,000', status: 'Partially Paid', dueDate: '10 Jul 2026', method: 'Cheque' },
  { id: 'INV-1027', customer: 'Emma Watson', company: 'Watson Industries', service: 'Other roofing', milestone: 'Final Settlement (10%)', amountDue: '₹32,500', amountPaid: '₹0', status: 'Overdue', dueDate: '01 Jul 2026', method: '-' },
  { id: 'INV-1028', customer: 'David Chen', company: 'Oriental Tech', service: 'Tensile Roofing', milestone: '100% Advance', amountDue: '₹22,50,000', amountPaid: '₹22,50,000', status: 'Paid', dueDate: '05 Jun 2026', method: 'UPI' },
  { id: 'INV-1029', customer: 'Anita Desai', company: 'Desai Properties', service: 'PEB Structure', milestone: 'Installation (40%)', amountDue: '₹2,00,000', amountPaid: '₹0', status: 'Overdue', dueDate: '15 May 2026', method: '-' },
];

const getStatusBadge = (status) => {
  switch ((status || '').toLowerCase()) {
    case 'paid': return <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '600', color: '#047857', backgroundColor: '#ECFDF5', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></div> Paid</span>;
    case 'pending': return <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '600', color: '#1D4ED8', backgroundColor: '#DBEAFE', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3B82F6' }}></div> Pending</span>;
    case 'partially paid': return <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '600', color: '#A16207', backgroundColor: '#FEFCE8', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EAB308' }}></div> Partial</span>;
    case 'overdue': return <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '600', color: '#B91C1C', backgroundColor: '#FEF2F2', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }}></div> Overdue</span>;
    default: return null;
  }
};

export default function Payments() {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [search, setSearch] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: '500' }}>Pages / Payment Collection</span>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#1E293B', margin: '0.5rem 0 0 0', letterSpacing: '-0.5px' }}>Payment Collection</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: '#4F46E5', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }}>
            <Plus size={18} /> Record Payment
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {SUMMARY_CARDS.map((card, idx) => (
          <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 {card.icon}
               </div>
               <div>
                 <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1E293B', margin: 0 }}>{card.value}</h3>
                 <p style={{ color: '#64748B', fontSize: '0.875rem', fontWeight: '500', margin: '0.25rem 0 0 0' }}>{card.title}</p>
               </div>
             </div>
          </div>
        ))}
      </div>

      {/* Table Container */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        {/* Table Filters Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
           <div style={{ position: 'relative' }}>
             <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={16} />
             <input 
               type="text" 
               placeholder="Search Invoice..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.875rem', outline: 'none', width: '240px' }}
             />
           </div>
           <select style={{ padding: '0.6rem 2rem 0.6rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.875rem', outline: 'none', backgroundColor: '#F8FAFC' }}>
             <option>Filter by Status</option>
           </select>
           <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem' }}>
             <Calendar size={16} /> Date Range
           </button>
           <button style={{ padding: '0.6rem 1rem', color: '#64748B', backgroundColor: 'transparent', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem' }}>Reset Filters</button>
        </div>

        {/* The Data Table */}
        <div style={{ overflowX: 'auto', maxHeight: '600px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1200px' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#F8FAFC', zIndex: 10 }}>
              <tr>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Invoice ID</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Customer</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Company</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Milestone</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Amount Due</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Amount Paid</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Status</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Due Date</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Method</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr 
                  key={payment.id} 
                  style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', transition: 'background-color 0.2s', cursor: 'pointer' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  onClick={() => setSelectedPayment(payment)}
                >
                  <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#4F46E5', whiteSpace: 'nowrap' }}>{payment.id}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#1E293B', whiteSpace: 'nowrap' }}>{payment.customer}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#475569', whiteSpace: 'nowrap' }}>{payment.company}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#475569', whiteSpace: 'nowrap' }}>{payment.milestone}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '700', color: '#1E293B', whiteSpace: 'nowrap' }}>{payment.amountDue}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '700', color: '#10B981', whiteSpace: 'nowrap' }}>{payment.amountPaid}</td>
                  <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{getStatusBadge(payment.status)}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: payment.status === 'Overdue' ? '#EF4444' : '#475569', fontWeight: payment.status === 'Overdue' ? '600' : '400', whiteSpace: 'nowrap' }}>{payment.dueDate}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#475569', whiteSpace: 'nowrap' }}>{payment.method}</td>
                  <td style={{ padding: '1rem', whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ padding: '0.4rem', border: 'none', backgroundColor: '#F1F5F9', color: '#64748B', borderRadius: '6px', cursor: 'pointer' }} title="View Details"><Eye size={14} /></button>
                      <button style={{ padding: '0.4rem', border: 'none', backgroundColor: '#EEF2FF', color: '#4F46E5', borderRadius: '6px', cursor: 'pointer' }} title="Record Payment"><CreditCard size={14} /></button>
                      <button style={{ padding: '0.4rem', border: 'none', backgroundColor: '#F1F5F9', color: '#64748B', borderRadius: '6px', cursor: 'pointer' }} title="Download Invoice"><Download size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Header */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: '#64748B' }}>Showing 1 to 6 of 45 invoices</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronLeft size={16} /></button>
            <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #4F46E5', backgroundColor: '#4F46E5', color: '#FFF', borderRadius: '6px', cursor: 'pointer' }}>1</button>
            <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', borderRadius: '6px', cursor: 'pointer' }}>2</button>
            <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      <PaymentDetailsDrawer payment={selectedPayment} isOpen={!!selectedPayment} onClose={() => setSelectedPayment(null)} />
    </div>
  );
}
