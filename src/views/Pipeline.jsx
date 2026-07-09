import React, { useState, useEffect } from 'react';
import { Search, Filter, Phone, MoreVertical, X, Edit2, Mail, Trash2, Users, Flame, CalendarCheck, Clock, Calendar, ChevronDown, ChevronUp, MapPin, Activity, User, FileText, UserPlus, Sparkles, Thermometer, Snowflake, FileSignature, HandshakeIcon, CheckCircle2, Trash, Send, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../components/Toast';
import AddNewLeadWizard from '../components/AddNewLeadWizard';
import LeadDetailsDrawer from '../components/LeadDetailsDrawer';
import { useNavigate } from 'react-router-dom';

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
    id: 'LD-1001',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: 'Reference Lead',
    type: 'new leads',
    projectType: 'PEB',
    phone: '+91 90000 00000',
    source: 'Website Enquiry',
    budget: '₹100k',
    status: 'New Lead',
    manager: 'Unassigned',
    followUp: 'No Date',
    priority: 'Medium',
    notes: 'Sample reference lead.',
    history: [
      { timestamp: new Date().toLocaleDateString('en-GB') + ', ' + new Date().toLocaleTimeString('en-US', { hour12: false }), message: 'Lead created (reference)' }
    ]
  },
  {
    id: 'LD-1002',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: 'Acme Corp',
    type: 'new leads',
    projectType: 'Tensile',
    phone: '+91 91234 56789',
    source: 'Referral',
    budget: '₹500k',
    status: 'Hot',
    manager: 'John Doe',
    followUp: 'Tomorrow',
    priority: 'High',
    notes: 'Interested in large tensile structure.',
    history: []
  },
  {
    id: 'LD-1003',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: 'TechFlow Pvt Ltd',
    type: 'new leads',
    projectType: 'PEB',
    phone: '+91 99887 76655',
    source: 'Cold Calling',
    budget: '₹150k',
    status: 'Warm',
    manager: 'Jane Smith',
    followUp: 'Next Week',
    priority: 'Medium',
    notes: 'Requires warehouse shed.',
    history: []
  },
  {
    id: 'LD-1004',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: 'Global Logistics',
    type: 'new leads',
    projectType: 'Other roofing',
    phone: '+91 98765 43210',
    source: 'Meta Leads',
    budget: '₹200k',
    status: 'Cold',
    manager: 'Unassigned',
    followUp: 'No Date',
    priority: 'Low',
    notes: 'Checking prices only.',
    history: []
  },
  {
    id: 'LD-1005',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: 'Skyline Builders',
    type: 'new leads',
    projectType: 'PEB',
    phone: '+91 97654 32109',
    source: 'LinkedIn Leads',
    budget: '₹800k',
    status: 'Appointment Fixed',
    manager: 'Mike Johnson',
    followUp: 'Today',
    priority: 'High',
    notes: 'Site visit scheduled.',
    history: []
  },
  {
    id: 'LD-1006',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: 'Pioneer Enterprises',
    type: 'new leads',
    projectType: 'Tensile',
    phone: '+91 96543 21098',
    source: 'Organic Leads',
    budget: '₹300k',
    status: 'Quotation Send',
    manager: 'Jane Smith',
    followUp: 'Tomorrow',
    priority: 'Medium',
    notes: 'Sent quote for canopy.',
    history: []
  },
  {
    id: 'LD-1007',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: 'Zenith Mfg',
    type: 'new leads',
    projectType: 'PEB',
    phone: '+91 95432 10987',
    source: 'Website Enquiry',
    budget: '₹400k',
    status: 'Negotiation',
    manager: 'John Doe',
    followUp: 'Next Week',
    priority: 'High',
    notes: 'Discussing final discount.',
    history: []
  },
  {
    id: 'LD-1008',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: 'Apex Industries',
    type: 'new leads',
    projectType: 'Other roofing',
    phone: '+91 94321 09876',
    source: 'Referral',
    budget: '₹120k',
    status: 'Order Confirmed',
    manager: 'Mike Johnson',
    followUp: 'Done',
    priority: 'Medium',
    notes: 'Received advance payment.',
    history: []
  },
  {
    id: 'LD-1009',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: 'Nexus Tech',
    type: 'new leads',
    projectType: 'PEB',
    phone: '+91 93210 98765',
    source: 'Meta Leads',
    budget: '₹60k',
    status: 'Junk',
    manager: 'Unassigned',
    followUp: 'No Date',
    priority: 'Low',
    notes: 'Out of service area.',
    history: []
  },
  {
    id: 'LD-1010',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: 'Vertex Solutions',
    type: 'new leads',
    projectType: 'Tensile',
    phone: '+91 92109 87654',
    source: 'Cold Calling',
    budget: '₹250k',
    status: 'New Lead',
    manager: 'Jane Smith',
    followUp: 'Tomorrow',
    priority: 'High',
    notes: 'Needs urgent installation.',
    history: []
  },
  {
    id: 'LD-1011',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: 'Crest Retail',
    type: 'new leads',
    projectType: 'PEB',
    phone: '+91 91098 76543',
    source: 'Website Enquiry',
    budget: '₹600k',
    status: 'Warm',
    manager: 'John Doe',
    followUp: 'Next Week',
    priority: 'Medium',
    notes: 'Requires showroom structure.',
    history: []
  }
];

const getStatusStyles = (status) => {
  const s = (status || '').toLowerCase();
  switch(s) {
    case 'hot': case 'hot leads': return { bg: '#FEE2E2', color: '#991B1B' };
    case 'warm': case 'warm leads': return { bg: '#FEF3C7', color: '#92400E' };
    case 'cold': case 'cold leads': return { bg: '#E2E8F0', color: '#475569' };
    case 'appt fixed': case 'appointment fixed': return { bg: '#DCFCE7', color: '#166534' };
    case 'new': case 'new lead': return { bg: '#DBEAFE', color: '#1E40AF' };
    case 'quotation send': case 'qutation send': return { bg: '#E0E7FF', color: '#4338CA' };
    case 'negotiation': case 'negotation': return { bg: '#FEF3C7', color: '#B45309' };
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

const API_URL = 'http://localhost:5000/api/leads';

const Pipeline = () => {
  const [leads, setLeads] = useState([]);
  const [leadsLoaded, setLeadsLoaded] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  // Load leads from backend API on mount (seed with initial data if DB empty)
  useEffect(() => {
    const loadLeads = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setLeads(data);
        } else {
          await fetch(`${API_URL}/bulk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(initialLeadsData)
          });
          setLeads(initialLeadsData);
        }
      } catch (err) {
        console.error('Failed to load leads from API:', err);
        setLeads(initialLeadsData);
      } finally {
        setLeadsLoaded(true);
      }
    };
    loadLeads();
  }, []);

  // Sync leads to backend API whenever they change
  useEffect(() => {
    if (!leadsLoaded) return;
    fetch(`${API_URL}/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leads)
    }).catch(err => console.error('Failed to sync leads to API:', err));
  }, [leads, leadsLoaded]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('Today');
  const [rangeSelectionState, setRangeSelectionState] = useState('start');
  const [currentNavDate, setCurrentNavDate] = useState(new Date());

  const applyPreset = (presetName) => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch (presetName) {
      case 'Today':
        start = today;
        end = today;
        break;
      case 'Yesterday':
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        start = yesterday;
        end = yesterday;
        break;
      case 'Last 7 Days':
        const last7 = new Date();
        last7.setDate(today.getDate() - 7);
        start = last7;
        end = today;
        break;
      case 'Last 30 Days':
        const last30 = new Date();
        last30.setDate(today.getDate() - 30);
        start = last30;
        end = today;
        break;
      case 'This Month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      default:
        break;
    }

    setSelectedPreset(presetName);
    if (presetName !== 'Custom') {
      setDateRange({
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
      });
      setIsCalendarOpen(false);
    }
  };

  const prevMonth = () => {
    setCurrentNavDate(new Date(currentNavDate.getFullYear(), currentNavDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentNavDate(new Date(currentNavDate.getFullYear(), currentNavDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= numDays; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isSelected = (day) => {
    if (!day) return false;
    const formatted = day.toISOString().split('T')[0];
    return formatted === dateRange.start || formatted === dateRange.end;
  };

  const isRange = (day) => {
    if (!day || !dateRange.start || !dateRange.end) return false;
    const formatted = day.toISOString().split('T')[0];
    return formatted > dateRange.start && formatted < dateRange.end;
  };

  const handleDayClick = (day) => {
    if (!day) return;
    const formatted = day.toISOString().split('T')[0];
    
    if (!rangeSelectionState || rangeSelectionState === 'start') {
      setDateRange({ start: formatted, end: '' });
      setRangeSelectionState('end');
      setSelectedPreset('Custom');
    } else {
      if (formatted < dateRange.start) {
        setDateRange({ start: formatted, end: dateRange.start });
      } else {
        setDateRange({ ...dateRange, end: formatted });
      }
      setRangeSelectionState('start');
      setIsCalendarOpen(false);
    }
  };

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState('');
  const [newLead, setNewLead] = useState({
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: '', workType: '', projectLocation: '', projectType: '', phone: '', budget: '', source: '', status: 'Lead Received', notes: ''
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLead, setEditLead] = useState(null);

  const openEditModal = (lead) => {
    setEditLead({ ...lead });
    setIsEditModalOpen(true);
  };

  const handleEditLeadFromWizard = (updatedData) => {
    const formattedTime = getFormattedTimestamp();
    setLeads(leads.map(l => {
      if (l.id === editLead.id) {
        const changes = [];
        if (l.name !== updatedData.name) changes.push(`name to "${updatedData.name}"`);
        if (l.phone !== updatedData.phone) changes.push(`phone to "${updatedData.phone}"`);
        if (l.projectType !== updatedData.projectType) changes.push(`service to "${updatedData.projectType}"`);
        if (l.source !== updatedData.source) changes.push(`source to "${updatedData.source}"`);
        if (l.budget !== updatedData.budget) changes.push(`budget to "${updatedData.budget}"`);
        if (l.projectLocation !== updatedData.projectLocation) changes.push(`location to "${updatedData.projectLocation}"`);
        if (l.notes !== updatedData.notes) changes.push('notes');
        
        const newHistory = changes.length
          ? [...(l.history || []), { timestamp: formattedTime, message: `Updated ${changes.join(', ')}` }]
          : (l.history || []);
          
        const updatedLead = { ...l, ...updatedData, history: newHistory };
        if (selectedLeadForTimeline && selectedLeadForTimeline.id === l.id) {
          setSelectedLeadForTimeline(updatedLead);
        }
        return updatedLead;
      }
      return l;
    }));
    setIsEditModalOpen(false);
    setEditLead(null);
    addToast('Lead updated successfully!', 'success');
  };

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
    quotationType: 'Initial',
    file: null
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

  const leadsInDateRange = leads.filter(l => {
    if (dateRange.start && dateRange.end) {
      const leadDateObj = new Date(l.date);
      const startObj = new Date(dateRange.start);
      startObj.setHours(0, 0, 0, 0);
      const endObj = new Date(dateRange.end);
      endObj.setHours(23, 59, 59, 999);
      if (leadDateObj < startObj || leadDateObj > endObj) return false;
    }
    return true;
  });

  const filteredLeads = leadsInDateRange.filter(l => {
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

    if (newStatus === 'APPT FIXED') {
      setActiveApptLeadId(id);
      setIsApptModalOpen(true);
    } else if (newStatus === 'QUOTATION SEND') {
      setGenQuoteLeadId(id);
      setGenQuoteDetails({
        leadId: lead.id,
        client: lead.name || '',
        project: lead.projectType || '',
        approvalStatus: 'Pending',
        quotationStatus: 'In Preparation',
        quotationType: 'Initial',
        file: null
      });
      setIsGenQuoteModalOpen(true);
    } else if (newStatus === 'NEW') {
      const formattedTime = getFormattedTimestamp();
      setLeads(leads.map(l => {
        if (l.id === id) {
          const newHistory = [...(l.history || []), {
            timestamp: formattedTime,
            message: `Updated status to: ${newStatus.toUpperCase()}`,
            remark: ''
          }];
          const updatedLead = { ...l, status: newStatus, history: newHistory };
          if (selectedLeadForTimeline && selectedLeadForTimeline.id === id) {
            setSelectedLeadForTimeline(updatedLead);
          }
          return updatedLead;
        }
        return l;
      }));
      addToast('Status updated to New Lead!', 'success');
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
    const maxQuoteNum = existingQuotes.reduce((max, q) => { const n = parseInt((q.id || '').replace('QT-', ''), 10); return isNaN(n) ? max : Math.max(max, n); }, 5000);
    const newQuoteId = `QT-${maxQuoteNum + 1}`;

    // Append new quote to quotes list in localStorage
    const newQuoteObj = {
      id: newQuoteId,
      leadId: genQuoteLeadId,
      client: genQuoteDetails.client,
      project: genQuoteDetails.project,
      amount: '',
      gst: '',
      approvalStatus: genQuoteDetails.approvalStatus,
      quotationStatus: genQuoteDetails.quotationStatus,
      revision: genQuoteDetails.quotationType,
      fileName: genQuoteDetails.file ? genQuoteDetails.file.name : null
    };
    const updatedQuotes = [...existingQuotes, newQuoteObj];
    localStorage.setItem('crm_quotes', JSON.stringify(updatedQuotes));

    // Persist the new quotation to the backend API (so dashboard/Quotations page show it)
    fetch('http://localhost:5000/api/quotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuoteObj)
    }).catch(err => console.error('Failed to save quotation to API:', err));

    // Update the lead's status & history timeline log
    setLeads(leads.map(l => {
      if (l.id === genQuoteLeadId) {
        const historyMessage = `Uploaded quotation ${newQuoteId} - Type: ${genQuoteDetails.quotationType}, File: ${genQuoteDetails.file ? genQuoteDetails.file.name : 'None'}`;
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
      quotationType: 'Initial',
      file: null
    });

    addToast('Quotation uploaded successfully!', 'success');
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
      quotationType: 'Initial',
      file: null
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
    const maxIdNum = leads.reduce((max, l) => { const n = parseInt((l.id || '').replace('LD-', ''), 10); return isNaN(n) ? max : Math.max(max, n); }, 1000);
    const newId = `LD-${maxIdNum + 1}`;
    const formattedTime = getFormattedTimestamp();
    
    const leadToAdd = {
      ...newLead,
      id: newId,
      type: 'new leads',
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
      name: '', workType: '', projectLocation: '', projectType: '', phone: '', budget: '', source: '', status: 'Lead Received', notes: '' 
    });
  };

  const handleAddLeadFromWizard = (leadData) => {
    const maxIdNum = leads.reduce((max, l) => { const n = parseInt((l.id || '').replace('LD-', ''), 10); return isNaN(n) ? max : Math.max(max, n); }, 1000);
    const newId = `LD-${maxIdNum + 1}`;
    const formattedTime = getFormattedTimestamp();
    
    const leadToAdd = {
      ...leadData,
      id: newId,
      type: 'new leads',
      followUp: 'Pending',
      history: [
        { timestamp: formattedTime, message: `Lead created from ${leadData.source || 'Manual Form'}` }
      ]
    };

    setLeads([...leads, leadToAdd]);
    setIsModalOpen(false);
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
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Add New Lead</button>
        </div>
      </div>

      {/* Overview Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-main)' }}>Overview</h3>
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'var(--surface-color)',
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--text-main)',
                outline: 'none',
                transition: 'all 0.2s'
              }}
            >
              <Calendar size={16} color="var(--primary-color)" />
              <span>
                {selectedPreset === 'Custom' 
                  ? `${formatDateDisplay(dateRange.start)} - ${formatDateDisplay(dateRange.end)}` 
                  : `${selectedPreset} (${formatDateDisplay(dateRange.start)} - ${formatDateDisplay(dateRange.end)})`}
              </span>
              <ChevronRight size={14} style={{ transform: isCalendarOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', opacity: 0.7 }} />
            </button>

            {isCalendarOpen && (
              <div style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                backgroundColor: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                zIndex: 100,
                overflow: 'hidden',
                minWidth: '460px'
              }}>
                {/* Presets Sidebar */}
                <div style={{
                  width: '160px',
                  borderRight: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#F8FAFC',
                  padding: '0.5rem 0'
                }}>
                  {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Custom'].map(preset => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      style={{
                        padding: '0.6rem 1rem',
                        border: 'none',
                        background: 'transparent',
                        textAlign: 'left',
                        fontSize: '0.8125rem',
                        fontWeight: selectedPreset === preset ? '600' : '500',
                        color: selectedPreset === preset ? 'var(--primary-color)' : 'var(--text-muted)',
                        backgroundColor: selectedPreset === preset ? '#EEF2FF' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        width: '100%'
                      }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Calendar View Area */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '300px' }}>
                  
                  {/* Header Navigator */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <button 
                      type="button"
                      onClick={prevMonth}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '4px', borderRadius: '4px' }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)', userSelect: 'none' }}>
                      {currentNavDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button 
                      type="button"
                      onClick={nextMonth}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '4px', borderRadius: '4px' }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Weekdays Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '4px' }}>
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                      <span key={d} style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>{d}</span>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                    {getDaysInMonth(currentNavDate).map((day, idx) => {
                      if (!day) return <div key={`empty-${idx}`}></div>;
                      
                      const isSel = isSelected(day);
                      const isInRange = isRange(day);
                      const isToday = day.toDateString() === new Date().toDateString();
                      
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDayClick(day)}
                          style={{
                            padding: '0.35rem 0',
                            fontSize: '0.75rem',
                            fontWeight: isSel || isToday ? '700' : '500',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            backgroundColor: isSel 
                              ? 'var(--primary-color)' 
                              : isInRange 
                                ? '#EEF2FF' 
                                : 'transparent',
                            color: isSel 
                              ? 'white' 
                              : isInRange 
                                ? 'var(--primary-color)' 
                                : isToday 
                                  ? 'var(--primary-color)' 
                                  : 'var(--text-main)',
                            boxShadow: isToday && !isSel ? 'inset 0 0 0 1px var(--primary-color)' : 'none'
                          }}
                          title={day.toLocaleDateString()}
                        >
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
          {/* Row 1 */}
          <LeadOverviewCard 
            title="Total Leads" 
            value={leadsInDateRange.length} 
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
            value={leadsInDateRange.filter(l => {
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
            value={leadsInDateRange.filter(l => (l.status||'').toLowerCase().includes('hot')).length} 
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
            value={leadsInDateRange.filter(l => (l.status||'').toLowerCase().includes('warm')).length} 
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
            value={leadsInDateRange.filter(l => (l.status||'').toLowerCase().includes('cold')).length} 
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
            value={leadsInDateRange.filter(l => {
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
            value={leadsInDateRange.filter(l => (l.status||'').toLowerCase().includes('quot')).length} 
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
            value={leadsInDateRange.filter(l => (l.status||'').toLowerCase().includes('negot')).length} 
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
            value={leadsInDateRange.filter(l => (l.status||'').toLowerCase().includes('order')).length} 
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
            value={leadsInDateRange.filter(l => (l.status||'').toLowerCase().includes('junk')).length} 
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
                 <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Work Type</th>
                 <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Project Location</th>
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
                 <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Project Value</th>
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
                    <option value="Project Filing" style={{ color: 'var(--text-main)' }}>PROJECT FILING</option>
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
                 <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Follow Up</th>
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
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-main)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.workType || '-'}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-main)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.projectLocation || '-'}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-main)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.projectType}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-main)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  {lead.projectValue ? `₹${lead.projectValue.toLocaleString()}` : (lead.budget || '-')}
                </td>
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
                    <option value="NEW">NEW LEAD</option>
                    <option value="HOT">HOT</option>
                    <option value="WARM">WARM</option>
                    <option value="COLD">COLD</option>
                    <option value="APPT FIXED">APPT FIXED</option>
                    <option value="QUOTATION SEND">QUOTATION SEND</option>
                    <option value="NEGOTIATION">NEGOTIATION</option>
                    <option value="ORDER CONFIRMED">ORDER CONFIRMED</option>
                    <option value="PROJECT FILING">PROJECT FILING</option>
                    <option value="JUNK">JUNK</option>
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
                        width: '32px', 
                        height: '32px', 
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
                      <Activity size={16} strokeWidth={2.5} />
                    </button>
                    <button title="Edit" onClick={() => openEditModal(lead)} style={{ background: '#E0E7FF', border: 'none', color: 'var(--primary-color)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Edit2 size={12} />
                    </button>
                    <button title="Delete" onClick={(e) => { e.stopPropagation(); setLeadToDelete(lead); }} style={{ background: '#FEE2E2', border: 'none', color: 'var(--danger-color, #991B1B)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', outline: 'none' }}>
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

      {/* Add New Lead Wizard */}
      <AddNewLeadWizard 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddLeadFromWizard} 
      />

      {/* Edit Lead Wizard */}
      <AddNewLeadWizard 
        isOpen={isEditModalOpen} 
        onClose={() => { setIsEditModalOpen(false); setEditLead(null); }} 
        onSave={handleEditLeadFromWizard} 
        initialData={editLead}
      />

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
                Upload Quotation
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

              {/* Row 4: Quotation Type | File Upload */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#64748B' }}>
                    Quotation Type
                  </label>
                  <select 
                    required 
                    value={genQuoteDetails.quotationType} 
                    onChange={(e) => setGenQuoteDetails({...genQuoteDetails, quotationType: e.target.value})} 
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
                    <option value="Initial">Initial Quotation</option>
                    <option value="Revised">Revised Quotation</option>
                    <option value="Final">Final Quotation</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#64748B' }}>
                    Upload File (PDF)
                  </label>
                  <input 
                    required 
                    onChange={(e) => setGenQuoteDetails({...genQuoteDetails, file: e.target.files[0]})} 
                    type="file" 
                    accept=".pdf"
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      borderRadius: 'var(--radius-md)', 
                      border: '1px solid var(--border-color)',
                      outline: 'none',
                      fontSize: '0.875rem',
                      color: 'var(--text-main)',
                      transition: 'border-color 0.2s',
                      cursor: 'pointer'
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
                  Upload
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
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Date</label>
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

      {/* Lead Details Drawer */}
      <LeadDetailsDrawer
        lead={selectedLeadForTimeline}
        isOpen={!!selectedLeadForTimeline}
        onClose={() => setSelectedLeadForTimeline(null)}
      />

      {/* Delete Confirmation Modal */}
      {leadToDelete && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '16px',
            width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#FEE2E2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>Delete Lead</h3>
            <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '2rem' }}>
              Are you sure you want to delete lead <strong style={{ color: '#1E293B' }}>{leadToDelete.id}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setLeadToDelete(null)} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', outline: 'none' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}>Cancel</button>
              <button onClick={() => {
                fetch(`${API_URL}/${leadToDelete.id}`, { method: 'DELETE' }).catch(err => console.error('Failed to delete lead:', err));
                setLeads(leads.filter(l => l.id !== leadToDelete.id));
                setLeadToDelete(null);
              }} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#DC2626', color: '#FFFFFF', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', outline: 'none', boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.2), 0 2px 4px -1px rgba(220, 38, 38, 0.1)' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#B91C1C'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#DC2626'}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LeadManagement;
