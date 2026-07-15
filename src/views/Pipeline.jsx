import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Calendar, MoreVertical, Edit2, Trash2, Eye, 
  ArrowUpDown, Download, CheckCircle2, ChevronLeft, ChevronRight, X 
} from 'lucide-react';
import PipelineDetailsDrawer from '../components/PipelineDetailsDrawer';
import AddNewOpportunityModal from '../components/AddNewOpportunityModal';

import AddNewLeadWizard from '../components/AddNewLeadWizard';
import GlobalFilterBar from '../components/GlobalFilterBar';



const INITIAL_PIPELINE = [
  { id: 'OP-1001', customer: 'Akash Kumar', company: 'ABC Builders', service: 'PEB Structure', stage: 'New', pipelineStatus: 'On Track', assigned: 'John Smith', expectedClose: '25 Jul 2026', value: '₹8,50,000', probability: '25%', lastActivity: 'Today', followUp: '2026-07-15' },
  { id: 'OP-1002', customer: 'Sarah Jenkins', company: 'Nexus Retail', service: 'Tensile Roofing', stage: 'Hot', pipelineStatus: 'Follow Up', assigned: 'Mike Johnson', expectedClose: '12 Aug 2026', value: '₹12,00,000', probability: '40%', lastActivity: 'Yesterday', followUp: '2026-07-14' },
  { id: 'OP-1003', customer: 'Ramesh Patel', company: 'Patel Logistics', service: 'PEB Structure', stage: 'Warm', pipelineStatus: 'Delayed', assigned: 'Sarah Lee', expectedClose: '30 Jul 2026', value: '₹45,00,000', probability: '60%', lastActivity: '2 Days Ago', followUp: '2026-07-21' },
  { id: 'OP-1004', customer: 'Emma Watson', company: 'Watson Industries', service: 'Other roofing', stage: 'Cold', pipelineStatus: 'On Track', assigned: 'John Smith', expectedClose: '05 Aug 2026', value: '₹3,25,000', probability: '85%', lastActivity: 'Today', followUp: '2026-07-15' },
  { id: 'OP-1005', customer: 'David Chen', company: 'Oriental Tech', service: 'Tensile Roofing', stage: 'Appointment Fixed', pipelineStatus: 'On Track', assigned: 'Mike Johnson', expectedClose: '10 Jul 2026', value: '₹22,50,000', probability: '100%', lastActivity: '1 Week Ago', followUp: '' },
  { id: 'OP-1006', customer: 'Anita Desai', company: 'Desai Properties', service: 'PEB Structure', stage: 'Cold', pipelineStatus: 'Delayed', assigned: 'Sarah Lee', expectedClose: '01 Jul 2026', value: '₹5,00,000', probability: '0%', lastActivity: '1 Month Ago', followUp: '' },
];

const getStageStyle = (stage) => {
  switch ((stage || '').toLowerCase()) {
    case 'new': return { bg: '#DBEAFE', color: '#1D4ED8' };           // Blue
    case 'hot': return { bg: '#FEE2E2', color: '#B91C1C' };           // Red
    case 'warm': return { bg: '#FFEDD5', color: '#C2410C' };          // Orange
    case 'cold': return { bg: '#E2E8F0', color: '#475569' };          // Grey
    case 'appointment fixed': return { bg: '#D1FAE5', color: '#047857' }; // Green
    default: return { bg: '#F1F5F9', color: '#475569' };
  }
};

const getStatusBadge = (status) => {
  switch ((status || '').toLowerCase()) {
    case 'on track': return <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '600', color: '#047857', backgroundColor: '#ECFDF5', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></div> On Track</span>;
    case 'follow up': return <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '600', color: '#A16207', backgroundColor: '#FEFCE8', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EAB308' }}></div> Follow Up</span>;
    case 'delayed': return <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '600', color: '#B91C1C', backgroundColor: '#FEF2F2', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }}></div> Delayed</span>;
    default: return null;
  }
};

const getProbabilityColor = (prob) => {
  const val = parseInt(prob);
  if (val > 70) return '#10B981';
  if (val > 40) return '#F59E0B';
  return '#EF4444';
};

export default function Pipeline() {
  const [opportunities, setOpportunities] = useState(INITIAL_PIPELINE);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [execFilter, setExecFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);


  const uniqueStages = [...new Set(opportunities.map(o => o.stage))].filter(Boolean);
  const uniqueExecs = [...new Set(opportunities.map(o => o.assigned))].filter(Boolean);
  const uniqueServices = [...new Set(opportunities.map(o => o.service))].filter(Boolean);

  
  const SUMMARY_CARDS = [
    { title: 'Total Pipeline', value: opportunities.length, bg: '#EFF6FF', color: 'var(--primary-color)', icon: <Filter size={20} /> },
    { title: 'Hot', value: opportunities.filter(o => (o.stage||'').toLowerCase() === 'hot').length, bg: '#FEF2F2', color: '#EF4444', icon: <Flame size={20} /> },
    { title: 'Warm', value: opportunities.filter(o => (o.stage||'').toLowerCase() === 'warm').length, bg: '#FFF7ED', color: '#F97316', icon: <Activity size={20} /> },
    { title: 'Cold', value: opportunities.filter(o => (o.stage||'').toLowerCase() === 'cold').length, bg: '#F1F5F9', color: '#64748B', icon: <Snowflake size={20} /> },
    { title: 'Lost', value: opportunities.filter(o => (o.stage||'').toLowerCase() === 'lost').length, bg: '#FCE7F3', color: '#9D174D', icon: <XCircle size={20} /> },
  ];
const filteredOpportunities = opportunities.filter(opp => {
    const matchSearch = !search || 
      opp.customer.toLowerCase().includes(search.toLowerCase()) || 
      opp.company.toLowerCase().includes(search.toLowerCase()) ||
      opp.id.toLowerCase().includes(search.toLowerCase());
    const matchStage = !stageFilter || opp.stage === stageFilter;
    const matchExec = !execFilter || opp.assigned === execFilter;
    const matchService = !serviceFilter || opp.service === serviceFilter;
    return matchSearch && matchStage && matchExec && matchService;
  });

  const handleFollowUpChange = (id, newDate) => {
    setOpportunities(opportunities.map(o => o.id === id ? { ...o, followUp: newDate } : o));
  };

  const handleResetFilters = () => {
    setSearch('');
    setStageFilter('');
    setExecFilter('');
    setServiceFilter('');
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: '500' }}>Pages / Sales Pipeline</span>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#1E293B', margin: '0.5rem 0 0 0', letterSpacing: '-0.5px' }}>Sales Pipeline</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button onClick={() => setIsAddOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: 'var(--primary-color)', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }}>
            <Plus size={18} /> Add New Opportunity
          </button>
        </div>
      </div>

            <GlobalFilterBar />

{/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {SUMMARY_CARDS.map((card, idx) => (
          <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 {card.icon}
               </div>
               <div>
                 <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1E293B', margin: 0 }}>{card.value}</h3>
                 <p style={{ color: '#64748B', fontSize: '0.875rem', fontWeight: '500', margin: '0.25rem 0 0 0', whiteSpace: 'nowrap' }}>{card.title}</p>
               </div>
             </div>
          </div>
        ))}
      </div>

      {/* Table Container */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        {/* Table Filters Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <input 
             type="text" 
             placeholder="Search Opportunity..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.875rem', outline: 'none' }}
           />
           <select 
             value={stageFilter}
             onChange={(e) => setStageFilter(e.target.value)}
             style={{ padding: '0.6rem 2rem 0.6rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.875rem', outline: 'none', backgroundColor: '#F8FAFC' }}>
             <option value="">Filter by Stage</option>
             {uniqueStages.map(s => <option key={s} value={s}>{s}</option>)}
           </select>
           <select 
             value={execFilter}
             onChange={(e) => setExecFilter(e.target.value)}
             style={{ padding: '0.6rem 2rem 0.6rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.875rem', outline: 'none', backgroundColor: '#F8FAFC' }}>
             <option value="">Filter by Sales Executive</option>
             {uniqueExecs.map(e => <option key={e} value={e}>{e}</option>)}
           </select>
           <select 
             value={serviceFilter}
             onChange={(e) => setServiceFilter(e.target.value)}
             style={{ padding: '0.6rem 2rem 0.6rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.875rem', outline: 'none', backgroundColor: '#F8FAFC' }}>
             <option value="">Filter by Service</option>
             {uniqueServices.map(s => <option key={s} value={s}>{s}</option>)}
           </select>
           <button onClick={handleResetFilters} style={{ padding: '0.6rem 1rem', color: '#64748B', backgroundColor: 'transparent', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem' }}>Reset Filters</button>
        </div>

        {/* The Data Table */}
        <div style={{ overflowX: 'auto', maxHeight: '500px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1400px' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#F8FAFC', zIndex: 10 }}>
              <tr>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Lead ID</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Customer</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Service</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Stage</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Assigned To</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Expected Close</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap', cursor: 'pointer' }}><div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Project Value <ArrowUpDown size={14} /></div></th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Last Activity</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Follow-up</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOpportunities.map((opp, idx) => {
                const sStyle = getStageStyle(opp.stage);
              
  const uniqueStages = [...new Set(opportunities.map(o => o.stage))].filter(Boolean);
  const uniqueExecs = [...new Set(opportunities.map(o => o.assigned))].filter(Boolean);
  const uniqueServices = [...new Set(opportunities.map(o => o.service))].filter(Boolean);

  const filteredOpportunities = opportunities.filter(opp => {
    const matchSearch = !search || 
      opp.customer.toLowerCase().includes(search.toLowerCase()) || 
      opp.company.toLowerCase().includes(search.toLowerCase()) ||
      opp.id.toLowerCase().includes(search.toLowerCase());
    const matchStage = !stageFilter || opp.stage === stageFilter;
    const matchExec = !execFilter || opp.assigned === execFilter;
    const matchService = !serviceFilter || opp.service === serviceFilter;
    return matchSearch && matchStage && matchExec && matchService;
  });

  const handleFollowUpChange = (id, newDate) => {
    setOpportunities(opportunities.map(o => o.id === id ? { ...o, followUp: newDate } : o));
  };

  const handleResetFilters = () => {
    setSearch('');
    setStageFilter('');
    setExecFilter('');
    setServiceFilter('');
  };

  return (
                  <tr 
                    key={opp.id} 
                    style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', transition: 'background-color 0.2s', cursor: 'pointer' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                    onClick={() => setSelectedOpp(opp)}
                  >
                    <td style={{ padding: '1rem', fontSize: '0.875rem', whiteSpace: 'nowrap', fontWeight: '600', color: 'var(--primary-color)' }}>{opp.id}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', whiteSpace: 'nowrap', fontWeight: '600', color: '#1E293B' }}>{opp.customer}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', whiteSpace: 'nowrap', color: '#475569' }}>{opp.service}</td>
                    <td style={{ padding: '1rem', whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
                      <select style={{ backgroundColor: sStyle.bg, color: sStyle.color, border: 'none', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', outline: 'none', cursor: 'pointer' }} value={opp.stage} onChange={() => {}}>
                        <option>New</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        <option>Appointment Fixed</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', whiteSpace: 'nowrap', color: '#475569' }}>{opp.assigned}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', whiteSpace: 'nowrap', color: '#475569' }}>{opp.expectedClose}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', whiteSpace: 'nowrap', fontWeight: '700', color: '#10B981' }}>{opp.value}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', whiteSpace: 'nowrap', color: '#475569' }}>{opp.lastActivity}</td>
                    <td style={{ padding: '1rem', whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="date" 
                        value={opp.followUp} 
                        onChange={(e) => handleFollowUpChange(opp.id, e.target.value)}
                        style={{ 
                          border: '1px solid #E2E8F0', 
                          borderRadius: '6px', 
                          padding: '0.25rem 0.5rem', 
                          fontSize: '0.75rem', 
                          color: '#475569',
                          fontWeight: '500',
                          outline: 'none',
                          cursor: 'pointer',
                          backgroundColor: 'transparent'
                        }} 
                      />
                    </td>
                    <td style={{ padding: '1rem', whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{ padding: '0.4rem', border: 'none', backgroundColor: '#F1F5F9', color: '#64748B', borderRadius: '6px', cursor: 'pointer' }} title="View"><Eye size={14} /></button>
                        <button style={{ padding: '0.4rem', border: 'none', backgroundColor: '#F1F5F9', color: '#64748B', borderRadius: '6px', cursor: 'pointer' }} title="Edit"><Edit2 size={14} /></button>
                        <button style={{ padding: '0.4rem', border: 'none', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '6px', cursor: 'pointer' }} title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Header */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: '#64748B' }}>Showing 1 to 6 of 142 entries</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronLeft size={16} /></button>
            <button style={{ padding: '0.4rem 0.8rem', border: '1px solid var(--primary-color)', backgroundColor: 'var(--primary-color)', color: '#FFF', borderRadius: '6px', cursor: 'pointer' }}>1</button>
            <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', borderRadius: '6px', cursor: 'pointer' }}>2</button>
            <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', borderRadius: '6px', cursor: 'pointer' }}>3</button>
            <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      <AddNewLeadWizard isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <PipelineDetailsDrawer opportunity={selectedOpp} isOpen={!!selectedOpp} onClose={() => setSelectedOpp(null)} />
    </div>
  );
}
