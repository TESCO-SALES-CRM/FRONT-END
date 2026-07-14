import React, { useState, useEffect } from 'react';
import { 
  Phone, Flame, CalendarCheck, FileText, DollarSign, TrendingUp, CheckCircle, Clock, 
  Plus, MoreVertical, MapPin, UploadCloud, DownloadCloud, Activity, Bell, ChevronRight, User, Trash,
  Calendar, ChevronLeft
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, FunnelChart, Funnel, LabelList
} from 'recharts';
import { useToast } from '../components/Toast';
import SectionHeader from '../components/SectionHeader';
import DateRangePicker from '../components/DateRangePicker';

// --- MOCK DATA ---
const pipelineData = [
  { name: 'Jan', value: 30 }, { name: 'Feb', value: 45 }, { name: 'Mar', value: 35 }, 
  { name: 'Apr', value: 60 }, { name: 'May', value: 55 }, { name: 'Jun', value: 80 }
];

const paymentsData = [
  { client: 'Wayne Ent.', amount: '₹5L', status: 'Advance Received', date: 'Oct 24' },
  { client: 'Daily Planet', amount: '₹2.1L', status: 'Overdue', date: 'Oct 15' },
];

// --- SUB-COMPONENTS ---
const KpiCard = ({ title, value, subtitle, icon: Icon, color, bg, borderColor, showChart }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', padding: '1.25rem', backgroundColor: bg || 'var(--surface-color)', border: `1px solid ${borderColor || 'var(--border-color)'}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500', margin: 0 }}>{title}</p>
      <Icon size={18} color={color} />
    </div>
    <div style={{ zIndex: 1 }}>
      <h3 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>{value}</h3>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>{subtitle}</span>
    </div>
    {showChart && (
      <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', right: '1.25rem', height: '30px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pipelineData}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
);

// --- MAIN DASHBOARD ---
const LEADS_API = 'http://localhost:5000/api/leads';
const APPTS_API = 'http://localhost:5000/api/appointments';
const QUOTES_API = 'http://localhost:5000/api/quotations';
const PROJECTS_API = 'http://localhost:5000/api/projects';

const DashboardHome = () => {
  const addToast = useToast();

  // Live lead data from API for KPI cards
  const [allLeads, setAllLeads] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  useEffect(() => {
    fetch(LEADS_API)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setAllLeads(d); })
      .catch(err => console.error('Dashboard failed to load leads:', err));
    fetch(APPTS_API)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setAllAppointments(d.map(a => ({ ...a, id: a._id || a.id }))); })
      .catch(err => console.error('Dashboard failed to load appointments:', err));
  }, []);

  const isNewStatus = (s) => {
    const x = (s || '').toLowerCase();
    return x.includes('new') || x.includes('received');
  };
  const countBy = (kw) => allLeads.filter(l => (l.status || '').toLowerCase().includes(kw)).length;

  const receivedLeadsCount = allLeads.length;
  const newLeadsCount = allLeads.filter(l => isNewStatus(l.status)).length;
  // Calls Made = leads that have moved OUT of "New" (Hot/Warm/Cold/etc.)
  const callsMadeCount = allLeads.filter(l => !isNewStatus(l.status)).length;
  const hotLeadsCount = countBy('hot');
  const warmLeadsCount = countBy('warm');
  const coldLeadsCount = countBy('cold');
  const junkLeadsCount = countBy('junk');
  const appointmentFixedCount = countBy('appointment');

  // Live lead-status pie data (replaces hardcoded leadStatusData)
  const liveLeadStatusData = [
    { name: 'Hot', value: hotLeadsCount, color: 'var(--danger-color)' },
    { name: 'Warm', value: warmLeadsCount, color: 'var(--warning-color)' },
    { name: 'Cold', value: coldLeadsCount, color: 'var(--primary-color)' },
    { name: 'Appointment Fixed', value: appointmentFixedCount, color: 'var(--success-color)' },
  ];

  // Live assigned-leads list (leads that have a manager assigned)
  const liveAssignedLeads = allLeads
    .filter(l => l.manager && l.manager !== 'Unassigned')
    .map(l => ({ name: l.name, priority: l.priority, manager: l.manager, status: l.status }));

  // Live quotations from the quotations API
  const [liveQuotes, setLiveQuotes] = useState([]);
  const [liveProjects, setLiveProjects] = useState([]);
  useEffect(() => {
    fetch(QUOTES_API)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setLiveQuotes(d); })
      .catch(err => console.error('Failed to load quotations:', err));
    fetch(PROJECTS_API)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setLiveProjects(d); })
      .catch(err => console.error('Failed to load projects:', err));
  }, []);

  // Live quotation count for the KPI card
  const quotationPreparedCount = liveQuotes.length;

  // Live appointments for the dashboard list (normalized)
  const liveAppointments = allAppointments.map(a => ({
    id: a.id,
    client: a.title || a.manager,
    type: a.type,
    time: a.timeStart,
    status: a.status
  }));
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });



  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
      
      {/* 1. Welcome Header Section */}
      <div className="glass-panel" style={{
        padding: '2rem', borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(49, 46, 129, 0.05) 0%, rgba(79, 70, 229, 0.1) 100%)',
        border: '1px solid rgba(49, 46, 129, 0.1)',
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Welcome Back, Akash 👋</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
            Manage construction leads, appointments, quotations, and project coordination efficiently.
          </p>
        </div>
      </div>

      {/* Date Picker Controls */}
      <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />

      {/* 2. KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <KpiCard title="Sales Pipeline Value" value="₹4.5Cr" subtitle="Total Potential Revenue" icon={TrendingUp} color="var(--primary-color)" bg="#EEF4FF" borderColor="#C7D2FE" />
        <KpiCard title="Expected Revenue" value="₹1.2Cr" subtitle="Weighted by Probability" icon={DollarSign} color="#10B981" bg="#ECFDF5" borderColor="#A7F3D0" />
        <KpiCard title="Received Leads" value={receivedLeadsCount} subtitle="+20 New Today" icon={FileText} color="var(--primary-color)" bg="#EEF4FF" borderColor="#C7D2FE" />
        <KpiCard title="Total Calls Made" value={callsMadeCount} subtitle="+12% from yesterday" icon={Phone} color="#7C3AED" bg="#F5F3FF" borderColor="#DDD6FE" />
        <KpiCard title="Hot Leads" value={hotLeadsCount} subtitle="High conversion chance" icon={Flame} color="#E11D48" bg="#FFF1F2" borderColor="#FECDD3" />
        <KpiCard title="Followup Leads" value={coldLeadsCount} subtitle="Needs attention" icon={Clock} color="#F97316" bg="#FFF7ED" borderColor="#FED7AA" />
        <KpiCard title="Warm Leads" value={warmLeadsCount} subtitle="Moderate potential" icon={Activity} color="#D97706" bg="#FFFBEB" borderColor="#FDE68A" />
        <KpiCard title="Junk Leads" value={junkLeadsCount} subtitle="Low quality" icon={Trash} color="#6B7280" bg="#F3F4F6" borderColor="#D1D5DB" />
        <KpiCard title="Appointment Fixed" value={appointmentFixedCount} subtitle="+5 New Today" icon={CalendarCheck} color="#22C55E" bg="#ECFDF5" borderColor="#BBF7D0" />
        <KpiCard title="Quotation Prepared" value={quotationPreparedCount} subtitle="Total Quotations" icon={FileText} color="#6366F1" bg="#EEF2FF" borderColor="#C7D2FE" />
        <KpiCard title="Payment Collection" value="₹8.4L" subtitle="₹2.1L Pending" icon={DollarSign} color="#16A34A" bg="#F0FDF4" borderColor="#86EFAC" />
      </div>





    </div>
  );
};

export default DashboardHome;

