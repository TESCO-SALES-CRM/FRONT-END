import React, { useState } from 'react';
import { Search, Filter, Phone, MoreVertical, X, Edit2, Mail, Trash2, Users, Flame, CalendarCheck, Clock, Calendar, ChevronDown, ChevronUp, MapPin, Activity, User, FileText, UserPlus, Sparkles, Thermometer, Snowflake, FileSignature, HandshakeIcon, CheckCircle2, Trash } from 'lucide-react';

const LEAD_SOURCES = [
  'Referral',
  'Website Enquiry',
  'Cold Calling',
  'Meta Leads',
  'LinkedIn Leads',
  'Organic Leads',
];

const getSourceStyles = (source) => {
  switch ((source || '').toLowerCase()) {
    case 'referral':         return { bg: '#EDE9FE', color: '#5B21B6', dot: '#7C3AED' };
    case 'website enquiry': return { bg: '#DBEAFE', color: '#1D4ED8', dot: '#3B82F6' };
    case 'cold calling':    return { bg: '#FEF3C7', color: '#92400E', dot: '#F59E0B' };
    case 'meta leads':      return { bg: '#FCE7F3', color: '#9D174D', dot: '#EC4899' };
    case 'linkedin leads':  return { bg: '#E0F2FE', color: '#075985', dot: '#0EA5E9' };
    case 'organic leads':   return { bg: '#D1FAE5', color: '#065F46', dot: '#10B981' };
    default:                return { bg: '#F1F5F9', color: '#475569', dot: '#94A3B8' };
  }
};

const initialLeadsData = [
  { 
    id: 'LD-1029', 
    date: 'Oct 24, 2026', 
    name: 'John Doe', 
    projectType: 'Commercial Interior', 
    phone: '+1 234 567 8900', 
    source: 'Website Enquiry', 
    budget: '$150k - $200k', 
    status: 'Hot Leads', 
    manager: 'Sarah Smith', 
    followUp: 'Today, 2:00 PM', 
    priority: 'High', 
    notes: 'Interested in open plan layout',
    history: [
      { timestamp: 'Oct 24, 2026 - 10:00 AM', message: 'Lead created from Website form' },
      { timestamp: 'Oct 24, 2026 - 11:15 AM', message: 'Status changed to HOT' },
    ]
  },
  { 
    id: 'LD-1030', 
    date: 'Oct 23, 2026', 
    name: 'Acme Corp', 
    projectType: 'Office Renovation', 
    phone: '+1 987 654 3210', 
    source: 'Referral', 
    budget: '$500k+', 
    status: 'Appointment Fixed', 
    manager: 'Mike Johnson', 
    followUp: 'Tomorrow', 
    priority: 'Medium', 
    notes: 'Needs quote ASAP',
    history: [
      { timestamp: 'Oct 23, 2026 - 09:30 AM', message: 'Lead created from Referral form' },
      { timestamp: 'Oct 23, 2026 - 02:15 PM', message: 'Assigned to manager: Mike Johnson' },
      { timestamp: 'Oct 23, 2026 - 04:00 PM', message: 'Status changed to APPOINTMENT FIXED' },
    ]
  },
  { 
    id: 'LD-1031', 
    date: 'Oct 21, 2026', 
    name: 'Globex Inc', 
    projectType: 'Residential Villa', 
    phone: '+1 555 123 4567', 
    source: 'Cold Calling', 
    budget: '$80k - $120k', 
    status: 'Warm Leads', 
    manager: 'Sarah Smith', 
    followUp: 'Next Week', 
    priority: 'Medium', 
    notes: 'Follow up after holidays',
    history: [
      { timestamp: 'Oct 21, 2026 - 11:00 AM', message: 'Lead created from Cold Calling database' },
      { timestamp: 'Oct 21, 2026 - 01:30 PM', message: 'Status changed to WARM' },
    ]
  },
  { 
    id: 'LD-1032', 
    date: 'Oct 18, 2026', 
    name: 'Stark Industries', 
    projectType: 'Warehouse Build', 
    phone: '+1 444 987 1234', 
    source: 'LinkedIn Leads', 
    budget: 'Pending', 
    status: 'Cold Leads', 
    manager: 'Alex Wong', 
    followUp: 'No Date', 
    priority: 'Low', 
    notes: 'Sent initial brochure',
    history: [
      { timestamp: 'Oct 18, 2026 - 08:45 AM', message: 'Lead created from LinkedIn ad campaign' },
      { timestamp: 'Oct 18, 2026 - 10:15 AM', message: 'Assigned to manager: Alex Wong' },
      { timestamp: 'Oct 18, 2026 - 12:00 PM', message: 'Status changed to COLD' },
    ]
  },
];

const getStatusStyles = (status) => {
  const s = (status || '').toLowerCase();
  switch(s) {
    case 'hot': case 'hot leads': return { bg: '#FEE2E2', color: '#991B1B' };
    case 'warm': case 'warm leads': return { bg: '#FEF3C7', color: '#92400E' };
    case 'cold': case 'cold leads': return { bg: '#E2E8F0', color: '#475569' };
    case 'appointment fixed': return { bg: '#DCFCE7', color: '#166534' };
    case 'new lead': return { bg: '#DBEAFE', color: '#1E40AF' };
    case 'qutation send': case 'quotation send': return { bg: '#E0E7FF', color: '#4338CA' };
    case 'negotation': case 'negotiation': return { bg: '#FEF3C7', color: '#B45309' };
    case 'order confirmed': return { bg: '#DCFCE7', color: '#15803D' };
    case 'junk': return { bg: '#F3F4F6', color: '#374151' };
    default: return { bg: '#F1F5F9', color: '#475569' };
  }
};

const LeadOverviewCard = ({ title, value, subtitle, icon: Icon, color, bg, borderColor, isSelected, onClick }) => (
  <div 
    className="card" 
    onClick={onClick}
    style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '1.25rem', 
      backgroundColor: bg || 'var(--surface-color)', 
      border: isSelected ? `2px solid ${color}` : `1px solid ${borderColor || 'var(--border-color)'}`, 
      boxShadow: isSelected ? `0 6px 14px ${color}25` : '0 2px 4px rgba(0,0,0,0.02)', 
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      transform: isSelected ? 'translateY(-3px)' : 'none',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500', margin: 0 }}>{title}</p>
      <Icon size={18} color={color} />
    </div>
    <div>
      <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>{value}</h3>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>{subtitle}</span>
    </div>
  </div>
);

const LeadManagement = () => {
  const [leads, setLeads] = useState(initialLeadsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [pendingDateRange, setPendingDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [expandedLeadId, setExpandedLeadId] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState('');
  const [newLead, setNewLead] = useState({
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: '', projectType: '', phone: '', budget: '', source: '', status: 'Lead Received', notes: ''
  });

  const [isApptModalOpen, setIsApptModalOpen] = useState(false);
  const [activeApptLeadId, setActiveApptLeadId] = useState(null);
  const [apptDetails, setApptDetails] = useState({
    date: '',
    time: '',
    location: '',
    remark: ''
  });

  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFilter = (filterName) => {
    if (statusFilter === filterName) {
      setStatusFilter('All');
    } else {
      setStatusFilter(filterName);
    }
  };

  const filteredLeads = leads.filter(l => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = (l.name || '').toLowerCase().includes(q);
      const matchId = (l.id || '').toLowerCase().includes(q);
      const matchProj = (l.projectType || '').toLowerCase().includes(q);
      if (!matchName && !matchId && !matchProj) return false;
    }

    if (statusFilter === 'All') return true;
    
    const statusLower = (l.status || '').toLowerCase();
    if (statusFilter === 'New') return statusLower.includes('new') || statusLower.includes('received');
    if (statusFilter === 'Hot') return statusLower.includes('hot');
    if (statusFilter === 'Warm') return statusLower.includes('warm');
    if (statusFilter === 'Cold') return statusLower.includes('cold');
    if (statusFilter === 'Appt. Fixed') return statusLower.includes('appointment') || statusLower.includes('appt');
    if (statusFilter === 'Quotation Send') return statusLower.includes('quot');
    if (statusFilter === 'Negotiation') return statusLower.includes('negot');
    if (statusFilter === 'Order Confirmed') return statusLower.includes('order');
    if (statusFilter === 'Junk') return statusLower.includes('junk');
    
    return true;
  });

  const getFormattedTimestamp = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB'); // e.g. "02/06/2026"
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false }); // e.g. "10:50:16"
    return `${dateStr}, ${timeStr}`;
  };

  const saveNote = (id) => {
    const formattedTime = getFormattedTimestamp();
    setLeads(leads.map(l => {
      if (l.id === id) {
        if (l.notes === editingNoteText) return l;
        const newHistory = [...(l.history || []), {
          timestamp: formattedTime,
          message: `Updated notes: "${editingNoteText}"`
        }];
        return { ...l, notes: editingNoteText, history: newHistory };
      }
      return l;
    }));
    setEditingNoteId(null);
  };

  const updateLeadStatus = (id, newStatus) => {
    const formattedTime = getFormattedTimestamp();
    if (newStatus === 'Appointment Fixed') {
      setActiveApptLeadId(id);
      setIsApptModalOpen(true);
    } else {
      setLeads(leads.map(l => {
        if (l.id === id) {
          if (l.status === newStatus) return l;
          const newHistory = [...(l.history || []), {
            timestamp: formattedTime,
            message: `Updated status to: ${newStatus.toUpperCase()}`
          }];
          return { ...l, status: newStatus, history: newHistory };
        }
        return l;
      }));
    }
  };

  const handleApptSubmit = (e) => {
    e.preventDefault();
    const formattedTime = getFormattedTimestamp();
    setLeads(leads.map(l => {
      if (l.id === activeApptLeadId) {
        const newHistory = [...(l.history || []), {
          timestamp: formattedTime,
          message: `Updated status to: APPT FIXED`
        }];
        if (apptDetails.remark) {
          newHistory.push({
            timestamp: formattedTime,
            message: `Added appointment note: "${apptDetails.remark}"`
          });
        }
        return { 
          ...l, 
          status: 'Appointment Fixed', 
          followUp: `${apptDetails.date}, ${apptDetails.time}`,
          appointmentLocation: apptDetails.location,
          appointmentRemark: apptDetails.remark,
          history: newHistory
        };
      }
      return l;
    }));
    setIsApptModalOpen(false);
    setActiveApptLeadId(null);
    setApptDetails({ date: '', time: '', location: '', remark: '' });
  };

  const cancelApptModal = () => {
    setIsApptModalOpen(false);
    setActiveApptLeadId(null);
    setApptDetails({ date: '', time: '', location: '', remark: '' });
  };

  const updateLeadManager = (id, newManager) => {
    const formattedTime = getFormattedTimestamp();
    setLeads(leads.map(l => {
      if (l.id === id) {
        if (l.manager === newManager) return l;
        const newHistory = [...(l.history || []), {
          timestamp: formattedTime,
          message: `Updated assignTo to: ${newManager}`
        }];
        return { ...l, manager: newManager, history: newHistory };
      }
      return l;
    }));
  };

  const updateLeadSource = (id, newSource) => {
    const formattedTime = getFormattedTimestamp();
    setLeads(leads.map(l => {
      if (l.id === id) {
        if (l.source === newSource) return l;
        const newHistory = [...(l.history || []), {
          timestamp: formattedTime,
          message: `Updated source to: ${newSource.toUpperCase()}`
        }];
        return { ...l, source: newSource, history: newHistory };
      }
      return l;
    }));
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const newId = `LD-${1033 + leads.length}`;
    const formattedTime = getFormattedTimestamp();
    
    const leadToAdd = { 
      ...newLead, 
      id: newId, 
      manager: 'Unassigned', 
      followUp: 'Pending', 
      priority: 'Medium',
      history: [
        { timestamp: formattedTime, message: `Lead created from ${newLead.source || 'Manual Form'}` }
      ]
    };

    setLeads([...leads, leadToAdd]);
    setIsModalOpen(false);
    setNewLead({ 
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      name: '', projectType: '', phone: '', budget: '', source: '', status: 'Lead Received', notes: '' 
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Lead Management</h2>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.5rem 1rem 0.5rem 2.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--surface-color)',
                outline: 'none',
                width: '250px'
              }}
            />
          </div>
          <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem' }}>
            <Filter size={16} /> Filters
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Add New Lead</button>
        </div>
      </div>

      {/* Overview Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-main)' }}>Overview</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-color)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>From</span>
            <input type="date" value={pendingDateRange.start} onChange={(e) => setPendingDateRange({...pendingDateRange, start: e.target.value})} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', color: 'var(--text-main)' }} />
            <span style={{ color: 'var(--text-muted)' }}>-</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>To</span>
            <input type="date" value={pendingDateRange.end} onChange={(e) => setPendingDateRange({...pendingDateRange, end: e.target.value})} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', color: 'var(--text-main)' }} />
            <button
              onClick={() => setDateRange({ ...pendingDateRange })}
              style={{
                marginLeft: '0.5rem',
                padding: '0.3rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: 'var(--primary-color)',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                letterSpacing: '0.3px',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Apply
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
          {/* Row 1 */}
          <LeadOverviewCard 
            title="Total Leads" 
            value={leads.length} 
            subtitle="All leads in system" 
            icon={Users} 
            color="#4F46E5" 
            bg="#EEF4FF" 
            borderColor="#C7D2FE" 
            isSelected={statusFilter === 'All'}
            onClick={() => toggleFilter('All')}
          />
          <LeadOverviewCard 
            title="New Leads" 
            value={leads.filter(l => {
              const s = (l.status||'').toLowerCase();
              return s.includes('new') || s.includes('received');
            }).length} 
            subtitle="Freshly received" 
            icon={Sparkles} 
            color="#0EA5E9" 
            bg="#F0F9FF" 
            borderColor="#BAE6FD" 
            isSelected={statusFilter === 'New'}
            onClick={() => toggleFilter('New')}
          />
          <LeadOverviewCard 
            title="Hot Leads" 
            value={leads.filter(l => (l.status||'').toLowerCase().includes('hot')).length} 
            subtitle="High conversion chance" 
            icon={Flame} 
            color="#E11D48" 
            bg="#FFF1F2" 
            borderColor="#FECDD3" 
            isSelected={statusFilter === 'Hot'}
            onClick={() => toggleFilter('Hot')}
          />
          <LeadOverviewCard 
            title="Warm Leads" 
            value={leads.filter(l => (l.status||'').toLowerCase().includes('warm')).length} 
            subtitle="Nurturing in progress" 
            icon={Thermometer} 
            color="#F97316" 
            bg="#FFF7ED" 
            borderColor="#FED7AA" 
            isSelected={statusFilter === 'Warm'}
            onClick={() => toggleFilter('Warm')}
          />
          <LeadOverviewCard 
            title="Cold Leads" 
            value={leads.filter(l => (l.status||'').toLowerCase().includes('cold')).length} 
            subtitle="Need re-engagement" 
            icon={Snowflake} 
            color="#64748B" 
            bg="#F8FAFC" 
            borderColor="#CBD5E1" 
            isSelected={statusFilter === 'Cold'}
            onClick={() => toggleFilter('Cold')}
          />
          {/* Row 2 */}
          <LeadOverviewCard 
            title="Appt. Fixed" 
            value={leads.filter(l => {
              const s = (l.status||'').toLowerCase();
              return s.includes('appointment') || s.includes('appt');
            }).length} 
            subtitle="Meetings scheduled" 
            icon={CalendarCheck} 
            color="#22C55E" 
            bg="#ECFDF5" 
            borderColor="#BBF7D0" 
            isSelected={statusFilter === 'Appt. Fixed'}
            onClick={() => toggleFilter('Appt. Fixed')}
          />
          <LeadOverviewCard 
            title="Quotation Send" 
            value={leads.filter(l => (l.status||'').toLowerCase().includes('quot')).length} 
            subtitle="Awaiting response" 
            icon={FileText} 
            color="#8B5CF6" 
            bg="#F5F3FF" 
            borderColor="#DDD6FE" 
            isSelected={statusFilter === 'Quotation Send'}
            onClick={() => toggleFilter('Quotation Send')}
          />
          <LeadOverviewCard 
            title="Negotiation" 
            value={leads.filter(l => (l.status||'').toLowerCase().includes('negot')).length} 
            subtitle="In discussion" 
            icon={FileSignature} 
            color="#D97706" 
            bg="#FFFBEB" 
            borderColor="#FDE68A" 
            isSelected={statusFilter === 'Negotiation'}
            onClick={() => toggleFilter('Negotiation')}
          />
          <LeadOverviewCard 
            title="Order Confirmed" 
            value={leads.filter(l => (l.status||'').toLowerCase().includes('order')).length} 
            subtitle="Successfully closed" 
            icon={CheckCircle2} 
            color="#16A34A" 
            bg="#DCFCE7" 
            borderColor="#86EFAC" 
            isSelected={statusFilter === 'Order Confirmed'}
            onClick={() => toggleFilter('Order Confirmed')}
          />
          <LeadOverviewCard 
            title="Junk" 
            value={leads.filter(l => (l.status||'').toLowerCase().includes('junk')).length} 
            subtitle="Unqualified leads" 
            icon={Trash2} 
            color="#94A3B8" 
            bg="#F1F5F9" 
            borderColor="#E2E8F0" 
            isSelected={statusFilter === 'Junk'}
            onClick={() => toggleFilter('Junk')}
          />
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', minWidth: '1100px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ width: '40px', padding: '0.75rem 0.5rem', textAlign: 'center' }}></th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Date</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Lead ID</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Customer Name</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Services</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Phone Number</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Lead Source</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Assign To</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Follow-up</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Actions</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => (
              <React.Fragment key={lead.id}>
              <tr style={{ borderBottom: (index === leads.length - 1 && expandedLeadId !== lead.id) ? 'none' : '1px solid var(--border-color)', backgroundColor: expandedLeadId === lead.id ? 'rgba(79, 70, 229, 0.02)' : 'transparent' }}>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                  <button onClick={() => setExpandedLeadId(expandedLeadId === lead.id ? null : lead.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {expandedLeadId === lead.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.date}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', fontWeight: '500', color: 'var(--primary-color)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.id}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', fontWeight: '600', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.name}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-main)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.projectType}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.phone}</td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: getSourceStyles(lead.source).bg, borderRadius: '9999px', padding: '0.2rem 0.1rem 0.2rem 0.6rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: getSourceStyles(lead.source).dot, flexShrink: 0 }} />
                    <select
                      value={lead.source}
                      onChange={(e) => updateLeadSource(lead.id, e.target.value)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        color: getSourceStyles(lead.source).color,
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px',
                        paddingRight: '1.2rem',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${getSourceStyles(lead.source).color.replace('#', '')}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.25rem center',
                        backgroundSize: '0.55rem auto',
                      }}
                    >
                      {LEAD_SOURCES.map(src => (
                        <option key={src} value={src}>{src.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <select 
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    style={{
                      padding: '0.25rem 1.5rem 0.25rem 0.75rem',
                      borderRadius: '9999px',
                      border: '1px solid transparent',
                      fontSize: '0.65rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      backgroundColor: getStatusStyles(lead.status).bg,
                      color: getStatusStyles(lead.status).color,
                      cursor: 'pointer',
                      outline: 'none',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${getStatusStyles(lead.status).color.replace('#', '')}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '0.65rem auto'
                    }}
                  >
                    <option value="New Lead">NEW LEAD</option>
                    <option value="Hot Leads">HOT</option>
                    <option value="Warm Leads">WARM</option>
                    <option value="Cold Leads">COLD</option>
                    <option value="Appointment Fixed">APPT FIXED</option>
                    <option value="Quotation Send">QUOTATION SEND</option>
                    <option value="Negotiation">NEGOTIATION</option>
                    <option value="Order Confirmed">ORDER CONFIRMED</option>
                    <option value="Junk">JUNK</option>
                  </select>
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <select 
                    value={lead.manager}
                    onChange={(e) => updateLeadManager(lead.id, e.target.value)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.8125rem',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Sarah Smith">Sarah Smith</option>
                    <option value="Mike Johnson">Mike Johnson</option>
                    <option value="Alex Wong">Alex Wong</option>
                  </select>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.followUp}</td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <button title="Call" style={{ background: '#E0E7FF', border: 'none', color: 'var(--primary-color)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Phone size={12} />
                    </button>
                    <button title="Mail" style={{ background: '#E0E7FF', border: 'none', color: 'var(--primary-color)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Mail size={12} />
                    </button>
                    <button title="Edit" style={{ background: '#E0E7FF', border: 'none', color: 'var(--primary-color)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Edit2 size={12} />
                    </button>
                    <button title="Delete" onClick={() => setLeads(leads.filter(l => l.id !== lead.id))} style={{ background: '#FEE2E2', border: 'none', color: 'var(--danger-color, #991B1B)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '120px' }}>
                  {editingNoteId === lead.id ? (
                    <input
                      autoFocus
                      type="text"
                      value={editingNoteText}
                      onChange={(e) => setEditingNoteText(e.target.value)}
                      onBlur={() => saveNote(lead.id)}
                      onKeyDown={(e) => e.key === 'Enter' && saveNote(lead.id)}
                      style={{ width: '100%', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--primary-color)', outline: 'none', fontSize: '0.8125rem' }}
                    />
                  ) : (
                    <div 
                      onClick={() => { setEditingNoteId(lead.id); setEditingNoteText(lead.notes || ''); }}
                      title="Click to edit notes"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden' }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.notes || 'Add note...'}</span>
                      <Edit2 size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
                    </div>
                  )}
                </td>
              </tr>
              {expandedLeadId === lead.id && (
                <tr style={{ backgroundColor: 'rgba(79, 70, 229, 0.02)' }}>
                  <td colSpan="12" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ padding: '1.5rem 2rem', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)' }}>Lead Change History & Notes</h4>
                      
                      <div style={{ position: 'relative', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        {/* Vertical line tracker */}
                        <div style={{ position: 'absolute', left: '6px', top: '6px', bottom: '6px', width: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 }} />
                        
                        {(lead.history || []).map((h, i) => (
                          <div key={i} style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8125rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                            {/* Bullet dot */}
                            <div style={{ 
                              position: 'absolute', 
                              left: '-22px', 
                              top: '4px', 
                              width: '8px', 
                              height: '8px', 
                              borderRadius: '50%', 
                              backgroundColor: 'var(--primary-color)', 
                              border: '2px solid white', 
                              boxShadow: '0 0 0 2px var(--primary-color)',
                              zIndex: 2 
                            }} />
                            {/* Timestamp */}
                            <span style={{ color: 'var(--text-muted)', width: '150px', flexShrink: 0, fontWeight: '500', whiteSpace: 'nowrap' }}>
                              {h.timestamp}
                            </span>
                            {/* Message text */}
                            <span style={{ color: 'var(--text-main)', fontWeight: '500', lineHeight: '1.4' }}>
                              {h.message}
                            </span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </td>
                </tr>
              )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add New Lead Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Add New Lead</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddLead} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Customer Name</label>
                <input required value={newLead.name} onChange={(e) => setNewLead({...newLead, name: e.target.value})} type="text" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Services</label>
                  <select required value={newLead.projectType} onChange={(e) => setNewLead({...newLead, projectType: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <option value="">Select type</option>
                    <option value="Commercial Interior">Commercial Interior</option>
                    <option value="Office Renovation">Office Renovation</option>
                    <option value="Residential Villa">Residential Villa</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Phone Number</label>
                  <input required value={newLead.phone} onChange={(e) => setNewLead({...newLead, phone: e.target.value})} type="text" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Lead Source</label>
                   <select required value={newLead.source} onChange={(e) => setNewLead({...newLead, source: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                     <option value="">Select source</option>
                     {LEAD_SOURCES.map(src => (
                       <option key={src} value={src}>{src}</option>
                     ))}
                   </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Notes</label>
                <textarea rows="3" value={newLead.notes} onChange={(e) => setNewLead({...newLead, notes: e.target.value})} placeholder="Any additional context..." style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', resize: 'vertical' }}></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Fixed Modal */}
      {isApptModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Schedule Appointment</h3>
              <button onClick={cancelApptModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleApptSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Appointment from (Date)</label>
                  <input required value={apptDetails.date} onChange={(e) => setApptDetails({...apptDetails, date: e.target.value})} type="date" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Meeting timing (Time)</label>
                  <input required value={apptDetails.time} onChange={(e) => setApptDetails({...apptDetails, time: e.target.value})} type="time" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Location / Address</label>
                <input required value={apptDetails.location} onChange={(e) => setApptDetails({...apptDetails, location: e.target.value})} type="text" placeholder="Office address or site location..." style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Remark</label>
                <textarea rows="3" value={apptDetails.remark} onChange={(e) => setApptDetails({...apptDetails, remark: e.target.value})} placeholder="Any notes for the meeting..." style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', resize: 'vertical' }}></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={cancelApptModal} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;
