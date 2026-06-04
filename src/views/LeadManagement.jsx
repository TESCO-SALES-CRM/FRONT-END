import React, { useState, useEffect } from 'react';
import { Search, Filter, Phone, MoreVertical, X, Edit2, Mail, Trash2, Users, Flame, CalendarCheck, Clock, Calendar, ChevronDown, ChevronUp, MapPin, Activity, User, FileText, UserPlus, Sparkles, Thermometer, Snowflake, FileSignature, HandshakeIcon, CheckCircle2, Trash, Send, ArrowUpDown } from 'lucide-react';
import { useToast } from '../components/Toast';

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
    projectType: 'PEB', 
    phone: '+1 234 567 8900', 
    source: 'Website Enquiry', 
    budget: '₹150k - ₹200k', 
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
    projectType: 'Tensile', 
    phone: '+1 987 654 3210', 
    source: 'Referral', 
    budget: '₹500k+', 
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
    projectType: 'Other roofing', 
    phone: '+1 555 123 4567', 
    source: 'Cold Calling', 
    budget: '₹80k - ₹120k', 
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
    projectType: 'PEB', 
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
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('crm_leads');
    return saved ? JSON.parse(saved) : initialLeadsData;
  });

  useEffect(() => {
    localStorage.setItem('crm_leads', JSON.stringify(leads));
  }, [leads]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [pendingDateRange, setPendingDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

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

  const [selectedLeadForTimeline, setSelectedLeadForTimeline] = useState(null);
  const [timelineSortOrder, setTimelineSortOrder] = useState('desc'); // 'desc' (newest first) or 'asc' (oldest first)
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);
  const [remarkLeadId, setRemarkLeadId] = useState(null);
  const [remarkNewStatus, setRemarkNewStatus] = useState('');
  const [remarkText, setRemarkText] = useState('');

  const [isGenQuoteModalOpen, setIsGenQuoteModalOpen] = useState(false);
  const [genQuoteLeadId, setGenQuoteLeadId] = useState(null);
  const [genQuoteDetails, setGenQuoteDetails] = useState({
    leadId: '',
    client: '',
    project: '',
    approvalStatus: 'Pending',
    quotationStatus: 'In Preparation',
    amount: '',
    gst: ''
  });

  const addToast = useToast();

  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [headerFilters, setHeaderFilters] = useState({
    services: 'All',
    source: 'All',
    assignTo: 'All'
  });

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

    if (statusFilter !== 'All') {
      const statusLower = (l.status || '').toLowerCase();
      let matchesStatus = false;
      if (statusFilter === 'New') {
        matchesStatus = statusLower.includes('new') || statusLower.includes('received');
      } else if (statusFilter === 'Hot') {
        matchesStatus = statusLower.includes('hot');
      } else if (statusFilter === 'Warm') {
        matchesStatus = statusLower.includes('warm');
      } else if (statusFilter === 'Cold') {
        matchesStatus = statusLower.includes('cold');
      } else if (statusFilter === 'Appt. Fixed') {
        matchesStatus = statusLower.includes('appointment') || statusLower.includes('appt');
      } else if (statusFilter === 'Quotation Send') {
        matchesStatus = statusLower.includes('quot');
      } else if (statusFilter === 'Negotiation') {
        matchesStatus = statusLower.includes('negot');
      } else if (statusFilter === 'Order Confirmed') {
        matchesStatus = statusLower.includes('order');
      } else if (statusFilter === 'Junk') {
        matchesStatus = statusLower.includes('junk');
      }
      if (!matchesStatus) return false;
    }

    if (headerFilters.services !== 'All') {
      if (l.projectType !== headerFilters.services) return false;
    }

    if (headerFilters.source !== 'All') {
      if (l.source !== headerFilters.source) return false;
    }

    if (headerFilters.assignTo !== 'All') {
      if (l.manager !== headerFilters.assignTo) return false;
    }

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
        const updatedLead = { ...l, notes: editingNoteText, history: newHistory };
        if (selectedLeadForTimeline && selectedLeadForTimeline.id === id) {
          setSelectedLeadForTimeline(updatedLead);
        }
        return updatedLead;
      }
      return l;
    }));
    setEditingNoteId(null);
  };

  const updateLeadStatus = (id, newStatus) => {
    const lead = leads.find(l => l.id === id);
    if (!lead || lead.status === newStatus) return;

    if (newStatus === 'Appointment Fixed') {
      setActiveApptLeadId(id);
      setIsApptModalOpen(true);
    } else if (newStatus === 'Quotation Send') {
      setGenQuoteLeadId(id);
      setGenQuoteDetails({
        leadId: lead.id,
        client: lead.name || '',
        project: lead.projectType || '',
        approvalStatus: 'Pending',
        quotationStatus: 'In Preparation',
        amount: '',
        gst: ''
      });
      setIsGenQuoteModalOpen(true);
    } else {
      setRemarkLeadId(id);
      setRemarkNewStatus(newStatus);
      setRemarkText('');
      setIsRemarkModalOpen(true);
    }
  };

  const handleRemarkSubmit = (e) => {
    e.preventDefault();
    const formattedTime = getFormattedTimestamp();

    setLeads(leads.map(l => {
      if (l.id === remarkLeadId) {
        const newHistory = [...(l.history || []), {
          timestamp: formattedTime,
          message: `Updated status to: ${remarkNewStatus.toUpperCase()}`,
          remark: remarkText.trim()
        }];
        const updatedLead = { ...l, status: remarkNewStatus, history: newHistory };
        if (selectedLeadForTimeline && selectedLeadForTimeline.id === remarkLeadId) {
          setSelectedLeadForTimeline(updatedLead);
        }
        return updatedLead;
      }
      return l;
    }));

    setIsRemarkModalOpen(false);
    setRemarkLeadId(null);
    setRemarkNewStatus('');
    setRemarkText('');
    addToast('Status updated successfully!', 'success');
  };

  const cancelRemarkModal = () => {
    setIsRemarkModalOpen(false);
    setRemarkLeadId(null);
    setRemarkNewStatus('');
    setRemarkText('');
  };

  const handleApptSubmit = (e) => {
    e.preventDefault();
    const formattedTime = getFormattedTimestamp();
    setLeads(leads.map(l => {
      if (l.id === activeApptLeadId) {
        const newHistory = [...(l.history || []), {
          timestamp: formattedTime,
          message: `Updated status to: APPT FIXED`,
          remark: apptDetails.remark ? apptDetails.remark.trim() : undefined
        }];
        const updatedLead = { 
          ...l, 
          status: 'Appointment Fixed', 
          followUp: `${apptDetails.date}, ${apptDetails.time}`,
          appointmentLocation: apptDetails.location,
          appointmentRemark: apptDetails.remark,
          history: newHistory
        };
        if (selectedLeadForTimeline && selectedLeadForTimeline.id === activeApptLeadId) {
          setSelectedLeadForTimeline(updatedLead);
        }
        return updatedLead;
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

  const handleGenQuoteSubmit = (e) => {
    e.preventDefault();
    const formattedTime = getFormattedTimestamp();

    // Ensure amount and gst have ₹ symbol
    const formattedAmount = genQuoteDetails.amount.startsWith('₹') ? genQuoteDetails.amount : `₹${genQuoteDetails.amount}`;
    const formattedGst = genQuoteDetails.gst.startsWith('₹') ? genQuoteDetails.gst : `₹${genQuoteDetails.gst}`;

    // Read existing quotes from localStorage to calculate new ID
    const initialQuotesDataFallback = [
      { id: 'QT-5001', leadId: 'LD-1001', client: 'Acme Corp', project: 'PEB', amount: '₹500,000', gst: '₹90,000', approvalStatus: 'Approved', quotationStatus: 'Prepared', revision: 'Rev 1', fileName: 'acme_renovation_final.pdf' },
      { id: 'QT-5002', leadId: 'LD-1002', client: 'John Doe', project: 'Tensile', amount: '₹150,000', gst: '₹27,000', approvalStatus: 'Pending', quotationStatus: 'Prepared', revision: 'Rev 3', fileName: null },
      { id: 'QT-5003', leadId: 'LD-1003', client: 'Stark Industries', project: 'Other roofing', amount: '₹1,200,000', gst: '₹216,000', approvalStatus: 'Pending', quotationStatus: 'In Preparation', revision: 'Rev 0', fileName: null },
      { id: 'QT-5004', leadId: 'LD-1004', client: 'Wayne Enterprises', project: 'PEB', amount: '₹850,000', gst: '₹153,000', approvalStatus: 'Approved', quotationStatus: 'Prepared', revision: 'Rev 2', fileName: 'wayne_manor_proposal.pdf' },
      { id: 'QT-5005', leadId: 'LD-1005', client: 'Oscorp Labs', project: 'Tensile', amount: '₹320,000', gst: '₹57,600', approvalStatus: 'Approved', quotationStatus: 'Prepared', revision: 'Rev 1', fileName: null },
      { id: 'QT-5006', leadId: 'LD-1006', client: 'LexCorp', project: 'Other roofing', amount: '₹450,000', gst: '₹81,000', approvalStatus: 'Pending', quotationStatus: 'In Preparation', revision: 'Rev 1', fileName: null },
    ];
    const savedQuotesStr = localStorage.getItem('crm_quotes');
    const existingQuotes = savedQuotesStr ? JSON.parse(savedQuotesStr) : initialQuotesDataFallback;
    const newQuoteId = `QT-${5001 + existingQuotes.length}`;

    // Append new quote to quotes list in localStorage
    const newQuoteObj = {
      id: newQuoteId,
      leadId: genQuoteLeadId,
      client: genQuoteDetails.client,
      project: genQuoteDetails.project,
      amount: formattedAmount,
      gst: formattedGst,
      approvalStatus: genQuoteDetails.approvalStatus,
      quotationStatus: genQuoteDetails.quotationStatus,
      revision: 'Rev 0',
      fileName: null
    };
    const updatedQuotes = [...existingQuotes, newQuoteObj];
    localStorage.setItem('crm_quotes', JSON.stringify(updatedQuotes));

    // Update the lead's status & history timeline log
    setLeads(leads.map(l => {
      if (l.id === genQuoteLeadId) {
        const historyMessage = `Generated quotation ${newQuoteId} - Amount: ${formattedAmount}, Approval: ${genQuoteDetails.approvalStatus}, Status: ${genQuoteDetails.quotationStatus}`;
        const newHistory = [...(l.history || []), {
          timestamp: formattedTime,
          message: `Updated status to: QUOTATION SEND`,
          remark: historyMessage
        }];
        const updatedLead = { ...l, status: 'Quotation Send', history: newHistory };
        if (selectedLeadForTimeline && selectedLeadForTimeline.id === genQuoteLeadId) {
          setSelectedLeadForTimeline(updatedLead);
        }
        return updatedLead;
      }
      return l;
    }));

    setIsGenQuoteModalOpen(false);
    setGenQuoteLeadId(null);
    setGenQuoteDetails({
      leadId: '',
      client: '',
      project: '',
      approvalStatus: 'Pending',
      quotationStatus: 'In Preparation',
      amount: '',
      gst: ''
    });

    addToast('Quotation generated successfully!', 'success');
  };

  const cancelGenQuoteModal = () => {
    setIsGenQuoteModalOpen(false);
    setGenQuoteLeadId(null);
    setGenQuoteDetails({
      leadId: '',
      client: '',
      project: '',
      approvalStatus: 'Pending',
      quotationStatus: 'In Preparation',
      amount: '',
      gst: ''
    });
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
        const updatedLead = { ...l, manager: newManager, history: newHistory };
        if (selectedLeadForTimeline && selectedLeadForTimeline.id === id) {
          setSelectedLeadForTimeline(updatedLead);
        }
        return updatedLead;
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
        const updatedLead = { ...l, source: newSource, history: newHistory };
        if (selectedLeadForTimeline && selectedLeadForTimeline.id === id) {
          setSelectedLeadForTimeline(updatedLead);
        }
        return updatedLead;
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
      <style>{`
        .lead-row {
          transition: background-color 0.15s ease;
        }
        .lead-row:hover {
          background-color: rgba(79, 70, 229, 0.03) !important;
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
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
                 <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Date</th>
                 <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Lead ID</th>
                 <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Customer Name</th>
                 <th style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <select
                    value={headerFilters.services}
                    onChange={(e) => setHeaderFilters({ ...headerFilters, services: e.target.value })}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0px center',
                      backgroundSize: '0.45rem auto',
                      paddingRight: '0.75rem',
                      textAlignLast: 'center',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="All" style={{ color: 'var(--text-main)' }}>SERVICES (ALL)</option>
                    <option value="PEB" style={{ color: 'var(--text-main)' }}>PEB</option>
                    <option value="Tensile" style={{ color: 'var(--text-main)' }}>TENSILE</option>
                    <option value="Other roofing" style={{ color: 'var(--text-main)' }}>OTHER ROOFING</option>
                  </select>
                </th>
                 <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Phone Number</th>
                 <th style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <select
                    value={headerFilters.source}
                    onChange={(e) => setHeaderFilters({ ...headerFilters, source: e.target.value })}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0px center',
                      backgroundSize: '0.45rem auto',
                      paddingRight: '0.75rem',
                      textAlignLast: 'center',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="All" style={{ color: 'var(--text-main)' }}>LEAD SOURCE (ALL)</option>
                    {LEAD_SOURCES.map(src => (
                      <option key={src} value={src} style={{ color: 'var(--text-main)' }}>{src.toUpperCase()}</option>
                    ))}
                  </select>
                </th>
                 <th style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0px center',
                      backgroundSize: '0.45rem auto',
                      paddingRight: '0.75rem',
                      textAlignLast: 'center',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="All" style={{ color: 'var(--text-main)' }}>STATUS (ALL)</option>
                    <option value="New" style={{ color: 'var(--text-main)' }}>NEW LEAD</option>
                    <option value="Hot" style={{ color: 'var(--text-main)' }}>HOT</option>
                    <option value="Warm" style={{ color: 'var(--text-main)' }}>WARM</option>
                    <option value="Cold" style={{ color: 'var(--text-main)' }}>COLD</option>
                    <option value="Appt. Fixed" style={{ color: 'var(--text-main)' }}>APPT FIXED</option>
                    <option value="Quotation Send" style={{ color: 'var(--text-main)' }}>QUOTATION SEND</option>
                    <option value="Negotiation" style={{ color: 'var(--text-main)' }}>NEGOTIATION</option>
                    <option value="Order Confirmed" style={{ color: 'var(--text-main)' }}>ORDER CONFIRMED</option>
                    <option value="Junk" style={{ color: 'var(--text-main)' }}>JUNK</option>
                  </select>
                </th>
                 <th style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <select
                    value={headerFilters.assignTo}
                    onChange={(e) => setHeaderFilters({ ...headerFilters, assignTo: e.target.value })}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0px center',
                      backgroundSize: '0.45rem auto',
                      paddingRight: '0.75rem',
                      textAlignLast: 'center',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="All" style={{ color: 'var(--text-main)' }}>ASSIGN TO (ALL)</option>
                    <option value="Unassigned" style={{ color: 'var(--text-main)' }}>UNASSIGNED</option>
                    <option value="Sarah Smith" style={{ color: 'var(--text-main)' }}>SARAH SMITH</option>
                    <option value="Mike Johnson" style={{ color: 'var(--text-main)' }}>MIKE JOHNSON</option>
                    <option value="Alex Wong" style={{ color: 'var(--text-main)' }}>ALEX WONG</option>
                  </select>
                </th>
                 <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Follow-up</th>
                 <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Actions</th>
                 <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => (
              <React.Fragment key={lead.id}>
              <tr 
                onClick={() => setSelectedLeadForTimeline(lead)}
                className="lead-row"
                style={{ 
                  borderBottom: index === leads.length - 1 ? 'none' : '1px solid var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.date}</td>
                <td 
                  style={{ 
                    padding: '0.75rem 1rem', 
                    fontSize: '0.8125rem', 
                    fontWeight: '600', 
                    color: 'var(--secondary-color)', 
                    textAlign: 'center', 
                    whiteSpace: 'nowrap'
                  }}
                  title="Lead ID"
                >
                  {lead.id}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', fontWeight: '600', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.name}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-main)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.projectType}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.phone}</td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
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
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
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
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
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
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <button 
                      title="Timeline & Notes" 
                      onClick={(e) => { e.stopPropagation(); setSelectedLeadForTimeline(lead); }}
                      style={{ 
                        background: 'var(--primary-color)', 
                        border: 'none', 
                        color: 'white', 
                        width: '28px', 
                        height: '28px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Activity size={12} />
                    </button>
                    <button title="Edit" style={{ background: '#E0E7FF', border: 'none', color: 'var(--primary-color)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Edit2 size={12} />
                    </button>
                    <button title="Delete" onClick={() => setLeads(leads.filter(l => l.id !== lead.id))} style={{ background: '#FEE2E2', border: 'none', color: 'var(--danger-color, #991B1B)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '120px' }} onClick={(e) => e.stopPropagation()}>
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
                  <select required value={newLead.projectType} onChange={(e) => setNewLead({...newLead, projectType: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-main)', outline: 'none' }}>
                    <option value="">Select type</option>
                    <option value="PEB">PEB</option>
                    <option value="Tensile">Tensile</option>
                    <option value="Other roofing">Other roofing</option>
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

      {/* Generate Quotation Modal */}
      {isGenQuoteModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          animation: 'fadeInBackdrop 0.25s ease-out'
        }}>
          <div className="card" style={{ 
            width: '100%', 
            maxWidth: '560px', 
            padding: '2rem', 
            animation: 'scaleIn 0.25s ease-out',
            backgroundColor: 'var(--surface-color)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderRadius: 'var(--radius-lg)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: '1.5rem', 
                fontFamily: 'Poppins, sans-serif', 
                color: '#1E293B', 
                fontWeight: '700' 
              }}>
                Generate Quotation
              </h3>
              <button 
                onClick={cancelGenQuoteModal} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: 'var(--text-muted)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '0.25rem', 
                  borderRadius: '50%', 
                  transition: 'background-color 0.2s' 
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleGenQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Row 1: Lead ID | Client Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#64748B' }}>
                    Lead ID
                  </label>
                  <input 
                    readOnly 
                    value={genQuoteDetails.leadId} 
                    type="text" 
                    placeholder="e.g. LD-1007" 
                    style={{ 
                      width: '100%', 
                      padding: '0.625rem 0.875rem', 
                      borderRadius: 'var(--radius-md)', 
                      border: '1px solid var(--border-color)', 
                      outline: 'none',
                      backgroundColor: '#F8FAFC',
                      color: '#64748B',
                      cursor: 'not-allowed',
                      fontSize: '0.875rem'
                    }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#64748B' }}>
                    Client Name
                  </label>
                  <input 
                    required 
                    value={genQuoteDetails.client} 
                    onChange={(e) => setGenQuoteDetails({...genQuoteDetails, client: e.target.value})} 
                    type="text" 
                    placeholder="e.g. Acme Corp" 
                    style={{ 
                      width: '100%', 
                      padding: '0.625rem 0.875rem', 
                      borderRadius: 'var(--radius-md)', 
                      border: '1px solid var(--border-color)', 
                      outline: 'none',
                      fontSize: '0.875rem',
                      color: 'var(--text-main)',
                      transition: 'border-color 0.2s'
                    }} 
                    onFocus={(e) => e.target.style.borderColor = 'var(--secondary-color)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
              </div>

              {/* Row 2: Services */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#64748B' }}>
                  Services
                </label>
                <select 
                  required 
                  value={genQuoteDetails.project} 
                  onChange={(e) => setGenQuoteDetails({...genQuoteDetails, project: e.target.value})} 
                  style={{ 
                    width: '100%', 
                    padding: '0.625rem 0.875rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid var(--border-color)', 
                    backgroundColor: 'var(--surface-color)', 
                    color: 'var(--text-main)', 
                    outline: 'none',
                    fontSize: '0.875rem',
                    transition: 'border-color 0.2s',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--secondary-color)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                >
                  <option value="">Select type</option>
                  <option value="PEB">PEB</option>
                  <option value="Tensile">Tensile</option>
                  <option value="Other roofing">Other roofing</option>
                </select>
              </div>

              {/* Row 4: Amount | GST Amount */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#64748B' }}>
                    Amount (ex. GST)
                  </label>
                  <input 
                    required 
                    value={genQuoteDetails.amount} 
                    onChange={(e) => setGenQuoteDetails({...genQuoteDetails, amount: e.target.value})} 
                    type="text" 
                    placeholder="e.g. ₹100,000" 
                    style={{ 
                      width: '100%', 
                      padding: '0.625rem 0.875rem', 
                      borderRadius: 'var(--radius-md)', 
                      border: '1px solid var(--border-color)',
                      outline: 'none',
                      fontSize: '0.875rem',
                      color: 'var(--text-main)',
                      transition: 'border-color 0.2s'
                    }} 
                    onFocus={(e) => e.target.style.borderColor = 'var(--secondary-color)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#64748B' }}>
                    GST Amount
                  </label>
                  <input 
                    required 
                    value={genQuoteDetails.gst} 
                    onChange={(e) => setGenQuoteDetails({...genQuoteDetails, gst: e.target.value})} 
                    type="text" 
                    placeholder="e.g. ₹18,000" 
                    style={{ 
                      width: '100%', 
                      padding: '0.625rem 0.875rem', 
                      borderRadius: 'var(--radius-md)', 
                      border: '1px solid var(--border-color)',
                      outline: 'none',
                      fontSize: '0.875rem',
                      color: 'var(--text-main)',
                      transition: 'border-color 0.2s'
                    }} 
                    onFocus={(e) => e.target.style.borderColor = 'var(--secondary-color)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  onClick={cancelGenQuoteModal} 
                  className="btn btn-outline"
                  style={{
                    padding: '0.625rem 1.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn"
                  style={{
                    padding: '0.625rem 1.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#2E2A72',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Change Remark Modal */}
      {isRemarkModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
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
                    color: getStatusStyles(remarkNewStatus).color, 
                    backgroundColor: getStatusStyles(remarkNewStatus).bg,
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
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    color: 'var(--text-main)',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--secondary-color)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                ></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={cancelRemarkModal} 
                  className="btn btn-outline"
                  style={{ padding: '0.5rem 1.25rem' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 1.25rem' }}
                >
                  Save Status
                </button>
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

      {/* Slide-out Timeline Drawer */}
      {selectedLeadForTimeline && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'flex-end', // Anchored right, so drawer sits on the right
          animation: 'fadeInBackdrop 0.25s ease-out'
        }}
        onClick={() => setSelectedLeadForTimeline(null)} // Click outside to close
        >
          <div style={{
            width: '100%',
            maxWidth: '460px',
            height: '100%',
            backgroundColor: 'var(--surface-color)',
            boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1001,
            animation: 'slideInRightToLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            borderLeft: '1px solid var(--border-color)',
            overflow: 'hidden'
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking drawer content
          >
            <style>{`
              @keyframes fadeInBackdrop {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slideInRightToLeft {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
              }
              @keyframes timelineFadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .timeline-scroll::-webkit-scrollbar {
                width: 6px;
              }
              .timeline-scroll::-webkit-scrollbar-track {
                background: transparent;
              }
              .timeline-scroll::-webkit-scrollbar-thumb {
                background: #CBD5E1;
                border-radius: 3px;
              }
              .timeline-scroll::-webkit-scrollbar-thumb:hover {
                background: #94A3B8;
              }
            `}</style>
            
            {/* Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid var(--border-color)',
              backgroundColor: 'var(--surface-color)',
              color: 'var(--text-main)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  Lead Change History & Notes
                </h3>
              </div>
              <button 
                onClick={() => setSelectedLeadForTimeline(null)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: 'var(--text-muted)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#F1F5F9';
                  e.currentTarget.style.color = 'var(--text-main)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Drawer Body Scrollable */}
            <div className="timeline-scroll" style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              backgroundColor: '#F8FAFC'
            }}>


              {/* Timeline Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    Change History & Logs
                  </h4>
                  <button
                    onClick={() => setTimelineSortOrder(timelineSortOrder === 'desc' ? 'asc' : 'desc')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--secondary-color)',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    <ArrowUpDown size={12} /> {timelineSortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
                  </button>
                </div>

                <div style={{
                  position: 'relative',
                  paddingLeft: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  marginTop: '0.5rem'
                }}>
                  {/* Continuous Timeline Vertical Line */}
                  <div style={{
                    position: 'absolute',
                    left: '8px',
                    top: '8px',
                    bottom: '8px',
                    width: '2px',
                    backgroundColor: 'var(--border-color)'
                  }} />

                  {/* Sort & Map Timeline entries */}
                  {(() => {
                    const historyList = [...(selectedLeadForTimeline.history || [])]
                      .filter(h => {
                        const m = h.message.toLowerCase();
                        return m.includes('status') || m.includes('created') || m.includes('received');
                      });

                    if (timelineSortOrder === 'desc') {
                      historyList.reverse();
                    }
                    
                    if (historyList.length === 0) {
                      return (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic', padding: '1rem 0' }}>
                          No status tracking logs recorded yet.
                        </div>
                      );
                    }

                    return historyList.map((h, i) => {
                      // Determine icon and color styling based on status tracking event
                      let Icon = FileText;
                      let iconBg = '#F1F5F9';
                      let iconColor = '#64748B';

                      const msg = h.message.toLowerCase();

                      if (msg.includes('created') || msg.includes('received')) {
                        Icon = UserPlus;
                        iconBg = '#DCFCE7';
                        iconColor = '#16A34A';
                      } else if (msg.includes('hot')) {
                        Icon = Flame;
                        iconBg = '#FEE2E2';
                        iconColor = '#DC2626';
                      } else if (msg.includes('cold')) {
                        Icon = Snowflake;
                        iconBg = '#F1F5F9';
                        iconColor = '#475569';
                      } else if (msg.includes('warm')) {
                        Icon = Thermometer;
                        iconBg = '#FEF3C7';
                        iconColor = '#D97706';
                      } else if (msg.includes('appointment') || msg.includes('appt')) {
                        Icon = CalendarCheck;
                        iconBg = '#ECFDF5';
                        iconColor = '#10B981';
                      } else if (msg.includes('quotation') || msg.includes('quot')) {
                        Icon = FileText;
                        iconBg = '#E0E7FF';
                        iconColor = '#4F46E5';
                      } else if (msg.includes('negotiation') || msg.includes('negot')) {
                        Icon = FileSignature;
                        iconBg = '#FFFBEB';
                        iconColor = '#D97706';
                      } else if (msg.includes('order confirmed') || msg.includes('confirmed') || msg.includes('order')) {
                        Icon = CheckCircle2;
                        iconBg = '#DCFCE7';
                        iconColor = '#16A34A';
                      } else if (msg.includes('junk')) {
                        Icon = Trash2;
                        iconBg = '#F3F4F6';
                        iconColor = '#4B5563';
                      } else if (msg.includes('status')) {
                        Icon = Activity;
                        iconBg = '#EEF2FF';
                        iconColor = '#4F46E5';
                      }

                      return (
                        <div 
                          key={i} 
                          style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '0.25rem', 
                            fontSize: '0.8125rem',
                            position: 'relative',
                            animation: 'timelineFadeIn 0.25s ease-out'
                          }}
                        >
                          {/* Node Icon Ball */}
                          <div style={{
                            position: 'absolute',
                            left: '-37px',
                            top: '2px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: iconBg,
                            border: '2.5px solid #FFFFFF',
                            boxShadow: '0 0 0 1.5px ' + iconColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2
                          }}>
                            <Icon size={9} color={iconColor} strokeWidth={2.5} />
                          </div>

                          {/* Timeline Text Card */}
                          <div style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.75rem',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem'
                          }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '600' }}>
                              {h.timestamp}
                            </span>
                            <span style={{ color: 'var(--text-main)', fontWeight: '500', lineHeight: '1.4' }}>
                              {h.message}
                            </span>
                            {h.remark && (
                              <div style={{ 
                                display: 'block', 
                                borderLeft: '3px solid var(--secondary-color)', 
                                paddingLeft: '0.6rem', 
                                marginTop: '0.35rem', 
                                color: 'var(--text-muted)', 
                                fontStyle: 'italic', 
                                fontSize: '0.75rem',
                                lineHeight: '1.4'
                              }}>
                                &ldquo;{h.remark}&rdquo;
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;
